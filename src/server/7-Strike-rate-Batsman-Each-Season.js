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

// Find the strike rate of a batsman for each season.
function deliveriesInSingleYear(matches, deliveries, year) {
    let Id = matches.filter(match => match.season == year).map(match => parseInt(match.id));

    return deliveries.filter(delivery => Id.indexOf(parseInt(delivery.match_id)) !== -1)
}


function strikeRateEachYear(matches, deliveries, year, playerName) {
    if (Array.isArray(matches) && Array.isArray(deliveries) && playerName != "") {
        let strikeRate = deliveriesInSingleYear(matches, deliveries, year).reduce((acc, curr) => {
            if (curr.batsman === playerName) {
                if (acc[curr.batsman]) {
                    acc[curr.batsman]["runs"] += parseInt(curr.batsman_runs);
                    acc[curr.batsman]["balls"] += 1;
                    acc[curr.batsman]["year"] = year;
                } else {
                    acc[curr.batsman] = {};
                    acc[curr.batsman]["runs"] = parseInt(curr.batsman_runs);
                    acc[curr.batsman]["balls"] = 1;
                }
                acc[curr.batsman]["strikeRate"] = parseFloat((parseInt(acc[curr.batsman]["runs"]) * 100 / parseInt(acc[curr.batsman]["balls"])).toFixed(2));

            }
            return acc;
        }, {});
        return strikeRate;

    }
}
let season = match.map((curr) => {
    return parseInt(curr.season);
});
let years = season.filter((curr, index) => {
    return season.indexOf(curr) === index;
});

let playerName = "V Kohli";
let result = years.map((year) => {
    return (strikeRateEachYear(match, delivery, year, playerName))
});

result;
fs.writeFile("../public/output/strikeRateEachYear.json", JSON.stringify(result),
    (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully in strikeRateEachYear.json\n");
        }
    });
strikeRateEachYear(match);