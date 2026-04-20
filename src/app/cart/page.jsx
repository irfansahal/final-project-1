"use client"

import CartItem from "../../../components/CartItem";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useCart } from "../contexts/Cart";

export default function Cart(){

   const { cart, clearCart } = useCart();
   const { status } = useSession();

   let totalAmount = 0;
   cart.forEach((item)=> (totalAmount += item.price * item.quantity));

   // useMemo();

    return(
        <>
        <div>
            <div>
                <h1 className="text-center p-3 bg-pink-600 text-amber-50 font-bold">Product list in your cart</h1>
            </div>
            <div className="product-table-container flex justify-center rounded pt-5">
              <table>
                <thead className="py-5">
                  <tr className="border-b-2 ">
                    <th className="px-15">Product Image :</th>
                    <th className="px-15">Product Name :</th>
                    <th className="px-15">Product Price :</th>
                    <th className="px-15">Product Quantity :</th>
                    <th className="px-15">Product Subtotal :</th>
                    <th className="px-15">Product Action :</th>
                  </tr>
                </thead>
                <tbody>
                    {cart.map((item)=>(
                        <CartItem key={item._id} item={item}/>
                    ))}
                </tbody>
              </table>
            </div>
            <h2 className="">
                Your Total Price Will Be $ {totalAmount}
            </h2>
            <div>
                    <button 
                    className="btn-big px-5 py-2 bg-pink-500 text-amber-50 font-bold rounded hover:bg-pink-600"
                    onClick={()=>clearCart()}
                    >
                        Clear Cart
                    </button>
                </div>
        </div>
        <div className="container">
            <div className="row">
                <div className="col-lg-8 offset-lg-2">
                    <div className="d-flex justify-content-end my-4">
                      {status !== "authenticated" && (
                        <Link className="btn btn-primary btn-raised col-6"
                        href={`/login?callbackUrl=${"/cart"}`}
                        >
                            Login To Proceed to Checkout
                        </Link>
                      )}

                      {status === "authenticated" && (
                        <Link href={"/checkout"}
                        className="btn btn-primary btn-raised col-6"
                        aria-disabled={
                            status !== "authenticated"
                        }
                        >Proceed To Checkuot</Link>
                      )}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}