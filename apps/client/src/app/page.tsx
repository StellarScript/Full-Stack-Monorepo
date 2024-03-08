import { Infinity } from "@components/svg/infinity";
import Link from "next/link";

export default async function Index() {
   return (
      <div className="relative size-full p-0 m-0">
         <div className="bg-white text-typography">
            <header className="container-lg mx-auto">
               <nav className="grid md:grid-cols-2 sm:grid-cols-1 gap-2 md:justify-between sm:justify-center p-4">
                  <div className="w-full text-center md:text-start text-[31px]">
                     <span className="font-bold leading-[60px] bg-clip-text text-transparent bg-gradient-brand">
                        BeLottie
                     </span>
                  </div>
                  <div className="md:flex items-center justify-end hidden">
                     <Link
                        href="/auth/login"
                        className="bg-primary-400 text-white px-5 py-2 rounded-md shadow hover:bg-primary-500 transition-colors cursor-pointer"
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
                        <div className="font-inter font-bold md:text-[72px] text-[54px] md:leading-[80px] leading-[60px] tracking-[0px]">
                           <h1>Dive into the world of animation</h1>
                        </div>
                     </div>
                  </div>
                  <div className="md:columns-2 sm:columns-1">
                     <div className="w-full">
                        <div className="flex items-start">
                           <div className="flex md:block justify-center md:justify-start text-center md:text-start md:pt-[60px] pt-[35px] content-start flex-wrap self-stretch">
                              <div className="flex w-[80%]">
                                 <div className=" md:mb-[80px] mb-[30px] mx-2 break-words">
                                    <div className="font-inter font-light text-[18px]">
                                       <span>Make your content alive with motion designed illustrations</span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="flex items-start items-center md:justify-start justify-center">
                           <div className="mr-[60px]">
                              <div className="py-[20px] bg-primary-400 text-white rounded-[12px]">
                                 <span className="text-[18px] leading-[18px] font-normal tracking-[0px] py-[10px] px-[40px]">
                                    Discover Now
                                 </span>
                              </div>
                           </div>
                           <div className="flex">
                              <Link href="#" className="underline">
                                 Pricing plans
                              </Link>
                           </div>
                        </div>
                     </div>
                     <div className="flex w-full">
                        <div className="flex w-full justify-center flex-wrap self-stretch relative lg:top-[-5rem] md:top-[-2rem]">
                           <Infinity className="md:size-[100%] w-[22rem] h-[19rem] max-w-[33rem] max-h-[22rem]" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
