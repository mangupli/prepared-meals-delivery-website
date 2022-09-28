function calculator(){
    const result = document.querySelector('.calculating__result span');

    let gender, height, weight, age, ratio;

    if (localStorage.getItem('gender')) {
        gender = localStorage.getItem('gender');
    } else {
        gender = 'female';
        localStorage.setItem('gender', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    calcTotal();


    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    getStaticInformation("#gender", 'calculating__choose-item_active');
    getStaticInformation(".calculating__choose_big", 'calculating__choose-item_active');

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

  
    function getStaticInformation(parentSelector, activeClass){
        const elems = document.querySelectorAll(`${parentSelector} div`);

        elems.forEach(item => {
            item.addEventListener("click", (e)=>{
                if(e.target.getAttribute('data-ratio')){
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                } else {
                    gender = e.target.getAttribute('id');
                    localStorage.setItem('gender', gender);
                }
    
                elems.forEach(item => {
                    item.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);             
                calcTotal();
            });
        });        
    }

    function getDynamicInformation(inputSelector){
        const input = document.querySelector(inputSelector);

        input.addEventListener('input', e => {

            if (input.value.match(/\D/g)){
                input.style.border = '2px solid red';
            } else {
                input.style.border = 'none';
            }


            let id = input.getAttribute('id');
            switch (id){
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
        
    }

    function calcTotal(){
        if(!gender || !height || !weight || !age || !ratio){
            result.textContent = '____';
            return ;
        }
        if(gender === 'female'){
            let calc = (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio;
            result.textContent = calc.toFixed();
        } else if (gender === 'male'){
            let calc = (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio;
            result.textContent = calc.toFixed();
        } 
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('gender')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }
}

export default calculator;