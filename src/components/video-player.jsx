import MuxPlayer from '@mux/mux-player-react';
import { useEffect, useState } from 'react';
import { useLilo } from '../logic/lilo';

export default function VideoPlayer ({ video }) {
  const { lilo } = useLilo()
  const [tokens, setTokens] = useState(null)

  useEffect(() => {
    (async () => {
      const t = await lilo.getVideoTokens(video.playbackId.id)
      setTokens(Object.fromEntries(Object.entries(t).map(([key, value]) => ([key.replace('-token', ''), value]))))
    }) ()
  }, [video])

  if (!tokens) {
    return '' 
  }

  return <MuxPlayer playbackId={video.playbackId.id} tokens={tokens} />
}
