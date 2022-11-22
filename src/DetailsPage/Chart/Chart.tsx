import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// S T Y L I N G
import './Chart.css'

// T Y P E S
type ChartProps = {
  historicalData: number[]
  monthsCalender: {}
  toCurrency: string
}

type Data = {
  labels: string[]
  datasets: {
    label: string
    data: number[]
  }
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

export function Chart( props:ChartProps ) {
  const { historicalData, monthsCalender, toCurrency } = props

  const data = {
    labels: Object.keys(monthsCalender),
    datasets: [
      {
        label: `${toCurrency} 2022`,
        data: historicalData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  
  return (
    <>
     <Line options={options} data={data} />
    </>
  );
}
