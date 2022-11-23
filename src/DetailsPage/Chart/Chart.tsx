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
  const { toCurrency } = props

  const data = {
    labels: ['JAN','FAB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV'],
    datasets: [
      {
        label: `${toCurrency} 2022`,
        data: [1.02, 1.03, 1.005, 0.98, 0.995, 1.025, 1.032, 1.04, 1.01, 1.007,1.05],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  
  return (
    <>
      <div className="chart-container container mx-auto">
        <div className="chart mx-auto">
          <Line options={options} data={data} />
        </div>
      </div>
    </>
  );
}
