import { useState } from "react";
import API from "../api";

const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = async (method, url, data) => {
        setLoading(true);
        setError(null);
        try{
            let res;
            if (method.toLowerCase() === 'get') {
                res = await API.get(url);
            } else if (method.toLowerCase() === 'post') {
                res = await API.post(url, data);
            } else if (method.toLowerCase() === 'put') {
                res = await API.put(url, data);
            } else if (method.toLowerCase() === 'delete') {
                res = await API.delete(url);
            } else {
                throw new Error(`Unsupported HTTP method: ${method}`);
            }
            return res.data;
        }
        catch(err){
            const errorMessage = err.response?.data?.error || err.response?.data?.message || err.message || "Something went wrong";
            setError(errorMessage);
            throw err;
        }
        finally{
            setLoading(false);
        }
    };
    return {request, loading, error};
};

export default useApi;