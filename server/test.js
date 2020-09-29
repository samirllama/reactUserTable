
const obj1 = [
    {
      id: 2,
      name: 'Carli',
      transactionDt: '6/29/2020',
      amt: '205.00',
      points: 260,
      month: 'June'
    },
    {
      id: 2,
      name: 'Carli',
      transactionDt: '6/30/2020',
      amt: '27.00',
      points: 0,
      month: 'June'
    },
    {
      id: 2,
      name: 'Carli',
      transactionDt: '7/7/2020',
      amt: '161.00',
      points: 172,
      month: 'July'
    },
    {
      id: 6,
      name: 'Megi',
      transactionDt: '8/21/2020',
      amt: '145.00',
      points: 140,
      month: 'August'
    },
    {
      id: 3,
      name: 'Hadeem',
      transactionDt: '8/17/2020',
      amt: '109.00',
      points: 68,
      month: 'August'
    }
]
 
let ob2 = obj1.reduce(function (r,a) {
        r[a.month] = r[a.month] || [];
        r[a.month].push(a);
        return r;
}, [])


s
console.log(ob2)
// for(const [key, value] of Object.entries(ob2)){
//       console.log(`${key} ${value[0].transactionDt}`)
//     }

//obj1.forEach(item => console.log(item))
//  console.log(ob2)