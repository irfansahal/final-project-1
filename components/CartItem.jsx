/* eslint-disable @next/next/no-img-element */

import { useCart } from "@/app/contexts/Cart";
import { useState } from "react"

/* eslint-disable jsx-a11y/alt-text */
export default function CartItem({ item }){
    const [ quantity , setQuantity ] = useState(item.quantity);
    
    const { removeFromCart,  updateQuantity } = useCart();

    return(
        <tr className=" by-5 py-2  bg-blue-300 border-b-8 border-amber-50">
            <td className=" px-15 m-5 py-5 ">
                <div>
                    <img 
                    src={item.image}
                    className="product-image w-[100px] h-[100px] rounded"
                    />
                </div>
            </td>
            <td className="px-15">
                <p className="font-bold">
                  {item.title}
                </p>
            </td>
            <td className="px-15">
              <p className="font-bold">
              {item.price}
              </p>
            </td>
            <td className="px-15">
                <div className="qty_iput flex p-10">
                    <button 
                    className="qty-count qty-count--minus w-[30px] border border-1 rounded-s-lg text-center hover:bg-amber-300 "
                    >
                        <figure 
                        onClick={()=>{
                            if(quantity > 1){
                              setQuantity(quantity - 1);
                              updateQuantity(item._id, quantity - 1);
                            }else{
                                return alert(`Quantity must be above 1`);
                            }
                        }}
                        >
                            -
                        </figure>
                        
                    </button>
                    <input 
                    className="product-aty w-[50px] border border-1 text-center"
                    type="number"
                    name="product-qty"
                    value={quantity}
                    min="1"
                    onChange={(e)=>{
                        if(parseInt(e.target.value) >= 0){
                            setQuantity(parseInt(e.target.value));
                            updateQuantity(
                                item._id,
                                Number(e.target.value),
                            );
                        }
                    }}
                    />
                    <button className="qty-count qty-count--add w-[30px] border border-1 rounded-e-lg text-center hover:bg-amber-300 ">
                        <figure 
                        onClick={()=>{
                            if(quantity >= 0){
                                setQuantity((prevQuantity) => {
                                    return prevQuantity + 1;
                                });
                                updateQuantity(item._id, quantity + 1);
                            }
                        }}
                        >
                            +
                        </figure>
                    </button>
                </div>
            </td>
            <td className="px-15">
                <p className="font-bold">{item.quantity ? item.price * item.quantity : 0}</p>
            </td>
            <div>
                <button className="flex items-center pt-12 ps-10" 
                onClick={()=> removeFromCart(item._id)}
                >
                    X 
                </button>
            </div>
        </tr>
    )
}