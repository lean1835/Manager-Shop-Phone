import axios from 'axios';

let urlCus = 'https://manager-shop-phone.onrender.com/api/customers';

export async function getAllCustomers() {
    try {
        const response = await axios.get(urlCus);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function addNewCustomer(customer) {
    try {
        const response = await axios.post(urlCus, customer);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
export async function getCustomerById(id){
    try {
        const response=await axios.get(`${urlCus}/`+id);
        return response.data;
    } catch (e) {
        console.log("Lỗi:"+e)
    }
}

export async function updateCustomer(id,service) {

    try {
        const  response = await axios.put(`${urlCus}/`+id,service);
    }catch (e) {
        console.log("lỗi "+e);
    }
}
export async  function searchByNameOrAddress(nameSearch,addressSearch) {

    let url1 =`${urlCus}?name_like=${nameSearch}`
    if (nameSearch==""){
        url1 =`${urlCus}?address_like=${addressSearch}`
    }
    try {
        const  response = await axios.get(url1);
        return response.data;
    }catch (e) {
        console.log("lỗi "+e);
        return [];
    }
}