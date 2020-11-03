var request = new XMLHttpRequest();

request.onreadystatechange = function() {
    
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log(response)

        response.forEach(injection)

        function injection(response){
            let parentDiv = document.getElementById("javascript__injection")

            let productList_wrapper = document.createElement("a");
            productList_wrapper.className = ("productList_wrapper productWrapperLink");
            productList_wrapper.href =  ("./subPages/produits.html");
            
            

            let productList_wrapper_left = document.createElement("div");
            productList_wrapper_left.className = ("productList_wrapper_left");

            let productImage = document.createElement("img");
            productImage.src = response.imageUrl;
            productImage.className = "productPreview teddyImage";

            let productList_wrapper_right = document.createElement("div");
            productList_wrapper_right.className = ("product_wrapper_right");

            let productText = document.createElement("div");
            productText.className = "productText";
            
            var productTitle = document.createElement('h1');
            productTitle.innerHTML = response.name;
            productTitle.className = 'productTitle underline font teddyName';

            var productPrice = document.createElement('h2');
            productPrice.innerHTML = response.price + " €";
            productPrice.className = 'productPrice underline font teddyPrice';

            var productColors = document.createElement('p');
            productColors.innerHTML = response.colors;
            productColors.className = 'productColors underline font teddyColors';

            var productDescription = document.createElement('p');
            productDescription.innerHTML = response.description;
            productDescription.className = 'productDescription underline font teddyDesc';
 
            parentDiv.appendChild(productList_wrapper);
            productList_wrapper.appendChild(productList_wrapper_left)
            productList_wrapper.appendChild(productList_wrapper_right)
            productList_wrapper_left.appendChild(productImage);
            productList_wrapper_right.appendChild(productText);
            productText.appendChild(productTitle);
            productText.appendChild(productPrice);
            productText.appendChild(productColors);
            productText.appendChild(productDescription);

        }



        
    }
};


request.open("GET", "http://localhost:3000/api/teddies");
request.send();