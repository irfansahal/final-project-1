import { NextResponse } from "next/server";
import connectDB from "@/app/utils/db";
import Product from "@/app/models/product";
import { getToken } from "next-auth/jwt";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req){
    await connectDB();

    try {
        const { cartItem } = await req.json();
        
        if(!cartItem || !Array.isArray(cartItem) || cartItem.length === 0 ){
            return NextResponse.json(
                { error : "Invalid cart items"},
                { status : 400 },
            );
        }

        const token = await getToken({
            req,
            secret : process.env.NEXTAUTH_SECRET,
        });
        const user = await token?.user;
        console.log(user , "Email");
        
        if( !user || !user.id){
            return NextResponse.json(
                { error: "Unauthorized"},
                { status : 401 },
            );
        }

        const productIds = cartItem.map((item)=> item._id);
        const products = await Product.find({ _id: { $in : productIds }});

        if(products.length !== cartItem.length){
            return NextResponse.json(
                { error : "Some products not found"},
                { status : 404 },
            );
        }

        const lineItems = cartItem.map((item)=>{
            const product = products.find((p)=> p._id.toString() === item._id);

            if(!product){
                throw new Error(`Product ${item._id} not found`);
            }
             if(!product.price || product.price <= 0 ){
                throw new Error(`Invalid price for product ${product.title}`)
             }
            //Limit Quantity (prevent abuse)
            const quantity = Math.min(item.quantity , 99);

            return {
                price_data : {
                    currency : "usd",
                    product_data : {
                        name : product.title,
                        images : product.image ? [product.image] : [],
                    },
                    unit_amount : Math.round(product.price * 100),
                },
                quantity : quantity,
            };
        });

         let success_url = process.env.VERCEL_PROJECT_PRODUCTION_URL 
           ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/success`
           : "http://localhost:3000/";
           console.log(success_url, "iiii");
           
           const session = await stripe.checkout.sessions.create({
            line_items : lineItems,
            success_url : success_url,
            // cancel_url : `${process.env.NEXT_PUBLIC_DOMIN/cart}`
            client_reference_id : user.id.toString(),
            mode : "payment",
            payment_method_types : ["card"],
            payment_intent_data : {
                metadata : {
                    cartItem : JSON.stringify(
                        cartItem.map((item)=> ({
                            _id : item._id,
                            quantity : Math.min(item.quantity, 99),
                        })), 
                    ),
                    userId : user.id.toString(),
                }, 
            },
            shipping_address_collection : {
                allowed_countries : ["US"],
            },
            customer_email : user.email,
            billing_address_collection : "required",
            expires_at : Math.floor(Date.now() / 1000) + 30 * 60, // 30 minutes
           });

           if(process.env.NODE_ENV === "development" ){
              console.log("Stripe chekout session created:" , session.id);
           }

           return NextResponse.json({
            sessionId : session.id,
            url : session.url,
           });
    } catch (error) {
         if(process.env.NODE_ENV === "development"){
            console.log("Stripe checkout error:", error);
            
         }

         return NextResponse.json(
            { error : "Failed to create chechout session"},
            { status : 500 },
         );
    }
}