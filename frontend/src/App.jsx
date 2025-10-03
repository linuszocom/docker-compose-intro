import { useState, useEffect } from 'react';
import './App.css';
import Button from './components/Button';

function App() {
  const [apiMessage, setApiMessage] = useState('Laddar API-meddelande...');
  const [statusMessage, setStatusMessage] = useState('');

  // Hämtar meddelandet från API:et när komponenten laddas
  useEffect(() => {
    fetch('https://demo-app-2-fwdphvd3cpcxafcw.swedencentral-01.azurewebsites.net/api')
      .then(response => response.json())
      .then(data => setApiMessage(data.message))
      .catch(error => console.error('Fel vid hämtning av API:', error));
  }, []);

  // Funktion för att skicka data till API:et och spara i databasen
  const saveData = () => {
    const message = `Hej från React! Tid: ${new Date().toLocaleTimeString()}`;
    fetch('https://demo-app-2-fwdphvd3cpcxafcw.swedencentral-01.azurewebsites.net/api/data', {
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
      <Button onClick={saveData} text="Skicka data till API" />
      <p id="status-message">{statusMessage}</p>
    </div>
  );
}

export default App;