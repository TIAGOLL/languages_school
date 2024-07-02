import { BrowserRouter } from "react-router-dom/dist"
import AuthProvider from './contexts/auth'
import RoutesApp from './routes/index';
import { Flip, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@radix-ui/themes/styles.css';
import ThemeProvider from "./components/ui/ThemeProvider";

function App() {
  const queryClient = new QueryClient()
  const theme = localStorage.getItem('theme')

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <RoutesApp />
            <ToastContainer autoClose={2000} transition={Flip} closeButton draggable theme={theme} stacked position="bottom-right" toastClassName="bg-zinc-100 text-zinc-800 dark:bg-slate-800 dark:text-zinc-300" bodyClassName="data-test" />
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter >
  )
}

export default App
