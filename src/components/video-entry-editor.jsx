
import { useState } from 'react'
import { Header } from 'semantic-ui-react'

import { useLilo } from '../logic/lilo'
import VideoEntryLoading from './video-entry-loading'

export default function VideoEntryEditor ({ video }) {
  const { lilo } = useLilo()
  const [name, setName] = useState(video.metadata.name || '')
  const [description, setDescription] = useState(video.metadata.description || '')
  const [tags, setTags] = useState(video.metadata.tags || [])
  const [loading, setLoading] = useState(false)

  const save = async () => {
    setLoading(true)
    Object.assign(video.metadata, { name, description, tags })
    await lilo.clients.videos.update({ _id: video._id }, { metadata: video.metadata })
    setLoading(false)
  }

  if (loading) {
    return <VideoEntryLoading />
  }

  return <div className='video-entry'>
    <div className='thumbnail'></div>
    <div className='data'>
      <Header className='name'>
        <input value={name} onChange={e => setName(e.target.value)} placeholder='title' />
      </Header>
      <div>
        <input value={description} onChange={e => setDescription(e.target.value)} placeholder='description' />
      </div>
      <div>
        <input value={tags.join(', ')} onChange={e => setTags(e.target.value.split(',').map(tag => tag.trim()))} placeholder='tags' />
      </div>
    </div>
    <div>
      <div className='ui button' onClick={save}>save</div>
    </div>
  </div>
}