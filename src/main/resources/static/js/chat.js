$(function () {
	$("#question").keyup(questionKeyuped);
});

function openChat() {
	setConnectStated(true);// 연결 버튼 클릭시 보이기
	connect();  // 연결
}

function showMessage(message) {
	// 메시지를 #caht-content 에 추가
	$("#chat-content").append(message);
	// 대화창 스크롤을 항상 최하위에 배치
	$("#chat-content").scrollTop($("#chat-content").prop("scrollHeight"));
}

// 접속 버튼 클릭시 토글
function setConnectStated(isTrue) {
	if (isTrue) {//true
		$("#btn-chat-open").hide();
		$("#chat-disp").show();
	} else {
		$("#btn-chat-open").show();
		$("#chat-disp").hide();
	}
	// 화면 초기화
	$("#chat-content").html("");
}

// 접속 해제
function disconnect() {
	//    if (stompClient !== null) {
	//        stompClient.disconnect();
	//    }
	setConnectStated(false);
	console.log("Disconnected");
}

// 연결버튼클릭시 접속
// 처음 접속시
function connect() {
	sendMessage("안녕");
}

function sendMessage(message) {
	$.ajax({
		url: "/botController",
		type: "post",
		data: { message: message },
		success: function (responsedHtml) {
			showMessage(responsedHtml);
		}
	});
}

function inputTagString(text) {
	var now = new Date();
	var ampm = (now.getHours() > 11) ? "오후" : "오전";
	var time = ampm + now.getHours() % 12 + ":" + now.getMinutes();
	var message = `
		<div class="msg user flex end" id="userMsgBox" style="text-align: right">
			<div class="message">
				<div class="part" style="text-align: right">
					<p style="magin: 0">${text}</p>
				</div>
				<div class="time">${time}</div>
			</div>
		</div>
	`;
	return message;
}
//메뉴클릭시 메뉴 텍스트 화면에 표현
function menuclicked(el) {
	var text = $(el).text().trim();
	var fToken = $(el).siblings(".f-token").val();
	console.log("-----> fToken:" + fToken + "----");
	var message = inputTagString(text);
	showMessage(message);
}

//엔터가 입력이되면 질문을 텍스트 화면에 표현
function questionKeyuped(event) {
	if (event.keyCode != 13) return;
	btnMsgSendClicked()
}

//전송버튼 클릭이되면 질문을 텍스트 화면에 표현
function btnMsgSendClicked() {
	var question = $("#question").val().trim();

	console.log(question)

	if (question == "서울") question = "Seoul";
	if (question == "부산") question = "Busan";
	if (question == "대전") question = "Daejeon";
	weatherFn(question)


	if (question == "" || question.length < 2) return;
	//메세지 서버로 전달
	sendMessage(question);

	var message = inputTagString(question);
//	if (question == "Seoul") message = "서울";
//	if (question == "Busan") message = "부산";
//	if (question == "Daejeon") message = "대전";
	showMessage(message);//사용자가 입력한 메세지 채팅창에 출력

	$("#question").val("");//질문 input 리셋
}


let result; // 전역 변수로 선언

// 이 함수는 도시 이름을 입력으로 받아 OpenWeatherMap API를 사용하여 해당 도시의 날씨 정보를 가져옵니다.
function weatherFn(cityVal) {

	// API URL을 생성합니다.
	let appUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityVal}&appid=70cb1debaca5ca19aebe1344d30008e8`;
	// let appUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q="+cityVal+"&appid=";

	// jQuery 를 사용하여 AJAX 요청을 보냅니다.
	$.ajax({
		url: appUrl,
		dataType: "json",
		type: "GET",
		success: function (data) {
			result = data; // 전역 변수에 저장
			// 결과를 콘솔에 출력합니다.
			console.log(result + " <-rs" + (typeof result));
			console.log(result);
			console.log(result.name);
			console.log(result.clouds.all);
			console.log(result.main.humidity);
			console.log(result.main.temp);
			console.log(result.main.temp_max);
			console.log(result.main.temp_min);
			console.log(result.weather[0].description);
			console.log(result.wind.speed);

			weatherPost(result);
		}
	});
}

function weatherPost(result) {

	let cityVal = result.name;
	let cloud = result.clouds.all;
	let humidity = result.main.humidity;
	let temp = result.main.temp;
	let temp_max = result.main.temp_max;
	let temp_min = result.main.temp_min;
	let weather_description = result.weather[0].description;
	let wind = result.wind.speed;

	let weatherData = {
		cityVal: cityVal,
		cloud: cloud,
		humidity: humidity,
		temp: temp,
		temp_max: temp_max,
		temp_min: temp_min,
		weather_description: weather_description,
		wind: wind
	};

	// POST 요청을 보내서 MySQL 데이터베이스에 저장합니다.
	$.ajax({
		url: "/chatweather",
		type: "POST",
		data: JSON.stringify(weatherData),
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			console.log("저장 성공!")
		}
	});
}

const chatBusDetail = document.querySelector('.chatBus-detail')
//const tbody = document.querySelector('.chatBus-detail table tbody')
let html2 = "";

//버스노선(버스번호) 조회
function ChatBusSearch() {

	html2 = "";
	//tbody.innerHTML = "";

	let search = document.querySelector('#search')
	let type = 'busRouteInfo/getBusRouteList?';
	let strSrch = search.value;
	console.log(strSrch + ' < - strSrch')

	let apiUrl = `https://cors-anywhere.herokuapp.com/http://ws.bus.go.kr/api/rest/busRouteInfo/getBusRouteList?serviceKey=5fU%2BwgB7qluAY%2FryjtTo9rfo4grvFw70mJtANFSbNBxTtBpACIlixoL%2F%2FdvMYfS2QKsI0H8LF9UwXbiFsM%2Flwg%3D%3D&strSrch=${strSrch}&resultType=json`;



	fetch(apiUrl, { mode: "cors" })
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
					html2 += "<tr>"
					console.log(el);

					html2 += `
                                    <td> ${el.busRouteNm}</td>
                                    <td> ${el.routeType}</td>
                                    <td> ${el.stStationNm}</td>
                                    <td> ${el.edStationNm}</td>
                                    <td> ${el.firstBusTm}</td>
                                    <td> ${el.lastBusTm}</td>
                                    <td> ${el.term} </td>
                              `;
					html2 += "</tr>"
				})
				console.log(html2)
				//                document.querySelector('#con').append(html2);
				//				document.querySelector('#chat-content').append(html2);
				document.querySelector('.chatBus-detail table tbody').innerHTML = html2;
			}
		});
}

