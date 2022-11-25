import React, {useEffect, useState, useRef} from 'react'


function Content({data, data2}) {
  const red = useRef(null)

  const handleAddress = (el) => {
    if(data2) {
      const regex = "완산"
      return el.infoList[0].roadAddr;
    }else{
      return el.infoList[0].roadAddr
    }
  }
  

  return (
    <>
      <div id="wrap">
        <ul className="list">
          {(data2 || data)?.map((el,idx)=>{
            return (
              <li>
                <span className="img-wrap"><img src={el.shopImageList[0].path} alt="" /></span>
                <h2>상호명: {el.infoList[0].name}</h2>
                <h3 ref={red}>주소: {handleAddress(el)}</h3>
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

Content.defaultProps = {
  data: []
}


export default Content