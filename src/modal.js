const handleEscapeBtn = (evt) => {
    if (evt.key === "Escape") {
        const openedModal = document.querySelector(".popup_is-opened");
        if (openedModal) closeModal(openedModal);
    }
};

const openModal = (modal) => {
    modal.classList.add("popup_is-opened");
    document.addEventListener("keydown", handleEscapeBtn);
};

const closeModal = (modal) => {
    modal.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", handleEscapeBtn);
};
export { openModal, closeModal };
