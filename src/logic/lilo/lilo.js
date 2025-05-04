import uploadImage from './images-client'

import SingletonDatabaseClient from './singleton-database-client'
import CollectionDatabaseClient from './collection-database-client'

const DATABASE_CLIENTS = {
  singleton: SingletonDatabaseClient,
  collection: CollectionDatabaseClient
}

export default class Lilo {
  constructor (stytch, settings, data, setData, loading, setLoading) {
    this.stytch = stytch
    this.settings = settings
    this.data = data
    this.setData = setData
    this.loading = loading
    this.setLoading = setLoading
    this.clients = Object.fromEntries(Object.entries(settings.collections).map(([collectionName, collectionSettings]) => [collectionName, this.loadClient(collectionName, collectionSettings)]))
  }

  loadClient (collectionName, collectionSettings) {
    const { type, ...settings } = collectionSettings
    const Client = DATABASE_CLIENTS[type]
    if (!Client) {
      throw new Error(`Unknown database client type: ${type}`)
    }
    const client = new Client(this.stytch, collectionName, collectionSettings)
    return client
  }

  async init () {
    this.setLoading(true)
    await Promise.all(Object.entries(this.clients)
      .map(([collectionName, client]) => client.init()
        .then(data => this.setData(prevData => ({ ...prevData, [collectionName]: data })))))
    this.setLoading(false)
  }

  async uploadImage (file) {
    return await uploadImage(file)
  }
}