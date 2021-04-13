let items = JSON.parse(localStorage.getItem("Orinoco"));

makeOrdersPreview(items);

makeForm();
//Vérifie si le panier est vide, si c'est le cas la fonction handleEmptyBasket est appelée
//Sinon appelle createOrders pour chaque article dans le panier
function makeOrdersPreview(items){
    if (items == null){
        handleEmptyBasket();
    } else {
        items.forEach(createOrders);
    }
}
//Cache le formulaire et notifie l'utilisateur que le panier est vide
function handleEmptyBasket(){
    let emptyBasket_title = document.getElementById("emptyBasket_title");
    let emptyBasket_small = document.getElementById("emptyBasket_small");
    let orderForm = document.getElementById("orderForm");
    
    emptyBasket_title.hidden = false;
    emptyBasket_small.hidden = false;
    orderForm.hidden = true;
}
//Apelle les fonctions qui suivent afin d'injecter dynamiquement les
//éléments visuels de chaque article (nom, image et prix)
function createOrders(item){
    const orderName = createOrderName(item);
    const orderImg = createOrderImg(item);
    const orderPrice = createOrderPrice(item);
    appendOrderedItems(orderName, orderImg, orderPrice);
}
function createOrderName(item){
    let orderName = document.createElement("h1");
    orderName.className = "orderPreview_name font";
    orderName.innerHTML = (item.name + (" (") + (item.color) + (")"));
    return orderName;
}
function createOrderImg(item){
    let orderImg = document.createElement("img");
    orderImg.className = "orderPreview_image";
    orderImg.src = (item.image);
    return orderImg;
};
function createOrderPrice(item){
    let orderPrice = document.createElement("h2");
    orderPrice.className = "orderPreview_price font";
    orderPrice.innerHTML = (item.price);
    return orderPrice;
};
//Append tout les élements injectés précédemment dans un container "order"
function appendOrderedItems(orderName, orderImg, orderPrice){
    let orderPreview = document.getElementById("orderPreview");
    let order = document.createElement("div");
    order.className = "order";

    orderPreview.appendChild(order)
    order.appendChild(orderName);
    order.appendChild(orderImg);
    order.appendChild(orderPrice);
};
function makeForm(){
    reduceTotalPrice();
    document.getElementById("orderButton").addEventListener("click", formInputValidation)
};
//Récupère le prix de chaque article dans le panier, fait un total de ces sommes, le convertis en string puis ajoute un point
//pour afficher les centimes et éviter une confusion dans le prix. 
//Exemple : "4800" devient "48.00 €"
function reduceTotalPrice(){
    let form_priceTag = document.getElementById("orderTotalPrice");
    let finalPrice = 0;
    items.forEach(element => finalPrice += parseInt(element.price, 10));
    form_priceTag.innerHTML = finalPrice.toString() + ".00 €";
};

//Déclare des regExp pour diffèrents inputs en fonctions de leurs besoins en termes de validation.
function formInputValidation(){
    //en comparant onlyLettersRegex à l'input utilisateur, seul une chaîne de caractères correspondante à la suivante seras validée.
    const onlyLettersRegex = /^[a-zA-Z-éÉàâäéèêëïîôöùûüÿç]+$/;
    //en comparant adressRegex à l'input utilisateur, seul un input qui commence par un numéro de voie suivie par un nom de voie composé des caractères suivants seras validée.
    const adressRegex = /^[0-9a-zA-Z-éÉàâäéèêëïîôöùûüÿç\ ]+/;
    //en comparant emailRegex à l'input utilisateur, seul un input suivant ces format ; "lucie@mail.com - lucie.petit@example.com - lucie95.escargot@caramel.com ect..." 
    const emailRegex = /\S+@\S+\.\S+/;
    
    let firstNameResult = isForm_firstNameValid(onlyLettersRegex);
    let lastNameResult = isForm_lastNameValid(onlyLettersRegex);
    let adressResult = isForm_adressValid(adressRegex);
    let cityResult = isForm_cityValid(onlyLettersRegex);
    let email_result = isForm_emailValid(emailRegex);

    if (firstNameResult == true && lastNameResult == true && adressResult == true && cityResult == true && email_result == true){
        finaliseOrder()
    } else {
        window.alert("Veuillez remplir correctement le formulaire")
    }
};
function isForm_firstNameValid(onlyLettersRegex){
    let form_firstName = document.getElementById("firstName");
    let firstNameResult = onlyLettersRegex.test(form_firstName.value)
    if (firstNameResult == true){
        return true;
    } else {

    }
};
function isForm_lastNameValid(onlyLettersRegex){
    let form_lastName = document.getElementById("lastName");
    let lastNameResult = onlyLettersRegex.test(form_lastName.value)
    if (lastNameResult == true){
        return true;
    } else {

    }
};
function isForm_adressValid(adressRegex){
    let form_adress = document.getElementById("adress");
    let adressResult = adressRegex.test(form_adress.value)
    if (adressResult == true){
        return true;
    } else {

    }
};
function isForm_cityValid(onlyLettersRegex){
    let form_city = document.getElementById("city");
    let cityResult = onlyLettersRegex.test(form_city.value)
    if (cityResult == true){
        return true;
    } else {

    }
};
function isForm_emailValid(emailRegex){
    let form_email = document.getElementById("mail");
    let emailResult = emailRegex.test(form_email.value)
    if (emailResult == true){
        return true;
    } else {

    }
};
//Récupère les informations nécessaire puis effectue une requête post.
function finaliseOrder(){
    let orderInfo = makeOrderInfo();

    const url = "http://localhost:3000/api/teddies/order";
    fetch(url, {
        method : "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(orderInfo),
    }).then(response => {
        return response.json();
    }).then(jsonResponse => {
        console.log(jsonResponse)
        let orderId = (jsonResponse.orderId)
        getConfirmData(orderId)
    }).catch (error => {
        console.log(error)
    })
}
function makeOrderInfo(){
    let form_firstName = document.getElementById("firstName");
    let form_lastName = document.getElementById("lastName");
    let form_adress = document.getElementById("adress");
    let form_city = document.getElementById("city");
    let form_email = document.getElementById("mail");

    let orderedArticles = [];
    items.forEach(element => {
        let products_id = element.id
        orderedArticles.push(products_id);
    })

    const orderInfo = {
        "contact": {
            "firstName": form_firstName.value,
            "lastName": form_lastName.value,
            "address": form_adress.value,
            "city": form_city.value,
            "email": form_email.value
        },
        "products": orderedArticles
    }
    return orderInfo;
}
//Crée un object contenant le prix total et l'ID de commande puis le stock dans le localStorage.
function getConfirmData(orderId){
    let totalPrice = document.getElementById("orderTotalPrice").innerHTML;
    let confirmData = {price:totalPrice, id:orderId};
    localStorage.setItem("Orinoco_confirm", (JSON.stringify(confirmData)));
    redirectOrderConfirmation();
}
function redirectOrderConfirmation(){
    setTimeout(function(){document.location.href = "../SubPages/confirmation.html"},200);
}
