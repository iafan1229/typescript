import React, {useContext} from 'react'
import {dataContext} from './Main';

interface Prop {
  setData2: React.Dispatch<React.SetStateAction<object[]|null>>;
}

interface Data {
  ukey: string;
  infoList: Info[];
  shopImageList: object[];
  menuImageList: object[];
}
interface Info {
  roadAddr: string
}

function Header({setData2}:Prop){
  const data = useContext(dataContext)

  const handleTotal = () =>{
    setData2(null)
  }

  const handleData = (data:Data[], name:string) :void => {
    console.log(data)
    const changed = data.filter(el=>{
      return el.infoList[0].roadAddr.includes(name)
    })
    setData2(changed)
  }

  return (
    <header>
      <h1>전라북도 맛집 리스트 TOP 30</h1>
      <div>
        <ul>  
          <li><button onClick={handleTotal}>모두보기</button></li>
          {["완산구","덕진구"].map(el=>{
            return <li><button onClick={()=>handleData(data, el)}>{el}</button></li>
          })}
        </ul>
        
      </div>
    </header>
  )
}

Header.defaultProps = {
  data: []
}

export default React.memo(Header)