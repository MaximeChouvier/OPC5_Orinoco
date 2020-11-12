var request = new XMLHttpRequest();

request.onreadystatechange = function() {
    
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log(response)

        
        injection(response)

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

                function createColorChoices(response, lower_up){
                    let productForm = document.createElement("form");
                    lower_up.appendChild(productForm);

                    let colorChoice1_input = document.createElement("input");
                    colorChoice1_input.type = ("radio");
                    colorChoice1_input.name = ("colors");
                    colorChoice1_input.value = ("color1");
                    colorChoice1_input.className = ("colorChoice");
                    productForm.appendChild(colorChoice1_input);
                    
                    let colorChoice1_label = document.createElement("label");
                    colorChoice1_label.type = ("radio");
                    colorChoice1_label.name = ("colors");
                    colorChoice1_label.value = ("color1");
                    colorChoice1_label.className = ("colorChoice");
                    colorChoice1_label.innerHTML = response.colors[0];
                    productForm.appendChild(colorChoice1_label);

                    let colorChoice2_input = document.createElement("input");
                    colorChoice2_input.type = ("radio");
                    colorChoice2_input.name = ("colors");
                    colorChoice2_input.value = ("color2");
                    colorChoice2_input.className = ("colorChoice");
                    productForm.appendChild(colorChoice2_input);

                    let colorChoice2_label = document.createElement("label");
                    colorChoice2_label.type = ("radio");
                    colorChoice2_label.name = ("colors");
                    colorChoice2_label.value = ("color2");
                    colorChoice2_label.className = ("colorChoice");
                    colorChoice2_label.innerHTML = response.colors[1];
                    productForm.appendChild(colorChoice2_label);

                    let colorChoice3_input = document.createElement("input");
                    colorChoice3_input.type = ("radio");
                    colorChoice3_input.name = ("colors");
                    colorChoice3_input.value = ("color3");
                    colorChoice3_input.className = ("colorChoice");
                    productForm.appendChild(colorChoice3_input);

                    let colorChoice3_label = document.createElement("label");
                    colorChoice3_label.type = ("radio");
                    colorChoice3_label.name = ("colors");
                    colorChoice3_label.value = ("color3");
                    colorChoice3_label.className = ("colorChoice");
                    colorChoice3_label.innerHTML = response.colors[2];
                    productForm.appendChild(colorChoice3_label);

                    let colorChoice4_input = document.createElement("input");
                    colorChoice4_input.type = ("radio");
                    colorChoice4_input.name = ("colors");
                    colorChoice4_input.value = ("color4");
                    colorChoice4_input.className = ("colorChoice");
                    productForm.appendChild(colorChoice4_input);

                    let colorChoice4_label = document.createElement("label");
                    colorChoice3_label.type = ("radio");
                    colorChoice3_label.name = ("colors");
                    colorChoice3_label.value = ("color4");
                    colorChoice3_label.className = ("colorChoice");
                    colorChoice4_label.innerHTML = response.colors[3];
                    productForm.appendChild(colorChoice4_label);
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
                createColorChoices(response, lower_up);
                createPrice(response, lower_low_left);
                createButton(response, lower_low_right)
            }

            appendAllContainers(parentDiv);
            createAllElements(response, upper_left, upper_right, lower_up, lower_low_left, lower_low_right);
        }
    }
};

function itemDependingOnUrl(item, url){
    if (item[0]._id == url) {
        console.log = ("item1")
    } else if (item[1]._id === url){
        console.log = ("item2")
    } else if (item[2]._id === url){
        console.log = ("item3")
    } else if (item[3]._id === url){
        console.log = ("item4")
    } else if (item[4]._id === url){
        console.log = ("item5")
    } else{
        console.log =("failed")
    }
}


request.open("GET", "http://localhost:3000/api/teddies/5be9c8541c9d440000665243");
request.send();