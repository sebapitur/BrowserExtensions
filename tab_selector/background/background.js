function selectTabByIndex(index) {
  chrome.tabs.query({}, function (tabs) {
    if (index >= 0 && index < tabs.length) {
      chrome.tabs.update(tabs[index].id, { active: true });
    } else {
      console.error("Tab index out of range");
    }
  });
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "selectTab") {
    selectTabByIndex(message.index);
  }
});

chrome.commands.onCommand.addListener(function (command) {
  switch (command) {
    case "select_tab_1":
      selectTabByIndex(0);
      break;
    case "select_tab_2":
      selectTabByIndex(1);
      break;
    case "select_tab_3":
      selectTabByIndex(2);
      break;
    case "select_tab_4":
      selectTabByIndex(3);
      break;
  }
});
