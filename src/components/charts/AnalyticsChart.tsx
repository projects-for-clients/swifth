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
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianAxis, CartesianGrid } from 'recharts';

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
    orders: Math.random() * 500,
    quotes: Math.random() * 300,
    customers: Math.random() * 200,
    deliveries: Math.random() * 400,
    payments: Math.random() * 500,
  },
  {
    name: 'Feb',
    orders: Math.random() * 500,
   quotes: Math.random() * 300,
    customers: Math.random() * 200,
    deliveries: Math.random() * 400,
    payments: Math.random() * 500,
  },
  {
    name: 'Mar',
    orders: Math.random() * 500,
   quotes: Math.random() * 300,
    customers: Math.random() * 200,
    deliveries: Math.random() * 400,
    payments: Math.random() * 500,
  },
  {
    name: 'April',
    orders: Math.random() * 500,
   quotes: Math.random() * 300,
    customers: Math.random() * 200,
    deliveries: Math.random() * 400,
    payments: Math.random() * 500,
  },
  {
    name: 'May',
    orders: Math.random() * 500,
   quotes: Math.random() * 300,
    customers: Math.random() * 200,
    deliveries: Math.random() * 400,
    payments: Math.random() * 500,
  },
  {
    name: 'Jun',
    orders: Math.random() * 500,
   quotes: Math.random() * 300,
    customers: Math.random() * 200,
    deliveries: Math.random() * 400,
    payments: Math.random() * 500,
  },
  {
    name: 'Jul',
    orders: Math.random() * 500,
   quotes: Math.random() * 300,
    customers: Math.random() * 200,
    deliveries: Math.random() * 400,
    payments: Math.random() * 500,
  },
  {
    name: 'Aug',
    orders: Math.random() * 500,
   quotes: Math.random() * 300,
    customers: Math.random() * 200,
    deliveries: Math.random() * 400,
    payments: Math.random() * 500,
  },
  {
    name: 'Sep',
    orders: Math.random() * 500,
   quotes: Math.random() * 300,
    customers: Math.random() * 200,
    deliveries: Math.random() * 400,
    payments: Math.random() * 500,
  },
  {
    name: 'Oct',
    orders: Math.random() * 500,
   quotes: Math.random() * 300,
    customers: Math.random() * 200,
    deliveries: Math.random() * 400,
    payments: Math.random() * 500,
  },
  {
    name: 'Nov',
    orders: Math.random() * 500,
   quotes: Math.random() * 300,
    customers: Math.random() * 200,
    deliveries: Math.random() * 400,
    payments: Math.random() * 500,
  },
  {
    name: 'December',
    orders: Math.random() * 500,
   quotes: Math.random() * 300,
    customers: Math.random() * 200,
    deliveries: Math.random() * 400,
    payments: Math.random() * 500,
  },
];

export default function AnalyticsChart() {
  return (
    <LineChart width={500} height={300} data={data} className=" -ml-14">
      <CartesianGrid vertical={false} stroke="#FDE9E9" />
      <Legend fontSize='3rem'/>
      <XAxis dataKey="name" />
      <YAxis tickCount={6}/>
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
