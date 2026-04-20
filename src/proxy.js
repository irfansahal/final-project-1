// user ekta request korbe 
// page/ route
// api route 

// req -> middleware -> response (html/json)

//     -> 403/404   = API
//n    -> redirect  + PAGE

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    async function middleware(req){
          console.log( req, "REQ");
          const path = req.nextUrl.pathname;
          console.log( path, "path");
          
          const role = req?.nextauth?.token?.user?.role;
          console.log(role, "Role");
          
          if(path.startsWith("/api/admin") && role !== "admin"){
            return NextResponse.json(
                { error : "Unauthorized Request"},
                { status : 403 },
            );
          }
          if(path.includes("/admin") && role !== "admin"){
            return NextResponse.redirect(new URL("/", req.url));
          }
    },
    {
      callbacks: {
        authorized : ({ token }) => {
           return !!token;
        },
      },  
    },
)
export const config = {
    matcher : [
        "/checkout",
        "/dashboard/:path*",
        "/api/user/:path*",
        "/api/admin/:path*",
    ]
}