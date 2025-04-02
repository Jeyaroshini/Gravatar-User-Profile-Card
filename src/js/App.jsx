import { useState } from 'react';
import '../css/App.css';
import MainComponents from './MainComponents';
import TopComponents from './TopComponents';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [profiles, setProfiles] = useState({});
  
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="App">
        <div className='container-inner'>
          <div className='top-section'> <TopComponents profiles={profiles} setProfiles={setProfiles}/> </div>
          <div className='main-section'> <MainComponents profiles={profiles} setProfiles={setProfiles}/> </div>
        </div>
      </div>
    </>
  );
}

export default App;
