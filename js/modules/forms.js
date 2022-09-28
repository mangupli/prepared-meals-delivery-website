import {openModal, closeModal} from './modalWindows';
import {postData} from '../services/services.js';

function forms(formSelector, modalTimerId){
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'Загрузка',
        success: 'Спасибо!  Мы скоро с вами свяжемся!',
        error: 'Что-то пошло не так...'
    };

    forms.forEach( item => {
        bindPostData(item);
    });

    function bindPostData(form){
        form.addEventListener('submit', (ev)=>{
            ev.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.append(statusMessage);

            
            const data = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(data.entries()));
            
            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showSuccessModal(message.success);
                
                statusMessage.remove();
            }).catch(() => {
                showSuccessModal(message.error);
            }).finally(()=>{
                form.reset();
            });

        });
    }

    function showSuccessModal(message){
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');

        openModal('.modal', modalTimerId);

        const successModal = document.createElement('div');
        successModal.classList.add('modal__dialog');
        successModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(successModal);

        setTimeout(()=>{
            successModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        },4000);
    }
}

export default forms;