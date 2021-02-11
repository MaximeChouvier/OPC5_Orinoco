let storage = JSON.parse(localStorage.getItem("Orinoco_Order"))
console.log(storage);

createAllElements(storage)

function createAllElements(storage){
    createOrderConfirmation(storage);
    storage.forEach(createOrder);
    createOrderInfo(storage);
}
function createOrderConfirmation(storage){
    let parentDiv = document.getElementById("javascript_injection");

    let confirmPreview = document.createElement("section");
    confirmPreview.id = "confirm_preview"
    parentDiv.appendChild(confirmPreview);
}
function createOrder(storage){
    let orderContainer = document.getElementById("confirm_preview");

    // let order = document.createElement("div");
    // order.className = "order";
    // orderContainer.appendChild(order);


    // let order_img = document.createElement("img");
    // order_img.className = "orderPreview_image"
    // order_img.src = (storage.products.image)
    // order.appendChild(order_img);

    // let order_name = document.createElement("h1");
    // order_name.className = "confirm_orderName font";
    // order_name.innerHTML = (storage.products.name)
    // order.appendChild(order_name);


    storage.products.forEach(element => {
        let order = document.createElement("div");
        order.className = "order";
        orderContainer.appendChild(order);

        let order_img = document.createElement("img");
        order_img.className = "orderPreview_image"
        order_img.src = (element.image)
        order.appendChild(order_img);

        let order_name = document.createElement("h1");
        order_name.className = "confirm_orderName font";
        order_name.innerHTML = (element.name + " (" + element.color + ")")
        order.appendChild(order_name);
    })
    
}
function createOrderInfo(storage){
    let orderContainer = document.getElementById("confirm_preview");

    let totalPrice = storage[0].price.toString()

    let orderPrice = document.createElement("h3");
    orderPrice.className = "confirm_orderPrice font";
    orderPrice.innerHTML = "Total : " + totalPrice + " €";
    orderContainer.appendChild(orderPrice);

    function makeId(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    var idRequest = new XMLHttpRequest();
    idRequest.onreadystatechange = function() {
        if (this.onreadystatechange == XMLHttpRequest.DONE && this.status == 200) {
            var idResponse = JSON.parse(this.responseText);
            console.log(idResponse.current_condition.condition);
        }
    };

    idRequest.open("GET, http://localhost:3000/api/teddies/:_id")
    idRequest.send();
    
    let orderId = makeId(8);

    let orderId_preview = document.createElement("h4");
    orderId_preview.className = "confirm_orderId font";
    orderId_preview.innerHTML = "ID de commande : " + orderId;
    orderContainer.appendChild(orderId_preview);
}

