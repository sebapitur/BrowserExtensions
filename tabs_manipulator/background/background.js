let lastUsedTabs = [];

chrome.commands.onCommand.addListener(function(command) {
  switch (command) {
    case "close_other_tabs":
      closeOtherTabs();
      break;
    case "close_right_tabs":
      closeRightTabs();
      break;
    case "duplicate_tab":
      duplicateTab();
      break;
    case "toggle_last_used_tab":
      toggleLastUsedTab();
      break;
  }
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
  updateLastUsedTabs(activeInfo.tabId);
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
  lastUsedTabs = lastUsedTabs.filter(id => id !== tabId);
});

function updateLastUsedTabs(currentTabId) {
  if (lastUsedTabs.length === 0 || lastUsedTabs[0] !== currentTabId) {
    lastUsedTabs = [currentTabId].concat(lastUsedTabs.filter(id => id !== currentTabId)).slice(0, 2);
  }
}

function toggleLastUsedTab() {
  if (lastUsedTabs.length < 2) {
    return;
  }
  chrome.tabs.get(lastUsedTabs[1], function(tab) {
    chrome.tabs.update(tab.id, { active: true });
  });
}


function closeOtherTabs() {
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
    const activeTab = tabs[0];
    chrome.tabs.query({currentWindow: true}, function(allTabs) {
      for (let tab of allTabs) {
        if (tab.id !== activeTab.id) {
          chrome.tabs.remove(tab.id);
        }
      }
    });
  });
}

function closeRightTabs() {
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
    const activeTab = tabs[0];
    chrome.tabs.query({currentWindow: true}, function(allTabs) {
      let close = false;
      for (let tab of allTabs) {
        if (close) {
          chrome.tabs.remove(tab.id);
        }
        if (tab.id === activeTab.id) {
          close = true;
        }
      }
    });
  });
}

function duplicateTab() {
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
    const activeTab = tabs[0];
    chrome.tabs.duplicate(activeTab.id);
  });
}
