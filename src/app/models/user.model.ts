export interface User {
    id?: string; // Use string as UUID
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    role?: string; // Use string as default role
    password: string;
  }
  