
//add to cart
import axios from "axios";


let baseUrl = `https://ecommerce.routemisr.com/api/v1`

let token = localStorage.getItem('userToken')

export function addToWhishListApi(productId)
{
    return axios.post(`${baseUrl}/wishlist`,{productId},{
        headers:{
            token
        }
    })
}

/////get cart

export  function getWhishListApi()
{
    return axios.get(`${baseUrl}/wishlist`,{
        headers:{
            token
        }  
    })
}

//delete item
export  function deleteWhishlist(id)
{
    return axios.delete(`${baseUrl}/wishlist/${id}`,{
        headers:{
            token
        }  
    })
}
