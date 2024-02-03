const url = "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448";

const vendorName = document.querySelector(".vendor_name");
const titleName = document.querySelector(".title_name");
const saleAmount = document.querySelector(".sale_amount");
const originalPrice = document.querySelector(".total_price");
const descriptionMatter = document.querySelector(".description");
const discountPercent  = document.querySelector(".discount_percent");
const colorOptions = document.querySelector(".color_options");
const decrementSign = document.querySelector(".decrement_sign");
const incrementSign = document.querySelector(".increment_sign");
const cartValue = document.querySelector(".value");
const mainImage = document.querySelector("#full_img");

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
    
    // Get all color span elements
    const colorSpans = colorOptions.querySelectorAll('.product-colors');

    // Add event listener to each color span
    colorSpans.forEach(colorSpan => {
        colorSpan.addEventListener('click', function() {
            // Remove 'selected' class from all color spans
            colorSpans.forEach(span => {
                span.classList.remove('selected');
            });
            // Add 'selected' class to the clicked color span
            colorSpan.classList.add('selected');
        });
    });
    

    // fetching the sizes dynamically and displaying them
    let sizeHtml=" ";
    productData.options[1].values.forEach(size => {
        // console.log(size);
        sizeHtml += `<div class="size_container">
        <input type="radio" name="${size.toLowerCase()}" value="${size}" id="${size.toLowerCase()}">
        <label for="${size.toLowerCase()}">${size}</label>
    </div>`
    
    });
    console.log(sizeHtml);
    document.querySelector(".size_options").innerHTML=sizeHtml;

};
getData();

// Get all variant image elements
const variantImages = document.querySelectorAll('.variant');

// Add click event listeners to variant images
variantImages.forEach(variantImage => {
  variantImage.addEventListener('click', function() {
    // Update the source of the main image to the clicked variant image's source
    mainImage.src = variantImage.src;
  });
});

// decreases the current cart value by 1
const decrementHandler = () => {
    let currentValue = +cartValue.textContent;
    if (currentValue >= 1) {
      cartValue.textContent = currentValue - 1;
    }
};
// increases the current cart value by 1
const incrementHandler = () => {
    let currentValue = +cartValue.textContent;
    cartValue.textContent = currentValue + 1;
};

decrementSign.addEventListener('click',decrementHandler);
incrementSign.addEventListener('click',incrementHandler);

