import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


// Define a user type or interface
interface User {
  id: number;
  username: string;
  password: string;
  // Add other properties as needed
}

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credintial",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Your-cool-username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "your-awesome-password",
        },
      },

      async authorize(credentials, req) {
        // let condition: Boolean = false;

        let user = { id: "42", name: "dave", password: "next" };
        // let newuser: User[]

        try {
          console.log("Trying");
          const data = {
            username: credentials?.username,
            password: credentials?.password,
          };

          const response = await fetch(
            `${process.env.NEXTAUTH_URL}/api/users`,
            {
              // Use NEXTAUTH_URL environment variable
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }
          );
          if (response.ok) {
            console.log("user");
            const jsondata = (await response.json()) as any[]; // Specify the type as any[]
            user.id = jsondata[0].userid;
            user.name = jsondata[0].username;
            user.password = jsondata[0].password;
            console.log("jsondata");
            console.log(jsondata);
          }
        } catch (error) {
          console.log("Error Fetch Data:" + error);
        }

        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          return user;
        }
        return null;
      },
    }),
  ],

  ///--- for adding custom values to session , need this callback
  //---next-auth.d.ts file

  //   callbacks: {
  //     async jwt({ token, user }) {
  //       if (user) {
  //         token.role = user.role;
  //       }
  //       return token;
  //     },
  //     async session({ session, token }) {
  //       if (session?.user) {
  //         session.user.role = token.role;
  //         session.user.test = "SOMTHING";
  //       }
  //       return session;
  //     },
  //   },
};
