import {
   IsString,
   IsNotEmpty,
   IsNumber,
   IsBoolean,
   IsArray,
   isNotEmpty,
   IsObject,
   ValidateIf,
} from 'class-validator';

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

export class EmailAddress {
   @IsString()
   @IsNotEmpty()
   email_address!: string;

   @IsString()
   @IsNotEmpty()
   id!: string;

   @IsArray()
   @IsNotEmpty()
   linked_to!: string[];

   @IsString()
   @IsNotEmpty()
   object!: 'email_address';

   @IsBoolean()
   @IsNotEmpty()
   reserved!: boolean;

   @IsArray()
   @IsNotEmpty()
   verification!: object[];
}

export class CreateUserWebhookDto {
   @IsBoolean()
   @IsNotEmpty()
   backup_code_enabled!: boolean;

   @IsBoolean()
   @IsNotEmpty()
   banned!: boolean;

   @IsBoolean()
   @IsNotEmpty()
   create_organization_enabled!: boolean;

   @IsNumber()
   @IsNotEmpty()
   created_at!: number;

   @IsBoolean()
   @IsNotEmpty()
   delete_self_enabled!: boolean;

   @IsArray()
   @IsNotEmpty()
   email_addresses!: EmailAddress[];

   @IsArray()
   external_accounts!: object[];

   @IsString()
   @ValidateIf((_, value) => value !== null)
   external_id!: string | null;

   @IsString()
   @ValidateIf((_, value) => value !== null)
   first_name!: string | null;

   @IsBoolean()
   @IsNotEmpty()
   has_image!: boolean;

   @IsString()
   @IsNotEmpty()
   id!: string;

   @IsString()
   @IsNotEmpty()
   image_url!: string;

   @IsNumber()
   @IsNotEmpty()
   last_active_at!: number;

   @IsString()
   @ValidateIf((_, value) => value !== null)
   last_name!: string | null;

   @IsNumber()
   @ValidateIf((_, value) => value !== null)
   last_sign_in_at!: number | null;

   @IsBoolean()
   @IsNotEmpty()
   locked!: boolean;

   @IsNumber()
   @ValidateIf((_, value) => value !== null)
   lockout_expires_in_seconds!: number | null;

   @IsString()
   @IsNotEmpty()
   object!: 'user';

   @IsBoolean()
   @IsNotEmpty()
   password_enabled!: boolean;

   @IsArray()
   @IsNotEmpty()
   phone_numbers!: number[];

   @IsString()
   @IsNotEmpty()
   primary_email_address_id!: string;

   @IsString()
   @ValidateIf((_, value) => value !== null)
   primary_phone_number_id!: string | null;

   @IsString()
   @ValidateIf((_, value) => value !== null)
   primary_web3_wallet_id!: string | null;

   @IsObject()
   private_metadata!: object;

   @IsString()
   @IsNotEmpty()
   profile_image_url!: string;

   @IsObject()
   public_metadata!: object;

   @IsArray()
   saml_accounts!: object[];

   @IsBoolean()
   @IsNotEmpty()
   totp_enabled!: boolean;

   @IsBoolean()
   @IsNotEmpty()
   two_factor_enabled!: boolean;

   @IsObject()
   unsafe_metadata!: object;

   @IsNumber()
   @IsNotEmpty()
   updated_at!: number;

   @IsString()
   @ValidateIf((_, value) => value !== null)
   username!: string | null;

   @IsNumber()
   @IsNotEmpty()
   verification_attempts_remaining!: number;

   @IsArray()
   web3_wallets!: object[];
}
