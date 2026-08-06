// =========================
// 显示今天日期
// =========================

document.addEventListener("DOMContentLoaded", () => {

    const date = document.getElementById("date");

    if (date) {
        date.textContent = new Date().toLocaleDateString("zh-CN");
    }

    loadJournals();
renderCalendar();

});

// =========================
// 保存日记
// =========================

function saveJournal() {

    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();

    if (title === "" || content === "") {
        alert("请填写标题和内容");
        return;
    }

   const now = new Date();

const journal = {
    id: Date.now(),
    title: title,
    content: content,

    // 完整时间（显示用）
    date: now.toLocaleString(),

    // 标准日期（日历用）
    day:
        now.getFullYear() + "-" +
        String(now.getMonth() + 1).padStart(2, "0") + "-" +
        String(now.getDate()).padStart(2, "0")
};

    let journals = JSON.parse(localStorage.getItem("journals")) || [];

    journals.unshift(journal);

    localStorage.setItem(
        "journals",
        JSON.stringify(journals)
    );

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";

    loadJournals();

}

// =========================
// 加载左侧列表
// =========================

function loadJournals() {

    let journals =
        JSON.parse(localStorage.getItem("journals")) || [];
    if(selectedDay){

    journals=journals.filter(journal=>journal.day===selectedDay);

}

    const list = document.getElementById("journalList");

    if (!list) return;

    list.innerHTML = "";

    journals.forEach(journal => {

        const card = document.createElement("div");

        card.className = "journal-item";

      card.innerHTML = `
<div class="journal-header">

    <h3>${journal.title}</h3>

    <button class="delete-btn" onclick="deleteJournal(${journal.id}, event)">
        🗑
    </button>

</div>

<p>${journal.date}</p>
`;
        card.addEventListener("click", () => {

            document.getElementById("title").value = journal.title;
            document.getElementById("content").value = journal.content;

        });

        list.appendChild(card);

    });

}
// 删除日记
function deleteJournal(id, event){

    // 防止点击垃圾桶时触发打开日记
    event.stopPropagation();

    if(!confirm("确定删除这篇日记吗？")){
        return;
    }

    let journals =
        JSON.parse(localStorage.getItem("journals")) || [];

    journals = journals.filter(journal => journal.id !== id);

    localStorage.setItem(
        "journals",
        JSON.stringify(journals)
    );

    loadJournals();

}
// 新建日记

function newJournal(){

    document.getElementById("title").value="";

    document.getElementById("content").value="";

    document.getElementById("title").focus();

}
// =========================
// Calendar
// =========================

let currentDate = new Date();
let selectedDay = null;

function renderCalendar(){

    const calendar =
        document.getElementById("calendar");

    if(!calendar) return;

    calendar.innerHTML="";

    const year =
        currentDate.getFullYear();

    const month =
        currentDate.getMonth();

    document.getElementById("monthTitle").innerHTML =
        `${year} / ${month+1}`;

    const firstDay =
        new Date(year,month,1).getDay();

    const days =
        new Date(year,month+1,0).getDate();

    // 前面的空格
    for(let i=0;i<firstDay;i++){

        const blank=document.createElement("div");

        calendar.appendChild(blank);

    }

    // 日期
    for(let d=1;d<=days;d++){

        const div=document.createElement("div");

        div.className="calendar-day";

        div.innerHTML=d;
        const dayString =
`${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;

const journals =
JSON.parse(localStorage.getItem("journals")) || [];

const hasJournal =
journals.some(j => j.day === dayString);
        const dayString =
    `${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;

div.onclick=function(){

    selectedDay=dayString;

    loadJournals();

};

        const today=new Date();

        if(
            d===today.getDate() &&
            month===today.getMonth() &&
            year===today.getFullYear()
        ){

            div.classList.add("today");

        }
if(hasJournal){

    const dot=document.createElement("div");

    dot.className="calendar-dot";

    div.appendChild(dot);

if(hasJournal){

    const dot=document.createElement("div");

    dot.className="calendar-dot";

    div.appendChild(dot);

}
        calendar.appendChild(div);

    }

}

function changeMonth(step){

    currentDate.setMonth(
        currentDate.getMonth()+step
    );

    renderCalendar();

}
function showAll(){

    selectedDay=null;

    loadJournals();

}
