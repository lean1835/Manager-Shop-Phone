import axios from 'axios';
let urlProduct = 'https://manager-shop-phone.onrender.com/api/products';

export async function getAllProducts(){
    try {
        const response = await axios.get(urlProduct);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function searchProductByName(searchName){
    try {
        const response = await axios.get(`${urlProduct}?name_like=${searchName}`);
        return response.data;
    }catch (error){
        console.error(error);
    }
}

export async function getProductById(id){

    try{
        const response = await axios.get(`${urlProduct}/`+id)
        return response.data;
    }catch (error){
        console.error(error)
    }
}

export async function addNewProduct(product) {
    try {
        const response = await axios.post(urlProduct, product);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function updateProduct(id,service) {

    try {
        const  response = await axios.put(`${urlProduct}/`+id,service);
    }catch (e) {
        console.log("lỗi "+e);
    }
}

export async function productNoPrice(){
    try {
        const response = await axios.get(`${urlProduct}?price=&&price=0`);
        return response.data;
    }catch (error){
        console.error(error);
    }
}


export async  function searchByNameAndChoice(nameSearch,choiceSearch) {

    let url1 =`${urlProduct}?name_like=${nameSearch}`
    if (choiceSearch=="no_price"){
        url1 =`${urlProduct}?name_like=${nameSearch}&price=&price=0`
    }
    try {
        const  response = await axios.get(url1);
        return response.data;
    }catch (e) {
        console.log("lỗi "+e);
        return [];
    }

}