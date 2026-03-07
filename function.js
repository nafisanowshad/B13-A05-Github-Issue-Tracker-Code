const searchInput=document.getElementById("search-input");
const btnActive=document.getElementById("btn-active");
const issueCard=document.getElementById("issue-card");
const loadingContainer=document.getElementById("loading-container");
const modalSection=document.getElementById("modal-section");

const loadingOn = () => {
    loadingContainer.classList.remove("hidden");
}
const loadingOff = () => {
    loadingContainer.classList.add("hidden");
}

btnActive.addEventListener("click", (e)=>{
     if (e.target.localName === 'button') {
        const btns = document.querySelectorAll(".nav-btn")
        btns.forEach(btn => {
            btn.classList.remove("bg-[#4a00ff]", "text-white");
            btn.classList.add("text-[#64748B]");
        })
        e.target.classList.add("bg-[#4a00ff]", "text-white");
        e.target.classList.remove("text-[#64748B]");
        const btnTxt = e.target.textContent.trim().toLowerCase();
        filteredIssuesByStarus(btnTxt)
        counter(btnTxt)
    }
})