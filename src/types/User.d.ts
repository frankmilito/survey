import { BusinessOwner } from "./BusinessOwner";
import { BusinessVariables, Location } from "./Location";
import { LoyaltyScheme, LoyaltyVariables } from "./LoyaltyScheme";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  username: string;
  emailVerifiedAt: Date;
  userType: string;
  teams: any[];
  createdAt: Date;
  updatedAt: Date;
  name: string;
  id: string;
  jobTitle: string;
}

// export type Variables = {
//   name?: string;
//   mobile?: string;
//   category?: string;
//   owner?: UserVariables;
//   locations?: BusinessVariables[];
//   loyaltySchemes: LoyaltyVariables[];
// };

export type Token = {
  id: string;
  access_token: string;
};

// export type UserVariables = {
//   lastName?: string;
//   firstName?: string;
//   dateOfBirth?: Date;
//   gender?: 'Male' | 'Female' | 'Non-binary' | 'Others' | 'Prefer not to say';
// };
export interface Company {
  name: string;
  industry: string;
  companySize: string;
  country: string;
  useCase: string[];
}
