// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import { env } from "./env.ts";
// import { User } from "../models/index.ts";

// // Serialize user for session
// passport.serializeUser((user: any, done) => {
//   done(null, user._id);
// });

// // Deserialize user from session
// passport.deserializeUser(async (id: string, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err);
//   }
// });

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: env.GOOGLE_CLIENT_ID!,
//       clientSecret: env.GOOGLE_CLIENT_SECRET!,
//       callbackURL: env.GOOGLE_CALLBACK_URL,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const email = profile.emails?.[0]?.value;
        
//         if (!email) {
//           return done(new Error("No email provided by Google"), null);
//         }

//         // First, check if user exists with this googleId
//         let user = await User.findOne({ googleId: profile.id });

//         if (user) {
//           // User already exists with this Google ID
//           return done(null, user);
//         }

//         // Check if user exists with this email
//         user = await User.findOne({ email });

//         if (user) {
//           // User exists with this email - merge Google account
//           user.googleId = profile.id;
//           user.authProvider = "google";
//           user.isVerified = true;
//           // Update name if not set or if Google provides a better one
//           if (!user.name || user.name.trim() === "") {
//             user.name = profile.displayName || email.split("@")[0];
//           }
//           // Update avatar if available
//           if (profile.photos && profile.photos[0] && !user.avatar) {
//             user.avatar = profile.photos[0].value;
//           }
//           await user.save();
//           return done(null, user);
//         }

//         // Create new user
//         // Generate username from email or name
//         const baseUsername = (profile.displayName || email.split("@")[0])
//           .toLowerCase()
//           .replace(/[^a-z0-9]/g, "")
//           .substring(0, 15);
        
//         let username = baseUsername;
//         let counter = 1;
//         while (await User.findOne({ username })) {
//           username = `${baseUsername}${counter}`;
//           counter++;
//         }

//         user = await User.create({
//           googleId: profile.id,
//           email,
//           name: profile.displayName || email.split("@")[0],
//           username,
//           authProvider: "google",
//           isVerified: true,
//           avatar: profile.photos?.[0]?.value,
//         });

//         return done(null, user);
//       } catch (err: any) {
//         console.error("Google OAuth error:", err);
//         done(err);
//       }
//     }
//   )
// );

// export default passport;
export default {};