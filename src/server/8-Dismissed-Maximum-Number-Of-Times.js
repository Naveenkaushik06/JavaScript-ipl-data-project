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

// Find the highest number of times one player has been dismissed by another player
function deliveriesInSingleYear(matches, deliveries, year) {
    let Id = matches.filter(match => match.season == year).map(match => parseInt(match.id));

    return deliveries.filter(delivery => Id.indexOf(parseInt(delivery.match_id)) !== -1)
}

function dismissalsPlayersDetails(deliveries) {
    if (Array.isArray(deliveries)) {

        let dismissedPlayerDetail = { dismissedPlayer: null, dismissedBy: null, dismissalsTime: 0 };

        let dismissedPlayers = deliveries.filter((ball) => {
            if (ball.dismissal_kind !== '' && ball.dismissal_kind !== 'run out') {
                return true;
            }
        })
        let dismissedPlayerByBowler = dismissedPlayers.reduce((acc, curr) => {

            if (acc[curr.batsman] === undefined) {
                acc[curr.batsman] = {}
            }

            if (acc[curr.batsman][curr.bowler] === undefined) {
                acc[curr.batsman][curr.bowler] = 0;
            }

            acc[curr.batsman][curr.bowler]++;

            if (dismissedPlayerDetail.dismissalsTime < acc[curr.batsman][curr.bowler]) {
                dismissedPlayerDetail.dismissedPlayer = curr.batsman;
                dismissedPlayerDetail.dismissedBy = curr.bowler;
                dismissedPlayerDetail.dismissalsTime = acc[curr.batsman][curr.bowler];
            }

            return acc;

        }, {});
        fs.writeFile("../public/output/dismissalsPlayersDetails.json", JSON.stringify(dismissedPlayerDetail),
            (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log("File written successfully in dismissedPlayerDetail.json\n");
                }
            });
    } else {
        fs.writeFile("/home/naveen/Desktop/Naveen-js-ipl-data-project/src/server/8-Dimissed-Maximum-Number-Of-Times.js", JSON.stringify({}),
            (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log("Empty object written successfully in dismissedPlayerDetail.json\n");
                }
            });
    }
}
dismissalsPlayersDetails(delivery);