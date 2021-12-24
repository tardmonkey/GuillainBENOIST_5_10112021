document.addEventListener("DOMContentLoaded", () => {
    let orderId = localStorage.getItem("orderId");
    document.querySelector("#orderId").innerHTML = orderId;

})