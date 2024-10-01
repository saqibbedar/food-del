import { Navbar, Sidebar } from './components/components.js'
import { Routes, Route } from 'react-router-dom'
import { Add, List, Orders } from './pages/pages.js';
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className='app-content'>
        <Sidebar />
        <Routes>
          <Route path='/add' element={<Add/>} />
          <Route path='/list' element={<List/>} />
          <Route path='/orders' element={<Orders/>} />
        </Routes>
      </div>
    </>
  );
}

export default App
