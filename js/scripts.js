
/**
  @typedef
	@type raceViewModel
	@property {string} name
  @property {string} selfPath
  @property {string} date
*/

/**
  @typedef
  @type resultsViewModel
  @property {number} position
  @property {string} name
  @property {string} resultsPath
  @property {string} time
  @property {string} sex
  @property {string} sexPosition
  @property {string} ageCategory
  @property {string} ageCategoryPosition
  @property {string} bibNumber
  @property {string} racerId
*/

/**
  @typedef raceResultViewModel
  @type {Object}
  @property {raceViewModel} race The x coordinate.
  @property {Array.<resultsViewModel>} results List of race result records
*/

document.addEventListener("DOMContentLoaded", function(event) {
  onPageLoad();
});

function onPageLoad(){
	xhr.httpGetAsync("/feed/races", function(response){
		var obj = JSON.parse(response);
		var items = processRaces(obj["races"]);
		rm.render.drawRaces(items);
	})
};

function renderRaceResults(url){
	xhr.httpGetAsync(url, function(response){
		var obj = JSON.parse(response);
		var raceResultViewModel = processRaceResults(obj["racers"], obj["results"], obj["races"]);
		rm.render.clearPage();
		rm.render.drawRaceResultsTable(raceResultViewModel);
	})
};

function renderRacerResults(url){
	//url is the self path
	xhr.httpGetAsync(url, function(response){
		var obj = JSON.parse(response);

		var resultsPath = obj["resultsPath"]
		var profilePath = obj["profilePath"]

		xhr.httpGetAsync(resultsPath, function(response){
			var obj = JSON.parse(response);
			var items = processRacerResults(obj["racers"], obj["results"], obj["races"]);
			rm.render.drawRacerResults(items);

			xhr.httpGetAsync(profilePath, function(response){
				var obj = JSON.parse(response);
        rm.render.drawRacerName(obj["name"]);
				rm.render.drawRacerBirthdate(obj["birthDateLow"], obj["birthDateHigh"]);
			})
		})
	})
};

function processRaces(races){
	var items = {};

	races.forEach(function(race){
		items[race.date] = processRace(race)
	});

	//order by date.

	return items;
};

function processRace(race){

	return {
		name: race["name"],
		resultsPath: race["resultsPath"],
		date: race["date"],
		id: race["id"]
	}
};

/**
  * Takes the server object and creates a view model
  * @param {Object} racers
  * @param {Array.<Object>} results
  * @param {Object} races
  * @return {rm.data.viewModel.RacerResults}
  */
function processRacerResults(racers, results, races){

	var ret = {};

	ret.raceResults = [];

	for (var i = 0; i < results.length; i++) {
  	ret.raceResults.push(processRaceResults(racers, [results[i]], races));
	}

	ret.racer = racers[results[0].racerId];

	return ret;
};

/**
  * Takes the server object and creates a view model
  * @param {Object} racers
  * @param {Array.<Object>} results
  * @param {Object} races
  * @return {raceResultViewModel}
  */
function processRaceResults(racers, results, races){

	var items = [];

	for (var i = 0; i < results.length; i++) {
   	items.push(/** @type {resultsViewModel} */ ({
   		position: results[i].position,
   		name: results[i].name,
   		resultsPath: racers[results[i].racerId].resultsPath,
   		time: results[i].time,
   		sex: results[i].sex,
   		sexPosition: results[i].sexPosition,
   		ageCategory: results[i].ageCategory,
   		ageCategoryPosition: results[i].ageCategoryPosition,
   		bibNumber: results[i].bibNumber,
   		racerId: results[i].racerId,
   		racerSelfPath: racers[results[i].racerId].selfPath,
   	}))
	}

	/** @type {raceResultViewModel} */
	return {
		results: items,
		race: processRace(races[results[0].raceId])
	};
};

var rm = {};
rm.render = {};

rm.render.drawRaces = function(races){

	while (document.body.firstChild) {
    document.body.removeChild(document.body.firstChild);
	}

	var list = document.createElement("ul");

	var keys = Object.keys(races)

	keys.forEach(function(key){
		var h = document.createElement("li");
		var a = document.createElement("a");
		a.setAttribute('href', '#');
		a.setAttribute('data-results', races[key].resultsPath);
		a.setAttribute('data-race-id', races[key].id);
		a.textContent = races[key].date + ' ' + races[key].name;
		h.appendChild(a);
		list.appendChild(h);
	});

	document.body.appendChild(list);

	list.addEventListener("click", function( event ) {
		event.preventDefault();
		var dataResultsPath = event.target.getAttribute('data-results');
		var raceId = event.target.getAttribute('data-race-id');
		history.pushState({ type: 'raceResults', dataUrl: dataResultsPath}, "Race Results", "/races/" + raceId);
		renderRaceResults(dataResultsPath);
  }, false);
};


rm.render.drawRacerResults = function (racerResultsVM){
	rm.render.clearPage();

  var header = document.createElement("h1");
  header.setAttribute("id", "racer-name");
	document.body.appendChild(header);

  var birthdate = document.createElement("div");
	birthdate.setAttribute("id", "birthdate");
	document.body.appendChild(birthdate);

	racerResultsVM.raceResults.forEach(function(vm){
		rm.render.drawRaceResultsTable(vm, true);
	});
};

rm.render.drawRacerBirthdate = function(low, high){
	var div = document.body.querySelector("#birthdate");
	div.textContent = low + ' - ' + high;
}

rm.render.drawRacerName = function(name){
	var div = document.body.querySelector("#racer-name");
	div.textContent = name;
}

/**
  * Renders the results table to the page
  * @param {raceResultViewModel} results
  */
rm.render.drawRaceResultsTable = function(results, opt_racerView){
	var table = rm.render.getRaceResultsTable(results, opt_racerView);
	document.body.appendChild(table);
};

/**
  * @param {raceResultViewModel} results
  * @return {Element}
  */
rm.render.getRaceResultsTable = function (results, opt_racerView){

	var container = document.createElement("div");

	var header = document.createElement("h1");
	header.textContent = results.race.name;
	container.appendChild(header);

	var dateHeader = document.createElement("h3");
	dateHeader.textContent = results.race.date;
	container.appendChild(dateHeader);

	if (opt_racerView){
		var allResults = document.createElement("a");
		allResults.setAttribute("href", "#");
		allResults.setAttribute("data-race-results", results.race.resultsPath);
		allResults.setAttribute("data-race-id", results.race.id);
		allResults.textContent = 'view all';
		container.appendChild(allResults);

		allResults.addEventListener("click", function( event ) {
			event.preventDefault();
			var dataResultsPath = allResults.getAttribute("data-race-results");
			var raceId = allResults.getAttribute("data-race-id");
			history.pushState({ type: 'raceResults', dataUrl: dataResultsPath }, "Race Results", "/races/" + raceId);
			renderRaceResults(dataResultsPath);
		});
	}



	var table = document.createElement("table");

	var thead = document.createElement("thead");

	var headers = ["Position", "Bib", "Name", "Time", "M/F", "Age", "Age Position"];

	headers.forEach(function(txt){
		var h = document.createElement("th");
		h.textContent = txt;
		thead.appendChild(h);
	});

	table.appendChild(thead);

	var results = results.results

	for (var i = 0; i < results.length; i++) {
		var tr = document.createElement("tr");
		tr.setAttribute('data-racer-results', results[i].resultsPath);
		tr.setAttribute('data-racer-id', results[i].racerId);
		tr.setAttribute('data-racer-selfpath', results[i].racerSelfPath);

		var pos = document.createElement("td");
   	pos.textContent = results[i].position;

   	var bib = document.createElement("td");
   	bib.textContent = results[i].bibNumber;

		var name = document.createElement("td");
   	name.textContent = results[i].name;

   	var time = document.createElement("td");
   	time.textContent = results[i].time;

   	var sex = document.createElement("td");
   	sex.textContent = results[i].sex + '(' + results[i].sexPosition + ')';

   	var ageCategory = document.createElement("td");
   	ageCategory.textContent = results[i].ageCategory;

   	var ageCategoryPosition = document.createElement("td");
   	ageCategoryPosition.textContent = results[i].ageCategoryPosition;

   	ageCategoryPosition

   	tr.appendChild(pos);
   	tr.appendChild(bib);
		tr.appendChild(name);
		tr.appendChild(time);
		tr.appendChild(sex);
		tr.appendChild(ageCategory);
		tr.appendChild(ageCategoryPosition);
		table.appendChild(tr);
	}


	table.addEventListener("click", function( event ) {
		event.preventDefault();

		var search = true;
		var ele = event.target;
		var racerSelfPath, racerId;

		while (search){
			var att = ele.getAttribute('data-racer-selfpath');
			if (att == '' || att == null) {
				if (ele.tagName == "TD"){
					if (ele.parentNode.tagName == "TR"){
						ele = ele.parentNode;
					}
				}
				else{
					break;
				}
			}
			else{
  				racerSelfPath = ele.getAttribute('data-racer-selfpath');
  				racerId = ele.getAttribute('data-racer-id');
  				search = false;
			}
		}


		if (racerSelfPath != undefined){
			history.pushState({ type: 'racerResults', dataUrl: racerSelfPath}, "help", "/racer/" + racerId);
			renderRacerResults(racerSelfPath);
		}

  }, false);

	container.appendChild(table);

	return container;
};


rm.render.clearPage = function(){
	while (document.body.firstChild) {
    document.body.removeChild(document.body.firstChild);
	}
}

/**
  * @param {raceResultViewModel} results
  * @return {Element}
  */
rm.render.getLongDate = function(date){

	var d = new Date();
	d.setYear();
	d.setMonth();
	d.setDay();

}



window.onpopstate = function(event) {

	if (event.state == null){
		onPageLoad();
	}
	else if (event.state.type == 'raceResults'){
		renderRaceResults(event.state.dataUrl);
	}
	else if (event.state.type == 'racerResults'){
		renderRacerResults(event.state.dataUrl);
	}
};


var xhr = {}

xhr.httpGetAsync = function(url, callback){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}
