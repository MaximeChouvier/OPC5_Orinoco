let storage = JSON.parse(localStorage.getItem("Orinoco_order"))

createAllElements(storage)

function createAllElements(storage){
    createOrderConfirmation(storage);
    createOrderInfo(storage);
    localStorage.clear()
}
function createOrderConfirmation(storage){
    let parentDiv = document.getElementById("javascript_injection");

    let confirmPreview = document.createElement("section");
    confirmPreview.id = "confirm_preview";
    parentDiv.appendChild(confirmPreview);
}
function createOrderInfo(storage){
    let orderContainer = document.getElementById("confirm_preview");

    let orderPrice = document.createElement("h3");
    orderPrice.className = "confirm_orderPrice font centered";
    orderPrice.innerHTML = "Total : " + storage.price + " €";
    orderContainer.appendChild(orderPrice);

    let orderId_preview = document.createElement("h4");
    orderId_preview.className = "confirm_orderId font centered";
    orderId_preview.innerHTML = "ID de commande : " + storage.id;
    orderContainer.appendChild(orderId_preview);
}