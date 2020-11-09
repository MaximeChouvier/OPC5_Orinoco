var request = new XMLHttpRequest();

request.onreadystatechange = function() {
    
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log(response)

        response.forEach(injectSingleItem);

        

        function injectSingleItem(item){
            let wrapperDiv = document.getElementById("javascript__injection");
            let parentDiv = document.createElement("a");
            parentDiv.className = ("productList_wrapper productWrapperLink")
            parentDiv.href = ("#")
            
            let leftWrapper = document.createElement("div");
            leftWrapper.className = ("productList_wrapper_left");
            parentDiv.appendChild(leftWrapper);
    
            let rightWrapper = document.createElement("div");
            rightWrapper.className = ("productList_wrapper_right");
            parentDiv.appendChild(rightWrapper);
            
            createAllElements(item, parentDiv, leftWrapper, rightWrapper);
            

            wrapperDiv.appendChild(parentDiv);
        };
    };
};
function itemTitle(item, rightWrapper){
    let itemTitle = document.createElement("h1");
    itemTitle.className = ("productTitle underline font teddyName");
    itemTitle.innerHTML = item.name;
    rightWrapper.appendChild(itemTitle);
};
function itemPrice(item, rightWrapper){
    let itemPrice = document.createElement("h2");
    itemPrice.className = ("productPrice underline font teddyPrice");
    itemPrice.innerHTML = item.price + " €";
    rightWrapper.appendChild(itemPrice);
};
function itemImage(item, leftWrapper){
    let itemImage = document.createElement("img");
    itemImage.className = ("productPreview teddyImage");
    itemImage.src = item.imageUrl;
    leftWrapper.appendChild(itemImage);
};
function itemDescription(item, rightWrapper){
    let itemDescription = document.createElement('p');
    itemDescription.innerHTML = item.description;
    itemDescription.className = 'productDescription underline font teddyDesc';
    rightWrapper.appendChild(itemDescription);
};
function itemCustomChoices(item, parentDiv){
    let itemCustomChoices = document.createElement('p');
    itemCustomChoices.innerHTML = ("Couleurs : ") + item.colors;
    itemCustomChoices.className = 'productColors underline font teddyColors';
    parentDiv.appendChild(itemCustomChoices);
};
function createAllElements(item, parentDiv, leftWrapper, rightWrapper) {
    itemTitle(item, rightWrapper);
    itemPrice(item, rightWrapper);
    itemDescription(item, rightWrapper);
    itemImage(item, leftWrapper);
    itemCustomChoices(item, rightWrapper);
};


request.open("GET", "http://localhost:3000/api/teddies");
request.send();