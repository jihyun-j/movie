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

    // 카드 안에 들어가는 정보들
    cardContainer.innerHTML = `
        <img class="poster_img" src="https://image.tmdb.org/t/p/w500${img}" alt="" />
        <div class="movie-info">
          <p class="title">${title}</p>
          <p class="overview">${overview}</p>
          <div class="vote_average">${vote_avg}</div>
        </div>
      `;

    // 모든 영화가 들어가는 컨테이너 안에 영화 넣기
    movieContainerEl.append(cardContainer);

    // alert 팝업 기능
    cardContainer.addEventListener("click", function () {
      alert(`이 영화의 ID 넘버는 ${id}`);
    });
  });
};

const searchMovie = (e) => {
  e.preventDefault();
  const movieTitles = document.querySelectorAll(".title");
  let searchInput = searchInputEl.value;
  const cards = document.querySelectorAll(".card-container");
  const count = document.querySelector(".count-movies");

  let movieCount = 0;

  movieTitles.forEach((title, index) => {
    let isVisible =
      title.innerHTML.toUpperCase().includes(searchInput.toUpperCase()) ||
      title.innerHTML.toLowerCase().includes(searchInput.toLowerCase());

    if (isVisible) {
      cards[index].classList.remove("hide");
      movieCount++;
    } else {
      cards[index].classList.add("hide");
    }
  });
  count.innerText = `검색된 영화: ${movieCount}`;
};

searchFormEl.addEventListener("submit", searchMovie);

// Slide

const slide = (movies) => {
  let slideCotainer = document.querySelector(".slide-container");

  setInterval(() => {
    let random = Math.floor(Math.random() * movies.length);
    let backdropImgPath = `https://image.tmdb.org/t/p/w500${movies[random].backdrop_path}`;
    let movieTitle = movies[random].title;
    let movieOverview = movies[random].overview.substring(0, 200) + "...";

    slideCotainer.style.backgroundImage = `linear-gradient(to left, rgba(255,255,255,0), rgba(0,0,0,1)), url(${backdropImgPath})`;

    let slideTemp = `
    <div class="movie-info-container">
      <p class="movie-title">${movieTitle}</p>
      <p class="movie-overview">${movieOverview}</p>
      <button class="learn-more">Learn More</button>
    </div>
    `;

    slideCotainer.innerHTML = slideTemp;
  }, 5000);
};

slide();

// header background
const hearderEl = document.querySelector(".header-container");

window.addEventListener("scroll", function () {
  console.log(window.scrollY);
  if (window.scrollY > 300) {
    hearderEl.classList.add("add-background");
  } else {
    hearderEl.classList.remove("add-background");
  }
});
