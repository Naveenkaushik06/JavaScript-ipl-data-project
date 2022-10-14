let papaParse = require('/home/naveen/Desktop/Naveen-js-ipl-data-project/node_modules/papaparse');
let fs = require('fs');
let matches = fs.readFileSync('/home/naveen/Desktop/Naveen-js-ipl-data-project/src/data/matches.csv', 'utf-8');
let deliveries = fs.readFileSync('/home/naveen/Desktop/Naveen-js-ipl-data-project/src/data/deliveries.csv', 'utf-8');
const matchData = papaParse.parse(matches, {
    header: true
});
const deliveriesData = papaParse.parse(deliveries, {
    header: true
});
const match = matchData["data"];
const delivery = deliveriesData["data"];
// console.log(matchData);


function economicalBowlers(matches, deliveries){
    let bowlers = {}
    
    for (let matchdata of matches)
    {
      if(matchdata.season=='2015')
      {
             let id = matchdata.id
            for (let deliverydata of deliveries){
              
                if (deliverydata.match_id === id ){
                  
                   
  
                        if (bowlers[deliverydata.bowler])
                        {
                            bowlers[deliverydata.bowler].totalBalls += 1
                            bowlers[deliverydata.bowler].totalRuns += parseFloat(deliverydata.total_runs)
                        }
                        else 
                        {
  
                            bowlers[deliverydata.bowler] = {"totalRuns": parseFloat(deliverydata.total_runs), "totalBalls": 1, "economy": 0}
                        }
                    
                        }
            }
        }  
    }
   
  let topten = []
  for (let eachBowler in bowlers)
  {
        eco = bowlers[eachBowler].totalRuns / ( bowlers[eachBowler].totalBalls / 6.0 )
        bowlers[eachBowler].economy = eco
        topten.push(bowlers[eachBowler].economy)  
  }
        topten.sort(function(a,b){  return a-b; })
  let myobject = {}
  for (let j=0; j < 10; j++)
  {
    for(let bowler in bowlers)
    {
        if (bowlers[bowler].economy == topten[j])
        {
            myobject[bowler] = topten[j]
        }
    }
  }
  console.log(myobject)
  }
  console.log(economicalBowlers(matches, deliveries))