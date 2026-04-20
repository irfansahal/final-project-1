import Pagination from "../../../components/pagination";
import ProductCard from "../../../components/ProductCard";
import { getBaseUrl } from "../utils/api";

const getProducts = async (searchParams) => {
  
  const searchQuary = new URLSearchParams({
      page : searchParams.page,
  }).toString();
  console.log("searchQuary" , searchQuary);
  
  const baseURL = getBaseUrl()

  const URL = `${baseURL}/api/product?${searchQuary}`;
  
  const res = await fetch(URL);

  if(!res.ok){
    throw new Error(`Failed to fetch data`);
  }

  const data = await res.json();
  
  return{
     products : data.products,
     success : data.success,
     currentPage : data.currentPage,
     totalePages : data.totalePages,
  }
}

export default async function Shoping({ searchParams }){
    
    const params = await searchParams;
    console.log("params" , params);
    
    const { products, success, currentPage , totalePages } = await getProducts(params);
    
    return(
        <>
        <div>
            <div className="page-banner_details w-full h-[50vh] bg-yellow-100 flex items-center justify-center">
                <div className="page-banner_details_title flex 
                 justify-center ">
                    <h1 className=" font-bold text-4xl 
                    text-amber-300 font-serif 
                    ">Our E-commerce Website</h1>
                </div>
            </div>
        </div>
        <div className="section  flex flex-row items-center justify-center">
            <div className="container w-full h-[50vh] ">
                <div className="section_head page-banner_details  
                 justify-center ">
                    <div className="product_details page-banner_details_title  ">
                     <h2 className=" font-bold text-4xl 
                    text-blue-800 py-20 mt-20 font-serif text-center
                    ">All Products</h2>
    
                    <div className="flex justify-center flex-wrap justify-between">
                        <div className="grid grid-cols-3  gap-3">
                          {products?.length > 0 ? (
                            products?.map((product)=>(
                                <ProductCard 
                                key={product._id}
                                product={product}
                                />
                            ))
                          ) : (
                            <h2>No Product Found</h2>
                          )}
                        </div>
                    </div>
                     <Pagination  pathName={"/shoping"} totalPages={totalePages}/>
                    </div>
                </div>
            </div>
        </div>
       
        </>
    )
}