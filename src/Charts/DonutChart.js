import React,{useEffect} from 'react';
import * as d3 from 'd3';


function DonutChart(props) {
   
    const chartRef= React.createRef();
    const {data} = props;
     setTimeout(() => {
        createDonutChart()
      }, 100);
    
    function createDonutChart(){ 
        const width = 800;
        const height = 400;
        const margin = { top: 10, right: 30, bottom: 30, left: 40 };
        const radius = Math.min(width,height) / 2 - margin.left;
        const colorsRange = [
                                '#ffcd56',
                                '#ff6384',
                                '#f6a2eb',
                                '#fd6b19',
                                'green',
                                'yellow',
                                'blue'
                            ];
        const colors = d3
            .scaleOrdinal()
            .domain(data.map(d => d.value.toString()))
            .range(colorsRange);
    
        const svg = d3
            .select(chartRef.current)
            .append("svg")
            .attr("viewBox", `0 0 ${width} ${height}`)
            .append("g")
            .attr("transform", `translate(${width / 2},${height / 2})`);
    
        var pie = d3.pie()
            .sort(null)
            .value(d => d.value);
    
        var arc = d3.arc()
            .outerRadius(radius * 0.8)
            .innerRadius(radius * 0.4);
    
        var outerArc = d3.arc()
            .innerRadius(radius * 0.9)
            .outerRadius(radius * 0.9);
    
    
        /* ------- PIE SLICES -------*/
        svg.selectAll("allSlices")
            //.selectAll("path.slice")
            .data(pie(data))
            .enter()
            .append("path")
            .attr("d",arc)
            .attr("fill", d => colors(d.data.value))
            .attr("class", "slice")
            .attr("stroke", "white")
            .style("stroke-width", "2px")
            .style("opacity", 0.7);
    
    
    
        /* ------- TEXT LABELS -------*/
        svg.selectAll("allLabels")
            .select(".labels")
            .data(pie(data))
            .enter()
            .append("text")
            .style("fill","#444")
            .text(function(d) {
                return d.data.name
            })
            .attr("transform", d => {
                var pos = outerArc.centroid(d);
                var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
                return "translate(" + pos + ")";
            }).style("text-anchor", d =>{
                var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                return midangle < Math.PI ? "start":"end";
            });
    
    
    
        /* ------- SLICE TO TEXT POLYLINES -------*/
    
        svg.selectAll("allPolylines")
            .data(pie(data))
            .enter()
            .append("polyline")
            .style("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", 1)
            .attr("points", d => {
                var posA = arc.centroid(d); // line insertion in the slice
                var posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
                var posC = outerArc.centroid(d); // Label position = almost the same as posB
                var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
                posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
                return [posA, posB, posC];
            });  
    };
      
    
    return (
        <>
        <div ref={chartRef}></div>  
        </>
    );
}
  
  
export default DonutChart;