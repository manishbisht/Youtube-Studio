import { useEffect } from "react";

const useMessageHandler = (messageType, handleMessage) => {
    const handleEvent = (event) => {
        const { data } = event;
        const { type, message } = data;
        if (type === messageType) {
            handleMessage(message);
        }
    };

    useEffect(() => {
        window.addEventListener("message", handleEvent, false);

        return () => {
            window.removeEventListener("message", handleEvent);
        };
    });
};

export default useMessageHandler;
