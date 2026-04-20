"use client";

import { useState, useEffect} from "react";
import { priceRanges } from "@/app/utils/filteredData";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";


export default function ProductFilter(){
    const [ categories , setCategories ] = useState([]);
    const pathName = "/shop"
    const params = useSearchParams();
    const router = useRouter();

    const getCategories = async () => {
        const res = await fetch(`/api/category`, {
            method : "GET",
            next : { revalidate : 1},
        });
        const data = await res.json();
        setCategories(data);
    };

    useEffect(()=>{
          getCategories();
    },[])

    const activeButton = "bg-blue-600 text-white font-semibold px-3 py-1 rounded-full mx-1 shadow"
    const button = "bg-gray-100 text-gray-800 font-medium px-1 rounded-full mx-1 shadow hover:bg-gray-200 transition"

    const createQuaryParams = (paramsName , value) => {
       let newParams = new URLSearchParams(params.toString());
       if(Array.isArray(paramsName) && Array.isArray(value)){
        paramsName.forEach((name, index)=>{
            newParams.set(name , value[index]);
        });

        newParams.set("page" , 1);
        let newSearchQuary = newParams.toString();
        router.push(`${pathName}/?${newSearchQuary}`);
        return;
       }

       newParams.set(paramsName, value);
       newParams.set("page", 1);
       let newSearchQuary = newParams.toString();
       router.push(`${pathName}?${newSearchQuary}`);
    }

    const removeFilter = (filter) => {
        let newParams = new URLSearchParams(params.toString())
        if(typeof filter === "string"){
           newParams.delete(filter);
        }
        if(Array.isArray(filter)){
          filter.forEach((name)=>{
            newParams.delete(name);
          });
        }
        newParams.set("page" , 1);
        const queryString = newParams.toString();
        router.push(`${pathName}?${queryString}`);
    };
    return (
      <div>
        <p>Filter Products</p>
        
        <Link href="/shop" className="text-red-600 hover:underline">
        Clear Filter
        </Link>

        <p className="mt-6 mb-2 text-blue-700 bg-blue-100 px-3 py-2 rounded">
            Price
        </p>
        <div className="flex flex-wrap items-center gap-2">
         {priceRanges?.map((range)=>{
            const isActive = params.get("minPrice") === String(range?.min) && 
            params.get("maxPrice") === String(range?.max);

            return(
                <div key={range?.label} className="flex items-center">
                    <button
                    className={isActive ? activeButton : button }
                    onClick={()=>createQuaryParams(["minPrice", "maxPrice"],[range.min , range.max ])}
                    >
                      {range?.label}
                    </button>
                    {isActive && (
                        <button onClick={()=>removeFilter(["minPrice","maxPrice"])} className="ml-1 text-red-500 font-bold 
                        hover:text-red-700
                        ">
                         X
                        </button>
                    )}
                </div>    
            )
         })}
        </div>

        <p className="mt-6 md-2 text-blue-700 bg-blue-100 px-3 py-2 rounded">Categories</p>
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((c)=>{
            const isActive = params.get("category") === c._id;

            return(
                <div key={c._id} className="flex items-center ">
                 <button className={isActive ? activeButton : button }
                 onClick={()=>createQuaryParams("category", c._id)}
                 >
                    {c.title}
                 </button>
                 {isActive && (
                    <button className="ml-1 text-red-500 font-bold hover:text-red-700"
                    onClick={()=>removeFilter("category")}
                    >
                        X
                    </button>
                 )}
                </div>
            )
          })}
        </div>
      </div>

    )
}