import '../css/App.css';
import MainComponents from './MainComponents';
import TopComponents from './TopComponents';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="App">
        <div className='container-inner'>
          <div className='top-section'> <TopComponents /> </div>
          <div className='main-section'> <MainComponents /> </div>
        </div>
      </div>
    </>
  );
}

export default App;
