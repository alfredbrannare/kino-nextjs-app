"use client"
import { useEffect, useState } from "react"
import { useAuth } from "@/components/user/AuthData"
import { useRouter } from "next/navigation";
import AdminTabs from "@/components/AdminTabs"
import { SquarePen } from "lucide-react";
import EventCreator from "@/components/EventCreator";
import { AuthContextType } from "@/ts/types";
import { EventType } from "@/ts/types";

const EventsPage = () => {
    const [events, setEvents] = useState<EventType[]>([])
    const [loading, setLoading] = useState(true)
    const [update, setUpdate] = useState(false)
    const [inputSearch, setInputSearch] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [eventToEdit, setEventToEdit] = useState<EventType | null>(null);
    const { isLoggedIn, isAdmin, isLoading: isAuthLoading } = useAuth() as AuthContextType;
    const router = useRouter();

    useEffect(() => {
        if (!isAuthLoading) {
            if (!isAdmin) {
                router.push("/");
            }
        }
    }, [isLoggedIn, isAdmin, isAuthLoading, router]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/events/")
                const data = await res.json()
                setEvents(data)
            } catch (error) {
                console.error("Error fetching movies:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
        setUpdate(false)
    }, [update])

    const deleteEvent = async (id: string) => {
        try {
            await fetch(`/api/events/${id}`, {
                method: "DELETE",
                credentials: 'include',
            })
        } catch (error) {
            console.error("Error deleting  event:", error)
        } finally {
            setUpdate(true)
        }
    }

    const handleEditClick = (event: EventType) => {
        setIsEditing(true);
        setEventToEdit(event);
    }

    if (isAuthLoading || loading) return <p>Loading page data...</p>;
    if (!isAdmin) return <p>Access Denied. You are not authorized to view this page.</p>;

    const filteredEvents = events.filter(event => {

        if (!inputSearch) return true;

        const eventTitle = event.title?.toLowerCase() || '';
        return eventTitle.includes(inputSearch.toLowerCase());
    });

    return (
        <>
            <div className="p-6">
                <AdminTabs />
                <EventCreator
                    setUpdate={setUpdate}
                    setIsEditing={setIsEditing}
                    isEditing={isEditing}
                    eventToEdit={eventToEdit}
                    clearEventToEdit={() => setEventToEdit(null)}
                />

                <input
                    type="text"
                    className="input block mx-auto mt-10"
                    placeholder="Sök"
                    value={inputSearch}
                    onChange={(e) => setInputSearch(e.target.value)}
                />

                <h1 className="italic font-semibold text-3xl text-center pt-10">
                    Events:
                </h1>
                <br />
                {filteredEvents.map((event) => (
                    <div
                        key={event._id}
                        className="block mx-auto p-4 mb-3 bg-base-300 flex justify-between max-w-200 ">
                        <h2 className="">{event.title}</h2>
                        <div>
                            <span
                                className="btn btn-warning mr-1"
                                onClick={() => handleEditClick(event)}>
                                Edit
                                <SquarePen />
                            </span>

                            <button
                                onClick={() => deleteEvent(event._id)}
                                className="btn btn-error">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default EventsPage
