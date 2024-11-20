// Setting up the side panel behavior
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error("Side panel error:", error));

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === "OPEN_GOOGLE_SIGN_IN_TAB") {
//     chrome.tabs.create({ url: "http://localhost:5173/#/google-signin" }, (tab) => {
//       console.log("New tab opened for Google sign-in:", tab);
//     });
//     sendResponse({ status: "New tab opened" });
//     return true;
//   }
// });
