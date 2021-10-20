import { Company } from "./company";
export class User {
  username?:string;
  active?: boolean;
  assignment?: string;
  companyId?: number;
  cpf?: string;
  email?: string;
  hiringType?: string;
  name?: string;
  password?: string;
  phone?: string;
  vacations?: boolean;
  token?: string;
  company?: Company;
}
