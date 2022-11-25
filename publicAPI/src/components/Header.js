import React from 'react'

function Header({setData, data, setWord, setData2}) {

  const handleTotal = (e) => {
    setData2(null)
  }

  const handleData = (data, name) => {
    
    const changed = data.filter(el=>{
      console.log(name)
      return el.infoList[0].roadAddr.includes(name)
    })
    setData2(changed)
  }

  return (
    <header>
      <h1>전주 맛집 리스트 TOP 30</h1>
      <div>
        <ul>  
          <li><button onClick={handleTotal}>모두보기</button></li>
          {["완산","덕진"].map(el=>{
            return <li><button onClick={()=>handleData(data, el)}>{el}</button></li>
          })}
          {/* <li><button>모두보기</button></li>
          <li><button onClick={()=>handleData(data)}>완산구</button></li>
          <li><button>덕진구</button></li> */}
        </ul>
        <select name="" id="">
          <option value="">10개씩 보기</option>
          <option value="">20개씩 보기</option>
          <option value="">모두 보기</option>
        </select>
      </div>
    </header>
  )
}

Header.defaultProps = {
  data: []
}

export default Header