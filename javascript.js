var request = new XMLHttpRequest();

request.onreadystatechange = function() {
    
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log(response)

        response.forEach(injectSingleItem);

        let wrapperDiv = document.getElementById("javascript__injection");

        function injectSingleItem(item){
            
            let parentDiv = document.createElement("div");

            
            
            

            createAllElements.addAllElementstoParent(Elements);

            wrapperDiv.appendChild(parentDiv);
        };
    };
};

function itemTitle(item){
    let itemTitle = document.createElement("h1");
    itemTitle.className = ("productTitle underline font teddyName");
    itemTitle.innerHTML = item.name;
};
function itemPrice(item){
    let itemPrice = document.createElement("h2");
    itemPrice.className = ("productPrice");
    itemPrice.innerHTML = item.price + " €"
};
function itemImage(item){
    let itemImage = document.createElement("img");
    itemImage.className = ("productPreview");
    itemImage.src = item.imageUrl;
};
function itemDescription(item){
    let itemDescription = document.createElement('p');
    itemDescription.innerHTML = item.description;
    itemDescription.className = 'productDescription underline font teddyDesc';
};
function itemCustomChoices(item){
    let itemCustomChoices = document.createElement('p');
    itemCustomChoices.innerHTML = ("Couleurs : ") + item.colors;
    itemCustomChoices.className = 'productColors underline font teddyColors';
};
function createAllElements(Elements) {
    itemTitle(item, parentDiv);
    itemPrice(item, parentDiv);
    itemDescription(item, parentDiv);
    itemImage(item, parentDiv);
    itemCustomChoices(item, parentDiv);
};
function addAllElementstoParent(Elements){
    Elements.appendChild(parentDiv);
};

request.open("GET", "http://localhost:3000/api/teddies");
request.send();