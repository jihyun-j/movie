const movieContainerEl = document.querySelector(".movie-container");
const searchInputEl = document.querySelector(".search-input");
const searchButtonEl = document.querySelector(".search-btn");
const searchFormEl = document.querySelector("#search-form");

// 영화 API 가져오기
const api_key = "f9d7933ff34c54cd09fa42a11bd5a1a2";
const baseUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US`;

// let array = [];
// console.log(array.length);
fetch(baseUrl)
  .then((response) => response.json())
  .then((response) => {
    let movieData = response.results;
    // movieData.forEach((item) => {
    //   let title = item.title;
    //   return array.push(title);
    // });
    printMovieData(movieData);
    slide(movieData);
  })
  .catch((err) => console.error(err));

// API 데이터 화면에 표시하기
const printMovieData = (movie) => {
  movie.map((item) => {
    let title = item.title;
    let overview = item.overview;
    let vote_avg = item.vote_average;
    let img = item.poster_path;
    let id = item.id;

    // 한개의 영화 정보가 들어가는 카드 생성
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");

    // 카드 안에 들어가는 영화 정보들
    cardContainer.innerHTML = `
        <img class="poster_img" src="https://image.tmdb.org/t/p/w500${img}" alt="" />
        <div class="movie-info">
          <p class="title">${title}</p>
          <p class="overview">${overview}</p>
          <div class="vote_average">${vote_avg}</div>
        </div>
      `;

    // 메인 영화 컨테이너 안에 카드 넣기
    movieContainerEl.append(cardContainer);

    // 영화 ID값 alert 띄우기
    cardContainer.addEventListener("click", function () {
      alert(`이 영화의 ID 넘버는 ${id}`);
    });
  });
};

// 영화 검색 기능 함수
const searchMovie = (e) => {
  e.preventDefault();
  const movieTitles = document.querySelectorAll(".title"); // 모든 영화 제목 가져오기
  const cards = document.querySelectorAll(".card-container"); // 모든 카드 가져오기
  let searchInput = searchInputEl.value; // 검색 input 값 가져오기
  const count = document.querySelector(".count-movies"); // 검색된 영화 개수 넣을 자리 가져오기

  let movieCount = 0; // 검색 결과 초기화

  movieTitles.forEach((title, index) => {
    // search input 값이 영화 제목에 포함되어 있는 경우 카드 보이기
    let isVisible =
      title.innerHTML.toUpperCase().includes(searchInput.toUpperCase()) ||
      title.innerHTML.toLowerCase().includes(searchInput.toLowerCase());

    if (isVisible) {
      // 카드 하나 하나씩 순회하면서 만약 영화제목에 input 값이 포함 되어 있으면 카드 보이기
      cards[index].classList.remove("hide");
      movieCount++; // 검색된 결과 더하기
    } else {
      // 만약 영화제목에 input 값이 포함 되어 있지 않으면 카드 숨기기
      cards[index].classList.add("hide");
    }
  });
  count.innerText = `검색된 영화: ${movieCount}`; // 검색된 영화 개수 보이기
};

// 영화 검색 form에 대한 이벤트
searchFormEl.addEventListener("submit", searchMovie);

// Slide
const slide = (movies) => {
  let slideCotainer = document.querySelector(".slide-container"); // 메인 슬라이드 컨테이너 가져오기

  // 5초마다 바뀌는 영화 정보
  setInterval(() => {
    let random = Math.floor(Math.random() * movies.length); // 랜덤 인덱스
    let backdropImgPath = `https://image.tmdb.org/t/p/w500${movies[random].backdrop_path}`; // backdrop 이미지 랜덤으로 가져오기
    let movieTitle = movies[random].title; // 영화 제목 랜덤으로 가져오기
    let movieOverview = movies[random].overview.substring(0, 200) + "..."; // 영화 줄거리도 가져오기

    // 메인 슬라이드에 랜덤 이미지와 그라데이션과 주기
    slideCotainer.style.backgroundImage = `linear-gradient(to left, rgba(255,255,255,0), rgba(0,0,0,1)), url(${backdropImgPath})`;

    // 슬라이드 이미지 위에 들어갈 정보들
    let slideTemp = ` 
    <div class="movie-info-container">
      <p class="movie-title">${movieTitle}</p>
      <p class="movie-overview">${movieOverview}</p>
      <button class="play-now-btn">Play now</button>
    </div>
    `;

    // 메인 슬라이드에 영화 정보 추가하기
    slideCotainer.innerHTML = slideTemp;
  }, 5000);
};

// 스크롤 했을 때, Header 배경색 바꾸기
const hearderEl = document.querySelector(".header-container");
window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    hearderEl.classList.add("add-background");
  } else {
    hearderEl.classList.remove("add-background");
  }
});
