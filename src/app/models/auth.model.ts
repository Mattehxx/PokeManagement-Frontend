export interface login {
    username: string;
    password: string;
}

export interface loginResult {
    token: string;
    expiration: Date;
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