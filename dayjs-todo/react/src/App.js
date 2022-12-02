import Header from "./components/Header";
import Calendar from "./components/Calendar";
import List from "./components/List";
import '../src/scss/style.scss';
import {Routes, Route} from 'react-router-dom';
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Chart from './components/Chart';
import HeaderLogin from "./components/HeaderLogin";
import { useSelector, useDispatch } from 'react-redux';


function App() {
  

  
  const [listDate, setListDate] = useState(0);
  const [checked, setChecked] = useState(null)
  const [loginState, setLoginState] =useState(null)

  const header = useSelector(
		(state) => state.headerReducer.header
	);

  useEffect(()=>{
    axios.post('/api/readAll').then((res) => {
			if (res) {
				setChecked(res.data.list);
			}
		}).catch(function (error) {
      // handle error
      console.dir(error);
    })
  },[])

  
  return (
    <>
      <h1 style={{textAlign:"center","fontSize":"20px",paddingTop:"20px"}}>치맥녀의 투두리스트</h1>
      
      <Routes>
          <Route path='*' element={ !header ? <Header/> : <HeaderLogin/>}></Route>
         
      </Routes>
      {/* <Calendar2/> */}
      <div id="wrap">
        <Calendar setListDate={setListDate} checked={checked}/>
        <Routes>
            <Route path='/' element={<List listDate={listDate} />}></Route>
            <Route path='/list/:date' element={<List listDate={listDate}/>} />            
        </Routes>
      </div>
      <Chart checked={checked} listDate={listDate}/>
    </>
  );
}

export default App;
