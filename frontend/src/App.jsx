import { useState, useEffect, useCallback } from 'react'
import './App.css'

function App() {
  const [trains, setTrains] = useState([]);
  const [platforms, setPlatforms] = useState(0);

  const addTrain = () => {
    const id = Date.now();
    setTrains([...trains, { id, name: '', arrival: '', departure: '' }]);
  };

  const removeTrain = (id) => {
    setTrains(trains.filter(train => train.id !== id));
  };

  const updateTrain = (id, field, value) => {
    setTrains(trains.map(train => 
      train.id === id ? { ...train, [field]: value } : train
    ));
  };

  const calculatePlatforms = useCallback(() => {
    if (trains.length === 0) {
      setPlatforms(0);
      return;
    }

    const arrivals = trains
      .filter(t => t.arrival)
      .map(t => new Date(`1970-01-01T${t.arrival}`))
      .sort((a, b) => a - b);

    const departures = trains
      .filter(t => t.departure)
      .map(t => new Date(`1970-01-01T${t.departure}`))
      .sort((a, b) => a - b);

    let maxPlatforms = 0;
    let platformsNeeded = 0;
    let i = 0;
    let j = 0;

    while (i < arrivals.length && j < departures.length) {
      if (arrivals[i] <= departures[j]) {
        platformsNeeded++;
        maxPlatforms = Math.max(maxPlatforms, platformsNeeded);
        i++;
      } else {
        platformsNeeded--;
        j++;
      }
    }

    setPlatforms(maxPlatforms);
  }, [trains]);

  useEffect(() => {
    calculatePlatforms();
  }, [calculatePlatforms]);

  return (
    <div className="app">
      <header>
        <h1>Railway Platform Manager</h1>
        <p>Add train details and calculate minimum platforms needed.</p>
      </header>

      <main className="train-form">
        {trains.map((train) => (
          <div key={train.id} className="train-row">
            <input
              type="text"
              placeholder="Train Name"
              value={train.name}
              onChange={(e) => updateTrain(train.id, 'name', e.target.value)}
            />
            <input
              type="time"
              value={train.arrival}
              onChange={(e) => updateTrain(train.id, 'arrival', e.target.value)}
            />
            <input
              type="time"
              value={train.departure}
              onChange={(e) => updateTrain(train.id, 'departure', e.target.value)}
            />
            <button type="button" onClick={() => removeTrain(train.id)}>-</button>
          </div>
        ))}

        <div className="form-actions">
          <button type="button" className="btn-add" onClick={addTrain}>+ Add Train</button>
        </div>

        <div className="platforms-result">
          <h2>Required Platforms: <span>{platforms}</span></h2>
        </div>
      </main>
    </div>
  );
}

export default App;
