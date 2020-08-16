import React from "react";
import YouTube from "react-youtube";
import { colors } from "baseui/tokens/index";
import { Delete } from "baseui/icon/index";

import "./style.css";

const getVideoIDFromYouTubeURL = (youTubeURL) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = youTubeURL.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
};

const Video = ({ video, isMainVideo, socket }) => {
    const { videoId, videoURL, playerVars } = video;

    return (
        <div
            key={videoId}
            style={
                isMainVideo
                    ? {
                          height: "100%",
                          width: "calc(100% - 20px)",
                          padding: 10,
                          position: "relative",
                          resize: "both",
                          overflow: "auto",
                          zIndex: 1,
                      }
                    : { position: "relative" }
            }
            onClick={(e) => e.stopPropagation()}
        >
            <YouTube
                containerClassName="youtube-container"
                videoId={getVideoIDFromYouTubeURL(videoURL)}
                opts={{
                    height: "100%",
                    width: "100%",
                    playerVars,
                }}
                onPlay={() => socket.emit("playVideo", videoId)}
                onPause={() => socket.emit("pauseVideo", videoId)}
            />
            <div
                style={
                    isMainVideo
                        ? {
                              position: "absolute",
                              right: 10,
                              top: 10,
                              background: colors.gray50,
                              cursor: "pointer",
                          }
                        : {
                              position: "absolute",
                              right: 0,
                              top: 0,
                              background: colors.gray50,
                              cursor: "pointer",
                          }
                }
                onClick={() => socket.emit("RemoveVideo", videoId)}
            >
                <Delete size={32} />
            </div>
        </div>
    );
};

export default Video;
