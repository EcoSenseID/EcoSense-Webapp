import React, { Fragment } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto';
import { Text } from '@chakra-ui/react';

const getListOf7Dates = () => {
    let result = [];
    const tenDaysAgo = new Date(new Date().getTime() - 11*24*60*60*1000);
    const sD = tenDaysAgo.getDate();
    const sM = tenDaysAgo.getMonth() + 1;
    result.push(`${sD}/${sM}`);

    for (let i = 0; i<11; i++) {
        let today = new Date(tenDaysAgo.getTime() + (i+1)*24*60*60*1000);
        let tD = today.getDate();
        let tM = today.getMonth() + 1;
        result.push(`${tD}/${tM}`);
    }
    return result;
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

const ChartOne = ({chartData}) => {
    const listOfSevenDates = getListOf7Dates();
    const dataData = listOfSevenDates.map((date) => {
        const filteredData = chartData.filter(chartDatum => chartDatum.date === date);
        
        if (filteredData.length > 0) {
            return filteredData[0].registrationCount
        } else {
            return 0
        }
    });

    const data = {
        labels: listOfSevenDates,
        datasets: [
            {
                label: 'Participant',
                fill: false,
                lineTension: 0.5,
                backgroundColor: '#72b57d',
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
                // data: [50, 30, 40, 50, 80, 65, 70, 69, 100, 120, 105, 130],
                // data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                data: dataData
            },
        ],
    }

    return (
        <Fragment>
            <Line data={data} options={options} />
        </Fragment>
    )
}


export default ChartOne;