import React from 'react'

const AudioPlayer = (resource) => {

  const audioElement = new Audio(`http://www.afatecha.com/id/files/audio/${resource.document.location}`)
  console.log(resource)
  console.log(audioElement)

  return (
    <div className="audio-player">
      <div className="track-info">
        <p></p>
      </div>
      audio player
    </div>
  )
}

export { AudioPlayer }
