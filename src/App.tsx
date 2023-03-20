import './App.css';

import AutoComplete from './app/components/AutoComplete';
import pokeData from './app/utils/mock_original_pockemons.json';

function App() {
  return (
    <div className="container">
      <p>Find a classic Pokemon:</p>
      <AutoComplete options={pokeData} />
    </div>
  );
}

export default App;
