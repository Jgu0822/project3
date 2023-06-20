// 제이쿼리 문법 사용($)
let temp2 = $('.temp2');
let icon2 = $('.icon2');
let description2 = $('.description2');
let maxTemp2 = $('.maxTemp2');
let minTemp2 = $('.minTemp2');
let humidity2 = $('.humidity2');
let wind2 = $('.wind2');

let searchCity2 = $('#city2');

function weatherFn(){
  console.log(searchCity2.val())
  weather2(searchCity2.val());
}

function weather2(cityVal){
  // 템플릿리터럴(``) => 문자열과 변수 사용이 한번에 가능
  let appUrl2 = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityVal}&lang=kr&appid=5a87979705c7dd0e87fc7cfda0976f92`;


  // ajax 사용
  $.ajax({
    url: appUrl2,
    // get 방식은 dataType, type 생략가능
    dataType: "json",
    type: "GET",
    success: function(result){
      console.log("도시 : "+result.name);
      console.log("위도 : "+result.coord.lat);
      console.log("경도 : "+result.coord.lon);
      console.log("날씨 : "+result.weather[0].description);
      console.log("현재기온 : "+result.main.temp);
      console.log("최고기온 : "+result.main.temp_max);
      console.log("최저기온 : "+result.main.temp_min);
      console.log("습도 : "+result.main.humidity);
      console.log("풍속 : "+result.wind.speed);

      temp2.html("현재기온: "+Math.round(result.main.temp,1)+'°C');
      icon2.html(`<img src="http://openweathermap.org/img/wn/${result.weather[0].icon}.png" alt="">`);
      description2.html(result.weather[0].description);
      maxTemp2.html("최고기온: "+Math.round(result.main.temp_max,1)+'°C');
      minTemp2.html("최저기온: "+Math.round(result.main.temp_min,1)+'°C');
      humidity2.html("습도: "+result.main.humidity);
      wind2.html("풍속: "+result.wind.speed);

      // openweather로 검색한 도시의 좌표로 지도 함수 실행
      markerFn(result.coord.lat, result.coord.lon);
    }
  })
}

function markerFn(lat,lon){
  var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
      mapOption = { 
          center: new kakao.maps.LatLng(lat, lon), // 지도의 중심좌표
          level: 7 // 지도의 확대 레벨
      };
  
  var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
  
  // 마커가 표시될 위치입니다 
  var markerPosition  = new kakao.maps.LatLng(lat, lon); 
  
  // 마커를 생성합니다
  var marker = new kakao.maps.Marker({
      position: markerPosition
  });
  
  // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(map);
  
  // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
  // marker.setMap(null);    

}

(
  ()=>{
    weather2("seoul");
  }
)();