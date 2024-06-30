browser.runtime.onMessage.addListener(function(message) {
    if (message.action === 'search') {
      browser.tabs.create({ url: `https://www.google.com/search?q=${encodeURIComponent(message.text)}` });
    }
  });
  