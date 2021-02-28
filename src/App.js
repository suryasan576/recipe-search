import './App.css';
import Searchbox from './components/Searchbox';
import SearchBoxHook from './components/useHooks/SearchBoxHook';

function App() {

  return (
    <div className="App">
      {/* {BY USING CLASS COMPONENT} */}
      <Searchbox />

      {/* {BY USING HOOKS} */}
      {/* <SearchBoxHook /> */}
      
    </div>
  );
}

export default App;
