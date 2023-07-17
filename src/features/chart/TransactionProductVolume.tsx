import React from "react";
import { Chart } from "react-google-charts";

// export const data = [
//   ["Task", "Hours per Day"],
//   ["کنسانتره سنگ آهن", 11],
//   ["شمش فولادی", 2],
//   ["گندله سنگ آهن", 2],
// ];

export const options = {
  // title: "My Daily Activities",
  is3D: true,
};

const TransactionProductVolume = ({data}) =>  {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}
export default TransactionProductVolume;
