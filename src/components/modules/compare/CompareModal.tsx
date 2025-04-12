"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { EligiblityData } from "../eligiblity/eligiblityTypes";

type CompareModalProps = {
    isOpen: boolean;
    onClose: () => void;
    compareData: {
        ids: number[];
        dynamicData: EligiblityData[]
    };
};

export default function CompareModal({ isOpen, onClose, compareData }: CompareModalProps) {
    if (!isOpen) return null;

    // Define which fields you want to show as rows
    const fields = [
        { label: "Loan Amount (BDT)", key:  "amount"},
        { label: "Interest Rate %", key: "interestRate" },
        { label: "Period (Months)", key: "periodMonths" },
        { label: "Monthly EMI (BDT)", key: "monthlyEMI" },
        { label: "Processing Fees %", key: "processingFee" },
        { label: "Total Payment (BDT)", key: "totalRepayment" },
    ];

    console.log(compareData.dynamicData)


    const handelApplication = (bankData: any) => {
        console.log(bankData)

    }



    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50
                 transition-opacity duration-300"
        >
            <div
                className="bg-white rounded shadow-lg max-w-3xl w-full p-6 relative
                   transform transition-transform duration-300 scale-100"
            >
                {/* Close button (top-right corner) */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-3xl leading-none focus:outline-none"
                >
                    &times;
                </button>

                {/* Header */}
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Compare</h2>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border border-gray-200 text-sm">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="p-3 border border-gray-200 text-left font-semibold">
                                    Details / Bank Name
                                </th>
                                {compareData.dynamicData.map((bank, idx) => (
                                    <th key={idx} className="p-3 border border-gray-200 text-center font-semibold">
                                        {bank.bankName}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {fields.map((field) => (
                                <tr key={field.key}>
                                    <td className="p-3 border border-gray-200 font-medium">
                                        {field.label}
                                    </td>
                                    {compareData.dynamicData.map((bank, index) => (
                                        <td
                                            key={index}
                                            className="p-3 border border-gray-200 text-center"
                                        >
                                            {String(bank[field.key as keyof typeof bank])}
                                        </td>
                                    ))}
                                </tr>
                            ))}

                            {/* "Apply" button row */}
                            <tr>
                                <td className="p-3 border border-gray-200 font-medium">Action</td>
                                {compareData.dynamicData.map((bank, idx) => (
                                    <td key={idx} className="p-3 border border-gray-200 text-center">
                                        <Button onClick={() => handelApplication(bank)} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                                            Apply
                                        </Button>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="mt-6 flex justify-end">
                    <Button
                        onClick={onClose}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded"
                    >
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
}
