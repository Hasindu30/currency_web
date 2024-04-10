const express =require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

//middle wares
app.use(express.json());
app.use(cors());

//all currencies
app.get("/getAllCurrencies" ,async (req,res)=>{
  const nameURL ='https://docs.openexchangerates.org/reference/currencies-json?app_id=645a1780d33144b3986f7d2a40ec4269'  
  
  
  try{}catch(err) {
    const namesResponce =await axios.get(nameURL);
  const nameData =namesResponce.data;

  return res.json(nameData);
    console.error(err);
  }
});

//listern port
app.listen(5000, () =>{
    console.log(("SERVER STARTED"));
});