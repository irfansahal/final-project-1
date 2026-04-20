export const dynamic = "force-dynamic";

import Pagination from "../../../components/pagination"
import ProductCard from "../../../components/ProductCard"
import ProductFilter from "../../../components/ProductFilter";
import { getBaseUrl } from "../utils/api"

const getProductsForShop = async (queryParams) => {
    const searchQuary = new URLSearchParams({
        page : queryParams.page || 1,
        minPrice : queryParams.minPrice || "",
        maxPrice : queryParams.maxPrice || "",
        category : queryParams.category || "",
    }).toString();

    const baseURL = getBaseUrl();
    try {
          const res = await fetch(`${baseURL}/api/product/filters?${searchQuary}`);
          if(!res.ok){
            throw new Error(`Failed to fetch filtered products`);
          }
          const data = await res.json();
          return data;
    } catch (error) {
        return { products : [] , currentPage : 1, totalPages : 1  }
    }

}

export default async function Shop({ searchParams }){
    
    const { page , minPrice , maxPrice , category } = await searchParams;
    const queryParams = { page , minPrice , maxPrice , category };  
    

    const { products , currentPage, totalPages } = await getProductsForShop(queryParams)
    return(
        <div className="w-full px-4">
         <div className="flex flex-col lg:flex-row gap-6">
             {/* Sidbar */}
          <div className="lg:w-1/4 overflow-auto max-h-[90vh]">
          <ProductFilter />
          </div>

          <div className="lg:w-3/4 max-h-[90vh]">
            <h4 className="text-center font-bold mt-3 text-lg">
              Shop List Products
            </h4>

            { products?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 ">
                 {products.map((product)=>(
                     <ProductCard key={product._id} product={product}/>
                 ))}
                </div>
            ) : (
                <h2 className="text-center mt-6 text-gray-600">No products found by applying your filters</h2>
            )}
            <div className="mt-8">
                 <Pagination pathName={"/shop"} totalPages={totalPages}/>
            </div>
          </div>
         </div>
        </div>
    )
}