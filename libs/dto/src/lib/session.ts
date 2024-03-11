import {
   IsString,
   IsNotEmpty,
   IsNumber,
   IsBoolean,
   IsArray,
   IsObject,
   ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';

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

export class EmailAccountDto {
   @IsString()
   @IsNotEmpty()
   id!: string;

   @IsString()
   @IsNotEmpty()
   emailAddress!: string;

   @IsArray()
   verification!: {
      status: string;
      strategy: string;
      externalVerificationRedirectURL: string | null;
      attempts: number | null;
      expireAt: number | null;
      nonce: string | null;
   }[];

   @IsArray()
   @IsNotEmpty()
   linkedTo!: string[];
}

export class ExternalAccountDto {
   @IsString()
   @IsNotEmpty()
   id!: string;

   @IsString()
   @ValidateIf((_, value) => value !== undefined)
   provider?: string;

   @IsString()
   @ValidateIf((_, value) => value !== undefined)
   identificationId?: string;

   @IsString()
   @ValidateIf((_, value) => value !== undefined)
   externalId?: string;

   @IsString()
   @IsNotEmpty()
   approvedScopes!: string;

   @IsString()
   @IsNotEmpty()
   emailAddress!: string;

   @IsString()
   @IsNotEmpty()
   firstName!: string;

   @IsString()
   @IsNotEmpty()
   lastName!: string;

   @IsString()
   @IsNotEmpty()
   imageUrl!: string;

   @IsString()
   @ValidateIf((_, value) => value !== null)
   username!: string | null;

   @IsObject()
   publicMetadata!: object;

   @IsString()
   @ValidateIf((_, value) => value !== null)
   label!: string | null;

   @IsArray()
   verification!: object[];
}

export class UserAccountDto {
   @IsString()
   @IsNotEmpty()
   id!: string;

   @IsBoolean()
   @IsNotEmpty()
   passwordEnabled!: boolean;

   @IsBoolean()
   @IsNotEmpty()
   totpEnabled!: boolean;

   @IsBoolean()
   @IsNotEmpty()
   backupCodeEnabled!: boolean;

   @IsBoolean()
   @IsNotEmpty()
   twoFactorEnabled!: boolean;

   @IsBoolean()
   @IsNotEmpty()
   banned!: boolean;

   @IsNumber()
   @IsNotEmpty()
   createdAt!: number;

   @IsNumber()
   @IsNotEmpty()
   updatedAt!: number;

   @IsString()
   @IsNotEmpty()
   imageUrl!: string;

   @IsBoolean()
   @IsNotEmpty()
   hasImage!: boolean;

   @IsString()
   @IsNotEmpty()
   primaryEmailAddressId!: string;

   @IsNumber()
   @ValidateIf((_, value) => value !== null)
   primaryPhoneNumberId!: number | null;

   @IsNumber()
   @ValidateIf((_, value) => value !== null)
   primaryWeb3WalletId!: number | null;

   @IsNumber()
   @ValidateIf((_, value) => value !== null)
   lastSignInAt!: number | null;

   @IsNumber()
   @ValidateIf((_, value) => value !== null)
   externalId!: number | null;

   @IsString()
   @ValidateIf((_, value) => value !== null)
   username!: string | null;

   @IsString()
   @IsNotEmpty()
   firstName!: string;

   @IsString()
   @IsNotEmpty()
   lastName!: string;

   @IsObject()
   publicMetadata!: object;

   @IsObject()
   privateMetadata!: object;

   @IsObject()
   unsafeMetadata!: object;

   @IsArray()
   @Type(() => EmailAccountDto)
   emailAddresses!: EmailAccountDto[];

   @IsArray()
   phoneNumbers!: number[];

   @IsArray()
   web3Wallets!: object[];

   @Type(() => ExternalAccountDto)
   externalAccounts!: ExternalAccountDto;

   @IsBoolean()
   @IsNotEmpty()
   createOrganizationEnabled!: boolean;
}
