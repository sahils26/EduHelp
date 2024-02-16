import { Chart,registerables } from 'chart.js';
import React, { useState } from 'react'
import {Pie} from "react-chartjs-2"

export const InstructorChart = ({courses}) => {

    Chart.register(...registerables)

    const [currChart,setCurrChart]=useState("students");

    const getRandomColors = (numColors) => {
        const colors = [];
        for(let i=0; i<numColors; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random()*256)},
            ${Math.floor(Math.random()*256)})`
            colors.push(color);
        }
        return colors;
    }

    //create data for chart displaying student info
    const chartDataForStudents = {
        labels : courses.map((course)=>course.courseName),
        datasets : [
            {
                data: courses.map((course)=> course.totalStudentsEnrolled),
                backgroundColor : getRandomColors(courses.length),
            }
        ]
    }

    //create data for chart displaying income info
    const chartDataForIncome = {
        labels : courses.map((course)=>course.courseName),
        datasets : [
            {
                data: courses.map((course)=> course.totalAmountGenerated),
                backgroundColor : getRandomColors(courses.length),
            }
        ]
    }

    //create options
    const options = {
        
    };

  return (
    <div>
        <p>Visualisse</p>
        <div className='flex gap-x-5'>
            <button onClick={()=>setCurrChart("students")}>
                Student
            </button>

            <button onClick={()=>setCurrChart("income")}>
                Income
            </button>
        </div>
        <div>
            <Pie
                data = {currChart === "Students" ? chartDataForStudents : chartDataForIncome}
                options={options}
            />
        </div>
    </div>
  )
}
