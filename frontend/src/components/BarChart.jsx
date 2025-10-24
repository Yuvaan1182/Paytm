import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../features/ui/uiSlice';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function BarChart(props) {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.ui.isLoading);
  const { summary, loading, error } = useSelector(state => state.analytics);
  const isDark = useSelector(state => state.theme.mode) === 'dark';

  const { last7Days } = props;

  const labels = last7Days
    ? summary?.weeklyIncomeExpense.map(item => {
        const date = new Date(item.date);
        return date.toLocaleDateString('en-US');
      })
    : summary?.monthlyIncomeExpense.map(item => {
        const date = new Date(item.month);
        return date.toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        });
      });

  const income = last7Days
    ? summary?.weeklyIncomeExpense.map(item => {
        return item.income;
      })
    : summary?.monthlyIncomeExpense.map(item => {
        return item.income;
      });

  const expense = last7Days
    ? summary?.weeklyIncomeExpense.map(item => {
        return -item.expense;
      })
    : summary?.monthlyIncomeExpense.map(item => {
        return -item.expense;
      });

  const barThickness = Math.max(10, 300 / labels.length); // Dynamically calculate bar width

  const data = {
    labels: labels,
    datasets: [
      {
        label: '',
        data: income,
        base: 30,
        backgroundColor: '#C3073F',
        borderRadius: 4,
        barThickness: barThickness, // Use dynamically calculated bar width
      },
      {
        label: '',
        data: expense,
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
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {},
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          drawBorder: false,
          drawOnChartArea: true,
          drawTicks: true,
          borderWidth: 0,
          tickLength: 10,
          borderDash: [2, 2],
          color: isDark ? '#fff' : '#e5e7eb', // <-- grid line color based on theme
        },
        ticks: {
          //   callback: (value, index) => {
          //     if (index % 5 === 0) {
          //       return labels[index]; // Show label only for every 5th value
          //     }
          //     return ''; // Hide other labels
          //   },
        },
      },
      y: {
        beginAtZero: true,
        stacked: true,
        min: -maxAbsValue,
        max: maxAbsValue,
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
          lineWidth: ctx => (ctx.tick.value === 0 || ctx.tick.value === -maxAbsValue ? 2 : 0),
          drawBorder: false,
          drawOnChartArea: true,
          drawTicks: true,
          borderWidth: 0,
          color: isDark ? '#fff' : '#e5e7eb', // <-- grid line color based on theme
        },
      },
    },
  };

  useEffect(() => {
    dispatch(setLoading(true));
    setTimeout(() => dispatch(setLoading(false)), 1000);
  }, [dispatch]);

  return (
    <div style={{ position: 'relative', height: '400px', width: '100%' }}>
      {isLoading ? <p>Loading...</p> : <Bar data={data} options={options} />}
    </div>
  );
}

BarChart.propTypes = {
  last7Days: PropTypes.bool.isRequired,
};
