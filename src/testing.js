const arr1 = [
 {id: 1, name: "Caleb", transactionDt: "6/14/2020", amt: "199.00"},
{id: 2, name: "Carli", transactionDt: "6/29/2020", amt: "205.00"},
 {id: 2, name: "Carli", transactionDt: "7/28/2020", amt: "252.00"},
 {id: 2, name: "Carli", transactionDt: "7/26/2020", amt: "108.00"},
 {id: 2, name: "Carli", transactionDt: "7/26/2020", amt: "170.00"},
 {id: 2, name: "Carli", transactionDt: "6/30/2020", amt: "27.00"},
{id: 2, name: "Carli", transactionDt: "7/7/2020", amt: "161.00"},
 {id: 6, name: "Megi", transactionDt: "8/21/2020", amt: "145.00"},
 {id: 4, name: "Max", transactionDt: "4/9/2020", amt: "298.00"},
 {id: 3, name: "Hadeem", transactionDt: "8/17/2020", amt: "109.00"}
]

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

const threeMonthsList = arr1.filter(trans => new Date(trans.transactionDt) > getPrevMonthList(3))

// const totalCustomerReward = threeMonthsList.reduce((acc, key) => parseInt(key.amt) + acc, 0)

// console.log('tot',totalCustomerReward)

const customerPointsInfo =  threeMonthsList.map(item  => {
    const points = calculateRewardPoints(item.amt)
    const monthNumber = new Date(item.transactionDt).getMonth();
    const month = new Date(item.transactionDt).toLocaleString('default', {month: 'short'})
    return {
       ...item, points, month, monthNumber
    }
})
 //console.log(customerPointsInfo)

function customerSummary (customerPointsInfo) { 
    let byCustomer = {};
    let totalPointsByCustomer = {}
    
    customerPointsInfo.forEach(pointsPerTransaction => {
    let {id, name, month, points, monthNumber} = pointsPerTransaction;   

    if (!byCustomer[id]) {
     byCustomer[id] = [];      
    }    
    if (!totalPointsByCustomer[id]) {
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


console.log(customerSummary(customerPointsInfo))