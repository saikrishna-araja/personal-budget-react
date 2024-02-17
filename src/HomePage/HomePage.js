import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {Chart} from 'chart.js/auto';
import {Pie} from 'react-chartjs-2';
import DonutChart from '../Charts/DonutChart';

function HomePage() {

    const dataSource = {
        datasets: [
            {
                data: [],
                backgroundColor: [
                    '#ffcd56',
                    '#ff6384',
                    '#36a2eb',
                    '#fd6b19',
                    'green',
                    'yellow',
                    'peach'
                ]
            }
        ],
        labels: []
    };

    const [chartData,setState]= useState([]);
   
    axios.get('http://localhost:3000/budget')
        .then(function (res) {
            for (var i = 0; i < res.data.myBudget.length; i++) {
                dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
                dataSource.labels[i] = res.data.myBudget[i].title;

                var budgetItem = {
                    value: res.data.myBudget[i].budget,
                    name: res.data.myBudget[i].title
                };
                chartData.push(budgetItem)
                // Add the created object to the array
               setState(chartData);
            }
        });

  

    return (
        <main id="main"  className="center"> 

        <div className="page-area">
            
            <article> 
                <section> 
                    <h1>Stay on track</h1>
                    <p>
                        Do you know where you are spending your money? If you really stop to track it down,
                        you would get surprised! Proper budget management depends on real data... and this
                        app will help you with that!
                    </p>
                </section>
            </article>
            
    
            <article>
                <section>
                    <h1>Alerts</h1>
                    <p>
                        What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                    </p>
                </section>
            </article>
    
            <article>
                <section>
                    <h1>Results</h1>
                    <p>
                        People who stick to a financial plan, budgeting every expense, get out of debt faster!
                        Also, they to live happier lives... since they expend without guilt or fear... 
                        because they know it is all good and accounted for.
                    </p>
                </section>
            </article>
    
            <article>
                <section>
                    <h1>Free</h1>
                    <p>
                        This app is free!!! And you are the only one holding your data!
                    </p>
                </section>
            </article>
            <h1 >Charts</h1> 
            <div id="charts" className="chart">    
                <Pie data={dataSource}></Pie>
                <DonutChart data={chartData}></DonutChart>                          
            </div>
        </div>       
    </main>
    );
  }
  
  export default HomePage;