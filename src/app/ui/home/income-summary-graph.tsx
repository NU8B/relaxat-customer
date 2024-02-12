"use client";
import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Year", "Sales"],
  ["2004", 10000],
  ["2005", 2000],
  ["2006", 5000],
  ["2007", 24000],
];
export const options = {
  vAxis: {
    minValue: 0,
    format: "฿#,##0",
    viewWindow: {
      min: 0,
    },
  },
  chartArea: { width: "80%", height: "70%" },
  colors: ["#9B6AD3"],
};

export default function IncomeSummaryGraph() {
  return (
    <Chart
      chartType="AreaChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
