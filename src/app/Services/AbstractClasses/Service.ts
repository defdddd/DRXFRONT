import { HttpClient } from "@angular/common/http";
import ApiURL from "src/app/Helpers/ApiURL";

export abstract class Service<T>{
    
  protected URL : string = ApiURL.URL;
  private GETALL_URL !: string;
  private INSERT_URL !: string;
  private UPDATE_URL !: string;

  constructor(protected http : HttpClient, type : string){
    this.URL += type;
    this.GETALL_URL = this.URL + "all";
    this.INSERT_URL = this.URL + "insert";
    this.UPDATE_URL  = this.URL + "update";
  }

  //#region crud operations
  getAll() {
    return this.http.get<T[]>(this.GETALL_URL);
  }

  add(value: T){
    console.log(value)
    return this.http.post<T>(this.INSERT_URL, value);
  }

  update(value: T) {
    return this.http.put<T>(this.UPDATE_URL, value);
  }

  delete(id: number) {
    return this.http.delete<any>(this.URL + `${id}`);
  }
  getById(id: number){
    return this.http.get<T>(this.URL + `getById/${id}`);
  }
  //#endregion
}