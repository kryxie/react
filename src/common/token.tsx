export default class Token {

    static isAuthenticated(): boolean {
        return Token.getToken() !== null;
    }

    static getToken(): string|null {
        return localStorage.getItem('LanternSessionToken');
    }

    static setToken(token: string): void {
        localStorage.setItem('LanternSessionToken', token);
    }

    static deleteToken(): void {
        localStorage.removeItem('LanternSessionToken');
    }
}
