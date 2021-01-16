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

    let orderPreview = document.createElement("div");
    orderPreview.id = ("orderPreview")
    parentDiv.appendChild(orderPreview);

    let orderForm = document.getElementById("orderForm")

    let orderFinalisation = document.createElement("div");
    orderFinalisation.id = ("orderFinalisation");
    orderForm.appendChild(orderFinalisation);
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
    orderButton.className = ("orderButton font");
    orderButton.type = "submit";
    orderButton.innerHTML = ("Passer la commande");

    let form_firstName = document.getElementById("firstName");
    let form_lastName = document.getElementById("lastName");
    let form_adress = document.getElementById("adress");
    let form_city = document.getElementById("city");
    let form_email = document.getElementById("mail");

    form_firstName.addEventListener("change", isFormValid);

    function isFormValid(form_firstName){
        var firstNameRegex = /[a-z]*/;
        if (form_firstName == firstNameRegex){
            console.log("True")
        }else{
            console.log("False")
        }
    }

    orderPrice.addEventListener("click", function(productsOrdered){

        let form_firstName = document.getElementById("firstName");
        let form_lastName = document.getElementById("lastName");
        let form_adress = document.getElementById("adress");
        let form_city = document.getElementById("city");
        let form_email = document.getElementById("mail");

        let orderInfo = ["test"];
        let infoObj = {firstName:form_firstName.value, lastName:form_lastName.value, 
            adress:form_adress.value, city:form_city.value, email:form_email.value};
        orderInfo.push(infoObj);
        orderInfo.shift();
        console.log(orderInfo);
        
    });

    orderFinalisation.appendChild(orderPrice);
    orderFinalisation.appendChild(orderButton);
}