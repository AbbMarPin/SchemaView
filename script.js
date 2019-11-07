
function today(){
   // console.log("today")
    
    return new Date()
}

function calcDiff(date1,date2){
   // console.log("calcDiff")
    const diff = (((date1.getTime() - date2.getTime())/1000)/60)/60
    //console.log(diff)
    const h_m_array = diff.toString().split('.')
    //console.log(h_m_array)
    //console.log(h_m_array[0].slice(0,1))
    //console.log(parseFloat("0."+h_m_array[1])*60)
    if (parseInt(h_m_array[0]) > 0  || h_m_array[0].slice(0,1) != '-'){
        // console.log('Diff',parseInt(h_m_array[0]) + "h",Math.ceil(((parseFloat("0."+h_m_array[1])*60))) + "m")
        return parseInt(h_m_array[0]) + "h" + " " + Math.ceil((parseFloat("0."+h_m_array[1])*60)) + "m"
    } else {
        return false
    }

     
}
function renderNextLessons(lesson, time, div){
   // console.log("renderNextLessons")
    if (lesson.columns[1] === 'Gem aktivitet'){
        if (lesson.columns[4] != ""){
            div.getElementsByClassName('lessons')[0].innerText += lesson.columns[2] + " börjar om " + time + " i " + lesson.columns[4]+ '\n\n'
        } else {
            div.getElementsByClassName('lessons')[0].innerText += lesson.columns[2] + " börjar om " + time + '\n\n'
        }   
    }
    else {
        if (lesson.columns[4] != ""){
            div.getElementsByClassName('lessons')[0].innerText += lesson.columns[1] + " börjar om " + time + " i " + lesson.columns[4] + '\n\n'   
    
        } else {
            div.getElementsByClassName('lessons')[0].innerText += lesson.columns[1] + " börjar om " + time + '\n\n'   
        }
    }
}

function currentLesson(lesson, startTime, currentDate, endTime, div){
   // console.log("currentLesson")
    if (startTime <= currentDate && currentDate < endTime){
        // console.log("current är", lesson.columns[1])
        // console.log(div)
        // console.log(div.getElementsByClassName('currentLesson'))
        
            if (lesson.columns[4] != ""){
                div.getElementsByClassName('currentLesson')[0].innerText = "Lektion just nu: " + (lesson.columns[1].includes("Moderna")) === true ? "Moderna Språk" :  lesson.columns[1]  + " i " + lesson.columns[4]
            } else {
                div.getElementsByClassName('currentLesson')[0].innerText = "Lektion just nu: " +( lesson.columns[1].includes("Moderna") === true) ? "Moderna Språk" :  lesson.columns[1]
            }
        div.getElementsByClassName('break')[0].innerText = "Lektionen slutar om: " + calcDiff(endTime, currentDate)
    }

}

function nextLesson(lessons, div){
   // console.log("nextLesson")
    lessons.forEach(element => {
        
        var currentDate = today()
        var currentDay = currentDate.getDate()
        if (currentDate.getDate() < 10){
            currentDay = "0" + currentDay
        }

    
        // console.log(currentDate.getFullYear()+'-'+currentDate.getMonth()+'-'+ currentDay)
        if (element.startdate === currentDate.getFullYear()+'-'+(currentDate.getMonth()+1)+'-'+ currentDay){
            // console.log(element.columns[1])
            // console.log(element.starttime)
            const dateStringStart = element.startdate +" "+ element.starttime
            const dateStringEnd = element.enddate +" "+ element.endtime
            const startTime = new Date(dateStringStart)
            const endTime = new Date(dateStringEnd)
            const timeDiff = calcDiff(startTime, currentDate)
            // console.log(startTime)
            if (timeDiff != false){
                renderNextLessons(element, timeDiff, div)         
                
            }   

            currentLesson(element, startTime, currentDate, endTime, div)

            // tid till rast
            
            
        }
          
    })
}

function clear(){
   // console.log("clear")
    
    for (let x = 0;x < document.getElementsByClassName('currentLesson').length; x++){
        document.getElementsByClassName('currentLesson')[x].innerText=''
    }
    for (let x = 0;x < document.getElementsByClassName('break').length; x++){
        document.getElementsByClassName('break')[x].innerText=''
    }
    for (let x = 0;x < document.getElementsByClassName('lessons').length; x++){
        document.getElementsByClassName('lessons')[x].innerText=''
    }
} 



function doEverything(klass, url){
   // console.log("doEverything")
    const divKlass = document.getElementById(klass)
    // console.log(divKlass.getElementsByClassName('break'))
    
    fetch(url).then(res => res.json())
    .then(resJson => {
        const lessons = resJson.reservations
        // console.log(lessons)
        nextLesson(lessons, divKlass)
        
        
    })
}

window.onload = function(){
   // console.log("window.onload")
    startTime()
    // doEverything("180s", "https://cloud.timeedit.net/abbindustrigymnasium/web/public1/ri1Y7X3QQQfZY6QfZ5064405y7Y7.json")
    // doEverything("190s", "https://cloud.timeedit.net/abbindustrigymnasium/web/public1/ri627Q5Q750ZQ4Q5Y36Q7Zn6y4Z0.json")
}


let latestSec = 1299
let switchTimeEdit = false
function startTime() {
   // console.log("startTime")

    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    //console.log(m)
    m = addToMinutes(m);
    
    if (latestSec != s){
        clear()
        doEverything("180s", "https://cloud.timeedit.net/abbindustrigymnasium/web/public1/ri1Y7X3QQQfZY6QfZ5064405y7Y7.json")
        doEverything("190s", "https://cloud.timeedit.net/abbindustrigymnasium/web/public1/ri627Q5Q750ZQ4Q5Y36Q7Zn6y4Z0.json")
        
        if (switchTimeEdit == false){
            document.getElementById('timeEditIFrame').src = 'https://cloud.timeedit.net/abbindustrigymnasium/web/public1/ri1Y7X3QQQfZY6QfZ5064405y7Y7.html'
            document.getElementById('timeEditInfo').innerText = '180s' 
            switchTimeEdit = true
        } 
        else {
            document.getElementById('timeEditIFrame').src = 'https://cloud.timeedit.net/abbindustrigymnasium/web/public1/ri1Y7X3QQQfZY6QfZ5064205y7Y7.html'
            document.getElementById('timeEditInfo').innerText = '190s' 
            switchTimeEdit = false
        }
        
    }
    
    
    document.getElementById('time').innerText = h + ":" + m;
    var t = setTimeout(startTime, 10000);
    latestSec = s
}
function addToMinutes(i) {
   // console.log("checkTime")
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}