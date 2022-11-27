import Calendar from "./components/Calendar";
import List from "./components/List";
import '../src/scss/style.scss';
import {Routes, Route} from 'react-router-dom';
import React, {useState, useEffect} from 'react'

function App() {
  const [listDate, setListDate] = useState(0);

  useEffect(()=>{
    console.log(listDate)
  })
  return (
    <>
    <h1 style={{textAlign:"center","fontSize":"20px",paddingTop:"20px"}}>치맥녀의 투두리스트</h1>

    <div id="wrap">
    <Calendar setListDate={setListDate}/>
    <Routes>
      <Route path='/' element={<List listDate={listDate} />} />
      <Route path='/list/:date' element={<List listDate={listDate} />} />
    </Routes>
    
    </div>
    </>
  );
}

export default App;
