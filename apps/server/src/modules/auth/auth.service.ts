import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
   public async signup() {
      console.log('authenticating');
   }
}