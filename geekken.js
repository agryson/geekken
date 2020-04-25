let unlibre = require('unlibre-tables')
let RPG = require('rpg-core')

const tables = unlibre.geekken;

let handleDoubles = function(table) {
	let d1, d2;
	let maxResults = 1;
	let result = [];

	while (result.length < maxResults) {
		d1 = RPG.d(8);
		d2 = RPG.d(8);
		let potential = table[d1 - 1][d2 - 1];
		if ((d1 == 8 && d2 == 8) || result.includes(potential)) {
			maxResults = 2;
		} else {
			result[result.length] = potential;
		}
	}

	return result;
}

let multiLoc = function() {
	let result = [];
	for(let i = RPG.lookup(tables.locNumber); i >= 0; i--) {
		result.push(handleDoubles(tables.place));
	}
	
	return result;
}

let geekken = function(params = {}) {
	let mission = {};
	mission.goal = tables.verb[RPG.d(8) - 1][RPG.d(8) - 1];
	mission.target = tables.noun[RPG.d(8) - 1][RPG.d(8) - 1];
	if (params.multiLoc) {
		mission.area = multiLoc();
	} else {
		mission.area = handleDoubles(tables.place);
	}
	if(params.complication) {
		mission.complication = tables.complication[RPG.d(8) - 1][RPG.d(8) - 1];
	}
	if(params.enemy) {
		mission.enemy = handleDoubles(tables.opposition);
	}
	return mission;
}


module.exports = geekken;
