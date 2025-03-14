'use client'

import { useRef, useEffect } from "react";
import { Chart, ChartOptions, Plugin } from "chart.js/auto";

type FinanzenTable = {name: string, money: number}[]

type AusgabenRow = {
    name: string,
    money: number
}

//  ["#ff0000", "#1900ff", "#ff2a00", "#ffee00", "#0a2418", "#de760d", "#0d0dde", "#0d98de", "#800dde", "#de0dc6"]

export default function VarCostChart({ausgaben}: {ausgaben: FinanzenTable}) {
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
                            data: ausgaben.map((element: AusgabenRow) => element.money),
                            backgroundColor: ["#7ED321", "#F8E71C", "#F5A623", "#FF6F61", "#D0021B", "#8B572A", "#9013FE", "#4A90E2", "#50E3C2", "#B8E986"],
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false,
                        },
                        htmlLegend: {
                            containerID: 'legend-container-varcost',
                        },
                        tooltip: {
                            callbacks: {
                                label: (context: any) => {
                                    if (context.parsed !== null) {
                                        return " " +context.parsed + "€"
                                    }
                                }
                            }
                        }
                    }
                } as ExtendedChartOptions,
                plugins: [htmlLegendPlugin],
            })
            
            chartRef.current.chart = newChart
        }
    }, [ausgaben])

    return(
        <div className="w-[250px] h-[350px] md:w-[500px] md:h-[500px] bg-white shadow-sm rounded-lg p-2 flex flex-col items-center">
            <h3 className="text-[#05004E] text-xl">Kosten pro Person</h3>
            <div id="legend-container-varcost" className="w-full overflow-auto scrollbar-none h-[200px]">
                <ul className="flex flex-wrap justify-center"></ul>
            </div>
            <div className="ml-auto mr-auto w-[200px] md:w-[380px] h-[380px]" style={{position: "relative"}}>
                <canvas ref={chartRef}/>
            </div>
        </div>
    );
}

interface HtmlLegendOptions {
    containerID: string;
}
interface ExtendedChartOptions extends ChartOptions<'pie'> {
plugins: {
    htmlLegend?: HtmlLegendOptions;
    legend?: any; 
    tooltip?: any;
};
}

const getOrCreateLegendList = (chart: Chart, id: string): HTMLUListElement => {
    const legendContainer = document.getElementById(id) as HTMLElement;
    let listContainer = legendContainer.querySelector('ul');

    if (!listContainer) {
        listContainer = document.createElement('ul');
        listContainer.style.display = 'flex';
        listContainer.style.flexDirection = 'row';
        listContainer.style.margin = '0';
        listContainer.style.padding = '0';

        legendContainer.appendChild(listContainer);
    }

    return listContainer;
};
        
const htmlLegendPlugin: Plugin<'pie'> = {
    id: 'htmlLegend',
    afterUpdate(chart: any, args: any, options: any) {
        const ul = getOrCreateLegendList(chart, options.containerID);

        // Remove old legend items
        while (ul.firstChild) {
        ul.firstChild.remove();
        }

        // Reuse the built-in legendItems generator
        const items = chart.options.plugins.legend.labels.generateLabels(chart);

        items.forEach((item: any) => {
        const li = document.createElement('li');
        li.style.alignItems = 'center';
        li.style.cursor = 'pointer';
        li.style.display = 'flex';
        li.style.flexDirection = 'row';
        li.style.marginLeft = '10px';

        li.onclick = () => {
            const { type } = chart.config;
            if (type === 'pie' || type === 'doughnut') {
            // Pie and doughnut charts only have a single dataset and visibility is per item
            chart.toggleDataVisibility(item.index);
            } else {
            chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
            }
            chart.update();
        };

        // Color box
        const boxSpan = document.createElement('span');
        boxSpan.style.background = item.fillStyle as string;
        boxSpan.style.borderColor = item.strokeStyle as string;
        boxSpan.style.borderWidth = `${item.lineWidth}px`;
        boxSpan.style.display = 'inline-block';
        boxSpan.style.flexShrink = '0';
        boxSpan.style.height = '20px';
        boxSpan.style.marginRight = '10px';
        boxSpan.style.width = '20px';

        // Text
        const textContainer = document.createElement('p');
        textContainer.style.color = item.fontColor as string;
        textContainer.style.margin = '0';
        textContainer.style.padding = '0';
        textContainer.style.textDecoration = item.hidden ? 'line-through' : '';

        const text = document.createTextNode(item.text);
        textContainer.appendChild(text);

        li.appendChild(boxSpan);
        li.appendChild(textContainer);
        ul.appendChild(li);
        });
    }
};