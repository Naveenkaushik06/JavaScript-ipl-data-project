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


// 1. Number of matches played per year for all the years in IPL.

function matchPlayedPerYear(match) {
    if (Array.isArray(match)) {
        let seasonWise = match.reduce(function(acc, curr) {
            if (acc[curr.season])
                acc[curr.season] += 1;
            else
                acc[curr.season] = 1;
            return acc;
        }, {});
        fs.writeFile("../public/output/matchPlayedPerYear.json", JSON.stringify(seasonWise),
            (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log("File written successfully in matchPlayedPerYear.json\n");
                }
            });
    } else {
        fs.writeFile("/home/naveen/Desktop/Naveen-js-ipl-data-project/src/server/1-matches-per-year.js", JSON.stringify({}),
            (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log("Empty object written successfully in matchPlayedPerYear.json\n");
                }
            });
    }
}
matchPlayedPerYear(match);