var modalClose = document.getElementById("modalClose");
var modal = document.getElementById("modal");


//control modal
modalClose.addEventListener('click', closeModal, false);    
function openModal() {
    modal.style.display = "block";
}
function closeModal() {
    modal.style.display = "none";
}