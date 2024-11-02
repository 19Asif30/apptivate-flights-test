
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        //serverless function
        // const sessionUser = await User.findOne({ email: session.user.email });

        // session.user.id = sessionUser._id.toString();

        return session;
      } catch (error) {}
    },

    async signIn({ profile }) {
      try {
        // await connectToDB();

        // //check if a user already exists

        // //if not create a new user and save in db
        // const userExists = await User.findOne({ email: profile.email });

        // if (!userExists) {
        //   await User.create({
        //     email: profile.email,
        //     username: profile.name,
        //     image: profile.picture,
        //   });
        // }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
