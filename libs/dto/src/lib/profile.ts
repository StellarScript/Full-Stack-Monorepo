import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class PublicProfileDto {
   @IsString()
   @IsNotEmpty()
   id!: string;

   @IsEmail()
   @IsNotEmpty()
   primaryEmail!: string;

   @IsString()
   @IsNotEmpty()
   profileImageUrl!: string;
}
