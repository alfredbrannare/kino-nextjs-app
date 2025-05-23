'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const tabs = [
    { href: "/admin/screenings", label: "Visningar" },
    { href: "/admin/movies", label: "Filmer" },
    { href: "/admin/offers", label: "Erbjudanden" },
    { href: "/admin/reviews", label: "Recensioner" },
    { href: "/admin/live-events", label: "Liveevenemang" },
    { href: "/admin/events", label: "Evenemang" }

];

export default function AdminTabs() {
    const pathname = usePathname();

    return (
        <div>
            <h1 className="text-2xl text-center font-bold mb-4">ADMINRÄTTIGHETER</h1>
            <div className="border-t-2 border-[#CDCDCD] mb-6">
                <nav className="flex space-x-4 overflow-x-auto px-4 sm:flex-row flex-col items-center justify-center sm:space-x-4 space-y-2 sm:space-y-0">
                    {tabs.map((tab) => (
                        <Link
                            key={tab.href}
                            href={tab.href}
                            className={clsx(
                                "px-4 py-2 rounded-b-md font-semibold whitespace-nowrap transition",
                                pathname === tab.href
                                    ? "bg-[#CDCDCD] text-[#2b0404]"
                                    : "text-[#CDCDCD] hover:bg-gray-600/20"
                            )}
                        >
                            {tab.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    );
}