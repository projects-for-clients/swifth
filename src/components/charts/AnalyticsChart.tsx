// import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

// const data = [
//   {
//     name: 'Mon',
//     pv: 25_000,
//   },
//   {
//     name: 'Tue',
//     pv: 30_000,
//   },
//   {
//     name: 'Wed',
//     pv: 18_000,
//   },
//   {
//     name: 'Thur',
//     pv: 15_000,
//   },
//   {
//     name: 'Fri',
//     pv: 22_000,
//   },
//   {
//     name: 'Sat',
//     pv: 21_000,
//   },
//   {
//     name: 'Sun',
//     pv: 22_000,
//   },
// ];

// export default function WalletBarChart() {
//   return (
//     <BarChart
//       width={600}
//       height={300}
//       data={data}
//       margin={{
//         top: 5,
//         right: 30,
//         left: 20,
//         bottom: 5,
//       }}
//     >
//       <XAxis dataKey="name" tickMargin={20} />
//       <YAxis
//         tickCount={7}
//         tickFormatter={(tick) => {
//           return '₦' + tick;
//         }}
//       />
//       <Tooltip />

//       <Bar dataKey="pv" fill="#08D231" barSize={40} />
//     </BarChart>
//   );
// }

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianAxis,
  CartesianGrid,
} from 'recharts';

export const dataLabels = [
  {
    key: 'orders',
    color: '#F819C7',
  },
  {
    key: 'quotes',
    color: '#174AFF',
  },
  {
    key: 'customers',
    color: '#F8B543',
  },
  {
    key: 'deliveries',
    color: '#570000',
  },
  {
    key: 'payments',
    color: '#03CABE',
  },
];

const data = [
  {
    name: 'Jan',
    orders: Math.floor(Math.random() * 500),
    quotes: Math.floor(Math.random() * 300),
    customers: Math.floor(Math.random() * 200),
    deliveries: Math.floor(Math.random() * 400),
    payments: Math.floor(Math.random() * 500),
  },
  {
    name: 'Feb',
    orders: Math.floor(Math.random() * 500),
    quotes: Math.floor(Math.random() * 300),
    customers: Math.floor(Math.random() * 200),
    deliveries: Math.floor(Math.random() * 400),
    payments: Math.floor(Math.random() * 500),
  },
  {
    name: 'Mar',
    orders: Math.floor(Math.random() * 500),
    quotes: Math.floor(Math.random() * 300),
    customers: Math.floor(Math.random() * 200),
    deliveries: Math.floor(Math.random() * 400),
    payments: Math.floor(Math.random() * 500),
  },
  {
    name: 'April',
    orders: Math.floor(Math.random() * 500),
    quotes: Math.floor(Math.random() * 300),
    customers: Math.floor(Math.random() * 200),
    deliveries: Math.floor(Math.random() * 400),
    payments: Math.floor(Math.random() * 500),
  },
  {
    name: 'May',
    orders: Math.floor(Math.random() * 500),
    quotes: Math.floor(Math.random() * 300),
    customers: Math.floor(Math.random() * 200),
    deliveries: Math.floor(Math.random() * 400),
    payments: Math.floor(Math.random() * 500),
  },
  {
    name: 'Jun',
    orders: Math.floor(Math.random() * 500),
    quotes: Math.floor(Math.random() * 300),
    customers: Math.floor(Math.random() * 200),
    deliveries: Math.floor(Math.random() * 400),
    payments: Math.floor(Math.random() * 500),
  },
  {
    name: 'Jul',
    orders: Math.floor(Math.random() * 500),
    quotes: Math.floor(Math.random() * 300),
    customers: Math.floor(Math.random() * 200),
    deliveries: Math.floor(Math.random() * 400),
    payments: Math.floor(Math.random() * 500),
  },
  {
    name: 'Aug',
    orders: Math.floor(Math.random() * 500),
    quotes: Math.floor(Math.random() * 300),
    customers: Math.floor(Math.random() * 200),
    deliveries: Math.floor(Math.random() * 400),
    payments: Math.floor(Math.random() * 500),
  },
  {
    name: 'Sep',
    orders: Math.floor(Math.random() * 500),
    quotes: Math.floor(Math.random() * 300),
    customers: Math.floor(Math.random() * 200),
    deliveries: Math.floor(Math.random() * 400),
    payments: Math.floor(Math.random() * 500),
  },
  {
    name: 'Oct',
    orders: Math.floor(Math.random() * 500),
    quotes: Math.floor(Math.random() * 300),
    customers: Math.floor(Math.random() * 200),
    deliveries: Math.floor(Math.random() * 400),
    payments: Math.floor(Math.random() * 500),
  },
  {
    name: 'Nov',
    orders: Math.floor(Math.random() * 500),
    quotes: Math.floor(Math.random() * 300),
    customers: Math.floor(Math.random() * 200),
    deliveries: Math.floor(Math.random() * 400),
    payments: Math.floor(Math.random() * 500),
  },
  {
    name: 'Dec',
    orders: Math.floor(Math.random() * 500),
    quotes: Math.floor(Math.random() * 300),
    customers: Math.floor(Math.random() * 200),
    deliveries: Math.floor(Math.random() * 400),
    payments: Math.floor(Math.random() * 500),
  },
];

interface AnalyticsChart {
  width?: number;
  height?: number;
}

export default function AnalyticsChart({
  width = 500,
  height = 300,
}: AnalyticsChart) {
  return (
    <LineChart width={width} height={height} data={data} className="">
      <CartesianGrid vertical={false} stroke="#FDE9E9" />
      <Legend />
      <XAxis dataKey="name" />
      <YAxis tickCount={8} />
      <Tooltip />

      {dataLabels.map((label, i) => {
        return (
          <Line
            dot={false}
            type="monotone"
            key={i}
            dataKey={label.key}
            stroke={label.color}
            strokeWidth={1.5}
          />
        );
      })}
    </LineChart>
  );
}
