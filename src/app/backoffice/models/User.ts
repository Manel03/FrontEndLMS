

export interface User {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    enabled: boolean;
    details?: UserDetails;
  }
  export interface UserDetails {
    id: number;
    userUuid: string;
    departement: string;
    telephone: string;
    poste: string;
    manager: User;
    roles: string[];
    progressions: any[];

  }