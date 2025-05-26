import { useState, useEffect } from 'react'
import { Header, Input, FormField, Button, Form, Loader } from 'semantic-ui-react'
import VideoPlayer from './video-player'
import { useLilo } from '../logic/lilo'
import { useModal } from '../logic/modal'

export default function ({ video }) {
  const { lilo } = useLilo()
  const { closeModal } = useModal()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState([])
  const [isPublic, setPublic] = useState(false)
  const [thumbnailTime, setThumbnailTime] = useState(null)

  useEffect(() => {
    setName(video.metadata.name || '')
    setDescription(video.metadata.description || '')
    setTags(video.metadata.tags || [])
    setPublic(video.public)
    setThumbnailTime(video.metadata.thumbnailTime)
  }, [video])

  const save = async () => {
    setLoading(true)
    const thumbnail = await lilo.saveThumbnail(video.playbackId.id, thumbnailTime)
    Object.assign(video.metadata, {
      name,
      description,
      thumbnailTime: thumbnailTime,
      thumbnail
    })
    video.public = isPublic
    await lilo.clients.videos.update({ _id: video._id }, { metadata: video.metadata, public: isPublic })
    closeModal()
  }

  return <div className='editing modal' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }} onClick={e => e.stopPropagation()}>
    <Header style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumn: '1 / 3' }}>
      <div style={{ gridColumn: '1 / 3' }}>Edit</div>
      <Header.Subheader>database ID:</Header.Subheader>
      <Header.Subheader style={{ textAlign: 'right' }}>{video._id}</Header.Subheader>
      <Header.Subheader>asset ID:</Header.Subheader>
      <Header.Subheader style={{ textAlign: 'right' }}>{video.assetId}</Header.Subheader>
      <Header.Subheader>playback ID:</Header.Subheader>
      <Header.Subheader style={{ textAlign: 'right' }}>{video.playbackId.id}</Header.Subheader>
    </Header>
    <div className='image-selector' style={{ padding: '1rem' }}>
      <VideoPlayer video={video} playerInitTime={video.metadata.thumbnailTime || 0} onTimeUpdate={e => setThumbnailTime(e.target.currentTime)} />
    </div>
    <Form>
      <FormField>
        <label>name</label>
        <input value={name} onChange={e => setName(e.target.value)} />
      </FormField>
      <FormField>
        <label>description</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} />
      </FormField>
      <FormField>
        <label>tags</label>
        <input value={tags.join(', ')} onChange={e => setTags(e.target.value.split(',').map(x => x.trim()))} />
      </FormField>
      <FormField>
        <div class='ui checkbox'>
          <input type='checkbox' checked={isPublic} onChange={() => setPublic(!isPublic)}/>
          <label>public</label>
        </div>
      </FormField>
      <div className='ui primary button' onClick={save}>save</div>
    </Form>
    {loading ? <div class='ui active transition visible dimmer'>
      <div class='content'>
        <div class='ui loader'></div>
      </div>
    </div> : ''}
  </div>
}