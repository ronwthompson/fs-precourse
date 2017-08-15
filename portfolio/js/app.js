document.getElementById("bodyid").addEventListener("wheel", function() { //remove arrow after scroll
	setTimeout(function(){ document.getElementById('downArrow').classList.remove('in-view');}, 500);
	setTimeout(function(){ document.getElementById('downArrow').classList.add('disappear');}, 500);
});

document.getElementById('navigation').addEventListener("click", function() { //remove arrow after click
    setTimeout(function(){ document.getElementById('downArrow').classList.remove('in-view');}, 500);
    setTimeout(function(){ document.getElementById('downArrow').classList.add('disappear');}, 500);
});