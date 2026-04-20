"use client";
import addproduct from "@/app/actions/addProduct";
import { useState , useEffect } from "react";


export default function AddProduct(){
   
    const [ product , setProduct ] = useState({
      title : "",
      price : "",
      image: "",
      category : "",
    })
    
   const [ categories , setCategories ] = useState([])
   useEffect(()=> {
     const getAllCategory = async () => {
      const res = await fetch(`/api/category`);
      const data = await res.json();
      setCategories(data);
      setProduct({...product, category : data[0]._id });
     }
     getAllCategory();
   },[])

   const handleImageChange = async (e) => {
     const file = e.target.files[0];
     console.log("file" , file);
      
     const data = new FormData();
     
     data.append("file" , file);
     data.append("cloud_name", "dybdafvqn");
     data.append("upload_preset" , "projectWeek-1");

     const res = await fetch(`https://api.cloudinary.com/v1_1/dybdafvqn/image/upload`,{
        method: "POST",
        body : data,
     });

     const result = await res.json();
     setProduct({...product, image : result.secure_url});
   };

   const handleChange = (e) => {
     setProduct({
        ...product,
        [e.target.name] : e.target.value === "price" ? 
        Number(e.target.value)
        : e.target.value , 
     });
   }
   
   const submitHndler = async (e) => {
    e.preventDefault();
     await addproduct(product)
   }
    return(
      <>
      <div className="flex justify-center pt-3">
        <form className="flex flex-col justify-between items-center w-[900px] gap-3" 
        onSubmit={submitHndler}
        >
          <p className="font-bold text-2xl">Title :</p>
          <input 
          name="title"
          style={{}}
          className="block  w-[80%] h-[50px] p-3 border rounded "
          type=""
          required
          value={product.title}
          onChange={handleChange}
          />
          <br/>
          <p className="font-bold text-2xl">Price : </p>
          <input 
          name="price"
          style={{}}
           className="block  w-[80%] h-[50px] p-3 border rounded "
          type="number"
          required
          value={product.price}
          onChange={handleChange}
          />
          <br/>

         <select name="category"
         value={product.category}
         onChange={handleChange}
         >
         {categories?.map((cat)=>(
         <option key={cat._id} value={cat._id}>
         {cat.title}
         </option>
         ))}
         </select>
          <p className="font-bold text-2xl">img URL:</p>
          <input 
          name="image"
          accept=".jpg, .jpeg, .png"
          className="block w-[30%] h-[50px] p-3 border rounded hover:bg-amber-300"
          type="file"
          onChange={handleImageChange}
          />
          <br/>
          <input
          type="submit"
           className="bg-pink-500 text-white font-bold p-3 rounded hover:bg-pink-600"
          />
        </form>
      </div>
      </>
    )
}