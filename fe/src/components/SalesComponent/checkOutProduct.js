import axios from "axios";

let urlWeebhook = 'https://auto.canopigms.xyz/webhook/checkOutSaleCodeGym';
export async function triggerWebhook(info) {
    try {
        const response = await axios.post(urlWeebhook,info)
        return response.data
    }catch (error){
        console.error(error)
    }
}