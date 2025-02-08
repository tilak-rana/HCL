import { Chart as ChartJS, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import React from 'react'

const ParticipantsTrialChart = () => {

  const data = {
    labels: ['Trial 1', 'Trial 2', 'Trial 3', 'Trial 4', 'Trial 5'],
    datasets: [
      {
        label: 'Participants',
        data: [12, 19, 3, 5, 2],
        backgroundColor: "rgba(54, 162, 235, 1)",
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Completed',
        data: [7, 11, 2, 3, 1],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ],
  };

  const options = {}
  return (
    <div>
      <Bar data={data} options={options}/>
    </div>
  )
}

export default ParticipantsTrialChart