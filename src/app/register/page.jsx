"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register(){
   
    const [ name , setName ] = useState("")
    const [ email , setEmail ] = useState("")
    const [ password , setPassword ] = useState("")
    const [ isLoading , setIsloading ] = useState(false);
    const [ errorMassage , setErrorMessge ] = useState("");
    

    const router = useRouter();

    const submitHandeler = async (e) => {
       e.preventDefault();
       setIsloading(true);
       try {
         const res = await fetch(`/api/register`,{
            method : 'POST',
            body : JSON.stringify({name , email, password })
         });
         const data = await res.json();
         if(!res.ok){
          setIsloading(false);
          setErrorMessge(data?.err)
         }else{
            router.push("/login")
         }
       } catch (error) {
         setIsloading(false);
         setErrorMessge(error.message)
       }
    };
 
    return(
        <main className="flex justify-center pt-30">
            <section className="p-5 w-[300px] md:w-[600px] bg-pink-500 text-amber-50 rounded">
                <h1 className="text-center font-extralight text-[20px] font-serif">Please Register</h1>
                <form onSubmit={submitHandeler}>
                    <div className="flex flex-col justify-center items-center">
                        <label className="p-3 font-serif" htmlFor="name">Your Name</label>
                        <input 
                        className="bg-pink-200 w-[280px] md:w-[450px] h-[40px] rounded  text-black"
                        type="text"
                        id="name"
                        required
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        ></input>
                    </div>

                    <div className="flex flex-col justify-center items-center">
                        <label className="p-3 font-serif" htmlFor="email">Your Email</label>
                        <input 
                        className="bg-pink-200 w-[280px] md:w-[450px] h-[40px] rounded  text-black"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required
                        ></input>
                    </div>

                     <div className="flex flex-col justify-center items-center">
                        <label className="p-3 font-serif" htmlFor="password">Your password</label>
                        <input 
                        className="bg-pink-200 w-[280px] md:w-[450px] h-[40px] rounded  text-black"
                        type="password"
                        id="password"
                        required
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        ></input>
                    </div> 
                    <div className="flex flex-col justify-center items-center">
                     {!isLoading && <button className="mt-5 p-3 rounded-lg bg-black text-lg text-white"
                     type="submit"
                     >Register</button>}
                     {isLoading && <p>Creating New User</p>}
                     {errorMassage && <p className="bg-pink-200 text-red-700 p-3 rounded-lg font-bold">{errorMassage}</p>}
                    </div>
                </form>
            </section>
        </main>
    )
}