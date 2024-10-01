import { Innertube } from "./youtubei.js";

const client = await Innertube.create();

const videoInfo = await client.getInfo("CUvbAydBCNk");

const livechat = videoInfo.getLiveChat();

livechat.on("start", (initialData) => {
  console.log(initialData);
});

livechat.on("chat-update", (message) => {
  console.log(message);
});