document.getElementById("logoutLink").addEventListener("click", function(event) {
    localStorage.clear();
    window.location.href = "/janeiwebsite/index.html";
    noBack();
});


function noBack() {
    window.history.forward();
}

noBack();
window.onload = noBack;
window.onpageshow = function(evt) { if (evt.persisted) noBack(); }