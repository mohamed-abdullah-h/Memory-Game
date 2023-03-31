let QuestionIcons = document.querySelectorAll('.cards .icon i');
let Icons_Divs = document.querySelectorAll('.cards .icon');
let check_arr = [];
let Corrected_items = [];
let cong_div = document.querySelector('.container .cong');
let wronTimes_span = document.querySelector('#wrong-tries');
let started_span = document.querySelector('#start');
let started_again = document.querySelector('#start-again');
let name_span = document.querySelector('#user-name');

let wrongTimes_counter = 0;
let started = false;
let arrOfIcons = ['fab fa-apple', 'fab fa-android', 'fab fa-angular', 'fab fa-facebook', 'fab fa-html5',
    'fab fa-js', 'fab fa-python', 'fab fa-java', 'fab fa-skype', 'fab fa-linkedin',
    'fab fa-apple', 'fab fa-android', 'fab fa-angular', 'fab fa-facebook', 'fab fa-html5',
    'fab fa-js', 'fab fa-python', 'fab fa-java', 'fab fa-skype', 'fab fa-linkedin'];

let randomized = function () {
    let rnd = Math.floor(Math.random() * 20);
    return rnd;
};
let selectedItem = function () {
    let index = randomized();
    let item = arrOfIcons[index];
    while (item == undefined) {
        index = randomized();
        item = arrOfIcons[index];
    }
    arrOfIcons[index] = undefined;
    return item;
};
for (let i = 0; i < arrOfIcons.length; i++) {
    let item = selectedItem();
    
    Icons_Divs[i].firstElementChild.className = item;
    Icons_Divs[i].firstElementChild.classList.add('rotated');
}
started_span.onclick = function (e) {
    started_span.parentElement.style.visibility = 'hidden';
    setTimeout(() => {
        let name = window.prompt("please Enter your Name for Playing", 'mohamed');
        if (name === null) {
            name = 'unknown';
        }
        name_span.textContent = name;
        setTimeout(() => {
        Icons_Divs.forEach(ele => {
            toggle_function(ele);
        }, 3000);
             setTimeout(() => {
        Icons_Divs.forEach(ele => {
            toggle_function(ele);
            started = true
        });
    }, 3000);
    });
        
      
    }, 300);
    
   
}
started_again.onclick = (()=>{
    location.reload();
});
Icons_Divs.forEach(ele => {
    ele.onclick = function (event) {
        if (!started) {
            return;
        }
        if (check_CorrectedItems(ele.firstElementChild.className)) {
            return;
        }
        toggle_function(ele);
        if (ele.firstElementChild.classList.contains('active')) {
            if (check_arr.length === 0) {
                check_arr[0] = ele;
            }
            else if (check_arr.length === 1) {
                if (check_arr[0].firstElementChild.className !== ele.firstElementChild.className) {
                    setTimeout(toggle_function, 800, ele);
                    setTimeout(toggle_function, 800, check_arr[0]);
                    setTimeout(() => {
                        wronTimes_span.textContent = ` ${++wrongTimes_counter}`;
                    }, 500);
                    check_arr = [];
                   
                }
                else {
                    ele.classList.add('disabled');
                    check_arr[0].classList.add('disabled');
                    check_arr = [];
                    Corrected_items.push(ele.firstElementChild.className);
                    if (Corrected_items.length === 10) {

                        setTimeout(() => {
                            cong_div.style.visibility = 'visible';
                        }, 1000);
                    }
                }

            }
        }
        else {
             check_arr = [];
        }
       }
        
     }
);

let toggle_function = function (ele) {
        ele.firstElementChild.classList.toggle('active');
        ele.classList.toggle('rotated');
};
let check_CorrectedItems = function (className) {
    for (let i = 0; i < Corrected_items.length; i++) {
        if (className === Corrected_items[i]) {
            return true;
        }
        
    }
    return false;
 };