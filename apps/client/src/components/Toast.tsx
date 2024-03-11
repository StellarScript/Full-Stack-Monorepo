"use client";

import React, { createContext, useContext, useState } from "react";

import { cn } from "@utils";
import { Icons } from "./Icons";

type ToastContextType = {
   addToast: (toast: ToastProps) => void;
};

type ToastProviderProps = {
   children?: React.ReactNode;
};

type ToastProps = {
   type: "success" | "error" | "warning";
   message: string;
   icon?: React.ReactNode;
};

type ToastInternal = ToastProps & {
   id: number;
};

const ToastContext = createContext<ToastContextType>({ addToast: () => ({}) });

export const useToast = () => useContext(ToastContext);

const Toast = ({ toast, onClose }: { toast: ToastInternal; onClose: () => void }) => {
   const iconComponents = {
      success: Icons.Success,
      error: Icons.Fail,
      warning: Icons.Warning,
   };

   const IconComponent = iconComponents[toast.type];

   return (
      <div
         className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
         role="alert"
      >
         <div
            className={cn(
               "inline-flex items-center justify-center flex-shrink-0 w-8 h-8",
               "text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200", // You can adjust this to match type-specific styles
            )}
         >
            {IconComponent && (
               <>
                  <IconComponent />
                  <span className="sr-only">{toast.type} icon</span>
               </>
            )}
         </div>
         <div className="ms-3 text-sm font-normal">{toast.message}</div>
         <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
         >
            <span className="sr-only">Close</span>
            <Icons.Close />
         </button>
      </div>
   );
};

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
   const [toasts, setToasts] = useState<ToastInternal[]>([]);

   const addToast = (toast: ToastProps) => {
      const id = Date.now() + Math.random();
      setToasts((prevToasts) => [...prevToasts, { ...toast, id }]);
   };

   const closeToast = (id: number) => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
   };

   return (
      <ToastContext.Provider value={{ addToast }}>
         {toasts.map((toast) => (
            <Toast key={toast.id} toast={toast} onClose={() => closeToast(toast.id)} />
         ))}
         {children}
      </ToastContext.Provider>
   );
};
