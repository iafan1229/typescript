import React from 'react'


interface Type{
  img?: Img[],
  idx?: number,
  setShowMenu?: React.Dispatch<React.SetStateAction<boolean | null>>,
}

interface Img {
  path: string
}

function PopupDetail(props:Type) {
  const {img, idx, setShowMenu} = props;

  console.log(props)
  return (
    <div className='popDetail'>
      <img src={img[idx].path} alt="" onClick={()=>setShowMenu(false)}/>
    </div>
  )
}

export default PopupDetail