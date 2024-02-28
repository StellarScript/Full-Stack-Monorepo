import { getDashboardAction } from "./actions";

export default function DashboardPage() {
   return (
      <div className="flex size-full">
         <div className="size-full">
            <header className="container-lg mx-auto">
               <nav className="grid md:grid-cols-2 sm:grid-cols-1 gap-2 md:justify-between sm:justify-center p-4">
                  <div className="w-full text-center md:text-start text-[31px]">
                     <span className="font-bold leading-[60px] bg-clip-text text-transparent bg-gradient-to-r from-[#df4c6d] to-[#0000fe]">
                        BeLottie
                     </span>
                  </div>
                  <div className="md:flex items-center justify-end hidden">
                     <a
                        href="/auth/logout"
                        className="bg-blue-500 text-white px-5 py-2 rounded-md shadow hover:bg-blue-600 transition-colors cursor-pointer"
                     >
                        Logout
                     </a>
                  </div>
               </nav>
            </header>
            <div className="size-full md:pt-[6.75rem] pt-[70px]">
               <div className="container-lg mx-auto md:px-0 px-[33px]">
                  <h1>Dashboard Page</h1>
                  <form action={getDashboardAction}>
                     <button type="submit">Submit</button>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
}
