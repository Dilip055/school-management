import React, { useEffect, useMemo } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

import { Doughnut } from 'react-chartjs-2';
import useUserApi from "../../hooks/useUserApi";

ChartJS.register(ArcElement, Tooltip, Legend);

const ProjectGraph = () => {
  const {users} = useUserApi()
  const { students, teacher, parent } = useMemo(() => {
    const students = users?.filter(user => user.role === "student") || [];
    const teacher = users?.filter(user => user.role === "teacher") || [];
    const parent = users?.filter(user => user.role === "parent") || [];
  
    return { students, teacher, parent };
  }, [users]);
  
  const data = {
    labels: ['Student', 'Teacher', 'Parents'],
    datasets: [
      {
        label: 'Attendance Distribution',
        data: [students.length, teacher.length, parent.length], 
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)', 
          'rgba(255, 99, 132, 0.6)', 
          'rgba(255, 205, 86, 0.6)'  
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 205, 86, 1)'
        ],
        borderWidth: 1,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      }
    }
  };

  return (
    <div className="max-w-xs mx-auto mt-6">
      <h2 className="text-lg font-semibold text-center mb-4">Totals Users Summary</h2>
      <Doughnut data={data} options={options} />

    </div>
  );
};

export default ProjectGraph;


