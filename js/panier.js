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
    // orderButton.type = "submit";
    orderButton.innerHTML = ("Passer la commande");

    orderPrice.addEventListener("click", function(productsOrdered){
        
        let form_firstName = document.getElementById("firstName").value;
        let form_lastName = document.getElementById("lastName").value;
        let form_adress = document.getElementById("adress").value;
        let form_city = document.getElementById("city").value;
        let form_email = document.getElementById("mail").value;

        let orderInfo = ["test"];
        let infoObj = {firstName:form_firstName, lastName:form_lastName, 
            adress:form_adress, city:form_city, email:form_email};
        orderInfo.push(infoObj);
        orderInfo.shift();
        console.log(orderInfo);
        
        // var xhr = new XMLHttpRequest();
        // xhr.open("POST", "http://localhost:3000/api/teddies/", true);
        
        // xhr.onreadystatechange = function(){
        //     if(this.readyState == XMLHttpRequest.DONE && this.status == 200){

        //     }
        // }
        // xhr.send();


    });

    orderFinalisation.appendChild(orderPrice);
    orderFinalisation.appendChild(orderButton);
}