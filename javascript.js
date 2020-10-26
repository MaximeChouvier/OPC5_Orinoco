var request = new XMLHttpRequest();

request.onreadystatechange = function() {
    let teddyImage = document.getElementsByClassName("teddyImage").item(0);
    let teddyName = document.getElementsByClassName("teddyName").item(0);
    let teddyPrice = document.getElementsByClassName("teddyPrice").item(0);
    let teddyColors = document.getElementsByClassName("teddyColors").item(0);
    let teddyDesc = document.getElementsByClassName("teddyDesc").item(0);

    let teddyImage1 = document.getElementsByClassName("teddyImage").item(1);
    let teddyName1 = document.getElementsByClassName("teddyName").item(1);
    let teddyPrice1 = document.getElementsByClassName("teddyPrice").item(1);
    let teddyColors1 = document.getElementsByClassName("teddyColors").item(1);
    let teddyDesc1 = document.getElementsByClassName("teddyDesc").item(1);

    let teddyImage2 = document.getElementsByClassName("teddyImage").item(2);
    let teddyName2 = document.getElementsByClassName("teddyName").item(2);
    let teddyPrice2 = document.getElementsByClassName("teddyPrice").item(2);
    let teddyColors2 = document.getElementsByClassName("teddyColors").item(2);
    let teddyDesc2 = document.getElementsByClassName("teddyDesc").item(2);
    
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log(response)
        teddyImage.src = response[0].imageUrl;
        teddyName.innerHTML = response[0].name;
        teddyPrice.innerHTML = response[0].price + " €";
        teddyColors.innerHTML = response[0].colors;
        teddyDesc.innerHTML = response[0].description;

        teddyImage1.src = response[1].imageUrl;
        teddyName1.innerHTML = response[1].name;
        teddyPrice1.innerHTML = response[1].price + " €";
        teddyColors1.innerHTML = response[1].colors;
        teddyDesc1.innerHTML = response[1].description;

        teddyImage2.src = response[2].imageUrl;
        teddyName2.innerHTML = response[2].name;
        teddyPrice2.innerHTML = response[2].price + " €";
        teddyColors2.innerHTML = response[2].colors;
        teddyDesc2.innerHTML = response[2].description;
        
    }
};


request.open("GET", "http://localhost:3000/api/teddies");
request.send();