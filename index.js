const addsec = document.getElementsByClassName('add')[0];
const addform = document.getElementById('addf');
const main = document.getElementById('main');
const header = document.getElementById('header');

var addzone = false;
function addOn() {
    if (!addzone) {

        addzone = true;

        main.style.pointerEvents = "none";
        header.style.pointerEvents = "none";
        addsec.style.animation = 'none';
        addsec.offsetHeight;
        addsec.style.animation = 'slidein 0.5s ease forwards';
    }
}

function addOff() {
    if (addzone) {

        addzone = false;

        main.style.pointerEvents = "all";
        header.style.pointerEvents = "all";
        addsec.style.animation = 'none';
        addsec.offsetHeight;
        addsec.style.animation = 'slidein 0.5s ease reverse';
    }
}



var startX, endX;

document.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
});

document.addEventListener('touchend', function (e) {
    endX = e.changedTouches[0].clientX;
    handleSwipe(addOff, addOn);
});

function handleSwipe(right, left) {
    const distance = endX - startX;
    if (distance > 100) {
        right()

    } else if (distance < -100) {
        left()

    }
}

document.addEventListener('DOMContentLoaded', () => {
    var items = localStorage.getItem('shoplist');
    items = JSON.parse(items) || [];

    items.forEach(item => {
        makeitem(item.name, item.done);
    });
});

function clearall() {
    if (confirm('Are you sure that you want to clear all items?')) {
        localStorage.removeItem('shoplist');
        main.innerHTML = "";
    }
}

addform.addEventListener('submit', e => {
    e.preventDefault();

    var previousItems = localStorage.getItem('shoplist');
    previousItems = JSON.parse(previousItems) || [];

    var newItem = {
        name: e.target[0].value.trim(),
        done: false
    };

    if (newItem.name) {
        previousItems.push(newItem);
        localStorage.setItem('shoplist', JSON.stringify(previousItems));

        makeitem(newItem.name, newItem.done);
        e.target[0].value = "";
    }
});

function makeitem(name, done) {
    const item = document.createElement('div');
    item.className = "item";
    if (done) {
        item.classList.add('done');
    }
    item.innerHTML = `<h2>${name}</h2>`;

    main.appendChild(item);

    var dbl = false;
    item.addEventListener('touchend', () => {
        console.log("checking");

        if (dbl) {
            var items = JSON.parse(localStorage.getItem('shoplist')) || [];
            var currentItem = items.find(i => i.name === name);

            if (item.classList.contains('done')) {
                item.classList.remove('done');
                currentItem.done = false;
            } else {
                item.classList.add('done');
                currentItem.done = true;
            }

            localStorage.setItem('shoplist', JSON.stringify(items));
        } else {
            dbl = true;
            setTimeout(() => {
                dbl = false;
            }, 500);
        }
    });
}

