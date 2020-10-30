var request = new XMLHttpRequest();

request.onreadystatechange = function() {
    
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log(response)

        response.forEach(injection)

        function injection(response){
            let parentDiv = document.getElementById("javascript__injection");

            let productContainer = document.createElement("div");
            productContainer.className = ("productContainer");

            let productContainer_upper = document.createElement("div");
            productContainer_upper.className = ("productContainer_upper");

            let upper_left = document.createElement("div")
            upper_left.className = ("upper_left");

            let productPreview = document.createElement("img");
            productPreview.className = ("productPreview");
            productPreview.src = response.imageUrl;

            let upper_right = document.createElement("div");
            upper_right.className = ("upper_right");

            let productTitle = document.createElement("h1");
            productTitle.className = ("productTitle underline font teddyName");
            productTitle.innerHTML = response.name;

            let productDescription = document.createElement('p');
            productDescription.innerHTML = response.description;
            productDescription.className = 'productDescription underline font teddyDesc';

            let productContainer_lower = document.createElement("div");
            productContainer_lower.className = ("productContainer_lower")

            let lower_up = document.createElement("div");
            lower_up.className = ("lower_up")

            let productColors = document.createElement('p');
            productColors.innerHTML = ("Couleurs :");
            productColors.className = 'productColors underline font teddyColors';

            let productForm = document.createElement("form");

            let colorChoice1_input = document.createElement("input");
            colorChoice1_input.type = ("radio");
            colorChoice1_input.name = ("colors");
            colorChoice1_input.value = ("color1");
            colorChoice1_input.className = ("colorChoice");

            let colorChoice1_label = document.createElement("label");
            colorChoice1_label.type = ("radio");
            colorChoice1_label.name = ("colors");
            colorChoice1_label.value = ("color1");
            colorChoice1_label.className = ("colorChoice");
            colorChoice1_label.innerHTML = response.colors[0];

            let colorChoice2_input = document.createElement("input");
            colorChoice2_input.type = ("radio");
            colorChoice2_input.name = ("colors");
            colorChoice2_input.value = ("color2");
            colorChoice2_input.className = ("colorChoice");

            let colorChoice2_label = document.createElement("label");
            colorChoice2_label.type = ("radio");
            colorChoice2_label.name = ("colors");
            colorChoice2_label.value = ("color2");
            colorChoice2_label.className = ("colorChoice");
            colorChoice2_label.innerHTML = response.colors[1];

            let colorChoice3_input = document.createElement("input");
            colorChoice3_input.type = ("radio");
            colorChoice3_input.name = ("colors");
            colorChoice3_input.value = ("color3");
            colorChoice3_input.className = ("colorChoice");

            let colorChoice3_label = document.createElement("label");
            colorChoice3_label.type = ("radio");
            colorChoice3_label.name = ("colors");
            colorChoice3_label.value = ("color3");
            colorChoice3_label.className = ("colorChoice");
            colorChoice3_label.innerHTML = response.colors[2];

            let colorChoice4_input = document.createElement("input");
            colorChoice4_input.type = ("radio");
            colorChoice4_input.name = ("colors");
            colorChoice4_input.value = ("color4");
            colorChoice4_input.className = ("colorChoice");

            let colorChoice4_label = document.createElement("label");
            colorChoice3_label.type = ("radio");
            colorChoice3_label.name = ("colors");
            colorChoice3_label.value = ("color3");
            colorChoice3_label.className = ("colorChoice");
            colorChoice4_label.innerHTML = response.colors[3];

            let lower_low_left = document.createElement("div");
            lower_low_left.className = ("lower_low_left");

            let productPrice = document.createElement("h2");
            productPrice.className = ("productPrice font")
            productTitle.innerHTML = response.price + " €"

            let lower_low_right = document.createElement("div");
            lower_low_right.className = ("lower_low_right");

            let cartButton = document.createElement("button");
            cartButton.className = ("cartButton font");
            cartButton.innerHTML = ("Ajouter au panier")


            parentDiv.appendChild(productContainer);
            productContainer.appendChild(productContainer_upper);
            productContainer_upper.appendChild(upper_left);
            upper_left.appendChild(productPreview);
            productContainer_upper.appendChild(upper_right);
            upper_right.appendChild(productTitle);
            upper_right.appendChild(productDescription);

            productContainer.appendChild(productContainer_lower);
            productContainer_lower.appendChild(lower_up);
            lower_up.appendChild(productColors);
            lower_up.appendChild(productForm);
            productForm.appendChild(colorChoice1_input);
            productForm.appendChild(colorChoice1_label);
            productForm.appendChild(colorChoice2_input);
            productForm.appendChild(colorChoice2_label);
            productForm.appendChild(colorChoice3_input);
            productForm.appendChild(colorChoice3_label);
            productForm.appendChild(colorChoice4_input);
            productForm.appendChild(colorChoice4_label);

            productContainer_lower.appendChild(lower_low_left);
            lower_low_left.appendChild(productPrice);

            productContainer_lower.appendChild(lower_low_right);
            lower_low_right.appendChild(cartButton);
        }



        
    }
};


request.open("GET", "http://localhost:3000/api/teddies");
request.send();