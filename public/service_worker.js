// Setting up the side panel behavior
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error("Side panel error:", error));

// Listener for API-related messages
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === "API_REQUEST") {
    try {
      // Make a direct fetch request to the desired Google API
      const response = await fetch(
        `https://your-google-api-endpoint?key=YOUR_API_KEY`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${message.token}`
          },
          body: JSON.stringify(message.body)
        }
      );

      const data = await response.json();
      sendResponse({ success: true, data });
    } catch (error) {
      console.error("API request error:", error);
      sendResponse({ success: false, error: error.message });
    }
  }
  return true;
});
