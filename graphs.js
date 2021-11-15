//data source

const url = "https://raw.githubusercontent.com/gerasoras/saulesviecia/main/statement_3.csv";

// getData function

async function getData() {

    // Part 1: Get CSV

    // fetch data
    const response = await fetch(url);
    // process data
    const rawData = await response.text();
    // publish data
    document.getElementById("csv").innerHTML = rawData;

    // developer info
    console.log(rawData);
    console.log("rawData type: " + typeof rawData);

//P2: CSV to JSON
//initialise variables

    let arrayOne = rawData.split("\r\n");
    let header = arrayOne[0].split(",");
    let noOfRow = arrayOne.length;
    let noOfCol = header.length;
    let jsonData = [];
    let i = 0;
    let j = 0;

//for loop (rows)
for (i = 1; i < noOfRow - 1; i++) {
        let obj = {};
        let myNewLine = arrayOne[i].split(",");
        // nested for loop (columns)
        for (j = 0; j < noOfCol; j++) {
            obj[header[j]] = myNewLine[j];
        };

        //generate JSON
        jsonData.push(obj);
    };
	//publish data

	document.getElementById("json").innerHTML = jsonData;

	//developer info
	console.log(jsonData);
    console.table(jsonData);
    console.log("jsonData type: " + typeof jsonData);

    //stringify
    jsonString = JSON.stringify(jsonData);
    console.log(jsonString);
    console.log("jsonString type: " + typeof jsonString);

    //P3: JSON to HTML table

    //initialise variables

    let children = jsonData;
    let table = document.createElement("table");

    //function to generate table header row

    function addHeaders(table, keys) {
    	let row = table.insertRow();
    	for (i = 0; i < keys.length; i++) {
    		let cell = row.insertCell();
    		//add a node to the end of list of children
    		cell.appendChild(document.createTextNode(keys[i]));

    	}
    }

    //generate table

    for (i = 0; i < children.length; i++) {
    	let child = children[i];
    	//header row
    	if (i === 0) {
    		addHeaders(table, Object.keys(child));
    	}
    	//generate rows
    	let row = table.insertRow();
    	Object.keys(child).forEach(function(k) {
    		let cell = row.insertCell();
    		cell.appendChild(document.createTextNode(child[k]));
    	})
    }
    //publish table 
    document.getElementById("container").appendChild(table);

    //dev. info
    console.log("HTML table type: " + typeof table);



// P4: Plot data

//array for x-axis (laikas)

let months = [];

    for (i in jsonData) {
        let item = jsonData[i];
        months.push(item.posting_date);
    }

    // array for y-axis (paskaičiavimai)

    let emissions = [];

    for (i in jsonData) {
        let item = jsonData[i];
        emissions.push(item.grams_of_CO2);
    }

    // grafiko argumentai

    let p = document.getElementById("myPlot");

    let plotData = [
        {
            x: months,
            y: emissions
        }
    ];

    let layout = {
        title: "Emissions by month",
        xaxis: { title: "Month" },
        yaxis: { title: "Emissions (t/co2e)" }
    };

    // generate plot
    Plotly.newPlot(p, plotData, layout);

    // dev
    console.log(months);
    console.log(emissions);
    console.log(Plotly.newPlot(p, plotData, layout));
    console.log("plot type: " + typeof Plotly.newPlot(p, plotData, layout));




}


getData();