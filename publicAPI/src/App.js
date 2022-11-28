
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import '../src/scss/style.scss'
import Popup from './components/Popup';
import Main from './components/Main';
import PopupDetail from './components/PopupDetail';



function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/popup/:id" element={<Popup />} />
        <Route path="/popup/:id/:num" element={<PopupDetail />} />
      </Routes>

    </>
  );
}

export default App;
