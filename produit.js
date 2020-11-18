var request = new XMLHttpRequest();

request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log(response)
        
        
        injection(response);

        function injection(response){
            let parentDiv = document.getElementById("javascript__injection");
            let productContainer = document.createElement("div");
            productContainer.className = ("productContainer");
            let productContainer_upper = document.createElement("div");
            productContainer_upper.className = ("productContainer_upper");
            let productContainer_lower = document.createElement("div");
            productContainer_lower.className = ("productContainer_lower")
            let upper_left = document.createElement("div")
            upper_left.className = ("upper_left");
            let upper_right = document.createElement("div");
            upper_right.className = ("upper_right");
            let lower_up = document.createElement("div");
            lower_up.className = ("lower_up")
            let lower_low_left = document.createElement("div");
            lower_low_left.className = ("lower_low_left"); 
            let lower_low_right = document.createElement("div");
            lower_low_right.className = ("lower_low_right");

            function appendAllContainers(parentDiv){
                    parentDiv.appendChild(productContainer);
                    productContainer.appendChild(productContainer_upper);
                    productContainer.appendChild(productContainer_lower);
                    productContainer_upper.appendChild(upper_left);
                    productContainer_upper.appendChild(upper_right);
                    productContainer_lower.appendChild(lower_up);
                    productContainer_lower.appendChild(lower_low_left);
                    productContainer_lower.appendChild(lower_low_right);
            }
            
            function createAllElements(){
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
                
                function createColors(response, lower_up){
                    let productColors = document.createElement('p');
                    productColors.innerHTML = ("Couleurs :");
                    productColors.className = 'productColors underline font teddyColors';    
                    lower_up.appendChild(productColors);
                }

                let colorList = [];
                colorList = response.colors;

                createColorsChoices(colorList);

                function createColorsChoices(item){
                    let productForm = document.createElement("form");
                    lower_up.appendChild(productForm);

                    let colorSelect = document.createElement("select");
                    colorSelect.name = ("colorChoiceList")
                    colorSelect.id = ("colorChoices");
                    productForm.appendChild(colorSelect);
                    
                    for (var i = 0; i < item.length; i++){
                        let colorSelect_option = document.createElement("option");
                        colorSelect_option.setAttribute("color", item[i]);
                        colorSelect_option.text = item[i];
                        colorSelect.appendChild(colorSelect_option);
                        
                        colorSelect.appendChild(colorSelect_option); 
                    }
                    
                }

                function createPrice(response, lower_low_left){
                    let productPrice = document.createElement("h2");
                    productPrice.className = ("productPrice font")
                    productPrice.innerHTML = response.price + " €"
                    lower_low_left.appendChild(productPrice);
                }
                
                function createButton(response, lower_low_right){
                    let cartButton = document.createElement("button");
                    cartButton.className = ("cartButton font");
                    cartButton.innerHTML = ("Ajouter au panier")
                    lower_low_right.appendChild(cartButton);
                }
                createPreview(response, upper_left);
                createTitle(response, upper_right);
                createDescription(response, upper_right);
                createColors(response, lower_up);
                createPrice(response, lower_low_left);
                createButton(response, lower_low_right)
            }

            appendAllContainers(parentDiv);
            createAllElements(response, upper_left, upper_right, lower_up, lower_low_left, lower_low_right);
        }
    }
};

function productDependingOnParameter(request){
    let currentUrlParameter = window.location.search.substr(1);
    return currentUrlParameter;
}

let productId = productDependingOnParameter();
sendRequest(request, productId);

function sendRequest (request, productId){
    request.open("GET", "http://localhost:3000/api/teddies/" + productId.toString());
    request.send();
}
