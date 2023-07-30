import {
  drawParametric,
  drawPixel,
  drawPoints,
  drawPolar,
  primeRange,
  range,
} from "@/utils/common";
import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { create, all } from "mathjs";

const HEIGHT = 500;
const WIDTH = 500;

const Canvas = (props) => {
  const canvasRef = useRef<HTMLCanvasElement>();
  const totalNum = useRef("");
  const canvas = canvasRef.current;

  const context = canvas?.getContext("2d");
  const config = {};
  const math = create(all, config);

  const [rangeSlider, setRangeSlider] = useState(40);
  const [scale, setScale] = useState(1);
  const [equation, setEquation] = useState("");
  const [rangeFactor, setRangeFactor] = useState(40);

  function handleSubmit() {
    console.log(math.evaluate(equation, { n: 10 }));
    setRangeFactor(parseInt(totalNum.current.value));
  }

  useEffect(() => {
    if (canvas == null) return;

    if (context == null) return;
    //Our first draw
    context.fillStyle = "#FFFFFF";

    canvas.height = HEIGHT;
    canvas.width = WIDTH;
    canvas.style.backgroundColor = "#000";
    // drawPolar(
    //   context,
    //   function (t) {
    //     return t;
    //   },
    //   function (t) {
    //     return zoomSlider * 100 * Math.sin(t / 1.2);
    //   },
    //   range(0, rangeSlider * 10, smoothSlider * 50),
    //   250
    // );

    // drawPolar(
    //   context,
    //   function (t) {
    //     return t;
    //   },
    //   function (t) {
    //     return 0.1 * zoomSlider * t;
    //   },
    //   range(0, 100 * rangeSlider, 800),
    //   250
    // );

    const width = 500,
      height = 500;
    const translate = width / 2 - (width / 2) * scale;
    context.save();
    context.translate(translate, translate);
    context.scale(scale, scale);

    if (equation)
      drawPolar(
        context,
        function (t) {
          return t;
        },
        function (t) {
          return math.evaluate(equation, { n: t });
        },
        range(0, rangeFactor * rangeSlider, rangeFactor * rangeSlider),
        250
      );
    else
      drawPoints(
        context,
        function (t) {
          return t * Math.cos(t) + 250;
        },
        function (t) {
          return t * Math.sin(t) + 250;
        },
        primeRange(100)
      );

    let scaleFactor = 0.2;

    // Handle mousenwheel zoom
    context.canvas.onwheel = function (e) {
      e.preventDefault();
      let previousScale = scale;

      // calculate scale direction 6 new scale value
      let direction =
        e.deltaY > 0
          ? previousScale * scaleFactor
          : previousScale / scaleFactor;
      setScale(direction);
    };
  }, [rangeSlider, scale, rangeFactor]);

  const handleRange = function (event) {
    setRangeSlider(event.target.value);
  };

  return (
    <div className="flex items-center w-full justify-between">
      <div className="w-[20%] bg-white rounded-md text-gray-600 p-5">
        <h3 className="text-[1.5rem] font-bold mb-5">How to play</h3>
        <li>Explore various Math Patterns by plotting them on the graph</li>
        <li>Experiment by increasing range</li>
        <li>Create your own custom patterns</li>
        <li>Use you Equations</li>
      </div>
      <div
        className="tooltip"
        data-tip={equation ? "Custom Pattern" : "A pattern of Prime Numbers"}
      >
        <canvas
          className="m-5 rounded-md justify-self-center shadow-lg shadow-black"
          ref={canvasRef}
          {...props}
        />
      </div>

      <div className="justify-self-end w-[20%] flex flex-col justify-center bg-white rounded-md text-gray-600 p-5 ">
        <h3 className="text-[1.5rem] font-bold mb-5">Customize ⚙️</h3>
        <span>
          Equation:{" "}
          <input
            type="text"
            className="bg-transparent my-2 border-black border-2 px-2"
            placeholder="E.g: n*(n+1)/2"
            onChange={(e) => {
              setEquation(e.target.value);
            }}
          ></input>
        </span>

        <span>
          Number of points:
          <input
            type="text"
            className="bg-transparent my-2 border-black border-2 px-2"
            placeholder="Total=slider*(Num of points)"
            ref={totalNum}
          ></input>
        </span>

        <input
          type="range"
          min="1"
          max="100"
          value={rangeSlider}
          className="range range-primary"
          onChange={handleRange}
        />
        <button
          onClick={handleSubmit}
          className="bg-primary w-min p-2 rounded-md text-white self-center m-2"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Canvas;
