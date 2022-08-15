document.getElementById("poll button").addEventListener("click", function(){
    document.querySelector(".popup").style.visibility = "visible";
})
document.querySelector(".done").addEventListener("click", function(){
    document.querySelector(".popup").style.visibility = "hidden";
})
