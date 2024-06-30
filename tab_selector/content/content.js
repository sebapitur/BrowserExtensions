document.addEventListener("keydown", function (event) {
  if (event.altKey) {
    switch (event.key) {
      case "1":
        chrome.runtime.sendMessage({ action: "selectTab", index: 0 });
        break;
      case "2":
        chrome.runtime.sendMessage({ action: "selectTab", index: 1 });
        break;
      case "3":
        chrome.runtime.sendMessage({ action: "selectTab", index: 2 });
        break;
      case "4":
        chrome.runtime.sendMessage({ action: "selectTab", index: 3 });
        break;
      case "5":
        chrome.runtime.sendMessage({ action: "selectTab", index: 4 });
        break;
      case "6":
        chrome.runtime.sendMessage({ action: "selectTab", index: 5 });
        break;
      case "7":
        chrome.runtime.sendMessage({ action: "selectTab", index: 6 });
        break;
      case "8":
        chrome.runtime.sendMessage({ action: "selectTab", index: 7 });
        break;
      case "9":
        chrome.runtime.sendMessage({ action: "selectTab", index: 8 });
        break;
    }
  }
});
