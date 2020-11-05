var request = new XMLHttpRequest();

request.onreadystatechange = function() {
    
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log(response)

        response.forEach(injectSingleItem);

        

        function injectSingleItem(item){
            let wrapperDiv = document.getElementById("javascript__injection");
            let parentDiv = document.createElement("div");

            
            
            

            createAllElements(item, parentDiv);
            

            wrapperDiv.appendChild(parentDiv);
        };
    };
};
function itemTitle(item, parentDiv){
    let itemTitle = document.createElement("h1");
    itemTitle.className = ("productTitle underline font teddyName");
    itemTitle.innerHTML = item.name;
    parentDiv.appendChild(itemTitle);
};
function itemPrice(item, parentDiv){
    let itemPrice = document.createElement("h2");
    itemPrice.className = ("productPrice");
    itemPrice.innerHTML = item.price + " €"
    parentDiv.appendChild(itemPrice)
};
function itemImage(item, parentDiv){
    let itemImage = document.createElement("img");
    itemImage.className = ("productPreview");
    itemImage.src = item.imageUrl;
    parentDiv.appendChild(itemImage)
};
function itemDescription(item, parentDiv){
    let itemDescription = document.createElement('p');
    itemDescription.innerHTML = item.description;
    itemDescription.className = 'productDescription underline font teddyDesc';
    parentDiv.appendChild(itemDescription)
};
function itemCustomChoices(item, parentDiv){
    let itemCustomChoices = document.createElement('p');
    itemCustomChoices.innerHTML = ("Couleurs : ") + item.colors;
    itemCustomChoices.className = 'productColors underline font teddyColors';
    parentDiv.appendChild(itemCustomChoices)
};
function createAllElements(item, parentDiv) {
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