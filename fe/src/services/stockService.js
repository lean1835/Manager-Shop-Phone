import axios from "axios";
let url = `https://manager-shop-phone.onrender.com/api/stock?_expand=product&_expand=supplier`;
let url1 = `https://manager-shop-phone.onrender.com/api/stock`;
export async function getAllStock(page, size) {
  try{
      const response = await axios.get(`${url}&_sort=name&_order=asc&_page=${page}&_limit=${size}`);
      console.log(response); 
      const data = response.data;
      const totalRecord = response.headers['x-total-count']
      return {
          data: data, 
          totalRecord: totalRecord
      };
  }catch(e){
      console.log("Lỗi"+e);
  }
  }

  export async function searchStockByName(searchName) {
    try {
      const response = await axios.get(url);
      const data = response.data;
      const filteredStocks = data.filter(stock => 
        stock.product.name.toLowerCase().includes(searchName.toLowerCase())
      );
  
      return filteredStocks;
    } catch (error) {
      console.error('Error fetching stock data:', error);
      return [];
    }
  }

export async function addNewStock(stock) {
  try {
      const response = await axios.post(url1, stock);
      return response.data;
  } catch (error) {
      console.error(error);
  }
}
export async function getStockById(id) {
  try {
    const response = await axios.get(`${url1}/${id}?_expand=product&_expand=supplier`);
    console.log(response);
    return response.data;
  } catch (e) {
    console.log("Lỗi" + e);
    return null;
  }
}

export async function editNewStock(id, stock) {
  try {
    const response = await axios.put(`${url1}/` + id, stock);
  } catch (e) {
    console.log("Lỗi" + e);
  }
}

export async function deleteStockById(id) {
  try {
    const response = await axios.delete(`${url1}/` + id);
    console.log(response);
    return response.data;
  } catch (e) {
    console.log("Lỗi" + e);
    return null;
  }
}