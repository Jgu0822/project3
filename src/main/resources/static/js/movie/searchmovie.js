const key = "ff910209a45c04c03ea9d164a0c91030";

const boxCon = document.querySelector('.box-con');
const header = document.querySelector('.box-con .header2');
const title = document.querySelector('.box-con .header2 .title');
const title2 = document.querySelector('.box-con .header2 .title2');
const sceneDetail = document.querySelector('.box-con .scene-detail');

let html1 = "";

function nameSearch(){

    let nameSearch=document.querySelector('#nameSearch')
    let startyear = document.querySelector('#startyear')
    let lastyear = document.querySelector('#lastyear')

    let startYearCheck = startyear.value;
    let lastYearCheck = lastyear.value;

    console.log(startYearCheck);
    console.log(lastYearCheck);
    console.log(startYearCheck.length);
    console.log(lastYearCheck.length);
    

    if(startYearCheck<=lastYearCheck){

        if(startYearCheck.length==4&&lastYearCheck.length==4){

            let search = nameSearch.value;

            let movieSearch = "searchMovieList.json";
            let itemPerPage = "10";
            // let openStartDt = 2023; // 개봉년
            // let movieNm = "웅남이"; //개봉이름
            let apiUrl = `http://kobis.or.kr/kobisopenapi/webservice/rest/movie/${movieSearch}?key=${key}&itemPerPage=${itemPerPage}&movieNm=${search}&openStartDt=${startYearCheck}&openEndDt=${lastYearCheck}`;
        
            fetch(apiUrl)
             .then(response => response.json())
             .then((result)=>{
        
                console.log(result,typeof result);
             
                let movieListResult = result.movieListResult;
                let movieList = result.movieListResult.movieList;
                console.log(typeof movieList);
        
                let titleCon = movieListResult.totCnt;
                title.innerHTML="검색결과 : "+titleCon;
        
                let title2Con = movieListResult.source;
                title2.innerHTML=title2Con;     //텍스트일 경우 innerHTML 대신 innerTEXT 가능
                
                html1=`<div class="detail-header">
                    <ul>
                    <li class="t1">제목</li>
                    <li>영어 제목</li>
                    <li>제작 년도</li>
                    <li>개봉일</li>
                    <li>제작 국가</li>
                    <li>종류</li>
                    <li>상세 보기</li>
                    </ul>
                </div>`;
        
                html1 += `<div class = "detail-con">`
        
                movieList.forEach((el,idx)=>{
                    console.log(el);
                    html1+=`<ul>`;
                    html1+=`<li class="t1">${el.movieNm}</li>`;
                    html1+=`<li>${el.movieNmEn}</li>`;
                    html1+=`<li>${el.prdtYear}</li>`;
                    html1+=`<li>${el.openDt}</li>`;
                    html1+=`<li>${el.nationAlt}</li>`;
                    html1+=`<li>${el.genreAlt}</li>`;
                    html1+=`<li onclick="sceneDeailFn(event.target.innerText)" >${el.movieCd}</li>`;
                    html1+=`</ul>`;
                })
        
                html1 += `</div>`;
        
                sceneDetail.innerHTML = html1;   // html에 넣을때는 inner HTML
        
              });
    
        } else {
    
            let search = nameSearch.value;
    
        
            let movieSearch = "searchMovieList.json";
            let itemPerPage = "10";
            // let openStartDt = 2023; // 개봉년
            // let movieNm = "웅남이"; //개봉이름
            let apiUrl = `http://kobis.or.kr/kobisopenapi/webservice/rest/movie/${movieSearch}?key=${key}&itemPerPage=${itemPerPage}&movieNm=${search}`;
        
            fetch(apiUrl)
             .then(response => response.json())
             .then((result)=>{
        
                console.log(result,typeof result);
             
                let movieListResult = result.movieListResult;
                let movieList = result.movieListResult.movieList;
                console.log(typeof movieList);
        
                let titleCon = movieListResult.totCnt;
                title.innerHTML="검색결과 : "+titleCon;
        
                let title2Con = movieListResult.source;
                title2.innerHTML=title2Con;     //텍스트일 경우 innerHTML 대신 innerTEXT 가능
                
                html1=`<div class="detail-header">
                    <ul>
                    <li class="t1">제목</li>
                    <li>영어 제목</li>
                    <li>제작 년도</li>
                    <li>개봉일</li>
                    <li>제작 국가</li>
                    <li>종류</li>
                    <li>상세 보기</li>
                    </ul>
                </div>`;
        
                html1 += `<div class = "detail-con">`
        
                movieList.forEach((el,idx)=>{
                    console.log(el);
                    html1+=`<ul>`;
                    html1+=`<li class="t1">${el.movieNm}</li>`;
                    html1+=`<li>${el.movieNmEn}</li>`;
                    html1+=`<li>${el.prdtYear}</li>`;
                    html1+=`<li>${el.openDt}</li>`;
                    html1+=`<li>${el.nationAlt}</li>`;
                    html1+=`<li>${el.genreAlt}</li>`;
                    html1+=`<li onclick="sceneDeailFn(event.target.innerText)" >${el.movieCd}</li>`;
                    html1+=`</ul>`;
                })
        
                html1 += `</div>`;
        
                sceneDetail.innerHTML = html1;   // html에 넣을때는 inner HTML
        
              });
    
        }
    } else {

        alert("개봉 종료일이 시작일보다 빠릅니다");
    }


}

// 전체 검색 =====================================

function allSearch(){

    let nameSearch=document.querySelector('#nameSearch')
    let startyear = document.querySelector('#startyear')
    let lastyear = document.querySelector('#lastyear')



            let search = nameSearch.value;
    
        
            let movieSearch = "searchMovieList.json";
            let itemPerPage = "10";
            // let openStartDt = 2023; // 개봉년
            // let movieNm = "웅남이"; //개봉이름
            let apiUrl = `http://kobis.or.kr/kobisopenapi/webservice/rest/movie/${movieSearch}?key=${key}&itemPerPage=${itemPerPage}`;
        
            fetch(apiUrl)
             .then(response => response.json())
             .then((result)=>{
        
                console.log(result,typeof result);
             
                let movieListResult = result.movieListResult;
                let movieList = result.movieListResult.movieList;
                console.log(typeof movieList);
        
                let titleCon = movieListResult.totCnt;
                title.innerHTML="검색결과 : "+titleCon;
        
                let title2Con = movieListResult.source;
                title2.innerHTML=title2Con;     //텍스트일 경우 innerHTML 대신 innerTEXT 가능
                
                html1=`<div class="detail-header">
                    <ul>
                    <li class="t1">제목</li>
                    <li>영어 제목</li>
                    <li>제작 년도</li>
                    <li>개봉일</li>
                    <li>제작 국가</li>
                    <li>종류</li>
                    <li>상세 보기</li>
                    </ul>
                </div>`;
        
                html1 += `<div class = "detail-con">`
        
                movieList.forEach((el,idx)=>{
                    console.log(el);
                    html1+=`<ul>`;
                    html1+=`<li class="t1">${el.movieNm}</li>`;
                    html1+=`<li>${el.movieNmEn}</li>`;
                    html1+=`<li>${el.prdtYear}</li>`;
                    html1+=`<li>${el.openDt}</li>`;
                    html1+=`<li>${el.nationAlt}</li>`;
                    html1+=`<li>${el.genreAlt}</li>`;
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
    allSearch();
})();

