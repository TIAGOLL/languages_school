import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import AuthProvider from './contexts/auth';
import store from './redux/app/store';
import RoutesApp from './routes/index';

import './styles/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Provider store={store}>
          <RoutesApp />
          <ToastContainer autoClose={3000} />
        </Provider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
