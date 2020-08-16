import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import HomePage from "./pages/Home";

const engine = new Styletron();

function App() {
    return (
        <StyletronProvider value={engine}>
            <BaseProvider theme={LightTheme}>
                <Router>
                    <Switch>
                        <Route exact path="/:roomId">
                            <HomePage />
                        </Route>
                    </Switch>
                </Router>
            </BaseProvider>
        </StyletronProvider>
    );
}

export default App;
