let storage = JSON.parse(localStorage.getItem("Orinoco"));
console.log (storage);

createAllElements(storage);

function createAllElements(storage){
    createContainers();
    createOrderFinalisation(storage);
    storage.forEach(createOrder);
}
function createContainers(){
    let parentDiv = document.getElementById("javascript_injection");

    function handleEmptyBasket(parentDiv){
        let emptyTitle = document.createElement("h2");
        emptyTitle.className = "emptyBasket centered font"
        emptyTitle.innerHTML = "Malheureusement vôtre panier est vide"

        let emptyTitle_small = document.createElement("p");
        emptyTitle_small.className = "emptyBasket_small centered font"
        emptyTitle_small.innerHTML = "Veuillez ajouter des articles au panier avant de pouvoir passer commande"
        
        parentDiv.appendChild(emptyTitle);
        parentDiv.appendChild(emptyTitle_small);

    }

    if (storage == null){
        handleEmptyBasket(parentDiv);
    } else {
        let orderPreview = document.createElement("div");
        orderPreview.id = ("orderPreview")
        parentDiv.appendChild(orderPreview);

        let orderForm = document.getElementById("orderForm")

        let orderFinalisation = document.createElement("div");
        orderFinalisation.id = ("orderFinalisation");
        orderForm.appendChild(orderFinalisation);
    }
    
}
function createOrder(storage){
    let order = document.createElement("div");
    order.className = ("order");

    let orderImg = document.createElement("img");
    orderImg.className = ("orderPreview_image");
    orderImg.src = (storage.image);
    order.appendChild(orderImg);

    let orderName = document.createElement("h1")
    orderName.className = ("orderPreview_name font")
    orderName.innerHTML = (storage.name + (" (") + (storage.color) + (")"));
    order.appendChild(orderName);

    let orderPrice = document.createElement("h2");
    orderPrice.className = ("orderPreview_price font");
    orderPrice.innerHTML = (storage.price);
    order.appendChild(orderPrice);
    
    let orderPreview = document.getElementById("orderPreview");
    orderPreview.appendChild(order);
}
function createOrderFinalisation(storage){
    let placeholderPrice = 0;
    storage.forEach(element => placeholderPrice += parseInt(element.price, 10));

    let productsOrdered = [];
    storage.forEach(element => productsOrdered.push(element.id));

    let orderFinalisation = document.getElementById("orderFinalisation")
    let orderPrice = document.createElement("h1");
    orderPrice.innerHTML = "Total : " + placeholderPrice + " €";
    orderPrice.className = ("orderPrice font");

    let orderButton = document.createElement("button");
    orderButton.className = ("font");
    orderButton.type = "button";
    orderButton.id = ("orderButton")
    orderButton.disabled = true;
    orderButton.innerHTML = ("Passer la commande");

    let form_firstName = document.getElementById("firstName");
    let form_lastName = document.getElementById("lastName");
    let form_adress = document.getElementById("adress");
    let form_city = document.getElementById("city");
    let form_email = document.getElementById("mail");

    form_firstName.addEventListener("change", isFormValid);
    form_lastName.addEventListener("change", isFormValid);
    form_adress.addEventListener("change", isFormValid);
    form_city.addEventListener("change", isFormValid);
    form_email.addEventListener("change", isFormValid);

    function isFormValid(){
        let orderButton = document.getElementById("orderButton")
        let form_firstName = document.getElementById("firstName");
        let form_lastName = document.getElementById("lastName");
        let form_adress = document.getElementById("adress");
        let form_city = document.getElementById("city");

        const onlyLettersRegex = /^[a-zA-Z-éÉàâäéèêëïîôöùûüÿç]+$/;
        const adressRegex = /^[0-9a-zA-Z-éÉàâäéèêëïîôöùûüÿç\ ]+/;
        const emailRegex = /\S+@\S+\.\S+/;

        let firstName_result = onlyLettersRegex.test(form_firstName.value);
        let lastName_result = onlyLettersRegex.test(form_lastName.value);
        let adress_result = adressRegex.test(form_adress.value);
        let city_result = onlyLettersRegex.test(form_city.value); 
        let email_result = emailRegex.test(form_email.value);

        if (firstName_result == true && lastName_result == true && adress_result == true && city_result == true && email_result == true){
            orderButton.disabled = false;
        } else {
            orderButton.disabled = true;
        }
    }

    orderButton.addEventListener("click", function(productsOrdered){

    let form_firstName = document.getElementById("firstName");
    let form_lastName = document.getElementById("lastName");
    let form_adress = document.getElementById("adress");
    let form_city = document.getElementById("city");
    let form_email = document.getElementById("mail");

    let confirmArticles = []
    storage.forEach(element => {
        let products = {name:element.name, image:element.image, color:element.color}
        confirmArticles.push(products);
    })

    let orderArticles = []
    storage.forEach(element => {
        let products = element.id
        orderArticles.push(products);
    })
    
    const orderInfo = {
        "contact": {
            "firstName": form_firstName.value,
            "lastName": form_lastName.value,
            "address": form_adress.value,
            "city": form_city.value,
            "email": form_email.value
        },
        "products": orderArticles
    }

    console.log(orderInfo)

    let postReq = new XMLHttpRequest();
    postReq.open("POST", "http://localhost:3000/api/teddies/order");
    postReq.setRequestHeader("Content-Type", "application/json");

    postReq.onreadystatechange = function () {
        if (postReq.readyState === 4) {
            let response = JSON.parse(postReq.response)
            let orderId = response.orderId;

            let orderConfirm_info = {price:placeholderPrice, id:orderId};
            
            localStorage.setItem("Orinoco_order", JSON.stringify(orderConfirm_info));
            console.log(localStorage);
        }
    }

    postReq.send(JSON.stringify(orderInfo));
    setTimeout(function(){document.location.href = "../SubPages/confirmation.html"},500);

    });

    orderFinalisation.appendChild(orderPrice);
    orderFinalisation.appendChild(orderButton);
}
