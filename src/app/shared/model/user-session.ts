import { User } from "./user";

export interface UserSessionDto  extends User{
    token?:string;
}                                                                                                                                                   