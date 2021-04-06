var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText); 

        injection(response);
    }
};
function injection(response){
    let parentDiv = document.getElementById("javascript__injection");
    let productContainer = document.getElementById("productContainer");
    let productContainer_upper = document.getElementById("productContainer_upper");
    let lower = document.getElementById("lower");
    let upper_left = document.getElementById("upper_left");
    let upper_right = document.getElementById("upper_right");
    createAllElements(response, upper_left, upper_right, lower);
}
function createAllElements(response, upper_left, upper_right, lower){          
    let colorList = [];
    colorList = response.colors;

    createPreview(response, upper_left);
    createTitle(response, upper_right);
    createDescription(response, upper_right);
    createColorsChoices(colorList, lower);
    createPrice(response, lower);
    createButton(lower)
}
function createPreview(response, upper_left){
    let productPreview = document.createElement("img");
    productPreview.className = "productPreview centered";
    productPreview.id = "productImage";
    productPreview.src = response.imageUrl;
    upper_left.appendChild(productPreview);
}
function createTitle(response, upper_right){
    let productTitle = document.createElement("h1");
    productTitle.className = "productTitle underline font teddyName centered";
    productTitle.innerHTML = response.name;
    productTitle.id = "productName";
    upper_right.appendChild(productTitle);
}
function createDescription(response, upper_right){
    let productDescription = document.createElement('p');
    productDescription.innerHTML = response.description;
    productDescription.className = 'productDescription underline font teddyDesc centered';
    upper_right.appendChild(productDescription);
}
function createColorsChoices(colorList, lower){
    let productForm = document.createElement("form");
    lower.appendChild(productForm);

    let colorSelect = document.createElement("select");
    colorSelect.name = "colorChoiceList";
    colorSelect.id = "colorChoices";
    colorSelect.className = "teddy-colors";
    productForm.appendChild(colorSelect);
    
    for (var i = 0; i < colorList.length; i++){
        let colorSelect_option = document.createElement("option");
        colorSelect_option.setAttribute("color", colorList[i]);
        colorSelect_option.text = colorList[i];
        colorSelect_option.className = "colorSelect_option";
        colorSelect.appendChild(colorSelect_option);
    }
}
function createPrice(response, lower){
    let productPrice = document.createElement("h2");
    productPrice.className = "productPrice font";
    productPrice.id = "teddyPrice";
    productPrice.innerHTML = dotPrice(response);
    lower.appendChild(productPrice);
}
function dotPrice(response){
    let item_price = response.price.toString();
    let result = item_price.slice(0, -2) + "." + item_price.slice(-2) + " €";
    return(result)
}
function createButton(lower, productId){
    let cartButton = document.getElementById("addCartButton");
    cartButton.href = "./panier.html";
    lower.appendChild(cartButton);

    document.getElementById("addCartButton").addEventListener("click", function() {
        let productColor = document.getElementById("colorChoices");
        let productId = window.location.search.substr(1);
        let productPrice = document.getElementById("teddyPrice");
        let productImage = document.getElementById("productImage")
        let productName = document.getElementById("productName");
        let storage = JSON.parse(localStorage.getItem("Orinoco"));
        
        if (storage == null){
            handleNullStorage(productColor, productId, productPrice, productImage, productName)
        } else {
            pushProductToStorage(productColor, productId, productPrice, productImage, productName, storage);
        }
    });
}
function productDependingOnParameter(){
    let currentUrlParameter = window.location.search.substr(1);
    return currentUrlParameter;
}
function sendRequest (request, productId){
    request.open("GET", "http://localhost:3000/api/teddies/" + productId.toString());
    request.send();
}
function handleNullStorage(productColor, productId, productPrice, productImage, productName){
    let storage = [];
    let newObj = {id:productId, color:productColor.value, 
    price:productPrice.innerHTML, image:productImage.src, name:productName.innerHTML}
    storage.push(newObj);
    console.log(storage);
    localStorage.setItem("Orinoco", (JSON.stringify(storage)));
    window.alert("L'objet à bien été ajouté au panier :)")
    redirectHome();
}
function pushProductToStorage(productColor, productId, productPrice, productImage, productName, storage){
    let newObj = {id:productId, color:productColor.value, 
    price:productPrice.innerHTML, image:productImage.src, name:productName.innerHTML}
    storage.push(newObj);
    console.log(storage)
    localStorage.setItem("Orinoco", (JSON.stringify(storage)));
    window.alert("L'objet à bien été ajouté au panier :)")
    redirectHome();
}
function redirectHome(){
    setTimeout(function(){document.location.href = "../index.html"},100);
}
let productId = productDependingOnParameter();
sendRequest(request, productId);