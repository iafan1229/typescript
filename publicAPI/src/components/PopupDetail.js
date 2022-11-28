import React from 'react'

function PopupDetail(props) {
  // console.log(props)
  const {img, setIdx, setShowMenu} = props;

  console.log(img, setIdx)
  return (
    <div className='popDetail'>
      <img src={img[setIdx].path} alt="" onClick={()=>setShowMenu(false)}/>
    </div>
  )
}

export default PopupDetail