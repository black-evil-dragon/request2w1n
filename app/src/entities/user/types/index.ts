export interface User {
    id: string;
    login: string;
}

export interface UserData extends User {
    id: string;

    login: string;

    name: string;
    phone?: string

}
