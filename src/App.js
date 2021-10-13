import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Root from './components/RootComponent';

function App() {
  return (
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  );
}

export default App;
