function tabs(){
     const tabs = document.querySelectorAll('.tabheader__item'),
        tabheaderWrapper = document.querySelector('.tabheader__items'),
        tabContainer = document.querySelector('.tabcontainer'),
        tabcontents = document.querySelectorAll('.tabcontent');

    hideAllTabcontent();
    tabcontents[0].classList.remove('hide');
    tabcontents[0].classList.add('show', 'animated');
    showTab(0);

    tabheaderWrapper.addEventListener('click', (e)=>{
        e.preventDefault();
        if(e.target && e.target.matches('.tabheader__item')){
            tabs.forEach((item, i)=>{
                if(item == e.target){
                    hideAllTabcontent();
                    showTab(i);
                }
            });
        }
    });

    function hideAllTabcontent(){
        tabcontents.forEach((item)=>{
            item.classList.remove('show');
            item.classList.add('hide');
        });

        tabs.forEach((item)=>{
            item.classList.remove('tabheader__item_active');
        });

    }

    function showTab(index){
        tabs[index].classList.add('tabheader__item_active');
        tabcontents[index].classList.add('show', 'animated');
        tabcontents[index].classList.remove('hide');
    }

}

export default tabs;