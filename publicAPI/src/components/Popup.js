import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';
import PopupDetail from './PopupDetail';

function Popup({setPopup}) {
  const [showMenu, setShowMenu] = useState(false)
  const [idx, setIdx] = useState(0);
  const navi = useNavigate();
  const loca = useLocation()
  return (
   <>
    <div className='popup'>
      <div className='content'>
        <div className="detail">
          <span><img src={loca.state.title.shopImageList[0].path} alt="" /></span>
          <p>상호명: {loca.state.title.infoList[0].name}</p>
          <p>주소: {loca.state.title.infoList[0].roadAddr}</p>
          <p style={{paddingTop:'20px'}}>메뉴판 자세히보기</p>
          <ul>
            {loca.state.title.menuImageList.map((el,idx)=>{
              return <li onClick={()=>{
                setShowMenu(true)
                setIdx(idx)
              }}><img src={el.path} alt="메뉴판"></img></li>
            })}
          </ul>
        </div>
        <button style={{color:'#000',display:"block"}} onClick={()=> navi(-1)}>뒤로가기</button>
      </div>
      
    </div>
    {showMenu ? <PopupDetail img={loca.state.title.menuImageList} setIdx={idx} setShowMenu={setShowMenu}/> : null}
   </>
  )
}

export default Popup