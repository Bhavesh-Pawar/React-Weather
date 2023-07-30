import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import CityNameHeader from "./components/CityNameHeader";
import CurrentWeather from "./components/CurrentWeather";

function App() {
  return (
    <div className="App">
      <CityNameHeader />
      <CurrentWeather />
    </div>
  );
}

export default App;
