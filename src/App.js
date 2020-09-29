import React from "react"
import "./App.css"
import useTransaction from "./hooks/useTransactions"
import Table from './Components/CustomerRewardsTable'
import styled from 'styled-components'
import _ from 'lodash';

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

const calculateRewardPoints = (amt) => {
  if(amt >= 50 && amt < 100) {
      return amt - 50;
  } else if(amt >= 100) {
      return (2*(amt - 100) + 50);
  }
  return 0;
}
const getPrevMonthList = month  => {
  const dt = new Date();
  const prevMonth = new Date(dt.setMonth(dt.getMonth() - month))
  return prevMonth;
}

function customerSummary ( data) {
  const customerPointsInfo =  data.map(item  => {
      const points = calculateRewardPoints(item.amt)
      const monthNumber = new Date(item.transactionDt).getMonth();
      const month = new Date(item.transactionDt).toLocaleString('default', {month: 'short'})
      return {
         ...item, points, month, monthNumber
      }
  })
   //console.log(customerPointsInfo)
      let byCustomer = {};
      let totalPointsByCustomer = {}
      
      customerPointsInfo.forEach(pointsPerTransaction => {
      let {id, name, month, points, monthNumber} = pointsPerTransaction;   
  
      if (!byCustomer[id]) {
       byCustomer[id] = [];      
      }    
      if (!totalPointsByCustomer[name]) {
       totalPointsByCustomer[name] = 0;
      }
      totalPointsByCustomer[name] += points;
     
      if (byCustomer[id][monthNumber]) {
          byCustomer[id][monthNumber].points += points;
          byCustomer[id][monthNumber].numTransactions++;      
      }
      else {
      byCustomer[id][monthNumber] = {
         id,
         name,
         month: month,
         monthNumber,
         numTransactions: 1,        
         points
       }
     }    
   });
  
      let tot = [];
      for (let key in byCustomer) {    
          byCustomer[key].forEach(cRow=> {
              tot.push(cRow);
          });    
      }
  
      let totByCustomer = [];
      for (let key in totalPointsByCustomer) {    
      totByCustomer.push({
          name: key,
          points: totalPointsByCustomer[key]
      });    
      }
      return {
          summaryByCustomer: tot,
          customerPointsInfo,
          totalPointsByCustomer:totByCustomer
      };
  }
  


function App() {
  const columns = [
    {
      Header:'Customer',
      accessor: 'name'      
    },    
    {
      Header:'Month',
      accessor: 'month'
    },
    {
      Header: "# of Transactions",
      accessor: 'numTransactions'
    },
    {
      Header:'Reward Points',
      accessor: 'points'
    }
  ];

  const totalsPointsColumn = [
    {
      Header:'Customer',
      accessor: 'name'      
    },    
    {
      Header:'Points',
      accessor: 'points'
    }
  ]


  const transaction = useTransaction()
  const threeMonthsList = transaction.filter(trans => new Date(trans.transactionDt) > getPrevMonthList(3))

 
  const data = customerSummary(threeMonthsList)
  const monthlyHeader = "Monthly Reward Points"
  const totalPointsHeader = "Total Reward Points"
  return (
    <Styles>
      <h2>{monthlyHeader}</h2>
      <Table columns={columns} data={data.summaryByCustomer}/>
      <div>
      <h2>{totalPointsHeader}</h2>
      <Table columns={totalsPointsColumn} data={data.totalPointsByCustomer} />
      </div>
    </Styles>
  )
}

export default App;