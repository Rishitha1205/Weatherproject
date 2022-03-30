// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors=require("cors");
const bodyParser = require('body-parser');
const app=express();


// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port=8000;

app.listen(port,()=>
    console.log(`server is running on port: ${port}`)
);


app.get("/recentdata",(request_data,response_data)=>{
    response_data.send(projectData)
    console.log(projectData);
});

app.post("/adddata",(request_data,response_data)=>{
    
    projectData.date = request_data.body.date;

    projectData.temperature = request_data.body.temperature;
	
	projectData.reaction = request_data.body.reaction;
    
    response_data.send(projectData);
})