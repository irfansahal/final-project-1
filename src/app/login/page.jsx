"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Login(){
    
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ isLoading , setIsLoading ] = useState(false)
    const [ errorMessage , setErrorMessage ] = useState("")

    const router = useRouter();

    const submitHandler = async (e) => {
       e.preventDefault();
       setIsLoading(true);
       try {
         const result = await signIn("credentials",{
            redirect : false,
            email,
            password,
         });

         if(result?.error){
            setIsLoading(false);
            setErrorMessage(result?.error);
         }else{
            router.push("/")
         }
       } catch (error) {
         setIsLoading(false);
         setErrorMessage(error);
       }

    }
    return(
        <main className="flex justify-center pt-30">
         <section className="p-5 w-[300px] md:w-[600px] bg-pink-500 text-amber-50 rounded">
            <h1 className="text-center font-extralight text-[20px] font-serif">Login</h1>
            <form onSubmit={submitHandler}>
                <div className="flex flex-col justify-center items-center">
                    <label
                    htmlFor="email"
                     className="p-3 font-serif">Your Email</label>
                    <input 
                    className="bg-pink-200 w-[280px] md:w-[450px] h-[40px] rounded  text-black"
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>

                <div className="flex flex-col justify-center items-center">
                    <label
                    className="p-3 font-serif"
                    htmlFor="password"
                    >Your Password:</label>
                    <input 
                    className="bg-pink-200 w-[280px] md:w-[450px] h-[40px] rounded  text-black"
                    type="password"
                    id="password"
                    required
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>

                <div className="flex flex-col justify-center items-center">
                    {!isLoading && <button 
                    className="mt-5 p-3 rounded-lg bg-black text-lg text-white"
                    >REGISTER</button>}
                    {isLoading && <p>Loagin New User</p>}
                    {errorMessage && <p className="bg-pink-200 text-red-700 p-3 rounded-lg font-bold">{errorMessage}</p>}
                </div>
            </form>
         </section>
        </main>
    )
}