type ErrorType = {
   message?: string;
};

export function errorMessage<T extends ErrorType>(error: T): T | string {
   if (!error.message) {
      return error;
   }

   if (typeof error.message === 'string') {
      return error.message.trim();
   }
   return error.message;
}
