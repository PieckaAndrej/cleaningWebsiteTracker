const people = ["Allan", "Jakub", "Andrej"]
const jobs = ["Living room / Cat poop", "Bathroom / Dishwasher", "Kitchen / Cat food"]
const firstWeekDate = new Date(2022, 0, 17);

function createTableHistory() {
	createTableHeaders();
	createTableElements(0);
}

function createTableNow() {
	createTableHeaders();
	createTableElements(getWeekNumber(new Date()) - 1);
}

function createTableElements(lastWeekNumber) {
	var table = document.getElementById("table-head");

	var tblBody = document.createElement("tbody");

	var headers = ["From", "To"].concat(jobs);

	// cells creation
	for (var i = lastWeekNumber; i < getWeekNumber(new Date()); i++) {
		var row = document.createElement("tr");

		for (var j = 0; j < headers.length; j++) {
			var startDate = firstWeekDate.addDays(i * 7);
			var endDate = firstWeekDate.addDays((i + 1) * 7 - 1);

			var rotation = getRotation(startDate);
			rotation = [getFormatedDate(startDate), getFormatedDate(endDate)].concat(rotation);

			var cell = document.createElement("td");
			cell.id = jobs[j];
			var cellText = document.createTextNode(rotation[j]);

			cell.appendChild(cellText);
			row.appendChild(cell);
		}

		tblBody.appendChild(row);
	}


	table.appendChild(tblBody);

}

function createTableHeaders() {
	var element = document.getElementById("table");

	var tbl = document.createElement("table");
	tbl.id = "table-head"
	var tblBody = document.createElement("tbody");


	var headers = ["From", "To"].concat(jobs);

	var row = document.createElement("tr");

	for (var i = 0; i < headers.length; i++) {

		var cell = document.createElement("th");
		cell.id = "headers";
		var cellText = document.createTextNode("" + headers[i]);

		cell.appendChild(cellText);
		row.appendChild(cell);
	}
	
	tblBody.appendChild(row);

	tbl.appendChild(tblBody);

	element.appendChild(tbl);
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function updateTable() {
	let rotation = getRotation(new Date());

	document.getElementById(jobs[0]).innerHTML = rotation[0];
	document.getElementById(jobs[1]).innerHTML = rotation[1];
	document.getElementById(jobs[2]).innerHTML = rotation[2];

	updateLastUpdatedLabel();

	setTimeout(updateTable, 1000 * 60); //update every minute
}

function getRotation(date) {
	let rotation = [];

	for (let i = 0; i < people.length; i++) {
		rotation[i] = people[(i + getWeekNumber(date)) % people.length];
	}

	return rotation;
}

function updateLastUpdatedLabel() {
	var today = new Date();
	var time = today.getHours() + ":" + getNormalizedTimeString(today.getMinutes()) 
		+ ":" + getNormalizedTimeString(today.getSeconds());

	document.getElementById("updateText").innerHTML = "Last updated: " + time;
}

function getNormalizedTimeString(text) {
	var retVal = "" + text;

	if (retVal.length == 1) {
		retVal = "0" + retVal;
	}

	return retVal;
}

function getFormatedDate(date) {
	const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	const offset = date.getTimezoneOffset()
	/*
	date = new Date(date.getTime() - (offset*60*1000))
	return date.toISOString().split('T')[0]
	*/
	return new Date(date.getTime() - (offset*60*1000)).toLocaleDateString(undefined, options);
}

function getWeekNumber(date) {
	var numberOfDays = Math.floor((date - firstWeekDate) / (24 * 60 * 60 * 1000));
	var result = Math.ceil((date.getDay() + 1 + numberOfDays) / 7);

	return result;
}

