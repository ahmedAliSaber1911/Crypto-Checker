import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss']
})
export class CoinListComponent implements OnInit {
  bannerData: any = [];
  constructor(private api : ApiService) { }

  ngOnInit(): void {
    this.getAllData();
    this.getBannerDate();
  }
  getBannerDate(){
    this.api.getTrendingdcurrancy("USD").subscribe(res=>{
      this.bannerData = res;
      console.log(res)
    })
  }
  getAllData(){
    this.api.getCurrancy("USD").subscribe(res =>{
      console.log(res)
    })
  }
}
