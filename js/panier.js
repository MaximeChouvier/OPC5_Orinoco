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

    let orderFinalisation = document.createElement("div");
    orderFinalisation.id = ("orderFinalisation");
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
    
    let orderPreview = document.getElementById("orderPreview");
    orderPreview.appendChild(order);
    
}
function createOrderFinalisation(storage){
    let orderFinalisation = document.getElementById("orderFinalisation")
    let orderPrice = document.createElement("h1");
    orderPrice.className = ("orderPrice font");
    orderPrice.innerHTML = ("placeholderPrice" + " €");

    let orderButton = document.createElement("button");
    orderButton.className = ("orderButton font");
    orderButton.innerHTML = ("Passer la commande");

    orderFinalisation.appendChild(orderPrice);
    orderFinalisation.appendChild(orderButton);

}
const reducer = (accumulator, currentValue) => accumulator + currentValue;
let priceMapped = storage.map(x => x.price);

console.log(priceParsed);