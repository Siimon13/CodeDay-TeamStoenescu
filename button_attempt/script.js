var swagCount = 0;

var changethis = document.getElementById("changethis");
var gain = function(){
    swagCount++;
    changethis = swagCount.toString();
    
}

var lose = function(){
    swagCount--;
    changethis = swagCount.toString();

}


var moreSwag = document.getElementById('b1');
moreSwag.addEventListener('click',gain);

var lessSwag = document.getElementById('b2');
lessSwag.addEventListener('click',lose);
