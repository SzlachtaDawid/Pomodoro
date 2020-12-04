import NoSleep from 'nosleep.js';
var noSleep = new NoSleep();

document.addEventListener('click', function enableNoSleep() {
    document.removeEventListener('click', enableNoSleep, false);
    noSleep.enable();
}, false);

const starter = document.querySelector('div.starter')
const reset = document.querySelector('.reset');
const timer = document.querySelector('div.timer h2')
const i = document.querySelector('div.timer i')
const btnSettings = document.querySelector('button.btnSettings')
const btnSettingsClose = document.querySelector('i.closeSet')
const btnSetTime = document.querySelectorAll('.containerset button')
const svgCircle = document.querySelector('svg circle')
let now
let timeEnd


let time
let timeWork = 25
let timeBreake = 5
let breake = false;
let flaga = false
let flaga2 = false
let active
let idI;
let bar
let bar3
let timeStarter = true
let webTab = true



// 1 , timer , 3 (praca) - 4 , timer , 6 (przerwa)


// FUNKCJA POMODORO TIMER (STARTOWANIE)(PRACA)(PRZERWA)


const startwatch = () => {
    now = Math.floor(Date.now() / 100)
    timeEnd = Math.floor(now) + time
    if (!breake) {
        console.log('Wystartowanie Pracy')
        time = timeWork * 60 * 10;
        timeEnd = Math.floor(now) + time
        bar = (880 / time)
        bar3 = 880
        starter.textContent = '';
        i.style.display = 'none';
        svgCircle.style.strokeDashoffset = 880
        svgCircle.style.animation = `colorWork ${(timeWork * 60) + 's'} linear both`;
        if (flaga2) {
            divBreake.remove()
        }
        webTab = true
        idI = setInterval(start, 100);
    }

    if (breake) {
        console.log('Wystartowanie Przerwy')
        time = timeBreake * 60 * 10;
        timeEnd = Math.floor(now) + time
        bar = (880 / time)
        bar3 = 880
        starter.textContent = '';
        i.style.display = 'none';
        svgCircle.style.strokeDashoffset = 880
        svgCircle.style.animation = `colorBreake ${(timeBreake * 60) + 's'} linear both `;
        webTab = true
        flaga = true
        idI = setInterval(start, 100);
    }
}

const start = () => {
    time--;
    if (time >= 0) {
        console.log('Timer')
        now = Math.floor(Date.now() / 100)
        time = timeEnd - now
        timeStarter = false
        timer.style.display = 'block'
        let mins = Math.floor(time / 10 / 60);
        let secs = Math.floor(time / 10 % 60);
        if (mins < 10) {
            mins = "0" + mins;
        }
        if (secs < 10) {
            secs = "0" + secs;
        }
        timer.textContent = mins + ":" + secs;
        bar3 = (-now) - (-timeEnd)
        if (webTab) bar4 = 880 / bar3
        bar5 = bar4 * bar3
        svgCircle.style.strokeDashoffset = bar5
        webTab = false
    } else if (time < 0 && !breake) {
        console.log('Zakończenie Pracy')
        timer.style.display = 'none'
        starter.textContent = 'Przerwa'
        i.style.display = 'block'
        clearInterval(idI)
        breake = true
        time = timeBreake * 60 * 10;
        bar3 = 0
        svgCircle.style.strokeDashoffset = bar3
    } else if (time < 0 && breake) {
        console.log('Zakończenie Pauzy')
        timer.style.display = 'none'
        starter.textContent = 'Praca'
        i.style.display = 'block'
        bar3 = 0
        svgCircle.style.strokeDashoffset = bar3
        if (flaga) {
            divBreake = document.createElement('div')
            document.querySelector('.panel').appendChild(divBreake)
            divBreake.classList.add("add5")
            divBreake.textContent = 'Dodatkowa przerwa'
            flaga2 = true
        }
        clearInterval(idI)
        active = true
        breake = false
        flaga = true
        time = timeWork * 60 * 10;
        divBreake.addEventListener('click', breake5min)
    }

}

starter.addEventListener('click', startwatch);

// FUNKCJA POMODORO TIMER (STARTOWANIE)(PRACA)(PRZERWA) --- KONIEC


// RESETOWANIE

const resetf = () => {
    console.log('Reset')
    webTab = true
    timeStart = 0
    timer.textContent = `${timeWork}:00`;
    starter.textContent = 'Start';
    i.style.display = 'none';
    bar3 = 880
    svgCircle.style.strokeDashoffset = bar3
    svgCircle.style.animation = `colorWork2 ${(timeWork * 60) + 's'} linear both`;
    time = timeWork * 60 * 10;
    active = false;
    breake = false
    clearInterval(idI)
    if (flaga2) {
        divBreake.remove()
    }
}

reset.addEventListener('click', resetf);

// RESETOWANIE KONIEC


// PRZERWA DODATKOWA

const breake5min = () => {
    if (active) {
        console.log('Dodatkowa Przerwa')
        time = timeBreake * 60 * 10;
        timeEnd = Math.floor(Date.now() / 100) + time
        starter.textContent = '';
        svgCircle.style.strokeDashoffset = 880
        svgCircle.style.animation = `colorBreake2 ${(timeBreake * 60) + 's'} linear both `;
        i.style.display = 'none';
        bar = (880 / time)
        bar3 = 880
        flaga = false
        breake = true
        flaga2 = false
        divBreake.remove()
        idI = setInterval(start, 100);
    }
}

// PRZERWA DODATKOWA KONIEC


// OPCJE
//  ZMIANA CZASU i  ZMIANA TŁA
btnSettings.addEventListener('click', function () {
    document.querySelector('section.setting').style.zIndex = '1'
})

btnSettingsClose.addEventListener('click', function () {
    document.querySelector('section.setting').style.zIndex = '-1'
})


btnSetTime.forEach(function (e) {
    e.addEventListener('click', function () {
        if (this.dataset.work !== undefined) {
            timeWork = parseInt(this.dataset.work)
        }
        if (this.dataset.breake !== undefined) {
            timeBreake = parseInt(this.dataset.breake)
        }
        if (this.dataset.color !== undefined) {
            console.log(this.dataset.color)
            if (this.dataset.color == 1) {
                document.documentElement.style.setProperty("--main-background-image", "linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%)")
            } else if (this.dataset.color == 2) {
                document.documentElement.style.setProperty("--main-background-image", "linear-gradient(0deg, #74EBD5 0%, #9FACE6 100%)")
            } else if (this.dataset.color == 3) {
                document.documentElement.style.setProperty("--main-background-image", "linear-gradient(180deg, #21D4FD 0%, #B721FF 100%)")
            }
        }
    })
})

// OPCJE KONIEC