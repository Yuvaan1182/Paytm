import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux';
import { setLoading } from '../features/ui/uiSlice';
import { useEffect } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const labels = [
  'Product A',
  'Product B',
  'Product C',
  'Product D',
  'Product E',
  'Product F',
  'Product G',
  'Product H',
  'Product I',
  'Product J',
  'Product K',
  'Product L',
  'Product M',
  'Product N',
  'Product O',
  'Product P',
  'Product Q',
  'Product R',
];

const barThickness = Math.max(10, 300 / labels.length); // Dynamically calculate bar width

const data = {
  labels: labels,
  datasets: [
    {
      label: '',
      data: [
        390, 190, 390, 400, 700, 500, 600, 450, 300, 200, 100, 500, 600, 700, 800, 900, 1000, 1100,
      ],
      base: 30,
      backgroundColor: '#C3073F',
      borderRadius: 4,
      barThickness: barThickness, // Use dynamically calculated bar width
    },
    {
      label: '',
      data: [
        -240, -490, -290, -350, -400, -300, -200, -150, -100, -50, -25, -75, -125, -175, -225, -275,
        -325, -375,
      ],
      base: -30,
      backgroundColor: '#3B1C32',
      borderRadius: 6,
      barThickness: barThickness, // Use dynamically calculated bar width
    },
  ],
};

const maxAbsValue = Math.max(...data.datasets.flatMap(dataset => dataset.data.map(Math.abs)));

const options = {
  responsive: true,
  maintainAspectRatio: false, // Allow the chart to stretch fully
  plugins: {
    legend: { display: false }, // Hide the legend
    tooltip: {
      callbacks: {},
    },
  },
  scales: {
    x: {
      stacked: true, // Stack bars horizontally
      grid: {
        drawBorder: false, // Hide the border line
        drawOnChartArea: true, // Keep grid lines
        drawTicks: true,
        borderWidth: 0,
        tickLength: 10, // Adjust tick length if needed
        lineWidth: ctx => (ctx.index % 5 === 0 ? 1 : 0), // Draw grid lines only for every 5th tick
        borderDash: [2, 2], // Make grid lines dotted
      },
      ticks: {
        callback: (value, index) => {
          if (index % 5 === 0) {
            return labels[index]; // Show label only for every 5th value
          }
          return ''; // Hide other labels
        },
      },
    },
    y: {
      beginAtZero: true,
      stacked: true, // Stack bars vertically
      min: -maxAbsValue, // Dynamically set minimum value for symmetry
      max: maxAbsValue, // Dynamically set maximum value for symmetry
      ticks: {
        callback: value => {
          const actualMax = Math.max(...data.datasets.flatMap(dataset => dataset.data));
          const actualMin = Math.min(...data.datasets.flatMap(dataset => dataset.data));

          if (value === 0) return '0'; // Show 0 in the middle
          if (value === maxAbsValue) return actualMax; // Show actual max value
          if (value === -maxAbsValue) return actualMin; // Show actual min value
          return ''; // Hide other ticks
        },
      },
      grid: {
        lineWidth: ctx => (ctx.tick.value === 0 ? 2 : 0), // Thicker line for zero
        drawBorder: false, // Hide the border line
        drawOnChartArea: true, // Keep other grid lines
        drawTicks: true,
        borderWidth: 0,
      },
    },
  },
};

export default function BarChart() {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.ui.isLoading);

  // Example: Dispatch loading state
  useEffect(() => {
    dispatch(setLoading(true));
    // Simulate data loading
    setTimeout(() => dispatch(setLoading(false)), 1000);
  }, [dispatch]);

  return (
    <div style={{ position: 'relative', height: '400px', width: '100%' }}>
      {isLoading ? <p>Loading...</p> : <Bar data={data} options={options} />}
    </div>
  );
}
