function slider(){
    const slides = document.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        slideWidth = window.getComputedStyle(slidesWrapper).width;

    
    let slideIndex = 1;
    total.textContent = addZero(slides.length);
    current.textContent = addZero(slideIndex);

    
    let offset = 0;

    slidesField.style.width = 100 * slides.length + '%';
    slides.forEach(item => item.style.width = slideWidth);
    
    slidesField.style.display = 'flex';
    slidesField.style.transition = '1s all';

    slidesWrapper.style.overflow = 'hidden';

    next.addEventListener('click', () => {

        if(offset == +slideWidth.replace(/\D/g, '') * (slides.length - 1)){
            offset = 0;
        } else {
            offset += +slideWidth.replace(/\D/g, '');
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
        
        ++slideIndex;

        if( slideIndex > slides.length){
            slideIndex = 1;
        }
        current.textContent = addZero(slideIndex);


    });

    prev.addEventListener('click', () => {

        if(offset == 0){
            offset = +slideWidth.replace(/\D/g, '') * (slides.length - 1);
        } else {
            offset -= +slideWidth.replace(/\D/g, '');
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        --slideIndex;

        if( slideIndex < 1){
            slideIndex = slides.length;
        }
        current.textContent = addZero(slideIndex);
    });


    function addZero(n){
        if(n > 0 && n < 10){
            return '0'+n;
        }
    }
}

export default slider;