function highlight(b, time) {
	var milli = time * 1000;
	console.log("heyyy");
	b.style.backgroundColor="rgb(100, 0, 0)";
	$(b).animate({backgroundColor:"black"},milli);
}
