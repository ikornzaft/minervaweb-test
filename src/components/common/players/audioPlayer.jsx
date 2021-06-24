import React from 'react'
import ReactPlayer from 'react-player';

const AudioPlayer = (resource) => {

  const audioElement = new Audio(`http://www.afatecha.com/id/files/audio/${resource.document.location}`)
  console.log(resource)
  console.log(audioElement)

  return (
    <div className="audio-player">
      <div className="track-info">
      <ReactPlayer url={`http://www.afatecha.com/id/files/audio/${resource.document.location}`} playing /> 

      </div>
      audio player
    </div>
  )
}

export { AudioPlayer }
