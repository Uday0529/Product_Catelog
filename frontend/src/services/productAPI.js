import axios from "axios";

const API_URL = "http://localhost:5000/api/products";


export const getAllProducts = async (params = {}) => {
    const response = await axios.get(API_URL, {
        params
    });

    return response.data;
};

export const  createProduct = async (product) =>{
    const response = await axios.post(
        API_URL,
        product,
        {
            headers:{
                "x-api-key" : "my-secret-key"
            }  
        }
    );
    return response.data;
};

export const updateProduct = async(id, product) =>{
    const response = await axios.put(
        `${API_URL}/${id}`,
        product,
        {
            headers:{
                "x-api-key" : "my-secret-key"
            }
        }
    );

    return response.data;
};


export const deleteProduct = async(id) =>{
    const response = await axios.delete(
        `${API_URL}/${id}`,
        {
            headers:{
                "x-api-key" : "my-secret-key"
            }
        }
    );

    return response.data;
};

export const getProductStats = async () =>{
    const response = await axios.get(
        `${API_URL}/stats`
    );

    return response.data;
};

