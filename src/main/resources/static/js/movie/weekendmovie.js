const key = "ff910209a45c04c03ea9d164a0c91030";

const boxCon = document.querySelector('.box-con');
const header = document.querySelector('.box-con .header2');
const title = document.querySelector('.box-con .header2 .title');
const title2 = document.querySelector('.box-con .header2 .title2');
const sceneDetail = document.querySelector('.box-con .scene-detail');

html1 ="";

let today = new Date();

let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1;  // 월
let date = today.getDate();  // 날짜

let targetDt = (year*10000+month*100+date-7);


function boxOfficeFn(){

    let weekly = "searchWeeklyBoxOfficeList.json";
    // let targetDt = 20230403;
    let itemPerPage = "10";
    let apiUrl = `http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/${weekly}?key=${key}&targetDt=${targetDt}&itemPerPage=${itemPerPage}`;
    
    fetch(apiUrl)
     .then(response => response.json())
     .then((result)=>{

        console.log(result,typeof result);
     
        let boxOfficeResult = result.boxOfficeResult;
        let weeklyBoxOfficeList = result.boxOfficeResult.weeklyBoxOfficeList;

        console.log(typeof movieList);

        let titleCon = boxOfficeResult.boxofficeType;
        title.innerHTML = titleCon;

        let title2Con = boxOfficeResult.showRange;
        title2.innerHTML = title2Con;

        html1+=`<div class="detail-header">
        <ul>
            <li>순위</li>
            <li class="t1">제목</li>
            <li>개봉일</li>
            <li>차트 인</li>
            <li>금주 관객수</li>
            <li>상세 보기</li>
        </ul>
    </div>`;

    html1 += `<div class = "detail-con">`

    weeklyBoxOfficeList.forEach((el,idx)=>{
        console.log(el);
        html1+=`<ul>`;
        html1+=`<li>${el.rank}</li>`;
        html1+=`<li class="t1">${el.movieNm}</li>`;
        html1+=`<li>${el.openDt}</li>`;
        html1+=`<li>${el.rankOldAndNew}</li>`;
        html1+=`<li>${el.audiCnt}</li>`;
        html1+=`<li onclick="sceneDeailFn(event.target.innerText)" >${el.movieCd}</li>`;
        html1+=`</ul>`;
    })

    html1 += `</div>`;

    sceneDetail.innerHTML = html1;   // html에 넣을때는 inner HTML





      });



}

// 상세정보창 ==============================

const popup=document.querySelector('.popup')
const close=document.querySelector('.close')
const popupCon = document.querySelector('.popup-con');
// const popupLi = document.querySelector('.popup-con-ani ul li');
let popupTitle = document.querySelector('h1.popup-title');
let titleEn = document.querySelector('li.titleEn');
let mTime = document.querySelector('li.mTime');
let openDay = document.querySelector('li.openDay');
let artist = document.querySelector('li.artist');
let mDirector = document.querySelector('li.mDirector');
let mnation = document.querySelector('li.mnation');
let howAge = document.querySelector('li.howAge');



function sceneDeailFn(movieCode){

  popup.classList.add('popup-ani')
  close.classList.add('close-ani')
  popupCon.classList.add('popup-con-ani')
  popupTitle.classList.add('popup-title-ani')

  let movieSerchJSON = "movie/searchMovieInfo.json";
  let movieCd =movieCode; //   영화 코드
  const url = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/" + movieSerchJSON 
  +"?key="+ key +"&movieCd="+ movieCd ;    

  
  fetch(url)
    .then(response => response.json())
    .then(function (msg) { //아래부터는 html로 가져오기 위한 코드      
      console.log(msg)

      let Actexts = "";
      let directorText = "";
      let nationText = "";
      let ageText = "";

      let movieDetail = msg.movieInfoResult.movieInfo;

        popupTitle.innerHTML =movieDetail.movieNm;
        titleEn.innerHTML = movieDetail.movieNmEn;
        mTime.innerHTML = `상영시간 : ${movieDetail.showTm}분`;
        openDay.innerHTML = `개봉일 : ${movieDetail.openDt}일`;

        movieDetail.actors.forEach(el=>{
            Actexts +=el.peopleNm+", "
        });

        if(Actexts.length==0){
            artist.innerHTML ="애니메이션";
        } else {
            artist.innerHTML ="주연 : "+Actexts;
        }



        movieDetail.directors.forEach(el=>{
            directorText +=el.peopleNm+" ";
        })

        if(directorText.length==0){
            mDirector.innerHTML ="감독 : 미표시";
        } else {
            mDirector.innerHTML = "감독 : "+directorText;
        }



        movieDetail.nations.forEach(el=>{
            nationText +=el.nationNm+" ";
        })

        if(nationText.length==0){
            mnation.innerHTML ="국가 : 미표시";
        } else {
            mnation.innerHTML = "국가 : "+nationText;
        }

        movieDetail.audits.forEach(el=>{
            ageText +=el.watchGradeNm+" ";
        })

        if(ageText.length==0){
            howAge.innerHTML ="관람등급 : 미표시";
        } else {
            howAge.innerHTML = "관람등급 : "+ageText;
        }

      
    });
}


close.addEventListener('click',()=>{
    popup.classList.remove('popup-ani')
    close.classList.remove('close-ani')
    popupCon.classList.remove('popup-con-ani')
    popupTitle.classList.remove('popup-title-ani')

});


// ==============================




(()=>{
    boxOfficeFn();
})();
