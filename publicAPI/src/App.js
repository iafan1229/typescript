import React, {useEffect, useState} from 'react'
import { Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Content from "./components/Content";
import axios from 'axios'
import '../src/scss/style.scss'



function App() {
  const API_KEY = "hHFlg8hDKmDzntSCM5lXVvu0hDNxN2wfWpf6xW639epN%2BUsYij87f6v%2B81JfHAWPGhXHWgccWUMnK7yfcsQdcw%3D%3D";
  const url = `http://apis.data.go.kr/4640000/jeonjurestaurant/v1/getAllList?serviceKey=${API_KEY}&pageSize=30&currPage=1`;

  //전체보기데이터
  const [data, setData] = useState(null);
  //완산군,덕진군데이터
  const [data2,setData2] = useState(null);

  useEffect(()=>{
    axios.get(url).then((res)=>{
      setData(res.data.body.shopList)
    })
  },[])

  return (
    <>
      <Header data={data} setData={setData} setData2={setData2}></Header>
      <Content data={data} data2={data2}></Content>
    </>
  );
}

export default App;
