const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const { v4: uuidv4 } = require("uuid");

const port = process.env.PORT || 3003;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

const roomsData = {};

// handle incoming connections from clients
io.sockets.on("connection", function (socket) {
    // once a client has connected, we expect to get a ping from them saying what room they want to join
    socket.on("room", function (room) {
        const userName = socket.handshake.query.userName;
        if (roomsData[room]) {
            roomsData[room].activePersons.push(userName);
        } else {
            roomsData[room] = {
                activePersons: [userName],
                videos: [],
            };
        }
        socket.join(room);
        io.sockets
            .in(room)
            .emit("activityLog", `${userName} has joined`)
            .emit("activeUsers", roomsData[room].activePersons)
            .emit("allVideos", roomsData[room].videos);
    });

    socket.on("disconnecting", () => {
        const userName = socket.handshake.query.userName;
        const rooms = Object.keys(socket.rooms);
        const index = roomsData[rooms[0]].activePersons.indexOf(userName);
        if (index > -1) {
            roomsData[rooms[0]].activePersons.splice(index, 1);
        }
        io.sockets.in(rooms[0]).emit("activityLog", `${userName} left`);
    });

    socket.on("AddVideo", (data) => {
        const roomId = socket.handshake.query.roomId;
        const userName = socket.handshake.query.userName;
        const videoId = uuidv4();
        const newVideo = {
            videoId,
            videoURL: data,
            playerVars: {
                autoplay: 1,
                loop: 1,
                mute: 1,
            },
        };
        if (roomsData[roomId]["videos"].length === 8) {
            roomsData[roomId]["videos"].shift();
        }
        roomsData[roomId]["videos"].push(newVideo);
        io.sockets
            .in(roomId)
            .emit("activityLog", `${userName} added a new video`)
            .emit("allVideos", roomsData[roomId]["videos"]);
    });

    socket.on("RemoveVideo", (data) => {
        const roomId = socket.handshake.query.roomId;
        const userName = socket.handshake.query.userName;
        roomsData[roomId]["videos"] = roomsData[roomId]["videos"].filter(
            (video) => video.videoId !== data
        );
        io.sockets
            .in(roomId)
            .emit("activityLog", `${userName} removed the video`)
            .emit("allVideos", roomsData[roomId]["videos"]);
    });

    socket.on("ShuffleVideos", (data) => {
        const roomId = socket.handshake.query.roomId;
        const userName = socket.handshake.query.userName;
        for (let i = roomsData[roomId]["videos"].length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [roomsData[roomId]["videos"][i], roomsData[roomId]["videos"][j]] = [
                roomsData[roomId]["videos"][j],
                roomsData[roomId]["videos"][i],
            ];
        }
        io.sockets
            .in(roomId)
            .emit("activityLog", `${userName} shuffled the videos`)
            .emit("allVideos", roomsData[roomId]["videos"]);
    });

    socket.on("playVideo", (data) => {
        const roomId = socket.handshake.query.roomId;
        const userName = socket.handshake.query.userName;
        roomsData[roomId]["videos"] = roomsData[roomId]["videos"].map(
            (video) => {
                if (video.videoId === data) {
                    video["playerVars"]["autoplay"] = 1;
                }
                return video;
            }
        );
        io.sockets
            .in(roomId)
            .emit("activityLog", `${userName} played the ${data} video`);
    });

    socket.on("pauseVideo", (data) => {
        const roomId = socket.handshake.query.roomId;
        const userName = socket.handshake.query.userName;
        roomsData[roomId]["videos"] = roomsData[roomId]["videos"].map(
            (video) => {
                if (video.videoId === data) {
                    video["playerVars"]["autoplay"] = 0;
                }
                return video;
            }
        );
        io.sockets
            .in(roomId)
            .emit("activityLog", `${userName} paused the ${data} video`);
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
