import React, {useEffect, useState, createContext} from 'react'
import Header from "./Header";
import Content from "./Content";
import Footer from './Footer';
import axios from 'axios'

export const dataContext = createContext(null);

function Main() {
  const API_KEY = "hHFlg8hDKmDzntSCM5lXVvu0hDNxN2wfWpf6xW639epN%2BUsYij87f6v%2B81JfHAWPGhXHWgccWUMnK7yfcsQdcw%3D%3D";
  const url = `http://apis.data.go.kr/4640000/jeonjurestaurant/v1/getAllList?serviceKey=${API_KEY}&pageSize=30&currPage=1`;

  //초기 데이터(불변성 유지)
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
      <dataContext.Provider value={data}>
        <Header setData2={setData2}></Header>
        <Content data2={data2}></Content>
      </dataContext.Provider>
      
      <Footer></Footer>
    </>
  )
}

export default Main