let password = "adminpassword"

document.querySelector("#formAdmin").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData.get('adminPassword'))
    console.log(formData.get('adminPassword') == password)
    if (formData.get('adminPassword') == password) {
        window.location.href = "addQuestion.html"
    }
});