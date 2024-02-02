const url = "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448";

const vendorName = document.getElementById(".vendor_name");
const titleName = document.getElementById('.title_name');
const getData = async () => {
    let response = await fetch(url);
    // console.log(response);
    let data = await response.json();
    console.log(data);

};
