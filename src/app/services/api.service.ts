import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }
  getCurrancy(currency:string){
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&sparkline=false`)
  }
  getTrendingdcurrancy(currency:string){
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`)
  }
  getGraphicalCurrancy(coinId:number, currency:string , days:number){
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`)
  }
  getCurrancyById(coinId:number){
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/${coinId}`)
  }
}
