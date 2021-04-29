function sendRequest (){
    let productId = "http://localhost:3000/api/teddies/" + window.location.search.substr(1);

    const fetchPromise = fetch(productId);
    fetchPromise.then(response => {
    return response.json();
    }).then(teddies => {
    let response = teddies;
    injection(response);
    });
}
//Récupére les divs parentes puis fait appel à createAllElements
function injection(response){
    let lower = document.getElementById("lower");
    let upper_left = document.getElementById("upper_left");
    let upper_right = document.getElementById("upper_right");
    createAllElements(response, upper_left, upper_right, lower);
}
//Initialise un array contenant tout les choix de couleurs du produit
//Fait appel aux fonctions qui créeront les éléments du produit sélectionné
function createAllElements(response, upper_left, upper_right, lower){          
    let colorList = [];
    colorList = response.colors;

    createTitle(response, upper_right);
    createPreview(response, upper_left);
    createDescription(response, upper_right);
    createColorsChoices(colorList, lower);
    createPrice(response, lower);
    createButton(lower)
}

function createTitle(response, upper_right){
    let productTitle = document.createElement("h1");
    productTitle.className = "productTitle underline font teddyName centered";
    productTitle.innerHTML = response.name;
    productTitle.id = "productName";
    upper_right.appendChild(productTitle);
}

function createPreview(response, upper_left){
    let productPreview = document.createElement("img");
    productPreview.className = "productPreview centered";
    productPreview.id = "productImage";
    productPreview.src = response.imageUrl;
    upper_left.appendChild(productPreview);
}

function createDescription(response, upper_right){
    let productDescription = document.createElement('p');
    productDescription.innerHTML = response.description;
    productDescription.className = 'productDescription underline font teddyDesc centered';
    upper_right.appendChild(productDescription);
}
//Crée une liste déroulante contenant les options de customisations propre au produit
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
//Pour plus de clartée, crée un prix comportant un point afin d'afficher les centimes, ex : "3900" devient "39.00 €"
function dotPrice(response){
    let item_price = response.price.toString();
    let result = item_price.slice(0, -2) + "." + item_price.slice(-2) + " €";
    return(result)
}

function createButton(lower){
    let cartButton = document.getElementById("addCartButton");
    cartButton.href = "./panier.html";
    lower.appendChild(cartButton);

    //Lors du click sur le bouton, récupère ; la couleur sélectionnée - son ID - son prix - la src de son image - et son nom,
    //puis fait appel à pushProductToStorage
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
//Si le localStorage est vide ou n'existe pas, en crée un puis ajoute un objet contenant;  
//l'id du produit - la couleur choisie - son prix - la src de son image et son nom au localStorage 'Orinoco'
function handleNullStorage(productColor, productId, productPrice, productImage, productName){
    let storage = [];
    let newObj = {id:productId, color:productColor.value, 
    price:productPrice.innerHTML, image:productImage.src, name:productName.innerHTML}
    storage.push(newObj);
    localStorage.setItem("Orinoco", (JSON.stringify(storage)));
    window.alert("L'objet à bien été ajouté au panier :)")
    redirectHome();
}
//Crée puis ajoute au localStorage un objet contenant; 
//l'id du produit - la couleur choisie - son prix - la src de son image et son nom au localStorage 'Orinoco'
function pushProductToStorage(productColor, productId, productPrice, productImage, productName, storage){
    let newObj = {id:productId, color:productColor.value, 
    price:productPrice.innerHTML, image:productImage.src, name:productName.innerHTML}
    storage.push(newObj);
    localStorage.setItem("Orinoco", (JSON.stringify(storage)));
    window.alert("L'objet à bien été ajouté au panier :)")
    redirectHome();
}

function redirectHome(){
    setTimeout(function(){document.location.href = "../index.html"},100);
}