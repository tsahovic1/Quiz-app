const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const activeCategory = localStorage.getItem('activeCategory')

const highScores = []
window.onload = () => {
    let allScores = new XMLHttpRequest();

    allScores.onreadystatechange = () => {
        if (allScores.readyState == 4 && allScores.status == 200) {
            allScores = JSON.parse(allScores.responseText);
            allScores.forEach(element => {
                highScores.push(element);
            });
        }
    }
    allScores.open("GET", "http://localhost:8080/api/scores", true);
    allScores.send()
}

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        username: username.value,
        categoryId: activeCategory
    };
    saveInDatabase(score);
    alert(`Score for Username: ${score.username} (${score.score}) has been saved`);
    window.location.href = 'index.html';
};

saveInDatabase = (score) => {

    let ajax = new XMLHttpRequest();

    ajax.onreadystatechange = () => {
        if (ajax.readyState == 4 && ajax.status == 200) {
            console.log("Score saved");
        }
    }
    ajax.open("POST", "http://localhost:8080/api/scores", true);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(JSON.stringify(score));
}
document.getElementById("game").addEventListener("click", () => {
    window.location.href = "game.html";
})
document.getElementById("goHome").addEventListener("click", () => {
    window.location.href = "index.html";
})