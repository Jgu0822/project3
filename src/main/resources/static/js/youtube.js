function youtubeFn(){

    $(document).ready(function () {
        const apiKey = "AIzaSyAumsnv5XSvOc-3XUz8hb8sCijOz93R8yo";
        const keyword = "해외축구 소식";
        const maxResults = 50;
        const numVideos = 4; // 선택할 동영상 개수
        let selectedVideos = []; // 선택된 동영상들을 기록할 배열
    
        $.ajax({
            type: "GET",
            dataType: "json",
            url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${keyword}&order=relevance&type=video&key=${apiKey}`,
            //        url: "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&channelId=UCdTDdygpZKdDew2s1s419iw&order=rating&type=video&key=AIzaSyAumsnv5XSvOc-3XUz8hb8sCijOz93R8yo",
            contentType: "application/json",
            success: function (data) {
    
                /*             data.items.forEach(function (element, index) {
                                if (index < numVideos) {
                                    $('body').append('<iframe width="360" height="201" src="https://www.youtube.com/embed/' + element.id.videoId + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
                                }
                
                                // 검색 결과 중에서 중복 없이 무작위로 동영상 선택
                                const items = data.items;
                                selectedVideos = getRandomVideos(items, selectedVideos, numVideos);
                            });
                        },
                        complete: function (data) {
                        },
                        error: function (xhr, status, error) {
                            console.log("유튜브 요청 에러: " + error);
                        } */
    
                // 검색 결과 중에서 중복 없이 무작위로 동영상 선택
                const items = data.items;
                selectedVideos = getRandomVideos(items, numVideos);
    
                selectedVideos.forEach(function (videoId) {
                    $('.youtube-con').append('<iframe width="360" height="201" src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
                });
            },
            complete: function (data) {
            },
            error: function (xhr, status, error) {
                console.log("유튜브 요청 에러: " + error);
            }
        });
    
        // 배열 셔플 함수
        function shuffle(array) {
            let currentIndex = array.length,
                temporaryValue,
                randomIndex;
    
            while (currentIndex !== 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
    
            return array;
        }
    
        // 무작위 동영상 선택 함수
        function getRandomVideos(videos, numVideos) {
            const shuffledVideos = shuffle(videos);
            const selectedVideos = shuffledVideos.slice(0, numVideos).map(function (video) {
                return video.id.videoId;
            });
    
            // 첫 번째 동영상도 무작위로 선택
            const randomIndex = Math.floor(Math.random() * videos.length);
            selectedVideos[0] = videos[randomIndex].id.videoId;
            return selectedVideos;
        }
    
    });
}

(()=>{
    youtubeFn();
})()
