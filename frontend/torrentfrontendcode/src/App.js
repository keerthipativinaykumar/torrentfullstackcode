import React, { useState } from 'react';

function App() {
  const [magnetLink, setMagnetLink] = useState('');
  const [progress, setProgress] = useState('');

  const addMagnetLink = async () => {
    const response = await fetch('/add-magnet-link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        magnet_link: magnetLink
      })
    });

    const result = await response.json();

    if (result.success) {
      setMagnetLink('');
    } else {
      alert('Error adding magnet link');
    }
  };

  const startDownloads = async () => {
    const response = await fetch('/start-downloads');

    if (response.ok) {
      const results = await response.json();

      setProgress(results.join('\n'));
    } else {
      alert('Error starting downloads');
    }
  };

  return (
    <div>
      <h1>Torrent Downloader</h1>

      <input
        type="text"
        value={magnetLink}
        onChange={(event) => setMagnetLink(event.target.value)}
        placeholder="Enter Magnet Link"
      />

      <button onClick={addMagnetLink}>Add Magnet Link</button>

      <br /><br />

      <button onClick={startDownloads}>Start Downloads</button>

      <br /><br />

      <textarea
        value={progress}
        readOnly={true}
        rows={10}
        style={{ width: '100%' }}
      />
    </div>
  );
}

export default App;