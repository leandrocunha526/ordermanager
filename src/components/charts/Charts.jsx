import React from "react";
import "react-vis/dist/style.css"
import { XYPlot, LineSeries, XAxis, VerticalGridLines, HorizontalGridLines, YAxis } from "react-vis";


const Chart = () => {
    const data = [
        //Test data
        { x: 0, y: 8 },
        { x: 1, y: 5 },
        { x: 2, y: 4 },
        { x: 3, y: 9 },
        { x: 4, y: 1 },
        { x: 5, y: 7 },
        { x: 6, y: 6 },
        { x: 7, y: 3 },
        { x: 8, y: 2 },
        { x: 9, y: 0 },
    ];

return (
    <div style={{marginTop: "15px"}}>
        <XYPlot height={300} width={300}>
            <VerticalGridLines></VerticalGridLines>
            <HorizontalGridLines></HorizontalGridLines>
            <XAxis></XAxis>
            <YAxis></YAxis>
            <LineSeries data={data} color="red"></LineSeries>
            <LineSeries data={data} color="purple"></LineSeries>
            <LineSeries data={data} color="yellow"></LineSeries>
        </XYPlot>
    </div>
)

}

export default Chart;
