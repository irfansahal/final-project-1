"use server";
import { getBaseUrl } from "../utils/api";

export default async function addproduct(product){
     
    const baseURL = getBaseUrl();

     await fetch(`${baseURL}/api/product`, {
        method : "POST",
        body : JSON.stringify(product),
        headers : {
            "Content-type" : "application/json",
        }
    });
    // updateTag("products")
}