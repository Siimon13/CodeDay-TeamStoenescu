function room(name,length,width,doors,events){
	this.name = name;
	this.length = length;
	this.width = width;
	this.doors = doors;
}

var game_rooms = [
	new room("kitchen",4,4,["hallway","living_room"]),
	new room("bathroom",2,2,["hallway"]),
	new room("living_room",5,5,["hallway","foyer"]),
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

var current_player = new player("player1",game_rooms[6]);

var play_sound = function(num){
	$.getScript("../static/sip-devel.min.js", function(){});
	$.getScript("../static/sip_messages.js", function(){});
	$.getScript("../static/jquery-latest.js", function(){});
 
	if(num == 1){
		room_that_hear_sound = [current_player.currentRoom.name];
		if(current_player.currentRoom.name == room_that_hear_sound){
			if (current_player.currentRoom.name == "bedroom") {
				var audio = new Audio('../static/scream.mp3');
				audio.play();
			}
			else {
				var audio = new Audio('../static/twig.mp3');
				audio.play();
			}
		}
	}
	if(num == 2){
		current_player.currentRoom.doors.push(current_player.currentRoom.name);//[current_player.currentRoom.name,current_player.currentRoom.doors];
		room_that_hear_sound = current_player.currentRoom.doors;
	}
	if(num == 3){
		room_that_hear_sound = game_rooms;
	}
	var list = "ifyougetthis you just faileedddddd"
	if (current_player.currentRoom.name == "bedroom") {
		room_that_hear_sound.push("scream");
		var list = room_that_hear_sound;
	}
	if (current_player.currentRoom.name == "closet") {
		room_that_hear_sound.push("twig");
		var list = room_that_hear_sound;
	}

	if($.contains(current_player.currentRoom.name, room_that_hear_sound) != -1 && num != 0){
		// either twig or scream....
		if (current_player.currentRoom.name == "bedroom") {
			var audio = new Audio('../static/scream.mp3');
			audio.play();
		}
		else {
			var audio = new Audio('../static/twig.mp3');
			audio.play();
		}
	}
	//send_message(list); // should send message


	//document.getElementById("myDiv").innerHTML = document.getElementById("myDiv").innerHTML + room_that_hear_sound;
}

var room_move_count = 0;
roomcheck1 = true;
livingcheck1 = true;
var move_room = function(xplayer, xroom, button){
	var timemove = (current_player.currentRoom.length + current_player.currentRoom.width) / 4;
	for (var i = current_player.currentRoom.doors.length - 1; i >= 0; i--){
		if (timewait) {break}
		if(current_player.currentRoom.doors[i] == xroom){
			//current_player.currentRoom = xroom;
			for (var j = game_rooms.length - 1; j >= 0; j--) {
				if (game_rooms[j].name == xroom) {
					current_player.currentRoom = game_rooms[j];
					room_move_count++;
					timemove = 5000//1000 *(((current_player.currentRoom.length + current_player.currentRoom.width) / 4) + timemove);
					highlight(button,(timemove)); 
					timewait = true;
					setTimeout(function(){timewait = false}, timemove);
				}
			};
			//return current_player.currentRoom.doors;
			add_line("You tiptoe into the " + xroom + ".");// + " with a delay of " + timemove + ".");
			if(current_player.currentRoom.name == "closet"){
				add_line("As you push carefully into this room, you tread on some twigs on the ground.");
				play_sound(1);
				new event(0,1,3,"closet","closet");
			}
			else if(current_player.currentRoom.name == "bedroom"  && roomcheck1 == true){
				roomcheck1 = false;
				add_line("You creep into the room, and a skeleton falls across your path in front of you.");
				play_sound(2);
				new event(0,2,3,"closet","closet");
			}
			else if(current_player.currentRoom.name == "bedroom"){
				add_line("You edge into the room, and almost trip over the skeleton. You almost scream again, but manage to clamp your hand in front of your mouth.");

			} 
			else if(current_player.currentRoom.name == "living_room" && livingcheck1 == true){
				livingcheck1 = false;
				add_line("The corner of a note paper peeks out from under a dirty plate.");
			}

			else if(current_player.currentRoom.name == "bathroom" && switch_flip == true){
				add_line("As you walk in, you see the shower wall has crumbled away. Where the wall used to be now stands an ebony idol on a menacing pedestal.")
			}

			else if(current_player.currentRoom.name == "living_room"){
				game_end();
			}
				

			
			changeDisplay(current_player.currentRoom);	
		}

	}
}

var changeDisplay = function(xroom){
	
	for(var i = 0; i < game_rooms.length; i++){
		if(xroom.doors.indexOf(game_rooms[i].name) > -1){
			document.getElementById(game_rooms[i].name).style.display="inline";
			document.getElementById(game_rooms[i].name).style.color="white";
			document.getElementById(game_rooms[i].name).style.borderColor="white";
		}
		else{
			document.getElementById(game_rooms[i].name).style.color="black";
			document.getElementById(game_rooms[i].name).style.borderColor="black";
		}
		if(current_player.currentRoom.name == "bedroom"){
			document.getElementById("search").style.display="inline";
			document.getElementById("search").style.color="white";
			document.getElementById("search").style.borderColor="white";
		}
		else{
			document.getElementById("search").style.color="black";
			document.getElementById("search").style.borderColor="black";
		}
		if(current_player.currentRoom.name == "living_room" && note_die1 == true){
			document.getElementById("note1").style.display="inline";
			document.getElementById("note1").style.color="white";
			document.getElementById("note1").style.borderColor="white";
		}
		else{
			document.getElementById("note1").style.color="black";
			document.getElementById("note1").style.borderColor="black";
		}
		if(current_player.currentRoom.name == "closet"){
			document.getElementById("switch").style.display="inline";
			document.getElementById("switch").style.color="white";
			document.getElementById("switch").style.borderColor="white";
		}
		else{
			document.getElementById("switch").style.color="black";
			document.getElementById("switch").style.borderColor="black";
		}
		if(current_player.currentRoom.name == "bathroom" && switch_flip == true){
			document.getElementById("idol").style.display="inline";
			document.getElementById("idol").style.color="white";
			document.getElementById("idol").style.borderColor="white";
		}
		else{
			document.getElementById("idol").style.color="black";
			document.getElementById("idol").style.borderColor="black";
		}
	}
}




var note_die1 = true;
var read_note1 = function(){
	if (note_die1 == true && current_player.currentRoom.name == "living_room") {
		note_die1 = false;
		add_line("You read the note.")
		setTimeout(function(){add_line("My claws... they took my claws. I will rip out their souls. I want my claws.")}, 600);
		setTimeout(function(){add_line("The note disintergrates in your hand.")}, 3000);
		changeDisplay(current_player.currentRoom)
	}
}

var skelly = true;
var switch_flip = false;
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

var trigger_switch = function() {
	if(switch_flip == false && current_player.currentRoom.name == "closet"){
		switch_flip = true;
		add_line("You push an old rusty switch. It is nearly impossible to budge.")
	}
	else if(current_player.currentRoom.name == "closet"){
		switch_flip = false;
		add_line("You push an old rusty switch. It is nearly impossible to budge.")
}
}
var idol_take = true;
var bathroom_trigger = function() {
	if(idol_take == true && switch_flip == true && current_player.currentRoom.name == "bathroom"){
		add_line("You pry the idol from the stand.")
		idol_take = false;
		add_inventory(current_player.name,"Cursed Idol")
	}
	else if(idol_take == false){
		add_line("The pedestal is now bare, as the idol is now gone.")
	}
}

var game_end = function(){
	if(player.inventory == "Death ClawCursed Idol" || player.inventory == "Cursed IdolDeath Claw"){
		add_line("You try to quietly sneak your way into the room, but a giant harpie lunges at you, forcing you to jump out of the way. 'I see you have my treasures,' she shrieks. 'What will I ever do with you?'")
		changeDisplay("junk")
	}
}

var add_inventory = function(player_name, item){
	if(current_player.inventory == 0){
		current_player.inventory = item;
	}
	else{
		current_player.inventory = current_player.inventory + item;
	}
	document.getElementById("inv").innerHTML += item;
}

var show_inventory = function(){
	if (current_player.inventory == 0) {
		add_line("You have nothing in your inventory.");
	}
	else{
	document.getElementById("myDiv").innerHTML = current_player.inventory;
}
}

var remove_inventory = function(player_name,item){
if(current_player.inventory.length == 1){
current_player.inventory = 0;
}
else{
var x = current_player.inventory.indexOf(item);
splice(x,1);

}
}

var add_line = function(toshow){
	 var container = document.getElementById('events');
        var new_element = document.createElement('li');
        new_element.innerHTML += toshow;
        container.insertBefore(new_element, container.firstChild);
     //$(container).prepend("<li>" + toshow + "</li>");
}

$(document).ready(function() {
	changeDisplay(game_rooms[6]);
});
		
/////////////////////////////////////////////////////////////

