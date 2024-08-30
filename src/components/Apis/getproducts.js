import  axios  from 'axios';

export const getProducts=(async()=>{
    try{
        let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
    return data
    }
    catch(error){
        return error?.message
    }
})

export const getProductsWithCategories=(async(categoryId)=>{
    try{
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`);
    return data;
    }
    catch(error){
        return error?.message;
    }
})

export const getProductsWithBrands=(async(brandId)=>{
    try{
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`);
    return data;
    }
    catch(error){
        return error?.message;
    }
})




