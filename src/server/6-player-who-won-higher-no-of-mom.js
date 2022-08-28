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

//  Find a player who has won the highest number of Player of the Match awards for each season

function playerOfMatchSeasonWise(matches) {
    if (Array.isArray(matches)) {
        let playerWon = matches.reduce((acc, curr) => {
            if (!curr.id == '') {
                if (acc[curr.season]) {
                    if (acc[curr.season][curr.player_of_match]) {
                        acc[curr.season][curr.player_of_match] += 1;
                    } else {
                        acc[curr.season][curr.player_of_match] = 1;
                    }
                } else {
                    acc[curr.season] = {};
                    acc[curr.season][curr.player_of_match] = 1;
                }
            }
            return acc;
        }, {})
        let arrayPlayerWon = Object.entries(playerWon)
        let finalResultOfPlayerOfMatch = arrayPlayerWon.reduce((acc, curr) => {
            let sortedarray = Object.entries(curr[1])
                .sort((player1, Player2) => {
                    return Player2[1] - player1[1]
                }).slice(0, 1);

            acc[curr[0]] = Object.fromEntries(sortedarray);
            return acc;
        }, {})
        fs.writeFile("../public/output/playerOfMatchSeasonWise.json", JSON.stringify(finalResultOfPlayerOfMatch),
            (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log("File written successfully in playerOfMatchSeasonWise.json\n");
                }
            });
    } else {
        fs.writeFile("/home/naveen/Desktop/Naveen-js-ipl-data-project/src/server/6-player-who-won-higher-no-of-mom.js", JSON.stringify({}),
            (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log("Empty object written successfully in playerOfMatchSeasonWise.json\n");
                }
            });
    }
}
playerOfMatchSeasonWise(match);