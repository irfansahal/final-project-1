"use client"

import Link from "next/link";
import { signOut } from "next-auth/react";

import { useSession } from "next-auth/react";

export default function Nav(){
  const { data, status  } = useSession();
   console.log(data , "data");
   console.log(status, "state");
   
   
    return(
        <ul>
            <li><Link href="/">Home</Link></li>
           {status !== "authenticated" && (
            <>
            <li><Link href="/register">Register</Link></li>
            <li><Link href="/login">Loging</Link></li>
            </>
           )}
            {data?.user?.role === "admin" && (
                <>
                 <li><Link href="/dashboard/admin/addmin-product">Addmin Product</Link></li>
                 <li><Link href="/dashboard/admin/addProduct">Add Product</Link></li>
                </>
            )}
           {status === "authenticated" && (
            <li><button onClick={()=>signOut()}>SIGN OUT</button></li>
           )}
           <li><Link href="/shoping">Shoping</Link></li>
           <li><Link href="/shop">Shop</Link></li>
           <li><Link href="/cart">Cart</Link></li>
           <li><Link href="/checkout">Check Out</Link></li>
        </ul>
    )
}