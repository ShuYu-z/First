// =========================
// 显示今天日期
// =========================

document.addEventListener("DOMContentLoaded", () => {

    const date = document.getElementById("date");

    if (date) {
        date.textContent = new Date().toLocaleDateString("zh-CN");
    }

    loadJournals();

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

    const journal = {
        id: Date.now(),
        title: title,
        content: content,
        date: new Date().toLocaleString()
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

    const journals =
        JSON.parse(localStorage.getItem("journals")) || [];

    const list = document.getElementById("journalList");

    if (!list) return;

    list.innerHTML = "";

    journals.forEach(journal => {

        const card = document.createElement("div");

        card.className = "journal-item";

        card.innerHTML = `
            <h3>${journal.title}</h3>
            <p>${journal.date}</p>
        `;

        card.addEventListener("click", () => {

            document.getElementById("title").value = journal.title;
            document.getElementById("content").value = journal.content;

        });

        list.appendChild(card);

    });

}
