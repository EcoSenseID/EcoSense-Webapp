import React, { Fragment } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto';
import { Text } from '@chakra-ui/react';

const data = {
    labels: ['10/5', '11/5', '12/5', '13/5', '14/5', '15/5', '16/5', '17/5', '18/5', '19/5', '20/5', '21/5'],
    datasets: [
        {
            label: 'Participant',
            fill: false,
            lineTension: 0.5,
            backgroundColor: '#db86b2',
            // borderColor: '#B57295',
            borderColor: '#72b57d',
            borderCapStyle: 'butt',
            borderDashOffset: 0.0,
            borderJoinStyle: '#B57295',
            pointBorderColor: '#B57295',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#B57295',
            pointHoverBorderColor: '#B57295',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [50, 30, 40, 50, 80, 65, 70, 69, 100, 120, 105, 130],
        },
    ],
}

const options = {
    maintainAspectRatio: true,
    scales: {
        x: {
            grid: {
                display: false,
            },
        },
        y: {
            grid: {
                borderDash: [3, 3],
            },
            beginAtZero: true, // this works
        },
    },
    plugins: {
        legend: {
            display: false
        }
    }
}

const ChartOne = () => (
    <Fragment>
        <Text color='gray' fontSize='sm' mt={4}>Participant of</Text>
        <Text fontWeight='bold' fontSize='2xl' mb={4}>Save the Earth Campaign</Text>
        <Line data={data} options={options} />
    </Fragment>
)


export default ChartOne;