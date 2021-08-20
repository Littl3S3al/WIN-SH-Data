let PerpKey = [
    'Fellow employee',
    'Direct supervisor',
    'Higher management',
    'News source',
    'Other',
  ];
let perpData;

  d3.csv('data/perpetrator.csv').then(data => {
        let perps = []
        PerpKey.forEach(key => {
            let total = d3.sum(data, d => d.total)
            let value = d3.sum(data, d => d[key]/total*100)
            perps.push({key, value})
        })
        return perps;
}).then(data => {
    let orderedData = 
    data.slice().sort((a,b) => d3.descending(a.value, b.value))
    return orderedData
}).then(res => {
    perpData = res;
})