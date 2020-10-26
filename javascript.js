var request = new XMLHttpRequest();


request.onreadystatechange = function() {
    let teddyName = document.getElementById("teddyName")
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        teddyName.innerHTML(response[1].name).toString 
    }
};


request.open("GET", "http://localhost:3000/api/teddies");
request.send();