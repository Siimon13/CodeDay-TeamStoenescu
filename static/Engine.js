





function room(name,length,width,doors,events){
	this.name = name;
	this.length = length;
	this.width = width;
	this.doors = doors;
	this.events = events;
}

var game_rooms = [
	new room("kitchen",4,4,["hallway","living_room"],false),
	new room("bathroom",2,2,["hallway"],false),
	new room("living_room",5,5,["hallway","foyer","living_room"],false),
	new room("closet",1,1,["bedroom"],"sticks"),
	new room("hallway",8,2,["kitchen","living_room","bathroom","bedroom"],false),
	new room("bedroom",4,6,["closet","hallway"],"skeletonScream"),
	new room("foyer",2,2,["living_room"],false),
	];

function player (name, currentRoom) {
	this.name = name;
	this.currentRoom = currentRoom;
	this.hp = 2;
	this.inventory = 0;
}

var timewait = false;

var room_that_hear_sound;

var current_player = new player("player1",game_rooms[0]);

var play_sound = function(num){
	$.getScript("../static/sip-devel.min.js", function(){});
	$.getScript("../static/sip_messages.js", function(){});
	$.getScript("../static/jquery-latest.js", function(){});
 
	if(num == 0){
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
	if(num == 1){
		current_player.currentRoom.doors.push(current_player.currentRoom.name);//[current_player.currentRoom.name,current_player.currentRoom.doors];
		room_that_hear_sound = current_player.currentRoom.doors;
	}
	if(num == 2){
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
	send_message(list); // should send message


	//document.getElementById("myDiv").innerHTML = document.getElementById("myDiv").innerHTML + room_that_hear_sound;
}

var move_room = function(xplayer, xroom, button){

	var timemove = (current_player.currentRoom.length + current_player.currentRoom.width) / 4;
	for (var i = current_player.currentRoom.doors.length - 1; i >= 0; i--){
		if (timewait) {break}
		if(current_player.currentRoom.doors[i] == xroom){
			//current_player.currentRoom = xroom;
			for (var j = game_rooms.length - 1; j >= 0; j--) {
				if (game_rooms[j].name == xroom) {
					current_player.currentRoom = game_rooms[j];
					timemove = 1000 *(((current_player.currentRoom.length + current_player.currentRoom.width) / 4) + timemove);
					highlight(button,(timemove / 1000)); 	
					timewait = true;
					setTimeout(function(){timewait = false}, timemove);
				}
			};
			//return current_player.currentRoom.doors;
			add_line("You tiptoe into the " + xroom + ".");// + " with a delay of " + timemove + ".");
			if(current_player.currentRoom.events != false){
				if(current_player.currentRoom.events == "sticks"){
					add_line("As you push carefully into this room, you tread on some twigs on the ground.");
					play_sound(0);
				}
				else if(current_player.currentRoom.events == "skeletonScream"){
					current_player.currentRoom.events = "skeletonNoScream";
					add_line("You creep into the room, and a skeleton falls across your path in front of you.");
					play_sound(1);
				}
				else if(current_player.currentRoom.events == "skeletonNoScream"){
					add_line("You edge into the room, and almost trip over the skeleton. You almost scream again, but manage to clamp your hand in front of your mouth.");

				}
			}

		}
	};
}

var skelly = true;
var search_skelly = function(){
	if (current_player.currentRoom.name == bedroom) {
		if(skelly){
			add_line("You search the skeleton. You find a Death Claw.");
			search_skelly = false;
			add_inventory(current_player.name, "Death Claw");
		}
		else{
			add_line("You've already searched the skeleton. You find nothing new.");
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
	document.getElementById("myDiv").innerHTML = current_player.inventory;
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

