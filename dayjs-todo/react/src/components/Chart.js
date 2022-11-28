import React from 'react'
import { ResponsiveLine } from "@nivo/line";
import { data, data2 } from './data.js';


function Chart() {
  const line1Color = "#663399";
  return (
    <div className="chart">
      <div className="wrapper">
        <h3>투두리스트 차트</h3>
          <div className="graphContainer">
            <ResponsiveLine
                data={data}
                colors={[line1Color]}
                layers={["grid", "axes", "lines", "markers", "legends"]}
                axisLeft={{
                  legend: "Points Scored",
                  legendPosition: "middle",
                  legendOffset: -40
                }}
                theme={getColoredAxis("black")}
                margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
            />
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