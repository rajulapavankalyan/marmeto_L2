const url = "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448";

const vendorName = document.querySelector(".vendor_name");
const titleName = document.querySelector(".title_name");
const saleAmount = document.querySelector(".sale_amount");
const originalPrice = document.querySelector(".total_price");
const descriptionMatter = document.querySelector(".description");
const discountPercent  = document.querySelector(".discount_percent");
const colorOptions = document.querySelector(".color_options");

const getData = async () => {
    let response = await fetch(url);
    let data = await response.json();
    renderUI(data);
};

function renderUI(data) {
    const productData = data.product;
    console.log(productData);
    vendorName.textContent = productData.vendor; //fetching the vendor name
    titleName.textContent = productData.title; //fetching the title name
    saleAmount.textContent = productData.price; //fetching the sale price
    originalPrice.textContent = productData.compare_at_price; //fetching the original price
    descriptionMatter.innerHTML = productData.description;

    // document.getElementById("full_img").src = productData.images[0].src;

    // to calculate the discount percentage
    const price = parseInt(productData.price.replace(/[$]/g, ""));  //coverting the string to the number by replacing [$] with empty space.
    const totalPrice = parseInt(productData.compare_at_price.replace(/[$]/g, ""));
    const discount = ((totalPrice-price)/totalPrice)*100;
    discountPercent.textContent = `${discount.toFixed(0)}% off`;





    // fetching the colors dynamically and displaying them
    let colorHtml = " ";
    productData.options[0].values.forEach(color => {
        // console.log(color);
        colorHtml = colorHtml + `<span class="product-colors" style="background-color:${Object.values(color)[0]}"></span>`;
    });
    colorOptions.innerHTML = colorHtml;
    // selected first color as default
    document.querySelector(".product-colors").classList.add("selected");
    
    
    // fetching the sizes dynamically and displaying them
    let sizeHtml=" ";
    productData.options[1].values.forEach(size => {
        // console.log(size);
        sizeHtml += `<div class="size_container">
        <input type="radio" name="${size}" value="${size}" id="${size}">
        <label for="${size}">${size}</label>
    </div>`
    });
    document.querySelector(".size_options").innerHTML=sizeHtml;

};
getData();
