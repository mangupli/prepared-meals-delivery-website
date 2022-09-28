function timer (id, deadline) {
    
    setClock(id, deadline);

    function getZero(num){
        if(num >= 0 && num < 10){
            return `0${num}`
        }
        else {
            return num;
        }
    }

    function setClock(selector, endtime){
        const timer = document.querySelector(selector),
            days = document.querySelector('#days'),
            hours = document.querySelector('#hours'),
            minutes = document.querySelector('#minutes'),
            seconds = document.querySelector('#seconds'),
            timerId = setInterval(updateClock, 1000);

        //чтобы не было мигания в верстке в первый раз при загрузке страницы
        updateClock();

        function updateClock(){
            let objDate = getDiffTime(deadline);

            days.innerHTML = getZero(objDate.days);
            hours.innerHTML = getZero(objDate.hours);
            minutes.innerHTML = getZero(objDate.minutes);
            seconds.innerHTML = getZero(objDate.seconds);

            if(objDate.total <= 0){
                clearInterval(timerId);
            }
        }
    }

    function getDiffTime(endtime){
        const t = Date.parse(endtime) - Date.parse(new Date());

        if(t <= 0){
            return {total: t, days: 0, hours: 0, minutes: 0, seconds: 0};
        }

        const days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60);

            return {total: t, days, hours, minutes, seconds};

    }
}

export default timer;