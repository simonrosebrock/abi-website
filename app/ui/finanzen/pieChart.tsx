'use client'

import { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";

type FinanzenTable = {name: string, money: number}[]

type AusgabenRow = {
    name: string,
    money: number
}

export default function PieChart({ausgaben}: {ausgaben: FinanzenTable}) {
    const chartRef = useRef(null) as any;

    useEffect(() => {
        if(chartRef.current) {
            if(chartRef.current.chart) {
                chartRef.current.chart.destroy();
            }

            const context = chartRef.current.getContext("2d");

            const newChart = new Chart(context, {
                type: 'pie',
                data: {
                    labels: ausgaben.map((element: AusgabenRow) => element.name),
                    datasets: [
                        {
                            data: ausgaben.map((element: AusgabenRow) => element.money)
                        }
                    ]
                },
                options: {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: (context) => {
                                    if (context.parsed !== null) {
                                        return " " +context.parsed + "€"
                                    }
                                }
                            }
                        }
                    }
                }
            })
            
            chartRef.current.chart = newChart
        }
    }, [ausgaben])

    return(
        <div className="w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-white shadow-sm rounded-lg p-2 flex flex-col items-center">
            <h3 className="text-[#05004E] text-xl">Abiball Ausgaben</h3>
            <div className="w-[200px] md:w-[420px] h-[420px]" style={{position: "relative"}}>
                <canvas ref={chartRef}/>
            </div>
        </div>
    );
}