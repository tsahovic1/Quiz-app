

window.onload = () => {

    let ajaxCategory = new XMLHttpRequest();

    ajaxCategory.onreadystatechange = () => {
        if (ajaxCategory.readyState == 4 && ajaxCategory.status == 200) {
            let categories = JSON.parse(ajaxCategory.responseText);
            categories.forEach(element => {
                let optionCat = document.createElement("option");
                optionCat.text = element.name;
                optionCat.value = element.id;
                document.getElementById("category").add(optionCat);
            });
        }
    }

    ajaxCategory.open("GET", "http://localhost:8080/api/categories", true);
    ajaxCategory.send();
}

document.getElementById("play").addEventListener("click", () => {
    var select = document.getElementById("category");
    var value = select.options[select.selectedIndex].value;
    localStorage.setItem('activeCategory', value);
    window.location.href = "game.html";
})
document.getElementById("highscores").addEventListener("click", () => {
    window.location.href = "highscores.html";
})
document.getElementById("addQuestion").addEventListener("click", () => {
    window.location.href = "loginAdmin.html";
})
