let orderInfo = JSON.parse(localStorage.getItem("Orinoco_confirm"));

if (orderInfo == null) {
    redirectHome();
} else {
    createOrderInfo(orderInfo);
    localStorage.clear()
}
function createOrderInfo(){
    let orderPrice = document.getElementById("confirm_orderPrice");
    orderPrice.innerHTML = orderInfo.price;

    let orderId = document.getElementById("confirm_orderId");
    orderId.innerHTML = orderInfo.id;
};
function redirectHome(){
    setTimeout(function(){document.location.href = "../index.html"},1);
}