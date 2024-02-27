import { ClerkLoaded, SignUp } from "@clerk/nextjs";
import { AuthWrapper } from "../components/AuthWrapper";

export default function LoginPage() {
   return (
      <AuthWrapper>
         <ClerkLoaded>
            <SignUp
               appearance={{
                  elements: {
                     card: "rounded-4xl shadow gap-1 py-6 bg-[#fdfdfd]",
                     headerTitle: "text-[#303E4A] font-[200] text-3xl",
                     headerSubtitle: "text-[rgba(48, 62, 74, 0.80)] font-normal text-sm pb-2",
                     main: "px-6 py-8 rounded-md mb-4 bg-white",
                     socialButtonsBlockButton: "bg-white",
                     alternativeMethodsBlockButton: "bg-white",
                     alertText: "text-lg md:text-xs",
                     alertIcon: "w-5 h-5",
                     logoImage: "w-16 h-16",
                  },
               }}
            />
         </ClerkLoaded>
      </AuthWrapper>
   );
}
