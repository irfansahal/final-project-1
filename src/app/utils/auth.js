import CredentialsProvider from "next-auth/providers/credentials";

//import User from "@/app/(main)/models/users";
import User from "@/app/models/users"
import bcrypt from "bcrypt"
import connectDB from "./db";


export const authOption = {
   session : {
    strategy : "jwt",
   },
   providers : [
      CredentialsProvider({
        name: "credentials",
        credentials : {
            email : { label : "email", type : "email"},
            password : { label : "password" , type : "password"},
        },
        async authorize(credentials){
          console.log("I AM BEING CALLED" , credentials);

          if(!credentials.email || !credentials.password ){
            throw new Error(`Email And Password Are Requred`)
          }
          try {
            await connectDB();
            const user = await User.findOne({
                email : credentials.email,
            }).lean();
            
             if(!user){
                throw new Error(`Invalied Credentials`)
             }

             const isMetch = await bcrypt.compare(
                credentials.password ,
                user.password
             )

             if(!isMetch){
              throw new Error(`Invalied Credential`);
             }

             const { password , ...userWitoutPassword } = user;
             return userWitoutPassword
          } catch (error) {
            throw new Error(`Authentication Failed`)
          }
        },
      }),
   ],
   callbacks : {
     // user login attamts 
     async signIn({ user }){
      console.log(user , 'user from signin');
      return !!user;
     },
     async jwt({ token , user }){
        if(user){
          token.user = {
            id: user._id,
            email : user.email,
            name: user.name,
            role: user.role,
          };
        }
        
        return token;
     },
     async session({ session , token }){
       if( token.user ){
         session.user = token.user 
       };
       return session;
     },
   },
    secret : process.env.NEXTAUTH_SECRET,
     pages : {
     signIn : "/login",
   },
}