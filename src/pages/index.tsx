import Image from "next/image";
import { Inter } from "next/font/google";
import Canvas from "@/components/Canvas";
import { useEffect } from "react";
import * as d3 from "d3";
import MultilineChart from "@/components/Chart";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  function drawChart() {
    const data = [12, 5, 6, 6, 9, 10];

    const svg = d3
      .select("#graph")
      .append("svg")
      .attr("width", 700)
      .attr("height", 300);

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 70)
      .attr("y", (d, i) => 300 - 10 * d)
      .attr("width", 65)
      .attr("height", (d, i) => d * 10)
      .attr("fill", "green");
  }

  useEffect(() => {
    drawChart();
  }, []);

  return (
    <main className="flex flex-col min-h-screen items-baseline  justify-center p-10 pt-5 bg-[url('/grid.svg')]">
      <h1 className="text-[3rem] font-bold text-gray-200">Math Play</h1>
      <Canvas></Canvas>
    </main>
  );
}
