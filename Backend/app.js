var request=require('request');
var express=require('express');
var fs=require('fs');
var cors=require('cors');
var app=express();
var list=require('./city.list.json');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cors());
let arr =[];
let apiKey = 'e26a9ff522b73ef0514acf316fae4dc8';

app.get('/weather/:city',function(req,res){
	let city="";
	let country="";
	console.log("City is ", req.params.city);
	city=req.params.city;
	let data=fs.readFileSync('city.list.json');
		arr=JSON.parse(data);
		arr.forEach(function(ele){
			if(ele.name===city){
			country=ele.country;
			}
		})
	
	console.log("ccc ",country)
	request(`http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${apiKey}&units=metric`, {json: true }, function (err, response, body) {
	  if(err){
		console.log('error:', err);	
	  } else {
		res.send(body.list);
		//console.log("sent value is = ",body.list)
	  }
	});
	
	//console.log(arr)
	
});	


app.listen(3000,()=>console.log("Server listening on port 3000"))