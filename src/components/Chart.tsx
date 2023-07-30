import React, { useState } from "react";
import * as d3 from "d3";
import { primeRange } from "@/utils/common";

const MultilineChart = () => {
  const svgRef = React.useRef(null);
  const [width, height, margin] = [
    250,
    250,
    { left: 250, right: 0, top: 250, bottom: 0 },
  ];
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;
  const data = [12, 5, 6, 6, 9, 10];
  const [rangeSlider, setRangeSlider] = useState(40);
  const [smoothSlider, setSmoothSlider] = useState(10);
  const [zoomSlider, setZoomSlider] = useState(1);

  React.useEffect(() => {
    // Create root container where we will append all other chart elements
    const svgEl = d3.select(svgRef.current);
    var spaceCircles = [0, 70, 110];
    // let zoom = d3.zoom().on("zoom", handleZoom);

    function handleZoom(e) {
      d3.select(svgRef.current).attr("transform", e.transform);
    }

    function initZoom() {
      d3.select(svgRef.current).call(zoom);
    }

    const svg = svgEl
      .append("g")
      .attr(
        "transform",
        `translate(${margin.left},${margin.top})scale(${0.001 * zoomSlider} )`
      );
    // Add X grid lines with labels
    var circles = svg
      .selectAll("circle")
      .data(primeRange(rangeSlider * 40))
      .enter()
      .append("circle");

    var circleAttributes = circles
      .attr("cx", function (t) {
        return t * Math.cos(t);
      })
      .attr("cy", function (t) {
        return t * Math.sin(t);
      })
      .attr("r", 5)
      .style("fill", "blue");
  }, [rangeSlider, zoomSlider]); // Redraw chart if data changes

  const handleRange = function (event) {
    setRangeSlider(event.target.value);
  };
  const handleZoom = function (event) {
    setZoomSlider(event.target.value);
  };
  const handleSmooth = function (event) {
    setSmoothSlider(event.target.value);
  };
  return (
    <div className="flex items-center w-full  justify-evenly">
      <div>
        <h3>Controls</h3>
      </div>
      <svg
        className="m-5 rounded-md bg-black justify-self-center shadow-lg"
        ref={svgRef}
        width={svgWidth}
        height={svgHeight}
      />
      <div className="justify-self-end">
        <input
          type="range"
          min={0}
          max="100"
          value={"0"}
          className="range range-primary"
        />
        <input
          type="range"
          min={0}
          max="100"
          value={rangeSlider}
          className="range range-primary"
          onChange={handleRange}
        />
        <input
          type="range"
          min={0}
          max="100"
          value={zoomSlider}
          className="range range-primary"
          onChange={handleZoom}
        />
      </div>
    </div>
  );
};

export default MultilineChart;
