export default function ButtonControls({ isVideoOn, toggleVideo,toggleAudio,isAudioOn }) {
    return (
      <div style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
        <button onClick={toggleVideo} style={{ padding: '10px 20px', borderRadius: '8px', backgroundColor: '#0070f3', color: 'white', border: 'none' }}>
          {isVideoOn ? "Turn Off Video" : "Turn On Video"}
        </button>
        <button onClick={toggleAudio} style={{ padding: '10px 20px', borderRadius: '8px', backgroundColor: '#34a853', color: 'white', border: 'none' }}>
        {isAudioOn ? "Mute Audio" : "Unmute Audio"}
      </button>
      </div>
    );
  }
  