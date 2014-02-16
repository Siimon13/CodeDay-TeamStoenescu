function room(name,length,width,doors,events){
	this.name = name;
	this.length = length;
	this.width = width;
	this.doors = doors;
	//this.events = events;
}

var game_rooms = [
	new room("kitchen",4,4,["hallway","living_room"]),
	new room("bathroom",2,2,["hallway"]),
	new room("living_room",5,5,["hallway","foyer","living_room"]),
	new room("closet",1,1,["bedroom"]),
	new room("hallway",8,2,["kitchen","living_room","bathroom","bedroom"]),
	new room("bedroom",4,6,["closet","hallway"]),
	new room("foyer",2,2,["living_room"]),
	];

function player (name, currentRoom) {
	this.name = name;
	this.currentRoom = currentRoom;
	this.hp = 2;
}

var timewait = false;

var current_player = new player("player_1",game_rooms[0]);

var move_room = function(xplayer, xroom){
	var timemove = (current_player.currentRoom.length + current_player.currentRoom.width) / 4;
	for (var i = current_player.currentRoom.doors.length - 1; i >= 0; i--){
		if (timewait) {break}
		if(current_player.currentRoom.doors[i] == xroom){
			//current_player.currentRoom = xroom;
			for (var j = game_rooms.length - 1; j >= 0; j--) {
				if (game_rooms[j].name == xroom) {
					current_player.currentRoom = game_rooms[j];
					timemove = 1000 *(((current_player.currentRoom.length + current_player.currentRoom.width) / 4) + timemove);
					timewait = true;
					setTimeout(function(){timewait = false}, timemove);
				}
			};
			//return current_player.currentRoom.doors;
			document.getElementById("myDiv").innerHTML = "You moved into the " + xroom + " with a delay of " + timemove;

		}
	};
}
		
/////////////////////////////////////////////////////////////

