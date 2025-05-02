import './App.css';
import Header from './components/Header';
import EstimateForm from './components/EstimateForm';
//*import EstimateResult from './components/EstimateResult';

function App() {
  return (
    <div className="App">
      <Header /> {/* Render Header Component */}
      <EstimateForm /> {/* Render EstimateForm Component*/}
      {/* do not render estimateResult breaks page */}
      {/*<EstimateResult />*/} {/* Render EstimateResult Component*/}
    </div>
  );
}

export default App;
