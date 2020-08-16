import React, { Fragment, useEffect, useState } from "react";
import Video from "../Video";
import { colors } from "baseui/tokens/index";

const VideoGallery = ({ socket }) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        if (socket) {
            socket.on("allVideos", (data) => setVideos(data));
        }
    }, [socket]);

    const renderVideos = () => {
        return (
            <Fragment>
                <div
                    style={{
                        height: "calc((100vh - 81px) / 4)",
                        display: "flex",
                        gap: 10,
                        justifyContent: "center",
                    }}
                >
                    {videos[1] ? (
                        <Video socket={socket} video={videos[1]} />
                    ) : null}
                </div>
                <div
                    style={{
                        height: "calc((100vh - 81px) / 2)",
                        display: "flex",
                    }}
                >
                    <div
                        style={{
                            width: "calc((100%) / 4)",
                            display: "flex",
                            gap: 10,
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                    >
                        {videos[7] ? (
                            <Video socket={socket} video={videos[7]} />
                        ) : null}
                        {videos[6] ? (
                            <Video socket={socket} video={videos[6]} />
                        ) : null}
                    </div>
                    <div
                        style={{
                            width: "calc((100%) / 2)",
                            display: "flex",
                            gap: 10,
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {videos[0] ? (
                            <Video
                                socket={socket}
                                video={videos[0]}
                                isMainVideo
                            />
                        ) : null}
                    </div>
                    <div
                        style={{
                            width: "calc((100%) / 4)",
                            display: "flex",
                            gap: 10,
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                    >
                        {videos[2] ? (
                            <Video socket={socket} video={videos[2]} />
                        ) : null}
                        {videos[3] ? (
                            <Video socket={socket} video={videos[3]} />
                        ) : null}
                    </div>
                </div>
                <div
                    style={{
                        height: "calc((100vh - 81px) / 4)",
                        display: "flex",
                        gap: 10,
                        justifyContent: "center",
                    }}
                >
                    {videos[5] ? (
                        <Video socket={socket} video={videos[5]} />
                    ) : null}
                    {videos[4] ? (
                        <Video socket={socket} video={videos[4]} />
                    ) : null}
                </div>
            </Fragment>
        );
    };

    return (
        <div
            style={{
                height: "calc(100vh - 81px)",
                margin: "0 10px 10px",
                position: "relative",
            }}
        >
            {renderVideos()}
            <div
                style={{
                    position: "absolute",
                    right: 20,
                    bottom: 20,
                    padding: 10,
                    background: colors.red500,
                    color: colors.gray50,
                    cursor: "pointer",
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    socket.emit("ShuffleVideos");
                }}
            >
                Randomize
            </div>
        </div>
    );
};

export default VideoGallery;
