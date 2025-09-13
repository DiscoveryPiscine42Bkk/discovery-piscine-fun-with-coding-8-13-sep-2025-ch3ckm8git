// document.addEventListener("DOMContentLoaded", function () { ->
$(document).ready(function () {
    $("#btn1").click(function () {

        // (255).toString(16); -> "ff"
        // (16777215).toString(16); -> "ffffff"
        $("body").css("background-color", "#" + Math.floor(Math.random() * 16777215).toString(16));
    });
});
