import { useEffect, useState } from "react";

export const Receiver = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080");

    newSocket.onopen = () => {
      newSocket.send(JSON.stringify({ type: "receiver" }));
    };

    newSocket.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "createOffer") {
        const pc = new RTCPeerConnection();
        await pc.setRemoteDescription(new RTCSessionDescription(message.sdp));

        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        newSocket.send(JSON.stringify({ type: "createAnswer", sdp: pc.localDescription }));
      }
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return <div>Receiver</div>;
};
