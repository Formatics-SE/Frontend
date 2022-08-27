document.getElementById("poll button").addEventListener("click", function(){
    document.querySelector(".popup").style.visibility = "visible";
})
document.querySelector(".done").addEventListener("click", function(){
    document.querySelector(".popup").style.visibility = "hidden";
})
document.getElementById("options").addEventListener("click", function(){
    document.querySelector(".add_option").style.visibility = "visible";
})
document.querySelector(".option_2").addEventListener("click", function(){
    document.querySelector(".add_option").style.visibility = "hidden";
})
