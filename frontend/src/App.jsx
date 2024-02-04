import { BrowserRouter } from "react-router-dom/dist"
import AuthProvider from './contexts/auth'
import RoutesApp from './routes/index';
import { Flip, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient()

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RoutesApp />
          <ToastContainer autoClose={2000} transition={Flip} closeButton draggable theme='light' />
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
