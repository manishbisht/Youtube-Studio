import React from "react";
import { Button, KIND } from "baseui/button";
import { colors } from "baseui/tokens";
import { useHistory, useLocation } from "react-router-dom";

const Header = () => {
    const history = useHistory();
    const location = useLocation();

    return (
        <header
            style={{
                background: colors.gray700,
                color: colors.white,
                display: "flex",
                alignItems: "center",
                padding: 17,
            }}
        >
            <div style={{ flexGrow: 1 }}>
                <h1 style={{ margin: 0, padding: 0 }}>Youtube Studio</h1>
            </div>
            {location.pathname !== "/" ? (
                <div>
                    <Button
                        kind={KIND.secondary}
                        onClick={() => history.replace("/")}
                    >
                        Leave Room
                    </Button>
                </div>
            ) : null}
        </header>
    );
};

export default Header;
