let papaParse = require('/home/naveen/Desktop/Naveen-js-ipl-data-project /node_modules/papaparse');
let fs = require('fs');
let matches = fs.readFileSync('/home/naveen/Desktop/Naveen-js-ipl-data-project /src/data/matches.csv', 'utf-8');
let deliveries = fs.readFileSync('/home/naveen/Desktop/Naveen-js-ipl-data-project /src/data/deliveries.csv', 'utf-8');
const matchData = papaParse.parse(matches, {
    header: true
});
const deliveriesData = papaParse.parse(deliveries, {
    header: true
});
const match = matchData["data"];
const delivery = deliveriesData["data"];

// 4. Top 10 economical bowlers in the year 2015
function deliveriesInSingleYear(matches, deliveries, year) {
    let Id = matches.filter(match => match.season == year).map(match => parseInt(match.id));

    return deliveries.filter(delivery => Id.indexOf(parseInt(delivery.match_id)) !== -1)
}

function top10EconomyBowlerIn2015(matches, deliveries, year) {
    if (Array.isArray(matches) && Array.isArray(deliveries) && year >= 2008 && year <= 2017) {
        let bowlerEconomyObj = deliveriesInSingleYear(matches, deliveries, year).reduce((acc, curr) => {
            if (acc[curr.bowler]) {
                if (acc[curr.bowler]["totalRuns"]) {
                    acc[curr.bowler]["totalRuns"] += parseInt(curr.total_runs) - parseInt(curr.bye_runs) - parseInt(curr.legbye_runs);
                } else {
                    acc[curr.bowler]["totalRuns"] = parseInt(curr.total_runs) - parseInt(curr.bye_runs) - parseInt(curr.legbye_runs);
                }
            } else {
                acc[curr.bowler] = {};
                acc[curr.bowler]["totalRuns"] = parseInt(curr.total_runs) - parseInt(curr.bye_runs) - parseInt(curr.legbye_runs);
            }
            if (acc[curr.bowler]) {
                if (acc[curr.bowler]["totalBall"]) {
                    acc[curr.bowler]["totalBall"] += parseInt(curr.ball) - parseInt(curr.noball_runs != 0 ? 1 : 0) - parseInt(curr.wide_runs != 0 ? 1 : 0);
                } else {
                    acc[curr.bowler]["totalBall"] = parseInt(curr.ball) - parseInt(curr.noball_runs != 0 ? 1 : 0) - parseInt(curr.wide_runs != 0 ? 1 : 0);
                }
            } else {
                acc[curr.bowler] = {};
                acc[curr.bowler]["totalBall"] = parseInt(curr.ball) - parseInt(curr.noball_runs != 0 ? 1 : 0) - parseInt(curr.wide_runs != 0 ? 1 : 0);
            }
            acc[curr.bowler]["economy"] = (acc[curr.bowler]["totalRuns"] * 6) / acc[curr.bowler]["totalBall"];

            return acc;
        }, {});
        let economy = Object.fromEntries(Object.entries(bowlerEconomyObj)
            .sort((bowler1, bowler2) => {
                return bowler1[1].economy - bowler2[1].economy
            }).slice(0, 10));
        fs.writeFile("../public/output/topTenEconomicalBowler.json", JSON.stringify(economy),
            (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log("File written successfully in top10EconomyBowlerIn2015.json\n");
                }
            });
    } else {
        fs.writeFile("/home/naveen/Desktop/Naveen-js-ipl-data-project /src/server/4-top-10-economical-bowlers.js", JSON.stringify({}),
            (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log("Empty object written successfully in top10EconomyBowlerIn2015.json\n");
                }
            });
    }
}
top10EconomyBowlerIn2015(match, delivery, 2015);