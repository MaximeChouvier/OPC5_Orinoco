// Ouvre une requête à l'API, puis récupére la réponse dans "response"
var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);

        response.forEach(injectSingleItem);
    };
};
//Récupère "javascript__injection" pour injecter par la suite la liste des produits.
function injectSingleItem(item){
    let wrapperDiv = document.getElementById("javascript__injection");

    //Crée un lien enveloppant chaque produit, lors du click l'utilisateur est redirigé vers
    //la page produit tout en passant l'ID du produit voulu en paramètre URL
    let parentDiv = document.createElement("a");
    parentDiv.className = "productList_wrapper productWrapperLink";
    parentDiv.href = "./SubPages/produits.html?" + item._id;
    
    let leftWrapper = createLeftWrapper(parentDiv);
    let rightWrapper = createRightWrapper(parentDiv);

    createAllElements(item, leftWrapper, rightWrapper);
    
    wrapperDiv.appendChild(parentDiv);
};
//Crée un wrapper pour l'affichage d'un produit
function createLeftWrapper(parentDiv){
    let leftWrapper = document.createElement("div");
    leftWrapper.className = "productList_wrapper_left";
    parentDiv.appendChild(leftWrapper);

    return leftWrapper;
}
//Crée un wrapper pour l'affichage d'un produit
function createRightWrapper(parentDiv){
    let rightWrapper = document.createElement("div");
    rightWrapper.className = "productList_wrapper_right";
    parentDiv.appendChild(rightWrapper);

    return rightWrapper;
}
//Fait appel aux fonctions qui créeront les éléments d'un produits
function createAllElements(item, leftWrapper, rightWrapper) {
    itemTitle(item, rightWrapper);
    itemPrice(item, rightWrapper);
    itemDescription(item, rightWrapper);
    itemImage(item, leftWrapper);
    itemCustomChoices(item, rightWrapper);
};
//Obtient et crée l'image d'un produit
function itemImage(item, leftWrapper){
    let itemImage = document.createElement("img");
    itemImage.className = "productPreview teddyImage";
    itemImage.src = item.imageUrl;
    leftWrapper.appendChild(itemImage);
};
//Obtient et crée le titre d'un produit
function itemTitle(item, rightWrapper){
    let itemTitle = document.createElement("h1");
    itemTitle.className = "productTitle underline font teddyName centered";
    itemTitle.innerHTML = item.name;
    rightWrapper.appendChild(itemTitle);
};
//Obtient et crée le prix d'un produit
function itemPrice(item, rightWrapper){
    let itemPrice = document.createElement("h2");
    itemPrice.className = "productPrice underline font teddyPrice centered";
    itemPrice.innerHTML = dotPrice(item);
    rightWrapper.appendChild(itemPrice);
};
//Pour plus de clartée, crée un prix comportant un point afin d'afficher les centimes, ex : "3900" devient "39.00 €"
function dotPrice(item){
    let item_price = item.price.toString();
    let result = item_price.slice(0, -2) + "." + item_price.slice(-2) + " €";
    return(result)
}
//Obtient et crée la description d'un produit
function itemDescription(item, rightWrapper){
    let itemDescription = document.createElement('p');
    itemDescription.innerHTML = item.description;
    itemDescription.className = 'productDescription underline font teddyDesc centered';
    rightWrapper.appendChild(itemDescription);
};
//Obtient et crée la liste des options de customisation d'un produit
function itemCustomChoices(item, parentDiv){
    let itemCustomChoices = document.createElement('p');
    itemCustomChoices.innerHTML = "Couleurs : " + item.colors;
    itemCustomChoices.className = 'productColors underline font teddyColors centered';
    parentDiv.appendChild(itemCustomChoices);
};
//Ouvre la requête, puis l'envoie
request.open("GET", "http://localhost:3000/api/teddies");
request.send();