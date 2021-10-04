const questions = [];
const allCategories = [];
const questionsList = document.getElementById("questionsList");
window.onload = () => {
    let ajaxCategory = new XMLHttpRequest();

    ajaxCategory.onreadystatechange = () => {
        if (ajaxCategory.readyState == 4 && ajaxCategory.status == 200) {
            let categories = JSON.parse(ajaxCategory.responseText);

            categories.forEach(element => {
                allCategories.push(element);
                let optionCat = document.createElement("option");
                optionCat.text = element.name;
                optionCat.value = element.id;
                document.getElementById("category").add(optionCat);
            });

            let allQuestions = new XMLHttpRequest();

            allQuestions.onreadystatechange = () => {
                if (allQuestions.readyState == 4 && allQuestions.status == 200) {
                    allQuestions = JSON.parse(allQuestions.responseText);
                    allQuestions.forEach(element => {

                        questions.push(element);

                    });
                    questionsList.innerHTML = questions
                        .map(question => {
                            console.log(allCategories)
                            let cat = allCategories.find(element => element.id == question.categoryId);
                            return `<li class="question"><div>Question: ${question.question}</div> 
                            <div class="catInLi">Category: ${cat.name}</div>
                            <div class="delButton">
                            <a class="dbt q${question.id}" onclick="deleteElement(this.getAttribute('class'))">Delete</a>
                            </div>
                            </li>`;

                        })
                        .join("");

                }
            }
            allQuestions.open("GET", "http://localhost:8080/api/questions", true);
            allQuestions.send();
        }
    }

    ajaxCategory.open("GET", "http://localhost:8080/api/categories", true);
    ajaxCategory.send();
}

document.querySelector("#form").addEventListener("submit", (event) => {

    event.preventDefault();
    const formData = new FormData(event.target);
    // if (!formData.get('category')) {
    //     alert("You cant create a question without category!");
    // }
    const question = {
        question: formData.get('question'),
        choice1: formData.get('choice1'),
        choice2: formData.get('choice2'),
        choice3: formData.get('choice3'),
        choice4: formData.get('choice4'),
        answer: formData.get('answer'),
        categoryId: formData.get('category')
    }
    let ajax = new XMLHttpRequest();

    ajax.onreadystatechange = () => {
        if (ajax.readyState == 4 && ajax.status == 200) {
            console.log("Question is added");
            location.reload();
        }
    }
    ajax.open("POST", "http://localhost:8080/api/questions", true);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(JSON.stringify(question));

})

deleteElement = (className) => {

    let id = className.substring(5, className.length);
    let ajax = new XMLHttpRequest();

    ajax.onreadystatechange = () => {
        if (ajax.readyState == 4 && ajax.status == 200) {
            alert(`Question with id of ${id} is deleted`);
            location.reload();
        }
    }
    ajax.open("DELETE", "http://localhost:8080/api/questions/" + id, true);
    ajax.send(JSON.stringify(question));


}

document.querySelector("#formCateg").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const category = {
        name: formData.get('categ')
    }
    let ajax = new XMLHttpRequest();

    ajax.onreadystatechange = () => {
        if (ajax.readyState == 4 && ajax.status == 200) {
            console.log("Category is added");
            location.reload();
        }
    }
    ajax.open("POST", "http://localhost:8080/api/categories", true);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(JSON.stringify(category));

})