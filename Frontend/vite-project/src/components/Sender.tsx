import { useEffect, useState } from "react";

export const Sender = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [pc, setPc] = useState<RTCPeerConnection | null>(null);

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080");

    newSocket.onopen = () => {
      newSocket.send(JSON.stringify({ type: "sender" }));
    };

    setSocket(newSocket);


  }, []);

  async function startSendingVideo() {
    if (!socket) {
      console.error("WebSocket is not connected.");
      return;
    }

    const newPc = new RTCPeerConnection();
    setPc(newPc);

    const offer = await newPc.createOffer();
    await newPc.setLocalDescription(offer);

    socket.send(JSON.stringify({ type: "createOffer", sdp: newPc.localDescription }));

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "createAnswer") {
        newPc.setRemoteDescription(new RTCSessionDescription(data.sdp));
      }
    };
  }

  return <button onClick={startSendingVideo}>Sender</button>;
};
