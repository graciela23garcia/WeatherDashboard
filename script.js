var apiKey = "78ecf364be6196ea0b03e4f3d866fdb3";
var myCities = [];



//Load current cities from local storage 
function citiesFromLocal() {
    myCities = JSON.parse(localStorage.getitem("myCities")) || [];
}

//save cities to local storage 
function saveTolocal() {
    localStorage.setItem("myCities", JSON.stringify(myCities));
}

//Getting cities from local storage 
$(document).ready(function () {
    citiesFromLocal();
    if (cities[0]) {
        getCity(myCities[myCities.length -1]);
    }
})

//sample for city and date
citiesDisplay();
$(".btn").on("click", function (event) {
  event.preventDefault();
  
  var input = $(".form-control");
  var city = input.val();
  if (!cities.includes(city)) {
    cities.push(city);
    saveToStore();
  }
  citiesDisplay();
  getCity(city);
}); 

//citiesDisplay Function
function citiesDisplay() {
    var limit;
    if (myCities.length < 10) {
        limit = cities.length;
    } else {
        limit = 10;
    }
    $("#submitWeather").html("");
    for (var c = 0; c < limit; c++) {
        var citiViewed = $("<div>");
        submitWeather.addClass("row").css({
            textAlign: "center",
            border: "1px solid silver",
            height: "50px",
            lineHeight: "50px",
            paddingLeft: "40px",
          });
          submitWeather.html(cities[c]);
    $("#submitWeather").prepend(submitWeather);

//OnClick event on each city
    submitWeather.attr("id", `${cities[c]}`);
    $(`#${cities[c]}`).on("click", function () {
      getCity($(this).text());
    });
  }
}



//function to getCity

function getCity(city) {
    var currentDate = moment().format("LL");
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;





//ajax call for api information 

//NOT DONE YET!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

$.ajax({ url: queryURL, type: "GET" }).then(function (response) {

    $(".current-city").text(response.name + " (" + currentDate + ")");
    // $(".current-city").append(iconImage);
    $("#temp").text("Tempeture : " + response.main.temp + " °F");
    $("#hum").text("Humidity : " + response.main.humidity + " %");
    $("#wind").text("Wind Speed : " + response.wind.speed + " MPH");
    // Converts the temp to Kelvin with the below formula
    var tempF = (response.main.temp - 273.15) * 1.8 + 32;
    $(".tempF").text("Temperature (Kelvin) " + tempF);
    getUV(response.coord.lat, response.coord.lon);
    forecast(city);
    input.val("");
  });
}

//getting uvIndex
function getUV(lat, lon) {
    var uvIndexURL =
      "https://api.openweathermap.org/data/2.5/uvi/forecast?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon + "&cnt=1";

    $.ajax({ url: uvIndexURL, type: "GET" }).then(function (response) {
      $("#uvi").text("UV-index : " + response[0].value);
    });
  }


  //setting up forecast 

  function forecast(city) {
    var forecastURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
  
    $.ajax({ url: forecastURL, type: "GET" }).then(function (response) {
      var list = response.list;
      console.log(response);
      // for each iteration of our loop
      $("#fiveDayforecast").html("");
      for (var i = 39; i >= 0; i = i - 8) {
        var temp = ((list[i].main.temp - 273.15) * 1.8 + 32).toFixed(2);
        var iconId = list[i].weather[0].icon;
        var humidity = list[i].main.humidity;
        var date = new Date(list[i].dt_txt);
  
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();
  
        var formatedDate = `${month + 1}/${day}/${year}`;
        // Creating and storing a div tag
        var col = $("<div>");
        col.addClass("col");
        var mycard = $("<div>");
        mycard.addClass("card");
        col.append(mycard);
  
        // Creating a paragraph tag with the response item
        var p = $("<p>").text(formatedDate);
        // Creating and storing an image tag
  
        var iconUrl = "https://openweathermap.org/img/wn/" + iconId + "@2x.png";
  
        var weatherImage = $("<img>");
        // Setting the src attribute of the image to a property pulled off the result item
        weatherImage.attr("src", iconUrl);
  
        var p1 = $("<p>").text("Temp: " + temp + "°F");
        var p2 = $("<p>").text("Humidity: " + humidity + "%");
  
        // Appending the paragraph and image tag to mycard
        mycard.append(p);
        mycard.append(weatherImage);
        mycard.append(p1);
        mycard.append(p2);
  
        // Prependng the col to the HTML page in the "#forecast" div
  
        $("#forecast").prepend(col);
      }
    });
  }
