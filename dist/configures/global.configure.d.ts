export declare const err_msg: {
    code: number;
    message: string;
}[];
export declare const AppConfigure: {
    secretKey: string;
    hkey: string;
    mail: {
        provider: {
            host: string;
            port: number;
            auth: {
                user: string;
                pass: string;
            };
        };
        from: string;
    };
    resetPassUrl: string;
};
