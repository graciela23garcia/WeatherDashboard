

$("submitWeather").on("click", function(){
    var city = $("#cityName").val();
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "APPID=78ecf364be6196ea0b03e4f3d866fdb3",
        type: "GET",
        dataType: "jsonp",
        success: function(data){
            console.log(data);


        }
    })

    

})











// var userNum = $("#userNum");

// $("button").on("click", function(){
//     let value = userNum.val()
//     $.ajax({url: `https://randomuser.me/api/?results=${value}`, type: "GET"}).then(function(data){
//         console.log(data.results);
//         var list = data.results
    
//         for(let i = 0; i < list.length; i++){
//             var para = document.createElement("P")
//             // let p = $("<p></p>")
//             para.text(data.list[i].name.first + " " + data.list[i].name.last)
//             $("#users").append(para)
//         }
    
        
//     });   
// })


//var str = "My name is" + name + "." + "I was born " + age
//var str = `My name is ${name} I was ${age}`

