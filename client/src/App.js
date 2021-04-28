import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavBar from './components/AppNavBar';
import CheckinList from './components/CheckinList';
import CheckinModal from './components/CheckinModal';
import { Provider } from 'react-redux';
import store from './store';

import { Container } from 'reactstrap';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <AppNavBar/>
      <Container>
      <CheckinModal />
      <CheckinList/>
      </Container>
    </div>
    </Provider>
  );
}

export default App;
