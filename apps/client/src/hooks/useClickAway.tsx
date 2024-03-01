import { RefObject, useEffect } from "react";

export const UseClickAway = (
   ref: RefObject<HTMLElement>,
   handler: () => void,
   events: string[] = [`mousedown`, `touchstart`],
): void => {
   const detectClickOutside = (event: MouseEvent | TouchEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
         handler();
      }
   };

   useEffect(() => {
      for (const event of events) {
         document.addEventListener(event, detectClickOutside as EventListener);
      }
      return () => {
         for (const event of events) {
            document.removeEventListener(event, detectClickOutside as EventListener);
         }
      };
   }, [events, ref, handler]);
};
