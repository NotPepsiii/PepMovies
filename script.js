
const API_KEY = "35ee82bcad013e6a6237a0a087d7eb32";

const IMG =
"https://image.tmdb.org/t/p/w500";

const moviesContainer =
document.getElementById("movies");

const tvContainer =
document.getElementById("tvshows");

const searchInput =
document.getElementById("searchInput");

const modal =
document.getElementById("modal");

const modalTitle =
document.getElementById("modalTitle");

const modalOverview =
document.getElementById("modalOverview");

const modalPoster =
document.getElementById("modalPoster");

const closeBtn =
document.getElementById("closeBtn");

async function fetchMovies(){

const res = await fetch(
`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
);

const data = await res.json();

render(data.results,moviesContainer);
}

async function fetchTV(){

const res = await fetch(
`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`
);

const data = await res.json();

render(data.results,tvContainer);
}

function render(items,container){

container.innerHTML="";

items.forEach(item=>{

const card =
document.createElement("div");

card.className="card";

card.innerHTML=`
<img src="${IMG}${item.poster_path}">
<h3>${item.title || item.name}</h3>
`;

card.onclick=()=>showDetails(item);

container.appendChild(card);

});
}

function showDetails(item){

modal.style.display="flex";

modalTitle.textContent =
item.title || item.name;

modalOverview.textContent =
item.overview || "No description.";

modalPoster.src =
`${IMG}${item.poster_path}`;
}

closeBtn.onclick=()=>{
modal.style.display="none";
};

window.onclick=(e)=>{
if(e.target===modal){
modal.style.display="none";
}
};

searchInput.addEventListener(
"keyup",
async(e)=>{

const query=e.target.value.trim();

if(!query){
fetchMovies();
fetchTV();
return;
}

const res=await fetch(
`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
);

const data=await res.json();

moviesContainer.innerHTML="";
tvContainer.innerHTML="";

render(
data.results.filter(
x=>x.media_type==="movie"
),
moviesContainer
);

render(
data.results.filter(
x=>x.media_type==="tv"
),
tvContainer
);

});

fetchMovies();
fetchTV();

