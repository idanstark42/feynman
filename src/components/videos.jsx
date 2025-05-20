import { useEffect, useState } from "react"

import { useLilo } from '../logic/lilo'

import Loader from '../components/loader'
import VideoEntry from './video-entry'
import VideoEntryEditor from './video-entry-editor'
import VideoEntryLoading from "./video-entry-loading"

export default function ({ editable }) {
  const { data } = useLilo()
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    setTimeout(() => setShowLoader(false), Loader.THROTTLE)
  }, [])

  return showLoader || !(data.videos) || data.videos.length === 0 ? <><VideoEntryLoading /><VideoEntryLoading /><VideoEntryLoading /></> : <>
    {data.videos.map(video => editable ? <VideoEntryEditor key={video._id} video={video} /> : <VideoEntry key={video._id} video={video} />)}
  </>
}