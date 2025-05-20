import { useEffect, useState } from 'react'
import MuxUploader from '@mux/mux-uploader-react'
import { Segment } from 'semantic-ui-react'

import { useLilo } from '../logic/lilo'
import Page from '../components/page'
import Videos from '../components/videos'

const MUX_UPLOAD_ENDPOINT = import.meta.env.VITE_MUX_ENDPOINT

export default function Admin () {
  const { lilo } = useLilo()
  const [uploadURL, setUploadURL] = useState()

  useEffect(() => {
    if (!lilo.loggedIn) {
      window.location.href = '/auth?callback=/admin'
    }

    ;(async () => {
        setUploadURL(await lilo.getVideoUploadURL())
    }) ()
  }, [])

  return <Page className='admin'>
    <Segment>
      <Videos editable />
    </Segment>
    <Segment>
      {uploadURL ? <MuxUploader endpoint={uploadURL}/> : ''}
    </Segment>
  </Page>
}