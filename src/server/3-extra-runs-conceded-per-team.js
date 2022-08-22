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
// console.log(matchData);


// 3. Extra runs conceded per team in the year 2016

function deliveriesInSingleYear(matches, deliveries, year) {
    let Id = matches.filter(match => match.season == year).map(match => parseInt(match.id));

    return deliveries.filter(delivery => Id.indexOf(parseInt(delivery.match_id)) !== -1)
}

function extraRunIn2016TeamWise(matches, deliveries, year) {
    if (Array.isArray(matches) && Array.isArray(deliveries) && year >= 2008 && year <= 2017) {
        let extraRun = deliveriesInSingleYear(matches, deliveries, year).reduce((acc, curr) => {
            if (acc[curr.bowling_team]) {
                acc[curr.bowling_team] += parseInt(curr.extra_runs);
            } else {
                acc[curr.bowling_team] = parseInt(curr.extra_runs);
            }
            return acc;
        }, {});
        fs.writeFile("../public/output/extrarunconceded.json", JSON.stringify(extraRun),
            (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log("File written successfully in extraRunIn2016TeamWise.json\n");
                }
            });
    } else {
        fs.writeFile("/home/naveen/Desktop/Naveen-js-ipl-data-project /src/server/3-extra-runs-conceded-per-team.js", JSON.stringify({}),
            (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log("Empty object written successfully in extraRunIn2016TeamWise.json\n");
                }
            });
    }
}
extraRunIn2016TeamWise(match, delivery, 2016);