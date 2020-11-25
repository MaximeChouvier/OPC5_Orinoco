var request = new XMLHttpRequest();

request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText); 
        
        injection(response);

        function injection(response){
            let parentDiv = document.getElementById("javascript__injection");
            
            let productContainer = document.createElement("div");
            productContainer.className = ("productContainer");
        
            let productContainer_upper = document.createElement("div");
            productContainer_upper.className = ("productContainer_upper");
        
            let lower = document.createElement("div");
            lower.className = ("lower")
        
            let upper_left = document.createElement("div")
            upper_left.className = ("upper_left");
        
            let upper_right = document.createElement("div");
            upper_right.className = ("upper_right");

            appendAllContainers(parentDiv, productContainer, productContainer_upper, lower, upper_left, upper_right);
            createAllElements(response, upper_left, upper_right, lower);
        }
    }
};
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
    productPreview.className = ("productPreview");
    productPreview.src = response.imageUrl;
    upper_left.appendChild(productPreview);
}
function createTitle(response, upper_right){
    let productTitle = document.createElement("h1");
    productTitle.className = ("productTitle underline font teddyName");
    productTitle.innerHTML = response.name;
    upper_right.appendChild(productTitle);
}
function createDescription(response, upper_right){
    let productDescription = document.createElement('p');
    productDescription.innerHTML = response.description;
    productDescription.className = 'productDescription underline font teddyDesc';
    upper_right.appendChild(productDescription);
}
function createColorsChoices(colorList, lower){
    let productForm = document.createElement("form");
    lower.appendChild(productForm);

    let colorSelect = document.createElement("select");
    colorSelect.name = ("colorChoiceList");
    colorSelect.id = ("colorChoices");
    colorSelect.className = ("teddy-colors")
    productForm.appendChild(colorSelect);

    colorSelect.addEventListener("change", (event) => {     
        let storage = JSON.parse(localStorage.getItem("Orinoco"));
        if (storage === null ){
            storage = ["test"];
            storage.push(event.target.value);
            storage.shift();
            localStorage.setItem("Orinoco", (JSON.stringify(storage)));
        } else {
            storage.push(event.target.value);
            localStorage.setItem("Orinoco", (JSON.stringify(storage)));
        }
        console.log(localStorage)
    });
    
    for (var i = 0; i < colorList.length; i++){
        let colorSelect_option = document.createElement("option");
        colorSelect_option.setAttribute("color", colorList[i]);
        colorSelect_option.text = colorList[i];
        colorSelect.appendChild(colorSelect_option);
        colorSelect.appendChild(colorSelect_option); 
    }
}
function createPrice(response, lower){
    let productPrice = document.createElement("h2");
    productPrice.className = ("productPrice font")
    productPrice.innerHTML = response.price + " €"
    lower.appendChild(productPrice);
}
function createButton(lower){
    let cartButton = document.createElement("button");
    cartButton.className = ("cartButton font");
    cartButton.innerHTML = ("Ajouter au panier")
    cartButton.href = ("./panier.html")
    lower.appendChild(cartButton);
}
function appendAllContainers(parentDiv, productContainer, productContainer_upper, lower, upper_left, upper_right){
    parentDiv.appendChild(productContainer);
    productContainer.appendChild(productContainer_upper);
    productContainer.appendChild(lower);
    productContainer_upper.appendChild(upper_left);
    productContainer_upper.appendChild(upper_right);
}
function productDependingOnParameter(){
    let currentUrlParameter = window.location.search.substr(1);
    return currentUrlParameter;
}

let productId = productDependingOnParameter();
sendRequest(request, productId);


function sendRequest (request, productId){
    request.open("GET", "http://localhost:3000/api/teddies/" + productId.toString());
    request.send();
}
