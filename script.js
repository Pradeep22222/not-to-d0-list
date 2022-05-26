let entryList = [];
let badList = [];
let weekHours = 7 * 24;
// get the data on form submit
const handleOnSubmit = (e) => {
  const formDt = new FormData(e);
  const task = formDt.get("task");
  const hr = +formDt.get("hr");
  const obj = { task, hr };
  //are we allowed to add new entryList
  const ttlHrs = getTotalHours();
  if (ttlHrs + hr > weekHours) {
    return alert("You have exceeded weekly hours, cannot add this task");
  }
  entryList.push(obj);
  display(entryList);
  getTotalHours();
};
//display list on the dom when pushed from the form
const display = (taskArg) => {
  let str = "";
  taskArg.map((item, i) => {
    str += `<tr>
          <td>${item.task}</td>
          <td>${item.hr}</td>
          <td class="text-end">
            <button 
            onclick="handleOnDeleteEntryList(${i})"
            class="btn btn-danger"
            >
              <i class="fa-solid fa-trash-can btn btn-danger"></i>
            </button>
            <button class="btn btn-success"
            onclick="switchToBadList(${i})">
              <i class="fa-solid fa-arrow-right "></i>
            </button>
          </td>
        </tr>`;
  });
  document.getElementById("entryList").innerHTML = str;
};

// delete item from entry list
const handleOnDeleteEntryList = (i) => {
  if (!confirm("Are you sure you want to delete this entry")) return;
  const filteredArg = entryList.filter((item, index) => index != i);
  entryList = filteredArg;
  display(entryList);
  getTotalHours();
};
// display bad list on the dom when item are pushed from task list to bad list
const badListDisplay = (arg) => {
  let str = "";
  arg.map((item, i) => {
    str += ` <tr>
                  <td>${item.task}</td>
                  <td>${item.hr}</td>
                  <td class="text-end">
                    <button class="btn btn-warning"
                    onclick="switchToEntryList(${i})">
                      <i class="fa-solid fa-arrow-left btn-success"></i>
                    </button>
                    <button class="btn btn-danger"
                    onclick="handleOnDeleteBadList(${i})"
                    >
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>`;
  });
  document.getElementById("badList").innerHTML = str;
};

//switch data from entry list to the bad
const switchToBadList = (i) => {
  const itemToBeSwitched = entryList.splice(i, 1);
  badList.push(itemToBeSwitched[0]);
  display(entryList);
  badListDisplay(badList);
  badTotalHours();
};

//switch data from bad list to entry List
const switchToEntryList = (i) => {
  const itemToBeSwitched = badList.splice(i, 1);
  entryList.push(itemToBeSwitched[0]);
  display(entryList);
  badListDisplay(badList);
  badTotalHours();
};
// delete item from bad  list
const handleOnDeleteBadList = (i) => {
  if (!confirm("Are you sure you want to delete this entry")) return;
  const filteredArg = badList.filter((item, index) => index != i); // index !=i helps to return every elelment of badlist because it returns the item of the array every time the condition is true, since  we want to get rid of i i.e element clicked on delete, we put the conditin to make it false when the element is accessed in the iteration of filter method of that array.
  badList = filteredArg;
  badListDisplay(badList);
  badTotalHours();
  getTotalHours();
};
const getTotalHours = () => {
  const ttlEntryList = entryList.reduce((acc, item) => acc + item.hr, 0);
  const ttlBadList = badList.reduce((acc, item) => acc + item.hr, 0);
  const total = ttlEntryList + ttlBadList;
  document.getElementById("totalHours").innerText = total;
  return ttlEntryList + ttlBadList;
};

//total hours on bad list
const badTotalHours = () => {
  const ttlBadList = badList.reduce((acc, item) => acc + item.hr, 0);
  document.getElementById("badTtlHr").innerText = ttlBadList;
};
