import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const SimpleBarChart = ({ data }: any) => {
  const averageAmountProduct: any = [];
  data?.map((category: { value: any; productCategory: any; }) => (
    averageAmountProduct.push({
      name: category.productCategory.name,
      value: category.value,
    })
  ));

  return (
    <BarChart
      width={500}
      height={300}
      data={averageAmountProduct}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="pv" fill="#8884d8" />
      <Bar dataKey="uv" fill="#82ca9d" />
    </BarChart>
  );
}

export default SimpleBarChart;
