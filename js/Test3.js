//import { Innertube } from "./youtubei.js";

window.onload = function() {
  alert("Test3.js");
  main();
}

async function main() {
  try {
    const client = await Innertube.create();
    console.log("Client created:", client);

    const videoInfo = await client.getInfo("CUvbAydBCNk");
    console.log("Video info retrieved:", videoInfo);

    const livechat = videoInfo.getLiveChat();
    console.log("Live chat initialized:", livechat);

    livechat.on("start", (initialData) => {
      console.log("Live chat started:", initialData);
    });

    livechat.on("chat-update", (message) => {
      console.log("Chat update:", message);
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }
}