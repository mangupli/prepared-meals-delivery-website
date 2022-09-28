function openModal(modalSelector, modalTimerId){
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.remove('hide');
    modalWindow.classList.add('show');
    //to turn off the option to scroll the window
    document.body.style.overflow = 'hidden';
    if(modalTimerId){
        clearInterval(modalTimerId);
    }   
}

function closeModal(modalSelector){
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.remove('show');
    modalWindow.classList.add('hide');
    //to allow to scroll back again
    document.body.style.overflow = '';
}

function modalWindows(triggerSelector, modalSelector, modalTimerId){
    const modalTrigger = document.querySelectorAll(triggerSelector),
        modalWindow = document.querySelector(modalSelector);

    modalTrigger.forEach((item, i)=>{
        item.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    modalWindow.addEventListener('click', (e)=>{
        if(e.target && e.target.matches('.modal__content') || e.target.getAttribute('data-close') == ''){
            closeModal(modalSelector);
        }   
    });

    document.addEventListener('keydown', (e)=>{
        if(e.code ==='Escape' && modalWindow.classList.contains('show')){
            closeModal(modalSelector);
        }
    });


    window.addEventListener('scroll', showModalByScroll);

    function showModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1){
            openModal(modalSelector, modalTimerId);
            removeEventListener('scroll', showModalByScroll)
        }
    }
}

export default modalWindows;

export {openModal};
export {closeModal};