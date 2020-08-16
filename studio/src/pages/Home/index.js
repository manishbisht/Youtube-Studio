import React, { useEffect, useState } from "react";
import qs from "query-string";
import { useLocation, useParams } from "react-router-dom";
import socketIOClient from "socket.io-client";
import Header from "../../components/Header";
import AddVideoModal from "../../components/AddVideoModal";
import VideoGallery from "../../components/VideoGallery";
const ENDPOINT = "http://127.0.0.1:3003";

const HomePage = () => {
    const location = useLocation();
    const { roomId } = useParams();
    const [socket, setSocket] = useState(null);
    const [addVideoModal, setAddVideoModal] = useState(false);
    const { userName } = qs.parse(location.search);

    useEffect(() => {
        const socket = socketIOClient(
            `${ENDPOINT}?roomId=${roomId}&userName=${userName}`
        );
        setSocket(socket);
        socket.on("connect", () => {
            // Connected, let's sign-up for to receive messages for this room
            socket.emit("room", roomId);
        });
        socket.on("activityLog", (data) => {
            console.log("Incoming message:", data);
            window.parent.postMessage(
                {
                    type: "activityLog",
                    message: data,
                },
                "http://localhost:3000/"
            );
        });

        // CLEAN UP THE EFFECT
        return () => {
            if (socket) {
                socket.disconnect();
                setSocket(null);
            }
        };
        //
    }, []);

    // onClick={() => socket.emit("Click", "world")}

    const handleAddVideoButtonClick = (data) => {
        setAddVideoModal(false);
        socket.emit("AddVideo", data);
    };

    return (
        <div
            style={{ height: "calc(100vh - 10px)" }}
            onClick={() => setAddVideoModal(true)}
        >
            <Header socket={socket} />
            <AddVideoModal
                addVideoModal={addVideoModal}
                setAddVideoModal={setAddVideoModal}
                handleAddVideoButtonClick={handleAddVideoButtonClick}
            />
            <VideoGallery socket={socket} />
        </div>
    );
};

export default HomePage;
