import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Root from './components/RootComponent';
import { Provider } from 'react-redux';
import store from './redux/configureStore';
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
