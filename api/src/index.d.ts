export {}
declare global {
    namespace Express {
        export interface Request {
            tenant?: string;
        }
    }
}