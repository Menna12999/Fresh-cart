import axios from "axios"

let token = localStorage.getItem('userToken')

export function onlinePayment({cartId,shippingAddress}){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,{shippingAddress},{headers:{token}})
}

export function cachPayment({cartId,shippingAddress}){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,{shippingAddress},{headers:{token}})
}
export function getAllOrderes(cartId){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${cartId}`)
}

