export interface StudentLoginResponse { 
token: string;
  student: {
    id: number;
    name: string;
    email: string;
  };

}
