const url = 'https://cors-anywhere.herokuapp.com/http://ws.bus.go.kr/api/rest/';
const buskey = '5fU%2BwgB7qluAY%2FryjtTo9rfo4grvFw70mJtANFSbNBxTtBpACIlixoL%2F%2FdvMYfS2QKsI0H8LF9UwXbiFsM%2Flwg%3D%3D';
//<!-- 버스 노선 검색 -->
//<!--        var url = 'https://cors-anywhere.herokuapp.com/http://ws.bus.go.kr/api/rest/busRouteInfo/getBusRouteList?serviceKey=5fU%2BwgB7qluAY%2FryjtTo9rfo4grvFw70mJtANFSbNBxTtBpACIlixoL%2F%2FdvMYfS2QKsI0H8LF9UwXbiFsM%2Flwg%3D%3D&strSrch=1119&resultType=json'-->


//   var xhr = new XMLHttpRequest();-->
//   var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'5fU%2BwgB7qluAY%2FryjtTo9rfo4grvFw70mJtANFSbNBxTtBpACIlixoL%2F%2FdvMYfS2QKsI0H8LF9UwXbiFsM%2Flwg%3D%3D'; /*Service Key*/-->
//    queryParams += '&' + encodeURIComponent('busRouteId') + '=' + encodeURIComponent('100100025') + '&resultType=json'; /**/
//   xhr.open('GET', url + queryParams);-->
//   xhr.onreadystatechange = function () {  -->
//   if (this.readyState == 4) {-->
//       alert('Status: '+this.status+'nHeaders: '+JSON.stringify(this.getAllResponseHeaders())+'nBody: '+this.responseText);
//    }
//   };



// xhr.send('');
// function fn1(){

//     fetch(apiurl)
//     .then(response => response.json())
//       .then(function (msg) {
//                console.log(msg)
//                console.log(msg.msgBody)
//                console.log(msg.msgBody.itemList)

//            msg.msgBody.itemList.forEach(el=>{
//               console.log(el);

//               })
//        });
// }


//     (() => {
//     fn1();
//     })();

const busDetail = document.querySelector('.bus-detail')
const tbody = document.querySelector('.bus-detail table tbody')
const stationNm = document.querySelector('.map-con .stationNm')
let html1 = "";

//버스노선(버스번호) 조회
function busSearch() {
    html1 = "";
    tbody.innerHTML = "";

    let search = document.querySelector('#search')
    let type = 'busRouteInfo/getBusRouteList?';
    let strSrch = search.value;
    console.log(strSrch + ' < - strSrch')

    let apiUrl = `${url}busRouteInfo/getBusRouteList?serviceKey=${buskey}&strSrch=${strSrch}&resultType=json`;



    fetch(apiUrl)
        .then(response => response.json())
        .then(function (msg) { //아래부터는 html로 가져오기 위한 코드-->
            if (msg.msgBody.itemList == null) {
                alert("조회 실패!! 해당노선이 존재하지 않습니다.")
            }
            else {
                alert("조회 성공!!")
                console.log(msg)
                console.log(msg.msgBody)
                console.log(msg.msgBody.itemList)

                msg.msgBody.itemList.forEach(el => {
                    html1 += "<tr>"
                    console.log(el);
                    console.log(el.gpsX, el.gpsY, el.stationNm); // kakao map 표시-->

                    //<div>버스명: ${el.busRouteNm}</div>
                    //<div onclick='stationPost(event.target.innerText)'>${el.busRouteId}</div>
                    html1 += `
                                    <td> ${el.busRouteNm}</td>
                                    <td> ${el.routeType}</td>
                                    <td> ${el.stStationNm}</td>
                                    <td> ${el.edStationNm}</td>
                                    <td> ${el.firstBusTm}</td>
                                    <td> ${el.lastBusTm}</td>
                                    <td> ${el.term} </td>
                                    <td onclick='stationPost(event.target.innerText)'> ${el.busRouteId}</td>
                              `;
                    html1 += "</tr>"
                })
                console.log(html1)
                tbody.innerHTML += html1
            }
        });

}

//정류장 조회
function stationPost(busId){

    let html1="";

    let busRouteId=busId;
    let apiUrl = `${url}busRouteInfo/getStaionByRoute?serviceKey=${buskey}&busRouteId=${busRouteId}&resultType=json`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(function (msg){



            console.log(msg) // -> 로그찍히는지 확인
            console.log('----------')
            console.log(msg.msgBody) // -> 로그찍히는지 확인
            console.log('----------')
            console.log(msg.msgBody.itemList) // -> 로그찍히는지 확인
            console.log('----------')

            msg.msgBody.itemList.forEach(el=>{
                console.log(el.gpsX,el.gpsY)
            html1+=`<div>${el.stationNm}</div>`
            // let lat = el.gpsX; //정류장 위도
            // let lon = el.gpsy; //정류장 경도


            })

            stationNm.innerHTML=html1;
            busmap(msg.msgBody.itemList);

        });

}



function busmap(data){
    console.log(data);
    console.log('<<<');

    let locations = [];

    let lat = 0;
    let lon = 0;

    console.log('위도: '+lat, '경도: '+lon)
    console.log('<<<');

    data.forEach((el,index) =>{
        lat = el.gpsY;
        lon = el.gpsX;

        let result = {
            title: el.stationNm,
            // parseFloat()함수는 문자열 인수를 구문 분석하고 부동 소수점 숫자를 반환
            latlng: new kakao.maps.LatLng(parseFloat(lat), parseFloat(lon))
        };
        locations.push(result);
    });

    let mapContainer = document.getElementById('mapview'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(data[0].gpsY, data[0].gpsX),
        level: 5 // 지도의 확대 레벨
    };

// 지도를 표시할 div와 지도 옵션으로 지도를 생성합니다.
let map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
console.log(data[0].gpsY, data[0].gpsX);

// 주소-좌표 변환 객체를 생성합니다.
// let geocoder = new kakao.maps.services.Geocoder();

   // 마커 이미지의 이미지 주소입니다
   let imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

    console.log('------------------');
    console.log(data[0].gpsY, data[0].gpsX);

for (let i = 0; i < data.length; i++) {
    // 마커 이미지의 이미지 크기 입니다.
    let imageSize = new kakao.maps.Size(24,35);
    // 마커 이미지를 생성합니다.
    let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
    //마커를 생성합니다.
    let marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: locations[i].latlng, // 마커를 표시할 위치
        title: locations[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage // 마커 이미지
      });

    marker.setMap(map);//마커생성

}

map.setCenter(locations[0].latlng);


}