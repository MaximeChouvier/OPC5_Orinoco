let storage = JSON.parse(localStorage.getItem("Orinoco"));

storage.forEach(checkStorage);

function checkStorage(storage, response){
    let currentItemId = storage.id;
    let currentItemChoice = storage.color;
    let currentItemPrice = storage.price;
    let currentItemImage = storage.image;
    let currentItemName = storage.name;

    createAllElements(storage);
};
function createAllElements(storage){
    createContainers();
    createOrder(storage);
    appendOrders();
    createOrderFinalisation();
}
function createContainers(){
    let parentDiv = document.getElementById("javascript_injection");
    
    let orderPreview = document.createElement("div");
    orderPreview.className = ("orderPreview");
    parentDiv.appendChild(orderPreview);

    let orderFinalisation = document.createElement("div");
    orderFinalisation.className = ("orderFinalisation");
    parentDiv.appendChild(orderFinalisation);
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
}
function appendOrders(){
    let orderPreview = document.getElementById("orderPreview");
    let orders = document.getElementsByClassName("order");
    
    orderPreview.appendChild(orders);
}
function createOrderFinalisation(){
    let orderFinalisation = document.getElementById("orderFinalisation")

    let orderPrice = document.createElement("h1");
    orderPrice.className = ("orderPrice font");
    orderPrice.innerHTML = ("placeholderPrice" + "€");

    let orderButton = document.createElement("button");
    orderButton.className = ("orderButton font");
    orderButton.innerHTML = ("Passer la commande");

    orderFinalisation.appendChild(orderPrice);
    orderFinalisation.appendChild(orderButton);
}


