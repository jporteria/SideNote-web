// Setting up the side panel behavior
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error("Side panel error:", error));

// Open new tab for authentication
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "openTab") {
    chrome.tabs.create({ url: "http://localhost:5173/#/auth" }); // Update this URL if needed
  }
});



// Listener for API-related messages
// chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
//   if (message.type === "API_REQUEST") {
//     try {
//       // Replace with the actual endpoint
//       const response = await fetch(
//         `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAepMX0OANiAVjAIgsM9MyRnHo_NSjodNE`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${message.token}`,
//           },
//           body: JSON.stringify(message.body),
//         }
//       );

//       const data = await response.json();
//       sendResponse({ success: true, data });
//     } catch (error) {
//       console.error("API request error:", error);
//       sendResponse({ success: false, error: error.message });
//     }
//   }

//   // Ensure asynchronous sendResponse works
//   return true;
// });
