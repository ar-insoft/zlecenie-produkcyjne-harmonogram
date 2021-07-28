import './App.css';
import packageJson from './../package.json';
import preval from 'preval.macro';
import { Kontroler} from './zlecenieProdukcyjne/Kontroler'

function App() {
  return (
    <div className="App" data_build_version={packageJson.version} data_build_time={preval`module.exports = new Date().toISOString();`}>
      <Kontroler />
    </div>
  );
}

export default App;
