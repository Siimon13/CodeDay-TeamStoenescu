
var message;
var userAgent;
var messages="<br>";


userAgent=new SIP.UA ();
userAgent.start();
read_message();

function send_message(data){
	var new_message = to_string(data);//document.getElementById("txtbx").value; WE NEED TO CHANGE THIS
	userAgent.message("messages@codeday.onsip.com",new_message);

}

function read_message(){
	var conf = new SIP.UA('messages@codeday.onsip.com').
		on('message', function (message){
			if(message){
				var info = tolist(message.body);
				// decide whether to play a sound
				// if we should play a sound according to the data
				for (var string in info) {
					if (current_player.currentRoom.name == string) {
						for (var soundname in info) {
							if (soundname == "scream"){
								var audio = new Audio('../static/scream.mp3');
								audio.play();
								break;
							} else if (soundname == "twig") {
								var audio = new Audio('../static/twig.mp3');
								audio.play();
								break;
							}


						}
					}
				}
				// (we comepare data room to our own room)
				// then we play sound
			}
		})
	conf.start();
	
}

function to_list(string) {
	var ans = string.split(" ");
	return ans;
}

function to_string(list) {
	var ans = list.join(" ");
	return ans;
}
