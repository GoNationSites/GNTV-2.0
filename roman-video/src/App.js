import React from 'react'

const App = () => {
  const VIDEO_URL =
    'https://player.vimeo.com/external/486896681.hd.mp4?s=735d7106f1f27ec8232ad098d0b7f3b5cef0030b&profile_id=175'

  const videoContainerStyle = {}
  const videoStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }

  const refreshTime = 60 * 60000

  window.setTimeout(function () {
    window.location.reload()
  }, refreshTime)
  return (
    <div style={videoContainerStyle}>
      <video style={videoStyle} muted autoPlay loop playsInline>
        <source src={VIDEO_URL} type='video/mp4' />
      </video>
    </div>
  )
}

export default App
