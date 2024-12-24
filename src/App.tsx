import { useState } from 'react'
import React from 'react'
import './App.css'
import Hls from 'hls.js'
import { BASE_URL } from './config/ApiConfig'

function App() {

  const videoPlayerRef: React.RefObject<HTMLVideoElement> = React.createRef();
  const [streamKey, setStreamKey] = useState<string>("obs_stream");

  const onPlayBtnClick = () => {
    setStreamKey(streamKey);
    if(Hls.isSupported()) {
      var videoPlayer = videoPlayerRef.current as HTMLVideoElement;
      if (videoPlayer != null) {
        var hls = new Hls();
        hls.loadSource(`${BASE_URL}/stream/hls/${streamKey}.m3u8`);
        hls.attachMedia(videoPlayerRef.current as HTMLVideoElement);
        hls.on(Hls.Events.MANIFEST_PARSED,function() {
        videoPlayer.play();
        });
      } else {
        console.log("video is null")
      }
    }
  }

  return (
    <>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10px',
        marginBottom: '10px',
        gap: '50px'
      }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <div style={{
            fontSize: '20px',
            fontWeight: 'bold'
          }}>
            Stream Key:
          </div>
          <input type="text" placeholder="Enter the stream key" value={streamKey} onChange={(event) => {setStreamKey(event.target.value)}}/>
        </div>
        <button onClick={onPlayBtnClick}>
          Play
        </button>
      </div>
      <div className="card">
        <video  width="1280" height="720" controls autoPlay className="videoCentered" ref={videoPlayerRef}>
        </video>
      </div>
    </>
  )
}

export default App
