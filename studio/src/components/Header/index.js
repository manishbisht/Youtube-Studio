import React, { useEffect, useState } from "react";
import { Avatar } from "baseui/avatar";

const Header = ({ socket }) => {
    const [activeUsers, setActiveUsers] = useState([]);

    useEffect(() => {
        if (socket) {
            socket.on("activeUsers", (data) => setActiveUsers(data));
        }
    }, [socket]);

    const renderActiveUsers = () =>
        activeUsers.map((user, index) => (
            <div key={index} style={{ paddingRight: 10 }}>
                <Avatar
                    name={user}
                    size="scale1200"
                    src={`https://picsum.photos/seed/${Math.random()}/285/285.webp`}
                />
            </div>
        ));

    return (
        <div style={{ display: "flex", margin: 10 }}>{renderActiveUsers()}</div>
    );
};

export default Header;
