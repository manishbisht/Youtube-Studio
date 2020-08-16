import React, { useState, useRef, useEffect } from "react";
import { H6 } from "baseui/typography";
import { colors } from "baseui/tokens";
import useMessageHandler from "../../hooks/useMessageHandler";

const ActivityLog = () => {
    const activityLogEndRef = useRef(null);
    const [activityLog, setActivityLog] = useState([]);

    const scrollToBottom = () => {
        activityLogEndRef.current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [activityLog]);

    const addActivityLog = (data) => {
        setActivityLog([...activityLog, data]);
    };

    useMessageHandler("activityLog", addActivityLog);

    const renderActivityLog = () =>
        activityLog.map((activity, index) => (
            <H6 key={index} margin="scale500">
                {activity}
            </H6>
        ));

    return (
        <div
            style={{
                background: colors.platinum100,
                width: 300,
                textAlign: "center",
                height: "calc(100vh - 82px)",
                overflow: "scroll",
            }}
        >
            {renderActivityLog()}
            <div ref={activityLogEndRef} />
        </div>
    );
};

export default ActivityLog;
