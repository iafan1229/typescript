import React, {memo, useState, useEffect, useRef, useContext} from 'react'
import { ResponsiveLine } from "@nivo/line";
import { dataContext } from '../App';
// Import Swiper React components
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface typeCheck{
  checked: Date[]
}

type Date = {
  date: string
}

function Chart({checked}:typeCheck) {
  const listDate = useContext(dataContext)

  const [graphData, setGraphData] = useState(Array(5).fill({
    "id": "line1",
    "color": "hsl(43, 70%, 50%)",
  }));

  const [xaxis, setXaxis] = useState([])
  const num = useRef(0)

  useEffect(()=>{
    if(listDate && num) {
      switch (listDate.substring(4,6)) {
        case '11':
          num.current = 1; 
          break;
        case '12':
          num.current = 2; 
          break;
        case '1':
          num.current = 3; 
          break;
        case '2':
          num.current = 4; 
          break;
        case '3':
          num.current = 5; 
          break;
        default: 
          num.current = 1;
      }
    }
  },[listDate, num])

  useEffect(()=>{

    if(checked) {
      setXaxis(checked.map((el)=>{
        let year = el.date.substring(0,4);
        let month = el.date.substring(4,6);
        let day = el.date.substring(6,10);
  
        return `${year}-${month}-${day}`
      }))
    }

  },[checked])


  interface Result {
    [x:string]: number
  }

  useEffect(()=>{
    let result:Result = {}
    xaxis?.sort().forEach((x:number) => { 
      result[x] = (result[x] || 0)+1; 
    });

    
    let keys = Object.keys(result)
    let values = Object.values(result)

    const answer = keys.map((el,idx)=>{
      return {
        "x" : el,
        "y" : values[idx]
      }
    })

    interface Slide{
      [x:string]:null
    }

    let slide:Slide = {'2022-11':null,'2022-12':null,'2023-01':null,'2023-02':null,'2023-03':null}
    
    let a = Object.keys(slide)?.map(el=>{
      return answer.filter(el2=>{
        return el2.x.substring(0,7)===el
      })
    })
    

    setGraphData(
      graphData.map((item,index)=>{
        return (
          {
            ...item,
            data: [...a[index]]
          }
        )
      })
    )
  },[xaxis])



  const line1Color = "#663399";
  return (
    <div className="chart">
      <div className="wrapper">
        <h3>투두리스트 차트</h3>
        {num.current>=1 && listDate && (
          <Swiper style={{height:"300px"}}
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            initialSlide={num.current}
          >
            {graphData && graphData.map((el,idx)=>{
              if(el?.data?.length)
              return (
                <SwiperSlide key={idx}> 
                  <h2 style={{fontSize:"16px"}}>{el.data[0].x.substring(0,7)}</h2>
                  <div className="graphContainer">
                  {graphData && (
                    <ResponsiveLine
                    data={[graphData[idx]]}
                    colors={[line1Color]}
                    axisLeft={{
                      legend: "포스팅 횟수",
                      legendPosition: "middle",
                      legendOffset: -40,
                      tickValues: [0,1,2,3,4,5]
                    }}
                    margin={{ top: 50, right: 100, bottom: 50, left: 100 }}
                    />
                  )}
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        )}

       
      </div>
    </div>
  )
}
export default memo(Chart)