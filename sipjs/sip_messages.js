
var message;
var userAgent;
var messages="<br>";


userAgent=new SIP.UA ();
userAgent.start();
read_message();

function send_message(){
	var new_message = document.getElementById("txtbx").value;
	userAgent.message("messages@codeday.onsip.com",new_message);
}

function read_message(){
	var conf = new SIP.UA('messages@codeday.onsip.com').
		on('message', function (message){
			if(message){
			messages = messages+message.body+"<br>";
			document.getElementById("stuff").innerHTML=messages;
			}
		})
	conf.start();
	
}