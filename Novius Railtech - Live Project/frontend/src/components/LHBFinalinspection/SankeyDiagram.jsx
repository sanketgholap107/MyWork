import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { sankey, sankeyLinkHorizontal, sankeyLeft } from "d3-sankey";

const SankeyDiagram = () => {
  const svgRef = useRef();

  useEffect(() => {
    const data = {
      nodes: [
        { name: "Data" },
        { name: "Inward" },
        { name: "Preinspection" },
        { name: "LHB-A Master" },
        { name: "ICF Master" },
        { name: "LHB-B Master" },
        { name: "LOCO Master" },
        { name: "LHB-C Master" },
        { name: "LHB-A Machining" },
        { name: "LHB-A Cleaning" },
        { name: "LHB-A Grinding" },
        { name: "LHB-A Final QA" },
        { name: "ICF Machining" },
        { name: "ICF Cleaning" },
        { name: "ICF Grinding" },
        { name: "ICF Final QA" },
        { name: "LHB-B Machining" },
        { name: "LHB-B Cleaning" },
        { name: "LHB-B Grinding" },
        { name: "LHB-B Final QA" },
        { name: "LOCO Machining" },
        { name: "LOCO Cleaning" },
        { name: "LOCO Grinding" },
        { name: "LOCO Final QA" },
        { name: "LHB-C Machining" },
        { name: "LHB-C Cleaning" },
        { name: "LHB-C Grinding" },
        { name: "LHB-C Final QA" },
        { name: "Dispatch" }
      ],
      links: [
        { source: 1, target: 2, value: 2000 },
        { source: 2, target: 3, value: 412 },
        { source: 2, target: 4, value: 396 },
        { source: 2, target: 5, value: 400 },
        { source: 2, target: 6, value: 406 },
        { source: 2, target: 7, value: 386 },
        { source: 3, target: 8, value: 412 },
        { source: 3, target: 9, value: 412 },
        { source: 3, target: 10, value: 412 },
        { source: 3, target: 11, value: 412 },
        { source: 4, target: 12, value: 396 },
        { source: 4, target: 13, value: 396 },
        { source: 4, target: 14, value: 396 },
        { source: 4, target: 15, value: 396 },
        { source: 5, target: 16, value: 400 },
        { source: 5, target: 17, value: 400 },
        { source: 5, target: 18, value: 400 },
        { source: 5, target: 19, value: 400 },
        { source: 6, target: 20, value: 406 },
        { source: 6, target: 21, value: 406 },
        { source: 6, target: 22, value: 406 },
        { source: 6, target: 23, value: 406 },
        { source: 7, target: 24, value: 386 },
        { source: 7, target: 25, value: 386 },
        { source: 7, target: 26, value: 386 },
        { source: 7, target: 27, value: 386 },
        { source: 8, target: 28, value: 2000 },
        { source: 9, target: 28, value: 2000 },
        { source: 10, target: 28, value: 2000 },
        { source: 11, target: 28, value: 2000 },
        { source: 12, target: 28, value: 2000 },
        { source: 13, target: 28, value: 2000 },
        { source: 14, target: 28, value: 2000 },
        { source: 15, target: 28, value: 2000 },
        { source: 16, target: 28, value: 2000 },
        { source: 17, target: 28, value: 2000 },
        { source: 18, target: 28, value: 2000 },
        { source: 19, target: 28, value: 2000 },
        { source: 20, target: 28, value: 2000 },
        { source: 21, target: 28, value: 2000 },
        { source: 22, target: 28, value: 2000 },
        { source: 23, target: 28, value: 2000 },
        { source: 24, target: 28, value: 2000 },
        { source: 25, target: 28, value: 2000 },
        { source: 26, target: 28, value: 2000 },
        { source: 27, target: 28, value: 2000 }
      ]
    };

    const width = 1000;
    const height = 600;

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const { nodes, links } = sankey()
      .nodeAlign(sankeyLeft)
      .nodeWidth(15)
      .nodePadding(10)
      .extent([[1, 1], [width - 1, height - 5]])(data);

    svg.append("g")
      .selectAll("rect")
      .data(nodes)
      .enter()
      .append("rect")
      .attr("x", d => d.x0)
      .attr("y", d => d.y0)
      .attr("height", d => d.y1 - d.y0)
      .attr("width", d => d.x1 - d.x0)
      .attr("fill", "steelblue");

      const tooltip = d3.select("#tooltip"); // Select the tooltip element

svg.append("g")
  .selectAll("path")
  .data(links)
  .enter()
  .append("path")
  .attr("d", sankeyLinkHorizontal())
  .attr("stroke-width", 10)  // Adjust the stroke width as needed
  .attr("fill", "none")
  .attr("stroke", "#000")
  .on("mouseover", (event, d) => {
    // Display the tooltip with the desired information
    tooltip.style("opacity", 1)
      .html(`Source: ${d.source.name}<br>Source Qty: ${d.source.value}<br>Target: ${d.target.name}<br>Link Value: ${d.value}`);
  })
  .on("mousemove", (event) => {
    // Position the tooltip based on the mouse position
    tooltip.style("left", (event.pageX + 10) + "px")
      .style("top", (event.pageY - 28) + "px");
  })
  .on("mouseout", () => {
    // Hide the tooltip when the mouse moves out
    tooltip.style("opacity", 0);
  });


    svg.append("g")
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .attr("x", d => d.x0 - 6)
      .attr("y", d => (d.y1 + d.y0) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "end")
      .attr("fill", "red")  // Set text color to red
      .text(d => d.name);
  }, []);

  return (
    <div>
    <svg ref={svgRef}></svg>
    <div
      id="tooltip"
      style={{
        position: "absolute",
        opacity: 0,
        backgroundColor: "white",
        padding: "5px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        pointerEvents: "none"
      }}
    ></div>
  </div>
  );
};

export default SankeyDiagram;
