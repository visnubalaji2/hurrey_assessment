export default function Transcript({ transcript ,isAudioOn }) {
    return (
      <div style={{ marginTop: '10px', width: '640px', textAlign: 'center', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '8px', minHeight: '50px' }}>
        <strong>Speech Transcript:</strong><br />
       {isAudioOn &&  <p>{transcript || "Start speaking..."}</p>}   
      </div>
    );
  }
  