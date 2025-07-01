import express from "express";
import path from "path";
import fs from "fs";
import XLSX from "xlsx";
import {
    fileURLToPath
} from "url";
import wrapAsync from "../utils/wrapAsync.js";


const router = express.Router();
const _filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(_filename);



router.post("/", wrapAsync((req, res) => {
    let inquiryData = {
        ...req.body
    };
    const filePath = path.join(_dirname, "../inquiries.xlsx");
    let workbook;
    if (fs.existsSync(filePath)) {
        workbook = XLSX.readFile(filePath);
    } else {
        workbook = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet([]);
        XLSX.utils.book_append_sheet(workbook, ws, "Inquiries");
    }
    const worksheet = workbook.Sheets["Inquiries"];
    const existingData = XLSX.utils.sheet_to_json(worksheet);
    const SerialNo = existingData.length + 1;
    inquiryData = {
        SerialNo,
        ...req.body,
        date: new Date().toISOString()
    };
    existingData.push(inquiryData);
    const newWorksheet = XLSX.utils.json_to_sheet(existingData);
    workbook.Sheets["Inquiries"] = newWorksheet;
    XLSX.writeFile(workbook, filePath);
    return res.status(200).json({
        success: true,
        message: "From Submitted Sucessfully"
    });
}));
export default router;