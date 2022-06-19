export default class TokenData{
    userName: string;
    access_Token: string;

  constructor(userName: string, access_Token: string) {
    this.userName = userName
    this.access_Token = access_Token
  }

}