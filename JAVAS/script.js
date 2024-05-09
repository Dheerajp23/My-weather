"use strict"

    const apikey="LBTQCY7SUSMLAE76W9QHRDPVJ";
    const apiurl="https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
    const pai ="?unitGroup=metric&contentType=json";

    const weatherIcon = document.querySelector(".imgrel");
    
    document.rain.addEventListener("submit" , function(e){
        e.preventDefault();
        const t = this.rains.value;
        const x = t.toUpperCase()

        let regz = /[A-Z,a-z]/;
        let search = x.match(regz);
        if(search){
        checkweather(x)
    }
         else{
            document.querySelector(".error").style.display = "block";
            document.querySelector(".Details").style.display = "none";
    }

        
    })
    
    
     async function checkweather(c){
    const response= await fetch(apiurl + c + pai + `&key=${apikey}`);

    if(response.status == 400){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".Details").style.display = "none";

    }    
    else{
        var data = await response.json();

    document.querySelector(".city").innerHTML=data.address;
    document.querySelector(".temparature").innerHTML=Math.round(data.currentConditions.temp)+`°C`;
    document.querySelector(".preci").innerHTML=Math.round(data.currentConditions.precipprob) + `%`;
    document.querySelector(".humids").innerHTML=Math.round(data.currentConditions.humidity) + `%`;
    document.querySelector(".Windy").innerHTML=Math.round(data.currentConditions.windspeed) + `Km/Hr`;
    document.querySelector(".sunrise").innerHTML=data.currentConditions.sunrise ;



    const d = data.currentConditions.temp;
    if(d<=20){
        document.querySelector(".main-container").classList.add("cool");
        document.querySelector(".main-container").classList.remove("heat");
        document.querySelector(".main-container").classList.remove("cloudy");
    }
    else if(data.currentConditions.conditions == "Clear"){
        document.querySelector(".main-container").classList.add("heat");
        document.querySelector(".main-container").classList.remove("cool");
        document.querySelector(".main-container").classList.remove("cloudy");
    }
    else if(data.currentConditions.conditions == "Overcast" || data.currentConditions.conditions == "Thunderstorm" || data.currentConditions.conditions == "Rain"){
        document.querySelector(".main-container").classList.remove("heat");
        document.querySelector(".main-container").classList.remove("cool");
        document.querySelector(".main-container").classList.add("cloudy");

    }
    

    if(data.currentConditions.conditions == "Clear"){
        weatherIcon.src = "IMAGES/clear.webp"
    }
    else if(data.currentConditions.conditions == "Partially cloudy"){
        weatherIcon.src = "IMAGES/cloudy.webp"
    }
    else if(data.currentConditions.conditions == "Snowy"){
        weatherIcon.src = "IMAGES/snow.webp"
    }
    else if(data.currentConditions.conditions == "Overcast"){
        weatherIcon.src = "IMAGES/fullcloudy.webp"
    }
    else if(data.currentConditions.conditions == "Thunderstorm"){
        weatherIcon.src = "IMAGES/thunderstorm.webp"
    }
    else if(data.currentConditions.conditions == "Rain"){
        weatherIcon.src = "IMAGES/rainy.webp"
    }

    document.querySelector(".Details").style.display = "block";
    document.querySelector(".error").style.display = "none";
    }


    


    //console.log(data);
 } 
 
 


