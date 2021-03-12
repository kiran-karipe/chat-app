export interface Message {
    name: string;
    message: string;
    id: string;
    reaction?: any;
    isLoggedUser: boolean;
}