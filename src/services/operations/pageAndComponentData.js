import React from 'react'
import {toast} from 'react-hot-toast';
import { apiConnector } from '../apiConnector';
import { catalogData } from '../apis';

export const getCatalogPageData = async(categoryId) => {

    const toastId = toast.loading("loading...");
    let result = [];
    try{
        console.log("here",catalogData.CATALOGPAGEDATA_API)
        const response = await apiConnector("POST",catalogData.CATALOGPAGEDATA_API,{categoryId: categoryId});
        console.log("here222222222",catalogData.CATALOGPAGEDATA_API)
        if(!response?.data?.success){
            throw new Error("could not fetch Category page data")
        }       
        
        result = response?.data;
    }catch(error){
        console.log("Catalog page data API error...",error)
        toast.error(error.message);
        result=error.response?.data;
    }

    toast.dismiss(toastId);
    return result;

}
 
