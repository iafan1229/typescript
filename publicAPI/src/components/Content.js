import React, {useEffect, useState} from 'react'
import axios from 'axios'


function Content() {
  const API_KEY = "hHFlg8hDKmDzntSCM5lXVvu0hDNxN2wfWpf6xW639epN%2BUsYij87f6v%2B81JfHAWPGhXHWgccWUMnK7yfcsQdcw%3D%3D";
  const url = `http://apis.data.go.kr/4640000/jeonjurestaurant/v1/getAllList?serviceKey=${API_KEY}&pageSize=30&currPage=1`;

  const [data, setData] = useState(null);

  useEffect(()=>{
    axios.get(url).then((res)=>{
      setData(res.data.body.shopList)
      console.log(res.data.body.shopList)
    })
  },[])

  return (
    <>
      <div id="wrap">
        <ul className="list">
          {data && data.map((el,idx)=>{
            return (
              <li>
                <span className="img-wrap"><img src={el.shopImageList[0].path} alt="" /></span>
                <h2>{el.infoList[0].name}</h2>
                <h3>{el.infoList[0].roadAddr}</h3>
                <h4>메뉴판</h4>
                <ul className='menu'>
                  
                  {el.menuImageList.map((el2,idx)=>{
                    return (idx===0) && <li><span><img src={el2.path} alt="메뉴판"></img></span></li>
                  })}
                </ul>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default Content