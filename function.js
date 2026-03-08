const btnActive = document.getElementById("btn-active");
const openIssue = document.getElementById("open-issues-container");
const closedIssue = document.getElementById("closed-issues-container");

btnActive.addEventListener("click", async (e) => {
  if (e.target.localName !== "button") return;

  //   else if (e.target.localName === "button") {
  //     const btns = document.querySelectorAll(".nav-btn");
  //     btns.forEach((btn) => btn.classList.remove("active-btn"));
  //     e.target.classList.add("active-btn");
  //     const btnTxt = e.target.textContent.trim().toLowerCase();
  //     filteredIssuesByStarus(btnTxt);
  //     counter(btnTxt);
  //   }

  const btns = document.querySelectorAll(".nav-btn");
  btns.forEach((btn) => btn.classList.remove("active-btn"));
  e.target.classList.add("active-btn");
  const tab = e.target.innerText;

  managespinner(true);

  await new Promise((resolve) => setTimeout(resolve, 0));

  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  const res = await fetch(url);
  const data = await res.json();

  displayAllIssue(data.data);

  if (tab === "All") {
    btnActive.classList.remove("hidden");
    openIssue.classList.add("hidden");
    closedIssue.classList.add("hidden");
    updateIssueCount(btnActive);
  } else if (tab === "Open") {
    btnActive.classList.add("hidden");
    openIssue.classList.remove("hidden");
    closedIssue.classList.add("hidden");
    updateIssueCount(openIssue);
  } else if (tab === "Closed") {
    btnActive.classList.add("hidden");
    openIssue.classList.add("hidden");
    closedIssue.classList.remove("hidden");
    updateIssueCount(closedIssue);
  }

  managespinner(false);
});

const managespinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("issue-container").classList.add("hidden");
  } else {
    document.getElementById("issue-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const loadAllIssue = async () => {
  managespinner(true);
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  const res = await fetch(url);
  const data = await res.json();
  displayAllIssue(data.data);
  managespinner(false);
};

const allIssueContainer = document.getElementById("all-issues-container");
allIssueContainer.innerHTML = "";

const allIssueCount = document.getElementById("issueCount");

const calculateCount = () => {
  allIssueCount.innerText = allIssueContainer.children.length;
};

const updateIssueCount = (container) => {
  const count = container.children.length;
  document.getElementById("issueCount").innerText = count;
};
const displayAllIssue = (issues) => {
  allIssueContainer.innerHTML = "";
  openIssue.innerHTML = "";
  closedIssue.innerHTML = "";

  const openCount = issues.filter((issue) => issue.status === "open").length;
  const closedCount = issues.filter(
    (issue) => issue.status === "closed",
  ).length;

  issues.forEach((issue) => {
    // console.log(issue);

    const labelColors = {
      bug: "bg-red-100 text-red-500 border-red-500",
      "help wanted": "bg-yellow-100 text-yellow-500 border-yellow-500",
      enhancement: "bg-green-100 text-green-500 border-green-500",
      "good first issue": "bg-purple-100 text-purple-500 border-purple-500",
      documentation: "bg-blue-100 text-blue-500 border-blue-500",
    };

    const card = document.createElement("div");
    card.className = "h-full flex flex-col";
    card.innerHTML = `
        <div onclick="loadIssueDetail(${issue.id})" class="bg-white rounded-xl p-5 border-t-4 ${issue.status === "open" ? "border-t-green-500" : "border-t-purple-500"} space-y-4">
                    <div class="flex justify-between">
                        ${
                          issue.status === "open"
                            ? '<img class="w-8" src="./assets/Open-Status.png" alt=""></img>'
                            : '<img class="w-8" src="./assets/Closed-Status.png" alt="">'
                        }
                        <p class="px-3 py-1 rounded-full font-medium border 
                            ${
                              issue.priority === "high"
                                ? "bg-red-100 border-red-400 text-red-600"
                                : issue.priority === "medium"
                                  ? "bg-yellow-100 border-yellow-400 text-yellow-600"
                                  : "bg-gray-300 border-gray-400 text-gray-700"
                            }">
                            ${issue.priority}
                         </p>
                    </div>
                    <h1 class="text-2xl font-semibold">${issue.title}</h1>
                    <p class="text-lg font-medium text-gray-400">${issue.description}</p>
                    <div class="inline-block md:flex gap-3 items-center space-y-3 md:space-y-0">
                        ${issue.labels
                          .map((label) => {
                            const lowerLabel = label.toLowerCase();
                            const colorClass =
                              labelColors[lowerLabel] ||
                              "bg-gray-100 text-gray-500 border-gray-300";
                            return `
                        <p class="${colorClass} font-medium text-sm p-1 px-2 rounded-lg border">
                             ${label}
                        </p>
                    `;
                          })
                          .join("")}
                    </div>
                    <hr class="text-gray-300">
                    <p class="text-gray-400">#${issue.id} by ${issue.author}</p>
                    <p class="text-gray-400">${new Date(issue.createdAt).toLocaleDateString()}</p>
                </div>
        `;
    allIssueContainer.append(card);

    if (issue.status === "open") {
      const openCard = card.cloneNode(true);
      openIssue.append(openCard);
    }

    if (issue.status === "closed") {
      const closedCard = card.cloneNode(true);
      closedIssue.append(closedCard);
    }
  });
  calculateCount();
  updateIssueCount(allIssueContainer);
};

const loadIssueDetail = async (id) => {
  managespinner(true);
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayIssueDetails(details.data);
  managespinner(false);
};

const displayIssueDetails = (issue) => {
  // console.log(issue);
  const detailsBox = document.getElementById("details-container");

  const labelColors = {
    bug: "bg-red-100 text-red-500 border-red-500",
    "help wanted": "bg-yellow-100 text-yellow-500 border-yellow-500",
    enhancement: "bg-green-100 text-green-500 border-green-500",
    "good first issue": "bg-purple-100 text-purple-500 border-purple-500",
    documentation: "bg-blue-100 text-blue-500 border-blue-500",
  };

  detailsBox.innerHTML = `
        <div class="bg-white rounded-xl p-5 space-y-4">
        <h1 class="text-2xl font-semibold">${issue.title}</h1>
                    <div class="flex justify-start items-center gap-2">
                        ${
                          issue.status === "open"
                            ? `<p class="font-medium text-xl text-white px-3 py-1 bg-green-600 rounded-full">${issue.status}</p>`
                            : `<p class="font-medium text-xl text-white px-3
                            py-1 bg-red-600 rounded-full">${issue.status}</p>`
                        }
                        <p class="text-gray-500">• Opened by ${issue.author}</p>
                    <p class="text-gray-500">• ${new Date(issue.createdAt).toLocaleDateString()}</p>
                    </div>

                    <div class="inline-block space-y-2 md:flex gap-3 items-center ">
                  ${issue.labels
                    .map((label) => {
                      const lowerLabel = label.toLowerCase();
                      const colorClass =
                        labelColors[lowerLabel] ||
                        "bg-gray-100 text-gray-500 border-gray-300";
                      return `
                       <p class="${colorClass} font-medium text-sm p-1 px-2 rounded-lg border">
                           ${label}
                       </p>
                   `;
                    })
                    .join("")}
                    </div>

                    <p class="text-lg font-medium text-gray-600">${issue.description}</p>

                  <div class="flex justify-between items-center bg-[#f8fafc] p-4 rounded-xl">
                  <div class="grid grid-cols-1 text-lg font-medium text-gray-500">
                  <div>Assignee:</div>
                 <div class="text-black">${issue.assignee ? issue.assignee : "john_doe"}</div>
                  </div>

                <div class="px-3 py-1 rounded-lg font-medium border 
                            ${
                              issue.priority === "high"
                                ? "bg-red-100 border-red-400 text-red-600"
                                : issue.priority === "medium"
                                  ? "bg-yellow-100 border-yellow-400 text-yellow-600"
                                  : "bg-gray-300 border-gray-400 text-gray-700"
                            }">
                            ${issue.priority}
                </div> 

                  </div>
                </div>
        `;
  document.getElementById("my_modal_5").showModal();
};

loadAllIssue();

const input = document.getElementById("input-search");
const search = document.getElementById("btn-search");

search.addEventListener("click", () => {
  const value = input.value.trim();
  searchIssues(value);
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const value = input.value.trim();
    searchIssues(value);
  }
});

const searchIssues = async (searchValue) => {
  if (!searchValue) return;

  managespinner(true);
  await Promise.resolve();

  try {
    const res = await fetch(
      `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`,
    );
    const data = await res.json();

    if (!data.data || data.data.length === 0) {
      allIssueContainer.innerHTML = `<p class="text-center text-gray-500 text-xl mt-5">No results found for "${searchValue}"</p>`;
      openIssue.innerHTML = "";
      closedIssue.innerHTML = "";
    } else {
      displayAllIssue(data.data);
    }
    allIssueContainer.classList.remove("hidden");
    openIssue.classList.add("hidden");
    closedIssue.classList.add("hidden");
    updateIssueCount(allIssueContainer);
  } catch (err) {
    console.error("Search failed:", err);
    allIssueContainer.innerHTML = `<p class="text-center text-red-500 text-xl mt-5">Search failed. Try again!</p>`;
    openIssue.innerHTML = "";
    closedIssue.innerHTML = "";
  } finally {
    managespinner(false);
  }
};
