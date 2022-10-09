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
console.log(matchData);

//  Find the bowler with the best economy in super overs.

const bestBowlerInSuperover = function(deliveries) {
    if (Array.isArray(deliveries)) {
        let bowlerInSuperOver = deliveries.reduce((acc, curr) => {
            if (curr.match_id != '') {
                if (curr.is_super_over != 0) {
                    if (acc[curr.bowler]) {
                        acc[curr.bowler]['total_runs'] += parseInt(curr.total_runs) - (parseInt(curr.bye_runs) + parseInt(curr.legbye_runs));
                        if (curr['noball_runs'] !== 0 && curr['wide_runs'] !== 0) {
                            acc[curr.bowler]['ball']++
                        }
                    } else {
                        acc[curr.bowler] = {};
                        acc[curr.bowler]['total_runs'] = parseInt(curr.total_runs) - (parseInt(curr.bye_runs) + parseInt(curr.legbye_runs));
                        if (curr['noball_runs'] !== 0 && curr['wide_runs'] !== 0) {
                            acc[curr.bowler]['ball'] = 1
                        }
                    }
                    acc[curr.bowler]['economy'] = parseFloat((acc[curr.bowler]['total_runs'] * 6) / (acc[curr.bowler]['ball']).toFixed(2));
                }
            }
            return acc;
        }, {});

        let bestEconomyBowlerInSuperOver = Object.fromEntries(Object.entries(bowlerInSuperOver)
            .sort((player1, player2) => {
                return player2[1].economy > player1[1].economy ? -1 : 1;
            }).slice(0, 1));

        fs.writeFile("../public/output/bestBowlerInSuperover.json", JSON.stringify(bestEconomyBowlerInSuperOver),
            (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log("File written successfully in bestEconomyBowlerInSuperOver.json\n");
                }
            });
    } else {
        fs.writeFile("/home/naveen/Desktop/Naveen-js-ipl-data-project/src/server/9-Best-Bowler-In-Super-Over.js", JSON.stringify({}),
            (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log("Empty object written successfully in bestEconomyBowlerInSuperOver.json\n");
                }
            });
    }
}

console.log(bestBowlerInSuperover(delivery));