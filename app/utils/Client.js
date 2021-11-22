import { io } from "socket.io-client";
import { BASEURL } from "./constant";
export const socket = io(BASEURL, {
  transports: ["websocket"], // forces websocket only
});

socket.on("connect", () => {
  console.log(`Socket Connected`);
});

socket.on("disconnect", () => {
  console.log(`Socket disConnected`);
});
socket.io.on("error", (error) => {
  console.log(`Socket Error`, error);
});

