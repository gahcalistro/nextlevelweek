const buttonSearch = document.querySelector("#btn-search")
const buttonClose = document.querySelector("#btn-close")
const modal = document.querySelector("#modal")

buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})

buttonClose.addEventListener("click", () => {
    modal.classList.add("hide")
})