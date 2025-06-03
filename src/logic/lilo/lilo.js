import uploadImage from './images-client'
import { getVideoUploadURL, getVideoTokens } from './video-client'

import SingletonDatabaseClient from './singleton-database-client'
import CollectionDatabaseClient from './collection-database-client'

const DATABASE_CLIENTS = {
  singleton: SingletonDatabaseClient,
  collection: CollectionDatabaseClient
}

const ADMIN_ID = import.meta.env.VITE_ADMIN_ID

export default class Lilo {
  constructor (stytch, settings, data, setData, loading, setLoading) {
    this.stytch = stytch
    this.settings = settings
    this.data = data
    this.setData = setData
    this.loading = loading
    this.setLoading = setLoading
    this.clients = Object.fromEntries(Object.entries(settings.collections).map(([key, collectionSettings]) => [key, this.loadClient(key, collectionSettings)]))
  }

  get loggedIn () {
    return Boolean(this.stytch.session.getTokens())
  }

  get userInfo () {
    if (!this.loggedIn) return null

    const info = this.stytch.user.getInfo().user
    
    info.name = info.trusted_metadata.name || ((info.name.first_name && info.name.last_name) ? `${info.name.first_name} ${info.name.last_name}` : '')
    info.username = info.trusted_metadata.username || info.name || info.emails[0].email.split('@')[0]
    info.admin = info.user_id === ADMIN_ID
    info.email = info.trusted_metadata.email || info.emails[0].email
    
    return info
  }

  loadClient (key, collectionSettings) {
    const { type } = collectionSettings
    const Client = DATABASE_CLIENTS[type]
    if (!Client) {
      throw new Error(`Unknown database client type: ${type}`)
    }
    return new Client(this.stytch, key, collectionSettings)
  }

  async init () {
    this.setLoading(true)
    await Promise.all(Object.entries(this.clients)
      .map(([key, client]) => client.init()
        .then(data => this.setData(prevData => ({ ...prevData, [key]: data })))))
    this.setLoading(false)
  }

  async uploadImage (file) {
    return await uploadImage(this.stytch, file)
  }

  async getVideoUploadURL () {
    return await getVideoUploadURL(this.stytch)
  }

  async getVideoTokens (playbackId) {
    return await getVideoTokens(playbackId)
  }

  async saveThumbnail(playbackId, thumbnailTime) {
    const videoTokens = await this.getVideoTokens(playbackId)
    const token = videoTokens['thumbnail-token']
    if (!token) throw new Error('Missing thumbnail token')

    const downloadResponse = await fetch(`https://image.mux.com/${playbackId}/thumbnail.jpg?time=${thumbnailTime}&token=${token}`)
    if (!downloadResponse.ok) throw new Error(`Failed to fetch thumbnail: ${response.statusText}`)

    const blob = await downloadResponse.blob()
    const file = new File([blob], `${playbackId}_${thumbnailTime}.jpg`, { type: 'image/jpeg' })

    const uploadResponse = await this.uploadImage(file)
    return uploadResponse.result.url
  }

  async updateUser (user) {
    user.user_id = this.userInfo.user_id
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/update`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${this.stytch.session.getTokens().session_token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })
    console.log(response)
    return response
  }
}