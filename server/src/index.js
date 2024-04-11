const express =require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
//config
require('dotenv').config();

console.log(process.env.APP_ID);

//middle wares
app.use(express.json());
app.use(cors());

//all currencies
app.get("/getAllCurrencies" ,async (req, res)=>{
  const nameURL ='https://openexchangerates.org/api/currencies.json?app_id=645a1780d33144b3986f7d2a40ec4269'; 
  
  
  try{const namesResponce =await axios.get(nameURL);
    const nameData =namesResponce.data;
    

  return res.json(nameData);
  }catch (err){
    console.error(err);
  }
});

//target amount
app.get("/convert",async (req,res)=>{
    const{
        date,
        SourceCurrency,
        TargetCurrency,
        amountInSourceCurrency,
    } = req.query;
    try{
        const dataUrl ='https://openexchangerates.org/api/historical/$(date).json?app_id=645a1780d33144b3986f7d2a40ec4269';
        
        const dataResponce =await axios.get(dataUrl);
        const rates =dataResponce.data.rates;

        //rates
        const sourceRate =rates[SourceCurrency];
        const targetRate =rates[TargetCurrency];

        //final
        const targetAmount = (targetRate / sourceRate) * amountInSourceCurrency;

        return res.json(targetAmount);

    
    }catch(err){
        console.error(err);
    }
});

//listern port
app.listen(5000, () =>{
    console.log(("SERVER STARTED"));
});  