import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LembreteSistema from "./Sistema/LembreteSistema";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route exact path="/" element={<LembreteSistema />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
