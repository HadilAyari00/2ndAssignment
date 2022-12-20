window.onload = init;

// The Game manager as a global variable
let cm;
let currentPage = 0;

function init() {
	// create an instance of the Game manager
	cm = new GameManager();

	cm.addTestData();
	cm.printGamesToConsole();

	// Display Games in a table
	// Pass the id of the HTML element that will contain the table
	cm.displayGamesAsATable("Games", currentPage, currentPage + 4);
	events();
	if (currentPage === 0) {
		document.getElementById('prev-page').disabled = true;

	} else if (cm.isEq(currentPage)) {
		document.getElementById('next-page').disabled = true;
	}


}

function events() {
	document.getElementById("th_name").addEventListener("click", function () { console.log('hiiii'); cm.sort(); });
	document.getElementById("th_av").addEventListener("click", function () { console.log('hiiii'); cm.sort_Availability(); });
	document.getElementById("th_pb").addEventListener("click", function () { console.log('hiiii'); cm.sort_pb(); });
	document.getElementById("th_cat").addEventListener("click", function () { console.log('hiiii'); cm.sort_cat(); });
	document.getElementById("th_rl").addEventListener("click", function () { console.log('hiiii'); cm.sort_date(); });

	const pageUpButton = document.getElementById('prev-page');
	pageUpButton.addEventListener('click', handlePagingPrev);

	const pageDownButton = document.getElementById('next-page');
	pageDownButton.addEventListener('click', handlePagingNext);



}

function handlePagingPrev(event) {
	let pageNumber;
	if (currentPage > 4)
		pageNumber = currentPage - 4;
	else
		pageNumber = 0;

	// Enable the Previous Page button
	document.getElementById('next-page').disabled = false;

	console.log(pageNumber)

	// Update the current page number and re-display the games
	currentPage = pageNumber;
	cm.displayGamesAsATable("Games", pageNumber, pageNumber + 4);

	// If we are on the first or last page, disable the appropriate button
	if (pageNumber === 0) {
		document.getElementById('prev-page').disabled = true;

	} else if (cm.isEq(currentPage + 1)) {
		document.getElementById('next-page').disabled = true;
	}
	events();
}
function handlePagingNext(event) {

	let pageNumber;

	if (currentPage + 4 < cm.listOfGames.length)
		pageNumber = currentPage + 4;
	else
		pageNumber = cm.listOfGames.length - currentPage
	// Enable the Next Page button
	document.getElementById('prev-page').disabled = false;

	console.log(pageNumber)

	// Update the current page number and re-display the games
	currentPage = pageNumber;
	cm.displayGamesAsATable("Games", pageNumber, pageNumber + 4);

	// If we are on the first or last page, disable the appropriate button
	if (pageNumber === 0) {
		document.getElementById('prev-page').disabled = true;

	} else if (cm.isEq(currentPage + 1)) {
		document.getElementById('next-page').disabled = true;
	}
	events();
}


function formSubmitted() {
	// Get the values from input fields
	let name = document.querySelector("#name");
	let checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
	let publisher = document.querySelector("#publisher");
	let category = document.querySelector("#category");
	let release_date = document.querySelector("#release_date");
	let cover_url = document.querySelector("#cover_url");

	Availability = ""
	for (var i = 0; i < checkedCheckboxes.length; i++) {
		console.log(checkedCheckboxes[i].value);
		Availability += checkedCheckboxes[i].value
		if (i < checkedCheckboxes.length - 1) {
			Availability += ", "
		}
	}
	let newGame = new Game(name.value, Availability, publisher.value, category.value, release_date.value, cover_url.value);
	cm.add(newGame);

	// Empty the input fields
	name.value = "";
	Availability.value = "";
	publisher.value = "";
	category.value = "";
	release_date.value = "";
	cover_url.value = "";
	// refresh the html table
	cm.displayGamesAsATable("Games", currentPage, currentPage + 4);

	// do not let your browser submit the form using HTTP
	return false;
}

function emptyList() {
	cm.empty();
	cm.displayGamesAsATable("Games", currentPage, currentPage + 4);
	events();
}

function loadList() {
	cm.load();
	cm.displayGamesAsATable("Games", currentPage, currentPage + 4);
	events()
}
function deleteRow(name) {
	console.log("accessing");
	cm.remove(name);
	cm.displayGamesAsATable("Games", currentPage, currentPage + 4);
	events()
}
function searchTable() {
	var input, filter, table, tr, td, i, txtValue;
	input = document.getElementById("search-field");
	filter = input.value.toUpperCase();
	table = document.getElementById("Games");
	tr = table.getElementsByTagName("tr");

	for (i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByTagName("td")[1];
		if (td) {
			txtValue = td.textContent || td.innerText;
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				tr[i].style.display = "";
			} else {
				tr[i].style.display = "none";
			}
		}
	}
}


class Game {
	constructor(name, Availability, publisher, category, release_date, cover_url) {
		this.name = name;
		this.Availability = Availability;
		this.publisher = publisher;
		this.category = category;
		this.release_date = release_date;
		this.cover_url = cover_url;
	}
}

class GameManager {
	constructor() {
		// when we build the Game manager, it
		// has an empty list of Games
		this.listOfGames = [];
	}

	addTestData() {
		var c1 = new Game("Little Hope", "PC, PS5", "Supermassive Games", "Action Adventure", "2017-09-11", "https://cdn.akamai.steamstatic.com/steam/apps/1194630/capsule_616x353.jpg?t=1639068785");
		var c2 = new Game("Detroit: Become Human", "PC, PS5", "Quantic Dream", "Adventure", "2018-04-08", "https://image.api.playstation.com/cdn/EP9000/CUSA10345_00/cGS8V172rys7iucR9xEBOLU8AlkMcLQc.png?w=440");
		var c3 = new Game("House of Ashes", "PS5", "Massive Games", "Action Adventure", "2021-04-09", "https://www.mobygames.com/images/covers/l/772247-the-dark-pictures-anthology-house-of-ashes-xbox-one-front-cover.jpg");
		var c4 = new Game("Until Dawn", "PS5", "Supermassive Games", "Adventure", "2015-12-05", "https://www.mobygames.com/images/covers/l/310654-until-dawn-playstation-4-front-cover.jpg");
		var c5 = new Game("The Walking Dead", "PC", " Telltale Games", "Adventure", "2012-11-02", "https://static-cdn.jtvnw.net/ttv-boxart/30740_IGDB-285x380.jpg");

		this.add(c1);
		this.add(c2);
		this.add(c3);
		this.add(c4);
		this.add(c5);

		// Let's sort the list of Games by Name
		this.sort();
	}

	isLess(x) {
		if (x < this.listOfGames.length) {
			return true;
		}
		else return false;
	}

	isEq(x) {
		if (x >= this.listOfGames.length) {
			return true;
		}
		else return false;
	}

	// Will erase all Games
	empty() {
		this.listOfGames = [];
	}

	add(Game) {
		this.listOfGames.push(Game);
	}

	remove(name) {
		for (let i = 0; i < this.listOfGames.length; i++) {
			var c = this.listOfGames[i];

			if (c.name == name) {
				console.log("trueeeee")
				// remove the Game at index i
				this.listOfGames.splice(i, 1);
				// stop/exit the loop
				break;
			}
		}
	}

	sort() {
		// As our array contains objects, we need to pass as argument
		// a method that can compare two Games.
		// we use for that a class method, similar to the distance(p1, p2)
		// method we saw in the ES6 Point class in module 4
		// We always call such methods using the name of the class followed
		// by the dot operator
		this.listOfGames.sort(GameManager.compareByName);
		cm.displayGamesAsATable("Games", currentPage, currentPage + 4);
	}

	sort_Availability() {
		// As our array contains objects, we need to pass as argument
		// a method that can compare two Games.
		// we use for that a class method, similar to the distance(p1, p2)
		// method we saw in the ES6 Point class in module 4
		// We always call such methods using the name of the class followed
		// by the dot operator
		this.listOfGames.sort(GameManager.compareByAV);
		cm.displayGamesAsATable("Games", currentPage, currentPage + 4);

	}
	sort_pb() {
		// As our array contains objects, we need to pass as argument
		// a method that can compare two Games.
		// we use for that a class method, similar to the distance(p1, p2)
		// method we saw in the ES6 Point class in module 4
		// We always call such methods using the name of the class followed
		// by the dot operator
		this.listOfGames.sort(GameManager.compareBypb);
		cm.displayGamesAsATable("Games", currentPage, currentPage + 4);

	}
	sort_cat() {
		// As our array contains objects, we need to pass as argument
		// a method that can compare two Games.
		// we use for that a class method, similar to the distance(p1, p2)
		// method we saw in the ES6 Point class in module 4
		// We always call such methods using the name of the class followed
		// by the dot operator
		this.listOfGames.sort(GameManager.compareBycat);
		cm.displayGamesAsATable("Games", currentPage, currentPage + 4);

	}
	sort_date() {
		// As our array contains objects, we need to pass as argument
		// a method that can compare two Games.
		// we use for that a class method, similar to the distance(p1, p2)
		// method we saw in the ES6 Point class in module 4
		// We always call such methods using the name of the class followed
		// by the dot operator
		this.listOfGames.sort(GameManager.compareBydate);
		cm.displayGamesAsATable("Games", currentPage, currentPage + 4);

	}

	// class method for comparing two Games by name
	static compareByName(c1, c2) {
		// JavaScript has builtin capabilities for comparing strings
		// in alphabetical order
		if (c1.name < c2.name)
			return -1;

		if (c1.name > c2.name)
			return 1;

		return 0;
	}
	static compareByAV(c1, c2) {
		// JavaScript has builtin capabilities for comparing strings
		// in alphabetical order
		if (c1.Availability < c2.Availability)
			return -1;

		if (c1.Availability > c2.Availability)
			return 1;

		return 0;
	}
	static compareBypb(c1, c2) {
		// JavaScript has builtin capabilities for comparing strings
		// in alphabetical order
		if (c1.publisher < c2.publisher)
			return -1;

		if (c1.publisher > c2.publisher)
			return 1;

		return 0;
	}
	static compareBycat(c1, c2) {
		// JavaScript has builtin capabilities for comparing strings
		// in alphabetical order
		if (c1.category < c2.category)
			return -1;

		if (c1.category > c2.category)
			return 1;

		return 0;
	}
	static compareBydate(c1, c2) {
		// JavaScript has builtin capabilities for comparing strings
		// in alphabetical order
		if (c1.release_date < c2.release_date)
			return -1;

		if (c1.release_date > c2.release_date)
			return 1;

		return 0;
	}



	printGamesToConsole() {
		this.listOfGames.forEach(function (c) {
			console.log(c.name);
		});
	}

	load() {
		if (localStorage.Games !== undefined) {
			// the array of Games is savec in JSON, let's convert
			// it back to a reak JavaScript object.
			this.listOfGames = JSON.parse(localStorage.Games);
		}
	}

	save() {
		// We can only save strings in local Storage. So, let's convert
		// ou array of Games to JSON
		localStorage.Games = JSON.stringify(this.listOfGames);
	}

	displayGamesAsATable(idOfContainer, start, end) {
		// empty the container that contains the results
		let container = document.querySelector("#" + idOfContainer);
		console.log("here")

		container.innerHTML = "";
		console.log("erroe")



		if (this.listOfGames.length === 0) {
			container.innerHTML = "<p>No Games to display!</p>";
			// stop the execution of this method
			return;
		}

		// creates and populate the table with users
		var table = document.createElement("table");
		var row = table.insertRow();
		row.innerHTML = "<tr><th>Cover Photo</th><th id='th_name'>Name of the Game</th><th id='th_av'>Availability</th><th id='th_pb'>Publisher</th><th id='th_cat'>Category</th><th id='th_rl'>Release Date</th><th>Delete</th></tr>"
		// iterate on the array of users
		let k = 0;
		this.listOfGames.forEach(function (currentGame) {
			if (k >= start && k < end) {
				var row = table.insertRow();
				console.log("i am printing row")
				let name_temp = '"' + currentGame.name + '"';
				row.innerHTML = "<tr><td><img class='cover-photo' src=" + currentGame.cover_url + "alt='Game Cover'></td>" +
					"<td>" + currentGame.name + "</td>" +
					"<td>" + currentGame.Availability + "</t+d>" +
					"<td>" + currentGame.publisher + "</td>" +
					"<td>" + currentGame.category + "</td>" +
					"<td>" + currentGame.release_date + "</td>" +
					"<td><button class='delete-button' onclick='deleteRow(" + name_temp + ");'><i class='fa fa-trash-o' aria-hidden='true'></i></button></td></tr>"
			}
			k += 1
		});

		// adds the table to the div
		container.appendChild(table);
		events();
	}


}