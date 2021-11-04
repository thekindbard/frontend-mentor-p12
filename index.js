const section = document.querySelector('section:last-child');
let data;

function fillingData(period = "daily"){
    data.forEach( (elm, index) => {

        const div = document.createElement("DIV");
        const div2 = document.createElement("DIV");
        const div3 = document.createElement("DIV");
        const div_title = document.createElement("DIV");
        const title = document.createElement("SPAN");
        const hours = document.createElement("STRONG");
        const history = document.createElement("SPAN");
        const image = document.createElement("IMG");

        const timerTop = index < 3 ? "timer__container-top" : "" ;

        div3.setAttribute("class", `timer__container ${timerTop}`);
        div2.setAttribute("class", `timer__bg timer__bg-${elm.title.toLowerCase()}`);
        div.setAttribute("class", "timer__data")
        title.setAttribute("class", "timer__title");
        div_title.setAttribute("class", "timer__titleContainer");
        hours.setAttribute("class", "timer__hours");
        history.setAttribute("class", "timer__history");
        image.setAttribute("src", "./images/icon-ellipsis.svg");
        image.setAttribute("class", "timer__image");
        image.setAttribute("alt", "image");

        title.innerHTML = elm.title;
        hours.innerHTML = `${elm.timeframes[period].current}hrs`;
        history.innerHTML = `Last day - ${elm.timeframes[period].previous}hrs`;
        div_title.appendChild(title);
        div_title.appendChild(image);
        div.appendChild(div_title);
        div.appendChild(hours);
        div.appendChild(history);
        div2.appendChild(div);
        div3.appendChild(div2);
        section.insertBefore(div3, document.querySelector('.loading'));
    });
}

function reload(e) {
    const period = e.target.innerText.toLowerCase();
    const time = period=="daily" ? "day" : period=="monthly" ? "month" : "week"; 

    document.querySelectorAll('section:first-child > span').forEach( span => span.classList.remove('active'));
    this.classList.add("active");

    document.querySelector('.timer').style.visibility = "hidden";

    data.forEach( (elm, index) => {
        const div = document.querySelector(`section:last-child div:nth-child(${index+1})`);
        div.querySelector('.timer__title').innerHTML = elm.title;
        div.querySelector('.timer__hours').innerHTML = `${elm.timeframes[period].current}hrs`;
        div.querySelector('.timer__history').innerHTML = `Last ${time} - ${elm.timeframes[period].previous}hrs`;
    });
    
    document.querySelector('.loading').style.visibility = "visible"
    setTimeout( ()=> {
        document.querySelector('.loading').style.visibility = "hidden";
        document.querySelector('.timer').style.visibility = "visible";
    }, 500)


}

fetch("./data.json")
.then(rpn => rpn.json())
.then(rpn => {
    data = rpn; 
    fillingData()
})

const spans = document.querySelectorAll('section:first-child > span').forEach( span => span.addEventListener('click', reload))