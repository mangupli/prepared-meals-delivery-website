import {getData} from '../services/services.js';

function cards() {


    getData('http://localhost:3000/menu')
    .then((data)=>{
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        })
    });

    
    class MenuCard{
        constructor(src, alt, title, descr, price, parent, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.exchangeRate = 72;
            this.parent = document.querySelector(parent);
            this.classes = classes;
        }

        changeToDollars(){
            this.price = Math.floor(this.price / 72);
        }

        render(){
            const card = document.createElement('div');
            if(this.classes.length === 0) {
                this.elemClass = 'menu__item';
                card.classList.add(this.elemClass);
            } else{
                this.classes.forEach(className=>{
                    card.classList.add(className);
                });
            }
            
            card.innerHTML =   `
            <img src="${this.src}" alt="${this.alt}">
            <h3 class="menu__item-subtitle">${this.title}"</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
            </div>
            `;
            this.parent.append(card);
        }
    }   
}

export default cards;
