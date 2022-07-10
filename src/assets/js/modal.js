var modalClose = document.getElementById("modalClose");
var modal = document.getElementById("modal");


//control modal
modalClose.addEventListener('click', closeModal, false);    
function openModal() {
    tour.next();
    modal.style.display = "block";
}
function closeModal() {
    tour.next();
    modal.style.display = "none";
}