const express = require("express");
const http=require("https");
const bparser=require("body-parser");
const app= express();
app.use(bparser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
 });


app.post("/",function(req,res){
    const query=req.body.city;
    const apiKey="828a93e1d712bc7400452a7c286e234d"
   const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey;
   http.get(url,function(response){
      
       response.on("data",function(data){
           const weatherData=JSON.parse(data);
           console.log(weatherData);
           const desc=weatherData.weather[0].description;
           const city=weatherData.name;
           const icon=weatherData.weather[0].icon;
           const temp=weatherData.main.temp;

           const imageURL="https://openweathermap.org/img/wn/"+icon +"@2x.png";
           res.write("<h1>The weather is "+ desc+"</h1>");
           res.write("<h1>The Tempareture in "+ city +" is "+ temp+"</h1>");
           res.write("<img src="+ imageURL +">");
           res.send();

       });
       
   })

});

app.listen(3000,function(){
    console.log("server is running")
})