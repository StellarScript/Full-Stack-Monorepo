import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
   public healthCheck(): { status: string } {
      return { status: 'ok' };
   }
}
