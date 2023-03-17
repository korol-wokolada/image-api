const input = document.querySelector("#input");
const grid = document.querySelector(".grid");

window.addEventListener("load", dayNightMode);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    loadImg();
  }
});

function loadImg() {
  removeImg();
  const url =
    "http://api.unsplash.com/search/photos/?query=" +
    input.value +
    "&per_page=12&client_id=qQp9YLJAMRrioT2HCr6KiaxmQuVr6wbypvwk_lQ_S_w";

  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else alert(response.status);
    })
    .then((data) => {
      console.log(data);
      const imageNodes = [];
      for (let i = 0; i < data.results.length; i++) {
        imageNodes[i] = document.createElement("div");
        imageNodes[i].className = "img";
        imageNodes[i].style.backgroundImage =
          "url(" + data.results[i].urls.raw + ")";
        imageNodes[i].addEventListener("dblclick", () => {
          window.open(data.results[i].links.download, "_blank");
        });
        grid.appendChild(imageNodes[i]);
      }
    });
}

function removeImg() {
  grid.innerHTML = "";
}
function dayNightMode() {
  const date = new Date();
  const hour = date.getHours();
  if (hour >= 7 && hour <= 19) {
    document.body.style.backgroundColor = "whitesmoke";
    document.body.style.color = "black";
  } else {
    document.body.style.backgroundColor = "balck";
    document.body.style.color = "white";
  }
}
