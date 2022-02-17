import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';

export const DashboardScreen = () => {
  
  const data = [
    {quarter: 1, earnings: 13000},
    {quarter: 2, earnings: 16500},
    {quarter: 3, earnings: 14250},
    {quarter: 4, earnings: 19000}
  ];
  
  return (
    <div className='col-md-10'>
      <div className='container-fluid mt-5'>
          <h2 className='display-5 text-center'>Dashboard</h2>
          <hr />
          
          <VictoryChart 
            domainPadding={20}
            // theme={VictoryTheme.material}
            height={ 300 }
            width={ 300 }
          >
            <VictoryAxis
              // tickValues specifies both the number of ticks and where
              // they are placed on the axis
              tickValues={[1, 2, 3, 4]}
              tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
            />
            <VictoryAxis
            dependentAxis
            // tickFormat specifies how ticks should be displayed
            tickFormat={(x) => (`$${x / 1000}k`)}
            />

            <VictoryBar
              data={data}
              // data accessor for x values
              x="quarter"
              // data accessor for y values
              y="earnings"
            />
          </VictoryChart>
          

      </div>
    </div>
  )
}
