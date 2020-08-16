import React, { useEffect } from "react";
import { useLocation, useHistory, useParams } from "react-router-dom";
import ActivityLog from "../../components/ActivityLog";

const Room = () => {
    const { roomId } = useParams();
    const location = useLocation();
    const history = useHistory();
    const { userName } = location.state || {};

    useEffect(() => {
        if (!userName) {
            history.replace("/");
        }
    }, []);

    return (
        <div
            style={{
                display: "flex",
                height: "calc(100vh - 82px)",
            }}
        >
            <ActivityLog />
            <div style={{ flexGrow: 1 }}>
                <iframe
                    style={{
                        border: 0,
                        width: "100%",
                        height: "100%",
                    }}
                    src={`http://localhost:3001/${roomId}?userName=${encodeURIComponent(
                        userName
                    )}`}
                ></iframe>
            </div>
        </div>
    );
};

export default Room;
