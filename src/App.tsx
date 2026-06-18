import './App.css'
import EnergyDashboard from "./components/EnergyDashboard.tsx";
import ChargingTime from "./components/ChargingTime.tsx";

function App() {

  return (
      <div>
        <h1
            style={{
              textAlign: "center",
              margin: 0,
              padding: "20px 0",
            }}
        >
          Energy Frontend
        </h1>
        <div>
          <EnergyDashboard />
        </div>
        <div style={{ marginTop: '150px' }}>
          <ChargingTime />
        </div>
      </div>
  );


}

export default App
