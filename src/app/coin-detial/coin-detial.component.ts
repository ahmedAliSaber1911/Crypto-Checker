import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import {ChartConfiguration, ChartType} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts'
import { CurrencyService } from '../services/currency.service';
@Component({
  selector: 'app-coin-detial',
  templateUrl: './coin-detial.component.html',
  styleUrls: ['./coin-detial.component.scss']
})
export class CoinDetialComponent implements OnInit {
  coinData:any;
  coinId!:number;
  days!:number;
  currency!:string;
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: `Price Trends`,
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#009688',
        pointBackgroundColor: '#009688',
        pointBorderColor: '#009688',
        pointHoverBackgroundColor: '#009688',
        pointHoverBorderColor: '#009688',

      }
    ],
    labels: []
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      point: {
        radius: 1
      }
    },

    plugins: {
      legend: { display: true },
    }
  };
  public lineChartType: ChartType = 'line';
  @ViewChild (BaseChartDirective) myLineChart !: BaseChartDirective;


  constructor(private route:ActivatedRoute , private api: ApiService , private currencyservice :CurrencyService) { }

  ngOnInit(): void {
    this.route.params.subscribe(res=>{
      this.coinId = res['id']
    })
    this.getCoinData();
    this.getGraphData(this.days);
    this.currencyservice.getCurrency().subscribe(res=>{
      this.currency = res;
      this.getGraphData(this.days)
      this.getCoinData();
    })
  }
  getCoinData(){
    this.api.getCurrancyById(this.coinId).subscribe(res=>{
      if(this.currency === "USD"){
        res.market_data.current_price.inr = res.market_data.current_price.usd;
        res.market_data.market_cap.inr = res.market_data.market_cap.usd;
      }
      res.market_data.current_price.inr = res.market_data.current_price.inr;
      res.market_data.market_cap.inr = res.market_data.market_cap.inr;
      this.coinData = res;
    })

  }
  getGraphData(days:number){
    this.days = days;
    this.api.getGraphicalCurrancy(this.coinId , this.currency ,days).subscribe(res=>{
      setTimeout(() => {
        this.myLineChart.chart?.update();
      }, 200);
      this.lineChartData.datasets[0].data = res.prices.map((a:any) =>{
        return a[1]
      });
      this.lineChartData.labels = res.prices.map((a:any)=>{
        let data = new Date(a[0]);
        let time = data.getHours() > 12 ?
        `${data.getHours() - 12}:${data.getMinutes()} PM ` :
        `${data.getHours()}:${data.getMinutes()} AM `;
        return days === 1 ? time : data.toLocaleDateString();
      })
     })
  }
}
