"use client";
import React, { useEffect, useState, FC } from "react";
import Login from "../Login";
import { TicketDetails } from "@/ts/types";


type Props = {
    isLoggedIn: boolean;
    onChange: (totalTickets: number, details: TicketDetails, totalPrice:number) => void;
};

const TicketSelector: FC<Props> = ({ isLoggedIn = false, onChange }) => {
    const [ordinary, setOrdinary] = useState(2);
    const [child, setChild] = useState(0);
    const [retired, setRetired] = useState(0);
    const [student, setStudent] = useState(0);
    const [member, setMember] = useState(0);
    const [showWarning, setShowWarning] = useState(false);

    const prices = {
        ordinary: 140,
        child: 140 * 0.80, // 20% discount
        retired: 140 * 0.80, // 20% discount
        student: 140 * 0.85, // 15% discount
        member: 140 * 0.75 // 25% discount
    }

    const totalPrice =
        ordinary * prices.ordinary +
        child * prices.child +
        retired * prices.retired +
        student * prices.student +
        member * prices.member;

    const total = ordinary + child + retired + student + member;

    useEffect(() => {
        if (onChange) {
            onChange(total, {
                ordinary,
                child,
                retired,
                student,
                member
            }, totalPrice);
        }
    }, [ordinary, child, retired, student, member, total, totalPrice, onChange]);

    useEffect(() => {
        if (isLoggedIn) {
            setOrdinary(0);
            setChild(0);
            setRetired(0);
            setStudent(0);
        }
    }, [isLoggedIn]);

    return (
        <div className="m-auto p-4 md:p-8 pb-6 space-y-6 bg-gray-900 border-4 border-yellow-400 shadow-[inset_0_0_10px_#facc15,0_0_20px_#facc15] max-w-[720px]">
            <h2 className="sr-only">Välj biljettyper och antal</h2>
            {!isLoggedIn && (
                <>
                    <div className="bg-gray-800 p-3 rounded">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="text-center sm:text-left">
                                <span id="label-ordinary" className="text-lg">Ordinarie</span>
                            </div>
                            <div className="flex justify-center sm:justify-start items-center gap-2">
                                <button
                                    aria-label="Minska antal ordinarie biljetter"
                                    onClick={() => setOrdinary(Math.max(ordinary - 1, 0))} className="bg-gray-600 px-2 rounded hover:border-white border border-transparent">−</button>
                                <span>{ordinary}</span>
                                <button
                                    aria-label="Öka antal ordinarie biljetter"
                                    onClick={() => setOrdinary(ordinary + 1)} className="bg-yellow-400 text-black px-2 rounded hover:border-white hover:bg-yellow-300 border border-transparent">+</button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-800 p-3 rounded">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                            <div className="text-center sm:text-left">
                                <span id="label-child" className="text-lg block">Barn</span>
                                <span className="block text-gray-400 text-sm">(20% rabatt för barn under 11 år)</span>
                            </div>
                            <div className="flex justify-center sm:justify-start items-center gap-2">
                                <button
                                    aria-label="Minska antal barnbiljetter"
                                    onClick={() => setChild(Math.max(child - 1, 0))} className="bg-gray-600 px-2 rounded border border-transparent hover:border-white">−</button>
                                <span>{child}</span>
                                <button
                                    aria-label="Öka antal barnbiljetter"
                                    onClick={() => setChild(child + 1)} className="bg-yellow-400 text-black px-2 rounded border border-transparent hover:border-white hover:bg-yellow-300">+</button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-800 p-3 rounded">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                            <div className="text-center sm:text-left">
                                <span id="label-retired" className="text-lg block">Pensionär</span>
                                <span className="block text-gray-400 text-sm">(20% rabatt)</span>
                            </div>
                            <div className="flex justify-center sm:justify-start items-center gap-2">
                                <button
                                    aria-label="Minska antal pensionärbiljetter"
                                    onClick={() => setRetired(Math.max(retired - 1, 0))} className="bg-gray-600 px-2 rounded border border-transparent hover:border-white">−</button>
                                <span>{retired}</span>
                                <button
                                    aria-label="Öka antal pensionärbiljetter"
                                    onClick={() => setRetired(retired + 1)} className="bg-yellow-400 text-black px-2 rounded border border-transparent hover:border-white hover:bg-yellow-300">+</button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-800 p-3 rounded">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                            <div className="text-center sm:text-left">
                                <span id="label-student" className="text-lg block">Student</span>
                                <span className="block text-gray-400 text-sm">(15% rabatt)</span>
                            </div>
                            <div className="flex justify-center sm:justify-start items-center gap-2">
                                <button
                                    aria-label="Minska antal studentbiljetter"
                                    onClick={() => setStudent(Math.max(student - 1, 0))} className="bg-gray-600 px-2 rounded border border-transparent hover:border-white">−</button>
                                <span>{student}</span>
                                <button
                                    aria-label="Öka antal studentbiljetter"
                                    onClick={() => setStudent(student + 1)} className="bg-yellow-400 text-black px-2 rounded border border-transparent hover:border-white hover:bg-yellow-300">+</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <div className="bg-gray-800 p-3 rounded">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                    <div className="text-center sm:text-left">
                        <span id="label-member" className="text-lg block">Medlem</span>
                        <span className="block text-gray-400 text-sm">(25% rabatt)</span>
                        {!isLoggedIn && <Login />}
                        {!isLoggedIn && showWarning && (
                            <span className="block text-sm text-red-500 mt-1" aria-live="assertive">
                                Logga in för att boka medlemsbiljetter
                            </span>
                        )}
                    </div>
                    <div className="flex justify-center sm:justify-start items-center gap-2">
                        <button
                            aria-label="Minska antal medlemsbiljetter"
                            onClick={() => {
                                if (!isLoggedIn) {
                                    setShowWarning(true);
                                    setTimeout(() => setShowWarning(false), 3000);
                                    return;
                                }
                                setMember(Math.max(member - 1, 0));
                            }}
                            className={`px-2 rounded cursor-pointer border border-transparent ${isLoggedIn
                                ? "bg-gray-600 hover:border-white"
                                : "bg-gray-700 opacity-50 cursor-not-allowed"
                                }`}
                        >
                            −
                        </button>
                        <span>{member}</span>
                        <button
                            aria-label="Öka antal medlemsbiljetter"
                            onClick={() => {
                                if (!isLoggedIn) {
                                    setShowWarning(true);
                                    setTimeout(() => setShowWarning(false), 3000);
                                    return;
                                }
                                setMember(member + 1);
                            }}
                            className={`px-2 rounded cursor-pointer border border-transparent ${isLoggedIn
                                ? "bg-yellow-400 text-black hover:border-white hover:bg-yellow-300"
                                : "bg-gray-700 opacity-50 cursor-not-allowed"
                                }`}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
            <p className="text-right mt-4 font-bold">{total} biljetter</p>
            <p className="text-right text-yellow-300 font-semibold">
                Summa: {totalPrice.toFixed(0)} kr
            </p>
        </div>
    );
}

export default TicketSelector;