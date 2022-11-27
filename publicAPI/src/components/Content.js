import React, {useEffect, useState, useRef} from 'react'
import Pagination from './Pagination';


function Content({data, data2}) {
  const red = useRef(null)

  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const offset = (page-1)*limit;

  useEffect(()=>{
    if(data2 || data) {
      setPosts(data2 || data)
    }
  },[data, data2])

  // const handleAddress = (el) => {
  //   if(data2) {
  //     const regex = "완산"
  //     return el.infoList[0].roadAddr;
  //   }else{
  //     return el.infoList[0].roadAddr
  //   }
  // }
  

  return (
    <>
      <div id="wrap">
        <div className='selectWrap'>
          <select name="" id="" value={limit} onChange={(e)=>setLimit(Number(e.target.value))}>
            {[10,20,30].map((el)=>{
              return <option value={el}>{(el===30) ? "모두 보기" : el+"개씩 보기"}</option>
            })}
          </select>
        </div>

        <ul className="list">
          {posts.slice(offset, offset+limit).map((el,idx)=>{
            return (
              <li>
                <span className="img-wrap"><img src={el.shopImageList[0].path} alt="" /></span>
                <h2>상호명: {el.infoList[0].name}</h2>
                <h3 ref={red}>주소: {el.infoList[0].roadAddr}</h3>
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
        <div>
          <Pagination
            total={posts.length}
            limit={limit}
            page={page}
            setPage={setPage}>
          </Pagination>
        </div>
      </div>
    </>
  )
}

Content.defaultProps = {
  data: []
}


export default Content