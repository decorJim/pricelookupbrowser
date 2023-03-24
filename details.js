var product

function getDetails() {
    let product = JSON.parse(sessionStorage.getItem("product"));
    this.product=product
    console.log(this.product)

    let id=document.getElementById("id")
    id.innerHTML="id:".concat(this.product.id)

    let category=document.getElementById("category")
    category.innerHTML="category:".concat(this.product.category)

    let name=document.getElementById("name")
    name.innerHTML="name:".concat(this.product.name)

    let num=document.getElementById("num")
    num.innerHTML="num:".concat(this.product.num)

    let price=document.getElementById("price")
    price.innerHTML="price:".concat(this.product.price)

    let producttype=document.getElementById("product")
    producttype.innerHTML="product:".concat(this.product.product)

    let taxe=document.getElementById("taxe")
    taxe.innerHTML="taxe:".concat(this.product.taxe)

}