"use client";

import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-regular-svg-icons'; // Importing the regular icon
import LeftPanel from "@/components/home/left-panel";
import RightPanel from "@/components/home/right-panel";
import { useTheme } from "next-themes";

export default function Home() {
    const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true); // Set to true to open the left panel by default

    const toggleLeftPanel = () => {
        setIsLeftPanelOpen(!isLeftPanelOpen);
    };

    const handleUserClick = (userId: string) => {
        console.log('User clicked:', userId);
        setIsLeftPanelOpen(false);
        // Additional logic to handle opening specific chat can be added here
    };

    return (
        <main className="m-5">
            <div className="overflow-y-hidden h-[calc(100vh-50px)] max-w-[1700px] mx-auto bg-left-panel relative">
                {/* Green background decorator for Light Mode */}
                <div className="fixed top-0 left-0 w-full h-36 bg-green-primary dark:bg-transparent -z-30" />
                {!isLeftPanelOpen && (
                    <button
                        className="absolute top-4 left-4 p-2 rounded md:hidden z-50 bg-gray-200 dark:bg-gray-800 style6"
                        onClick={toggleLeftPanel}
                    >
                        <FontAwesomeIcon 
                            icon={faComments} // Using faComments from regular icons
                            style={{ color: '#1E3050' }}
                        />
						<br />chat
                    </button>
                )}
                <div
                    className={`fixed top-0 left-0 h-full w-full md:w-1/4 bg-white dark:bg-gray-900 transition-transform transform ${isLeftPanelOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
                >
                    <LeftPanel onUserClick={handleUserClick} />
                </div>
                <div
                    className={`fixed top-0 right-0 h-full w-full md:w-3/4 bg-white dark:bg-gray-900 transition-transform transform ${isLeftPanelOpen ? "translate-x-full" : "translate-x-0"} md:translate-x-0`}
                >
                    <RightPanel />
                </div>
            </div>
        </main>
    );
}

