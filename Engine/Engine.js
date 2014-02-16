function room(name,length,width,doors){
	this.name = name;
	this.length = length;
	this.width = width;
	this.doors = doors;
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
	this.inventory = 0;
}

function event(type,noise,damage,source_room,destination_room){
	this.type = type;
	this.noise = noise;
	this.damage = damage;
	this.source_room = source_room;
	this.destination_room = destination_room;
}

var timewait = false;

var room_that_hear_sound;

var current_player = new player("player1",game_rooms[0]);

var play_sound = function(num){
	if(num == 1){
		room_that_hear_sound = current_player.currentRoom.name;
		if(current_player.currentRoom.name == room_that_hear_sound){
			alert("Sound Played");
		}
	}
	if(num == 2){
		room_that_hear_sound = [current_player.currentRoom.name,current_player.currentRoom.doors];
	}
	if(num == 3){
		room_that_hear_sound = game_rooms;
	}
	if($.contains(current_player.currentRoom.name, room_that_hear_sound) != -1 && num != 1){
		alert("Sounded")
	}
	//document.getElementById("myDiv").innerHTML = document.getElementById("myDiv").innerHTML + room_that_hear_sound;
}


roomcheck1 = true;
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
			add_line("You moved into the " + xroom + " with a delay of " + timemove + ".");
				if(current_player.currentRoom.name == "closet"){
					add_line(". You step on some sticks as you walk in.");
					play_sound(1);
					new event(0,1,3,"closet","closet");
				}
				else if(current_player.currentRoom.name == "bedroom"  && roomcheck1 == true){
					roomcheck1 = false;
					add_line(". You walk into the room and see the skeleton. You scream in fright.");
					play_sound(2);
					new event(0,2,3,"closet","closet");
				}
				else if(current_player.currentRoom.name == "bedroom"){
					add_line(". You walk into the room and see the skeleton. You calm yourself, as you saw it before.");

				}
			changeDisplay(current_player.currentRoom);	
			}
	}
}

var changeDisplay = function(xroom){
for(var i = 0; i < game_rooms.length; i++){
	if(xroom.doors.indexOf(game_rooms[i].name) > -1){
		document.getElementById(game_rooms[i].name).style.display="inline";
	}
	else{
		document.getElementById(game_rooms[i].name).style.display="none";
	}
}
if(current_player.currentRoom.name == "bedroom"){
	document.getElementById("search").style.display="inline";
}
else{
	document.getElementById("search").style.display="none";
}
}

var skelly = true;
var search_loot = function(){
	if (current_player.currentRoom.name == "bedroom") {
		if(skelly == true){
			add_line("You search the skeleton. You find a Death Claw.");
			skelly = false;
			add_inventory(current_player.name, "Death Claw");
		}
		else{
			add_line("You already searched the skeleton. You find nothing new.");
		}
	}
}

var add_inventory = function(player_name, item){
	if(current_player.inventory == 0){
		current_player.inventory = item;
	}
	else{
		current_player.inventory = [current_player.inventory, item];
	}
}

var show_inventory = function(){
	if (current_player.inventory == 0) {
		add_line("You have nothing in your inventory.");
	}
	else{
	add_line(current_player.inventory);
}
}

var add_line = function(toshow){
	 var container = document.getElementById('events');
        var new_element = document.createElement('li');
        new_element.innerHTML += toshow;
        container.insertBefore(new_element, container.firstChild);
     //$(container).prepend("<li>" + toshow + "</li>");
}
		
/////////////////////////////////////////////////////////////

