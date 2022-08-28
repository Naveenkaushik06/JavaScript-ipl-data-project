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


// 2. Number of matches won per team per year in IPL.

function matchesWonPerTeamPerYear(match) {
    if (Array.isArray(match)) {
        let teamWiseWinner = match.reduce((acc, curr) => {
            if (acc[curr.winner]) {
                if (acc[curr.winner][curr.season]) {
                    acc[curr.winner][curr.season] += 1;
                } else {
                    acc[curr.winner][curr.season] = 1;
                }
            } else {
                acc[curr.winner] = {};
                acc[curr.winner][curr.season] = 1;

            }
            return acc;


        }, {})
        fs.writeFile("../public/output/matchesWonPerTeamPerYear.json", JSON.stringify(teamWiseWinner),
            (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log("File written successfully in matchesWonPerTeamPerYear.json\n");
                }
            });
    } else {
        fs.writeFile("/home/naveen/Desktop/Naveen-js-ipl-data-project /src/server/2-matches-won-per-team-per-year.js", JSON.stringify({}),
            (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log("Empty object written successfully in matchesWonPerTeamPerYear.json\n");
                }
            });
    }
}
matchesWonPerTeamPerYear(match);