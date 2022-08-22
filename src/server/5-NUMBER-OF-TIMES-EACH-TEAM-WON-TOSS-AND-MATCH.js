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
console.log(matchData);

// Find the number of times each team won the toss and also won the match
// function deliveriesInSingleYear(matches, deliveries, year) {
//     let Id = matches.filter(match => match.season == year).map(match => parseInt(match.id));

//     return deliveries.filter(delivery => Id.indexOf(parseInt(delivery.match_id)) !== -1)
// }

function teamWonTossAndMatch(matches) {
    if (Array.isArray(matches)) {
        let WonTossAndMatch = matches.reduce((acc, curr) => {
            if (!curr.id == '') {
                if (acc[curr.toss_winner] == acc[curr.winner]) {
                    if (acc[curr.toss_winner]) {
                        acc[curr.toss_winner] += 1;
                    } else {
                        acc[curr.toss_winner] = 1;
                    }
                }
            }
            return acc;
        }, {})
        fs.writeFile("../public/output/NoOfTimesEachTeamWonTossAndMatch.json", JSON.stringify(WonTossAndMatch),
            (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log("File written successfully in teamWonTossAndMatch.json\n");
                }
            });
    } else {
        fs.writeFile("/home/naveen/Desktop/Naveen-js-ipl-data-project /src/server/5-NUMBER-OF-TIMES-EACH-TEAM-WON-TOSS-AND-MATCH.js", JSON.stringify({}),
            (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log("Empty object written successfully in teamWonTossAndMatch.json\n");
                }
            });
    }
}

console.log(teamWonTossAndMatch(match));