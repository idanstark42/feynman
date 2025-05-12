import MuxPlayer from '@mux/mux-player-react'

export default function Player ({ videoId, autoPlay = false }) {
    return <div className='player'>
        <MuxPlayer playbackId={videoId} style={{ width: '100%', height: '100%' }} autoPlay={autoPlay} />
    </div>
}