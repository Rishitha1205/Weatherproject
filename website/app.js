let baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';

const apiKey = '&appid=6081552a0a540d14bae07a38591846cf&units=imperial';


// Create a new date instance dynamically with JS
let date = new Date();

let month = date.getMonth();

let day = date.getDate();

let year = date.getFullYear();

let todayDate;

if(month<9)
{
  todayDate = day + '/' + '0'+(month+1) + '/' + year;
}
else{
  todayDate = day + '/' + (month+1) + '/' + year;
}


document.getElementById('generate').addEventListener('click', genFunction);

//call back function for eventListener.
function genFunction(){

    const zipcode_place =  document.getElementById('zip').value;

    const human_feelings = document.getElementById('feelings').value;

    getClimateInfo(baseUrl,zipcode_place, apiKey)

    .then(function (info){

      //temperature value, date and feelings from gettingTheweatherInfo
    	postData('/adddata', {temperature: info.main.temp, date: todayDate, reaction: human_feelings});
    })

    .then(function (newInfo){

    	UI();// Calling Updated UI with info of Temp Date and Feelings.
    })
    
}
//Posting request
const postData = async ( url = '', info = {})=>{
	

      const reaction = await fetch(url, {
          method: 'POST', 
          credentials: 'same-origin',
          headers: {
              'Content-Type': 'application/json',
      },
             
          body: JSON.stringify(info), 
      });

      try {

        const newInfo = await reaction.json();

        console.log(newInfo);

        return newInfo;

      }catch(error) {

      console.log("error", error);
      }


}

//Get request.
const getClimateInfo = async (baseUrl, zipcode_place, apiKey)=>{

  const reaction = await fetch(baseUrl+zipcode_place+apiKey)
  try {

    const info = await reaction.json();

    console.log(info)

    return info;

  }catch(error) {

    console.log("error", error);
  }
};


//UI updation by Temperature,Date and Feelings 
const UI = async () => {

  const reaction = await fetch('/recentdata');
  try{
    const info = await reaction.json();

    document.getElementById('date').innerHTML = info.date;

    document.getElementById('temp').innerHTML = info.temperature;

    document.getElementById('content').innerHTML = info.reaction;

  }catch(error){

    console.log("error", error);
  }
}