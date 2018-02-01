

const MARGIN_X = 10;
const SCALE_Y = 100;
const OFFSET_Y = -90;
d3.json("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=demo", function(err, res){
    if(err){
        console.log(err);
        return;
    }

    var data = [];

    // get the open value of each marker
    var ts = res["Time Series (1min)"];
    for(var k in ts)
        data.push(Number(ts[k]["1. open"]));
    console.log(data);


    // create a new svg inside the graph container
    var g = d3.select("div#graph-container")
        .append("svg")
        .attr("width", 1000)
        .attr("height", 900);

    var lineFn = d3.line()
        .x(function(d,i){return i*MARGIN_X})
        .y(function(d,i){console.log('x:', i*MARGIN_X, 'y:',(d + OFFSET_Y)* SCALE_Y);return (d + OFFSET_Y)* SCALE_Y});

    g.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", lineFn);


});

