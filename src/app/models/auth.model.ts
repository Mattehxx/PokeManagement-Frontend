export interface login {
    username: string;
    password: string;
}

export interface loginResult {
    token: string;
    expiration: string;
    role: string;
    username: string;
    id: string;
}

export interface register {
    name: string;
    surname: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface registerResult {
    status: string;
    message: string;
}

export interface user {
    name: string;
    surname: string;
    username: string;
    email: string;
}