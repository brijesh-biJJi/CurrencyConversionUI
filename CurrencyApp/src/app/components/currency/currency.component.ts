import { Component, OnInit } from '@angular/core';
import { FormControl,Validators,FormGroup,FormBuilder} from '@angular/forms';
import { CurrencyService } from 'src/app/services/currency.service';
import { MatSnackBar } from '@angular/material';
import { CurrencyModel } from 'src/app/model/currency-model.model';

interface Currency {
  value: string;
  viewValue: string;
}

export class Curr{
  quantity:number;
  
}

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit 
{

  curr:Curr=new Curr();

  currency:FormGroup;

  code:string;

  constructor(private builder:FormBuilder,private _currencyService:CurrencyService,private snackBar:MatSnackBar) { }

  

  ngOnInit() {
    this.currency=this.builder.group(
      {
        quantity: ['', [Validators.required]],
        
      }
    )
  }

  codes: Currency[] = [
    {value: 'USD', viewValue: 'USD'},
    {value: 'EUR', viewValue: 'EUR'},
    {value: 'POUND', viewValue: 'POUND'},
  ];

  
  currencyCode(code){
    
    this.code=code;
  }
  res:boolean;
  result=new Array<CurrencyModel>();
  
  onSubmit(){
    this.res=true;
    console.log("Currrency Code ",this.code);
    console.log("Currrency Qty ",this.currency.value.quantity);
    this._currencyService.getCurrency(this.code,this.currency.value.quantity).subscribe(
      (response:any)=>{
        this.result=response.totalCalculatedAmount;
        console.log("Conversion ",this.result);
        
      // this.snackBar.open(response, "Ok", {duration:3000})
        },
        error=> {
          this.snackBar.open("Currency is not Converted..", "ok",{duration:3000})
        }
       );

  }

  get f() { return this.currency.controls; }
}


