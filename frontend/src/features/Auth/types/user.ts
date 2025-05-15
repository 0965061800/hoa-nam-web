export interface IUserLogin {
    username: string;
    password: string;
  }

export interface ISuccesUser {
  token: string;
  username: string;
  userId: string;
  role: string[];
}