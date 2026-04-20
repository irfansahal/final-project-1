import { updateTag } from "next/cache";

export default async function addproduct(product){
     await fetch(`http://localhost:3000/api/product`, {
        method : "POST",
        body : JSON.stringify(product),
        headers : {
            "Content-type" : "application/json",
        }
    });
    // updateTag("products")
}