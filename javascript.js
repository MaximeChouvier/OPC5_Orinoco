var request = new XMLHttpRequest();

request.onreadystatechange = function() {
    
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log(response)

        response.forEach(injectSingleItem);

        let wrapperDiv = document.getElementById("javascript__injection");

        function injectSingleItem(item){
            
            let parentDiv = document.createElement("div");

            

            function itemTitle(item, parentDiv){
                let itemTitle = document.createElement("h1");
                itemTitle.className = ("productTitle underline font teddyName");
                itemTitle.innerHTML = response.name;
            }
            function itemPrice(item, parentDiv){
                let itemPrice = document.createElement("h2");
                itemPrice.className = ("productPrice");
                itemPrice.innerHTML = response.price + " €"
            }
            function itemImage(item, parentDiv){
                let itemImage = document.createElement("img");
                itemImage.className = ("productPreview");
                itemImage.src = response.imageUrl;
            }
            function itemDescription(item, parentDiv){
                let itemDescription = document.createElement('p');
                itemDescription.innerHTML = response.description;
                itemDescription.className = 'productDescription underline font teddyDesc';
            }
            function itemCustomChoices(item, parentDiv){
                let itemCustomChoices = document.createElement('p');
                itemCustomChoices.innerHTML = ("Couleurs : ") + response.colors;
                itemCustomChoices.className = 'productColors underline font teddyColors';
            }

            addAllElementstoParent(item, parentDiv);

            wrapperDiv.appendChild(parentDiv);
        }
    }
};

function addAllElementstoParent(item, parentDiv){
    parentDiv.appendChild(item);
}

request.open("GET", "http://localhost:3000/api/teddies");
request.send();