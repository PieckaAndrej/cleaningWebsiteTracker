const people = ["Jakub", "Andrej", "Allan"]
const jobs = ["Living room / Cat poop", "Bathroom / Dishwasher", "Kitchen / Cat food"]
const firstWeekDate = new Date(2022, 0, 17);

function createTableHistory() {
	createTableHeaders(true);
	createTableElements(0, true);
}

function createTableNow() {
	createTableHeaders(false);
	createTableElements(getWeekNumber(new Date()), false);
}

function createTableElements(lastWeekNumber, fromTo) {
	var table = document.getElementById("table-head");

	var tblBody = document.createElement("tbody");

	var headers = jobs;
 
	if (fromTo) {
		headers = ["From", "To"].concat(jobs);
	}

	// cells creation
	for (var i = lastWeekNumber; i <= getWeekNumber(new Date()); i++) {
		var row = document.createElement("tr");

		for (var j = 0; j < headers.length; j++) {
			var startDate = firstWeekDate.addDays(i * 7);
			var endDate = firstWeekDate.addDays((i + 1) * 7 - 1);

			var rotation = getRotation(startDate);
			rotation = [getFormatedDate(startDate), getFormatedDate(endDate)].concat(rotation);

			var cell = document.createElement("td");
			cell.id = headers[j];
			var cellText = document.createTextNode(rotation[j]);

			cell.appendChild(cellText);
			row.appendChild(cell);
		}

		tblBody.appendChild(row);
	}


	table.appendChild(tblBody);

}

function createTableHeaders(fromTo) {
	var element = document.getElementById("table");

	var tbl = document.createElement("table");
	tbl.id = "table-head"
	var tblBody = document.createElement("tbody");

	var headers = jobs;
 
	if (fromTo) {
		headers = ["From", "To"].concat(jobs);
	}

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

	for (var i = 0; i < people.length; i++) {
		document.getElementById(jobs[i]).innerHTML = rotation[i];

	}
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
	return new Date(date.getTime() - (offset*60*1000)).toLocaleDateString(undefined, options);
}

function getWeekNumber(date) {
	return getWeekNumberFromStartOfYear(date) - getWeekNumberFromStartOfYear(firstWeekDate);
}

function getWeekNumberFromStartOfYear(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
	d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return  weekNo;
} 
