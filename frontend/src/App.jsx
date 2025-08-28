import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [apiMessage, setApiMessage] = useState('Laddar API-meddelande...');
  const [statusMessage, setStatusMessage] = useState('');

  // Hämtar meddelandet från API:et när komponenten laddas
  useEffect(() => {
    fetch('http://localhost:3000/api')
      .then(response => response.json())
      .then(data => setApiMessage(data.message))
      .catch(error => console.error('Fel vid hämtning av API:', error));
  }, []);

  // Funktion för att skicka data till API:et
  const saveData = () => {
    const message = `Hej från React! Tid: ${new Date().toLocaleTimeString()}`;
    fetch('http://localhost:3000/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
      .then(response => response.json())
      .then(data => {
        setStatusMessage('Data sparad med ID: ' + data.id);
      })
      .catch(error => console.error('Fel vid sparning av data:', error));
  };

  return (
    <div className="App">
      <h1>Frontend Service</h1>
      <p id="api-message">{apiMessage}</p>
      <button onClick={saveData}>Skicka data till API</button>
      <p id="status-message">{statusMessage}</p>
    </div>
  );
}

export default App;