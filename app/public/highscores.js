const highScoresList = document.getElementById("highScoresList");



const highScores = [];
const categories = [];
window.onload = () => {
  let allScores = new XMLHttpRequest();

  allScores.onreadystatechange = () => {
    if (allScores.readyState == 4 && allScores.status == 200) {
      allScores = JSON.parse(allScores.responseText);
      allScores.forEach(element => {
        highScores.push(element);
      });

      highScores.sort((a, b) => b.score - a.score);

      let ajaxCategory = new XMLHttpRequest();

      ajaxCategory.onreadystatechange = () => {
        if (ajaxCategory.readyState == 4 && ajaxCategory.status == 200) {
          ajaxCategory = JSON.parse(ajaxCategory.responseText);
          ajaxCategory.forEach(element => {
            categories.push(element);
          });
          highScoresList.innerHTML = highScores
            .map((score, index) => {
              let cat = categories.find(element => element.id == score.categoryId);

              return `<li class="high-score">${index + 1}. ${score.username} - ${score.score} in Category: ${cat.name}</li>`;

            })
            .join("");



        }
      }

      ajaxCategory.open("GET", "http://localhost:8080/api/categories", true);
      ajaxCategory.send();



    }
  }
  allScores.open("GET", "http://localhost:8080/api/scores", true);
  allScores.send();

}

document.getElementById("goHome").addEventListener("click", () => {
  window.location.href = "index.html";
})

