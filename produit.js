var request = new XMLHttpRequest();

request.onreadystatechange = function() {
    let teddyImage = document.getElementsByClassName("teddyImage").item(0);
    let teddyImage1 = document.getElementsByClassName("teddyImage").item(1);
    let teddyImage2 = document.getElementsByClassName("teddyImage").item(2);
    
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log(response)
        teddyImage.src = response[0].imageUrl;

        teddyImage1.src = response[1].imageUrl;

        teddyImage2.src = response[2].imageUrl;

    }
};


request.open("GET", "http://localhost:3000/api/teddies");
request.send();