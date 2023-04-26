import Router from './routes';
import { GlobalStyles } from './styles/global';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const App = () => (
  <>
    <GlobalStyles />
    <Router />

    <ToastContainer />
  </>
);

export default App;
