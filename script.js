// =========================
// 显示今天日期
// =========================
let selectedMood = "";
document.addEventListener("DOMContentLoaded", () => {

    const date = document.getElementById("date");

    if (date) {
        date.textContent = new Date().toLocaleDateString("zh-CN");
    }

    loadJournals();
    renderCalendar();
    updateStatistics();

});

// =========================
// 保存日记
// =========================

function saveJournal() {

    const titleInput = document.getElementById("title");
    const contentInput = document.getElementById("content");

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (title === "" || content === "") {
        alert("请填写标题和内容");
        return;
    }

    if (selectedMood === "") {
        alert("请选择今天的心情");
        return;
    }

    const now = new Date();

    const journal = {
        id: Date.now(),

        title: title,

        content: content,

        mood: selectedMood,

        date: now.toLocaleString(),

        day:
            now.getFullYear() + "-" +
            String(now.getMonth() + 1).padStart(2, "0") + "-" +
            String(now.getDate()).padStart(2, "0")
    };

    let journals =
        JSON.parse(localStorage.getItem("journals")) || [];

    journals.unshift(journal);

    localStorage.setItem(
        "journals",
        JSON.stringify(journals)
    );

    // 清空输入框
    titleInput.value = "";
    contentInput.value = "";

    // 清除心情选择
    selectedMood = "";

    document.querySelectorAll(".mood-btn").forEach(btn => {
        btn.classList.remove("selected");
    });

    // 刷新日记列表
    loadJournals();

    // 刷新统计
    updateStatistics();

    // 刷新日历
    renderCalendar();

    alert("日记保存成功！");
}

   const now = new Date();

const journal = {
    id: Date.now(),
    title: title,
content: content,
mood: selectedMood,
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
renderCalendar();
updateStatistics();

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
renderCalendar();
updateStatistics();
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
function renderCalendar() {

    const calendar = document.getElementById("calendar");

    if (!calendar) return;

    calendar.innerHTML = "";

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    document.getElementById("monthTitle").textContent =
        `${year} / ${month + 1}`;

    const firstDay = new Date(year, month, 1).getDay();
    const days = new Date(year, month + 1, 0).getDate();

    // 前面的空白
    for (let i = 0; i < firstDay; i++) {

        const blank = document.createElement("div");
        calendar.appendChild(blank);

    }

    const journals =
        JSON.parse(localStorage.getItem("journals")) || [];

    for (let d = 1; d <= days; d++) {

        const div = document.createElement("div");

        div.className = "calendar-day";

        div.textContent = d;

        const dayString =
            `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

        div.onclick = function () {

            selectedDay = dayString;

           loadJournals();
renderCalendar();

        };

        // 今天
        const today = new Date();

        if (
            d === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {

            div.classList.add("today");

        }

        // 是否有日记
        const hasJournal =
            journals.some(j => j.day === dayString);

        if (hasJournal) {

            const dot = document.createElement("div");

            dot.className = "calendar-dot";

            div.appendChild(dot);

        }

        calendar.appendChild(div);

    }

}
// =========================
// 日记统计
// =========================

function updateStatistics() {

    const totalElement =
        document.getElementById("totalJournals");

    const monthElement =
        document.getElementById("monthJournals");

    const streakElement =
        document.getElementById("streakDays");

    // 如果页面没有统计区域，就不执行
    if (
        !totalElement ||
        !monthElement ||
        !streakElement
    ) {
        return;
    }

    // 获取所有日记
    const journals =
        JSON.parse(localStorage.getItem("journals")) || [];

    // =========================
    // 1. 总日记数
    // =========================

    totalElement.textContent = journals.length;


    // =========================
    // 2. 本月日记数
    // =========================

    const now = new Date();

    const currentYear =
        now.getFullYear();

    const currentMonth =
        now.getMonth() + 1;

    const monthCount = journals.filter(journal => {

        if (!journal.day) {
            return false;
        }

        const parts =
            journal.day.split("-");

        const year =
            Number(parts[0]);

        const month =
            Number(parts[1]);

        return (
            year === currentYear &&
            month === currentMonth
        );

    }).length;

    monthElement.textContent = monthCount;


    // =========================
    // 3. 连续记录天数
    // =========================

    const streak =
        calculateStreak(journals);

    streakElement.textContent = streak;
}


// =========================
// 计算连续记录天数
// =========================

function calculateStreak(journals) {

    if (journals.length === 0) {
        return 0;
    }

    // 获取所有不同日期
    const days = [
        ...new Set(
            journals
                .map(journal => journal.day)
                .filter(day => day)
        )
    ];

    if (days.length === 0) {
        return 0;
    }

    // 按日期从新到旧排序
    days.sort(
        (a, b) =>
            new Date(b) - new Date(a)
    );

    const today =
        new Date();

    today.setHours(0, 0, 0, 0);

    const latestDay =
        new Date(days[0]);

    latestDay.setHours(0, 0, 0, 0);


    // =========================
    // 如果最近一天不是今天
    // =========================

    const difference =
        Math.floor(
            (today - latestDay) /
            (1000 * 60 * 60 * 24)
        );

    /*
       如果今天没有写日记，
       就检查昨天有没有。

       如果连今天和昨天都没有，
       连续记录就是 0。
    */

    if (difference > 1) {
        return 0;
    }


    // =========================
    // 开始计算连续天数
    // =========================

    let streak = 1;

    for (let i = 1; i < days.length; i++) {

        const current =
            new Date(days[i - 1]);

        const previous =
            new Date(days[i]);

        current.setHours(0, 0, 0, 0);
        previous.setHours(0, 0, 0, 0);

        const diff =
            Math.floor(
                (current - previous) /
                (1000 * 60 * 60 * 24)
            );

        if (diff === 1) {

            streak++;

        } else {

            break;

        }

    }

    return streak;
}
// =========================
// 心情选择
// =========================

function selectMood(button) {

    // 清除之前的选择
    document.querySelectorAll(".mood-btn").forEach(btn => {
        btn.classList.remove("selected");
    });

    // 当前按钮选中
    button.classList.add("selected");

    // 获取心情
    selectedMood = button.dataset.mood;

}
