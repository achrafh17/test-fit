import React, { useState } from 'react';
import './App.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [exercise, setExercise] = useState('');
  const [duration, setDuration] = useState('');
  const [weightHistory, setWeightHistory] = useState([]);

  // BMI Calculation
  const calculateBMI = () => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBmi(bmiValue.toFixed(2));
    }
  };

  // Add workout log
  const addWorkout = () => {
    setWorkouts([...workouts, { exercise, duration }]);
    setExercise('');
    setDuration('');
  };

  // Add weight to history
  const logWeight = () => {
    const date = new Date().toLocaleDateString();
    setWeightHistory([...weightHistory, { date, weight }]);
  };

  // Example data for weight progress chart
  const weightData = weightHistory.map(entry => ({
    date: entry.date,
    weight: entry.weight,
  }));

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <h1>Fitness Tracker</h1>
        <p>Track your fitness journey with ease</p>
      </header>

      {/* BMI Calculator */}
      <section className="section">
        <h2>BMI Calculator</h2>
        <div className="input-container">
          <label>Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter your weight"
          />
        </div>
        <div className="input-container">
          <label>Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter your height"
          />
        </div>
        <button onClick={calculateBMI}>Calculate BMI</button>
        {bmi && (
          <div className="bmi-result">
            <p>Your BMI is: <span>{bmi}</span></p>
          </div>
        )}
      </section>

      {/* Workout Log */}
      <section className="section">
        <h2>Workout Log</h2>
        <div className="input-container">
          <label>Exercise</label>
          <input
            type="text"
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
            placeholder="Enter exercise name"
          />
        </div>
        <div className="input-container">
          <label>Duration (minutes)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Enter duration"
          />
        </div>
        <button onClick={addWorkout}>Add Workout</button>
        {workouts.length > 0 && (
          <ul>
            {workouts.map((workout, index) => (
              <li key={index}>{workout.exercise} - {workout.duration} min</li>
            ))}
          </ul>
        )}
      </section>

      {/* Weight Progress Chart */}
      <section className="section">
        <h2>Weight Progress</h2>
        <button onClick={logWeight}>Log Weight</button>
        {weightHistory.length > 0 && (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="weight" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </section>
    </div>
  );
}

export default App;
