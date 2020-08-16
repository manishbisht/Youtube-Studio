import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import HomePage from "./pages/Home";
import Header from "./components/Header";
import ActivityLog from "./components/ActivityLog";
import Room from "./pages/Room";

const engine = new Styletron();

function App() {
    return (
        <StyletronProvider value={engine}>
            <BaseProvider theme={LightTheme}>
                <Router>
                    <Header />
                    <Switch>
                        <Route exact path="/:roomId">
                            <Room />
                        </Route>
                        <Route exact path="/">
                            <HomePage />
                        </Route>
                    </Switch>
                </Router>
            </BaseProvider>
        </StyletronProvider>
    );
}

export default App;
