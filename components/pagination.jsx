"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Pagination({ totalPages, pathName }){
    
    const params = useSearchParams();
    const router = useRouter();

    const createQuaryString = (paramsName , value) => {
        let newParams = new URLSearchParams(params.toString())
        newParams.set(paramsName , value);

        const quaryString = newParams.toString();

        const newURL = `${pathName}?${quaryString}`;
        console.log(newURL);
        
        router.push(newURL);
        //"page=2"
    }

    // 3 // length = 3
    return(
      <div className="text-center">
        <div >
            <nav>
                <ul className="flex justify-center">
                 { Array.from({ length : totalPages }, (_,index) => {
                    const page = index + 1 ;

                    return(
                        <li key={page} 
                        className="mr-2.5 border-blue-300 p-1.25 bg-[aqua] text-black rounded-2xl w-[30px]"
                        >
                          <button onClick={()=>createQuaryString("page", page)}>
                           {page}
                          </button>
                        </li>
                    )
                 })}
                </ul>
            </nav>
        </div>
      </div>
    )
}