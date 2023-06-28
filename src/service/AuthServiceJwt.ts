import LoginData from "../model/LoginData";
import UserData from "../model/UserData";
import AuthService from "./AuthService";

function getUserData(data: any): UserData {
    const jwtPayloadJSON = atob(data.accessToken.split('.')[1]);
    const jwtPayloadObj = JSON.parse(jwtPayloadJSON);
    return {
        email: jwtPayloadObj.email,
        role: jwtPayloadObj.sub
    }
}

export default class AuthServiceJwt implements AuthService { 
constructor(private url: string) {
    this.url = url

}
 
    async login(loginData: LoginData): Promise<UserData> {
        const response = await fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        return response.ok ? getUserData(await response.json()) : null;
    }

    async logout(): Promise<void> {
          //TODO
    }
}