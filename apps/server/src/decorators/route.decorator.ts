import { UseGuards, applyDecorators } from '@nestjs/common';

import { Reflector } from './reflector.decorator';
import type { Descriptor, Target } from './reflector.decorator';
import { IS_PUBLIC_IDENTIFIER, BYPASS_GLOBAL_GUARD } from './constants.decorator';

/**
 *
 * @description Make route public
 */
export function Public() {
   return <T>(target: Target, _?: string | symbol, descriptor?: Descriptor<T>) => {
      const reflect = new Reflector(target, descriptor);
      return reflect.define<boolean>(IS_PUBLIC_IDENTIFIER, true);
   };
}

/**
 *
 * @param Guard
 * @description Override global guard
 */
export function UseGuardOverride<T>(Guard: new (...args: unknown[]) => T) {
   return applyDecorators(UseGuards(Guard), bypassGlobalGuard());
}

/**
 *
 * @description Bypass global guard
 */
function bypassGlobalGuard() {
   return <T>(target: Target, _?: string | symbol, descriptor?: Descriptor<T>) => {
      const reflect = new Reflector(target, descriptor);
      return reflect.define<boolean>(BYPASS_GLOBAL_GUARD, true);
   };
}
