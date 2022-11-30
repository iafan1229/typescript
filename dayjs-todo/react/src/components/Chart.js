import React, {useState, useEffect} from 'react'
import { ResponsiveLine } from "@nivo/line";
import { data, data2 } from './data.js';


function Chart({checked}) {
  const [graphData, setGraphData] = useState([{
    "id": "line1",
    "color": "hsl(43, 70%, 50%)",
  }]);

  const [xaxis, setXaxis] = useState([])
  const [yaxis, setYaxis] = useState([])

  useEffect(()=>{

    if(checked) {
      setXaxis(checked.map((el)=>{
        console.log(el.date)
        let year = el.date.substring(0,4)
        let month = el.date.substring(4,6)
        let day = el.date.substring(6,10)
  
        return `${year}-${month}-${day}`
      }))
    }

  },[checked])


  useEffect(()=>{
    let result = {}
    xaxis?.sort().forEach((x) => { 
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
    console.log(answer)

    setGraphData(
      graphData.map((item,idx)=>{
        return (
          {
            ...item,
            data: [...answer]
          }
        )
      })
    )
  },[xaxis])

  useEffect(()=>{
    
  },[])


  const line1Color = "#663399";
  return (
    <div className="chart">
      <div className="wrapper">
        <h3>투두리스트 차트</h3>
          <div className="graphContainer">
            {graphData && (
              <ResponsiveLine
                data={graphData}
                colors={[line1Color]}
                axisLeft={{
                  legend: "포스팅 횟수",
                  legendPosition: "middle",
                  legendOffset: -40,
                  tickValues: [0,1,2,3,4,5]
                }}
                margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
              />
            )}
        </div>
      </div>
    </div>
  )
}
const getColoredAxis = color => {
  return {
    axis: {
      ticks: {
        line: {
          stroke: color
        },
        text: { fill: color }
      },
      legend: {
        text: {
          fill: color
        }
      }
    }
  };
};

export default Chart