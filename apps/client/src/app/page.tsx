"use server";

import Link from "next/link";
import InfinityIllustration from "@assets/infinity";

export default async function Index() {
   return (
      <div className="relative size-full p-0 m-0">
         <div className="bg-white text-gray-800">
            <header className="container-lg mx-auto">
               <nav className="grid md:grid-cols-2 sm:grid-cols-1 gap-2 md:justify-between sm:justify-center p-4">
                  <div className="w-full text-center md:text-start text-[31px]">
                     <span className="font-bold w-full leading-[80px] bg-clip-text text-transparent bg-gradient-to-r from-[#ff1a4e] to-[#1a1aff] text-[28px]">
                        BeLottie
                     </span>
                  </div>
                  <div className="md:flex items-center justify-end hidden">
                     <Link
                        href="/"
                        className="bg-primary hover:bg-blue-600 text-white px-5 py-2 rounded-md shadow transition-colors cursor-pointer"
                     >
                        Login
                     </Link>
                  </div>
               </nav>
            </header>

            <div className="size-full md:pt-[6.75rem] pt-[70px]">
               <div className="container-lg mx-auto md:px-0 px-[33px]">
                  <div className="flex flex-wrap self-stretch w-full items-start">
                     <div className="md:w-[60%] sm:w-full md:text-start text-center">
                        <div className="font-inter font-bold  md:text-[72px] text-[54px] md:leading-[80px] leading-[60px] tracking-[0px]">
                           <h1>Dive into the world of AI</h1>
                        </div>
                     </div>
                  </div>
                  <div className="md:columns-2 sm:columns-1">
                     <div className="w-full">
                        <div className="flex items-start">
                           <div className="flex md:block justify-center md:justify-start text-center md:text-start md:pt-[60px] pt-[35px] content-start flex-wrap self-stretch">
                              <div className="flex w-[80%]">
                                 <div className="md:mb-[80px] mb-[30px] mx-2 break-words">
                                    <div className="font-inter font-light text-[18px]">
                                       <span>
                                          Customize and fine-tune generated content to match your unique preferences and
                                          requirements
                                       </span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="flex items-start items-center md:justify-start justify-center">
                           <div className="mr-[60px]">
                              <Link
                                 href="/auth/signup"
                                 className="bg-primary hover:bg-blue-600 text-white text-[18px] leading-[18px] font-normal tracking-[0px] rounded-[12px] py-[20px] px-[40px] transition-all duration-300 ease-in-out"
                              >
                                 Get Started
                              </Link>
                           </div>
                           <div className="flex">
                              <span className="underline">Pricing plans</span>
                           </div>
                        </div>
                     </div>
                     <div className="flex w-full">
                        <div className="flex w-full justify-center flex-wrap self-stretch relative lg:top-[-5rem] md:top-[-2rem]">
                           <InfinityIllustration className="md:size-[100%] w-[22rem] h-[19rem] max-w-[33rem] max-h-[22rem]" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
