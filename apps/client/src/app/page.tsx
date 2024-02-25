import { Infinity } from "@components/svg/infinity";

export default async function Index() {
   return (
      <div className="bg-white text-gray-800">
         <header className="container mx-auto px-6 py-4">
            <nav className="flex justify-between items-center">
               <div className="text-3xl font-bold text-indigo-600">MyLogo</div>
               <div>
                  <a
                     href="#"
                     className="bg-blue-500 text-white px-5 py-2 rounded-md shadow hover:bg-blue-600 transition-colors"
                  >
                     Login
                  </a>
               </div>
            </nav>
         </header>

         <main className="container mx-auto px-6 mt-16">
            <div className="w-1/2">
               <h1 className="text-7xl font-bold text-gray-800 mb-2">Dive into the world of animation</h1>
            </div>
            <div className="flex flex-col md:flex-row md:items-start">
               <div className="text-center md:text-left">
                  <p className="text-gray-600 text-lg mb-6">
                     Make your content alive with motion designed illustrations
                  </p>
                  <div className="flex justify-center gap-4 md:justify-start">
                     <a href="#" className="bg-blue-500 text-white px-6 py-2 rounded-md shadow hover:bg-blue-600">
                        Discover now
                     </a>
                     <a
                        href="#"
                        className="bg-transparent text-blue-500 px-6 py-2 rounded-md border border-blue-500 hover:bg-blue-500 hover:text-white"
                     >
                        Pricing plans
                     </a>
                  </div>
               </div>

               <div className="flex-shrink-0 mt-6 md:mt-0 md:ml-10">
                  <Infinity />
               </div>
            </div>
         </main>
      </div>
   );
}
