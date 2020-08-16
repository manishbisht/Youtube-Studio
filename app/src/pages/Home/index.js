import React from "react";
import { useHistory } from "react-router-dom";
import { Input } from "baseui/input";
import { Button } from "baseui/button";

const HomePage = () => {
    const history = useHistory();
    const [userName, setUserName] = React.useState("");
    const [roomId, setRoomId] = React.useState("");

    return (
        <div
            style={{
                height: "calc(100vh - 82px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div style={{ width: 300, textAlign: "center" }}>
                <Input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter Your Name"
                    clearOnEscape
                />
                <div style={{ marginTop: 20 }}>
                    <Input
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        placeholder="Enter Room ID"
                        clearOnEscape
                    />
                </div>
                <div style={{ marginTop: 20 }}>
                    <Button
                        onClick={() => history.push(`/${roomId}`, { userName })}
                        disabled={!userName || !roomId}
                    >
                        Join Room
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
