import React from "react";
import { ConfigProvider } from "antd";
import "./App.css";
import AppLayout from "./components/Layout";
import {SheetProvider} from "./SheetContext";



const App = () => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#008ad9",
                },
            }}
        >
            {/* Bọc AppLayout bằng SheetProvider */}
            <SheetProvider>
                <AppLayout key={new Date().getTime()} />

            </SheetProvider>
        </ConfigProvider>
    );
};

export default App;
