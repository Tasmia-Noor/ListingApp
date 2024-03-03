export class CreateUserDto {
  name: string;
  email: string;
  phone: string;
  currency?: string;
  password: string;
  register_via: string;
  company_size?: string;
  company_role?: string;
  profile_picture?: string;
}
