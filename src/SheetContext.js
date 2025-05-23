import React, { createContext, useState, useEffect } from "react";
import Papa from "papaparse";

export const SheetContext = createContext();

export const SheetProvider = ({ children }) => {
    const [data, setData] = useState([]);

    // ✅ Định nghĩa hàm chuyển đổi link ảnh **trước khi sử dụng**
    const convertGoogleDriveLink = (driveLink) => {
        const match = driveLink?.match(/\/d\/([^/]+)/);
        return match ? `https://lh3.googleusercontent.com/d/${match[1]}` : driveLink;
    };

    useEffect(() => {
        const sheetURL = `https://docs.google.com/spreadsheets/d/1bGMDPj3fKjp6Ol_VL0y_Gq6zrOQdbQEXiehqRy6G40I/gviz/tq?tqx=out:csv&nocache=${new Date().getTime()}`;

        fetch(sheetURL)
            .then((response) => response.text())
            .then((csvText) => {
                Papa.parse(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (result) => {
                        const transformedData = result.data.map((row) => ({
                            ...row,
                            Image1: convertGoogleDriveLink(row.Image1),
                            Image2: convertGoogleDriveLink(row.Image2),
                            Image3: convertGoogleDriveLink(row.Image3),
                            Image4: convertGoogleDriveLink(row.Image4),
                            Image_bia: convertGoogleDriveLink(row.Image_bia),
                        }));
                        setData(transformedData);
                    },
                });
            })
            .catch((error) => console.error("Error fetching CSV:", error));
    }, []);

    return (
        <SheetContext.Provider value={{ data }}>
            {children}
        </SheetContext.Provider>
    );
};
