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

export default Header