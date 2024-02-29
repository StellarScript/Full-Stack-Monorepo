import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class UserSessionDto {
   @IsString()
   @IsNotEmpty()
   azp!: string;

   @IsNumber()
   @IsNotEmpty()
   exp!: number;

   @IsNumber()
   @IsNotEmpty()
   iat!: number;

   @IsString()
   @IsNotEmpty()
   iss!: string;

   @IsNumber()
   @IsNotEmpty()
   nbf!: number;

   @IsString()
   @IsNotEmpty()
   sid!: string;

   @IsString()
   @IsNotEmpty()
   sub!: string;
}
