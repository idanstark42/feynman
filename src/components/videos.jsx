import { useEffect, useState, useRef } from "react"

import { useLilo } from '../logic/lilo'

import Loader from '../components/loader'
import VideoEntry from './video-entry'
import VideoEntryEditor from './video-entry-editor'
import VideoEntryLoading from "./video-entry-loading"

const SEARCH_THROTTLE = 300

export default function ({ editable }) {
  const { data } = useLilo()
  const [showLoader, setShowLoader] = useState(true)

  const searchTimeoutRef = useRef()
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [searchResults, setSearchResults] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false)
      setSearchResults(data.videos)
    }, Loader.THROTTLE)
  }, [])

  const search = (query) => {
    query = query.toLowerCase()
    return data.videos.filter(video => [video.metadata.title, ...(video.metadata.tags || []), video.metadata.description]
      .filter(Boolean)
      .some(field => field.toLowerCase().includes(query)))
  }

  const VideoElement = editable ? VideoEntryEditor : VideoEntry

  return showLoader || !(data.videos) || data.videos.length === 0 ? <><VideoEntryLoading /><VideoEntryLoading /><VideoEntryLoading /></> : <>
    <input
      value={searchValue}
      placeholder='Search...'
      onChange={e => {
        const value = e.target.value
        setSearchLoading(true)
        setSearchValue(value)
        clearTimeout(searchTimeoutRef.current)
        searchTimeoutRef.current = setTimeout(() => {
          if (value.length === 0) {
            setSearchResults(data.videos)
          } else {
            setSearchResults(search(value))
          }
          setSearchLoading(false)
        }, SEARCH_THROTTLE)
      }}
    />
    {searchResults.map(video => <VideoElement key={video._id} video={video} />)}
  </>
}