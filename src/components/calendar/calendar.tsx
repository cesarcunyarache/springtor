import React from "react";
import {CalendarProvider} from "@/components/calendar/contexts/calendar-context";
import {CalendarHeader} from "@/components/calendar/header/calendar-header";
import {CalendarBody} from "@/components/calendar/calendar-body";

import {DndProvider} from "@/components/calendar/contexts/dnd-context";
import {getEvents, getUsers} from "@/components/calendar/requests";

async function getCalendarData() {
    await new Promise(resolve => setTimeout(resolve, 5000));

    return {
        events: await getEvents(),
        users: await getUsers()
    };
}

export async function Calendar() {

    const {events, users} = await getCalendarData();

    return (
        <CalendarProvider events={events} users={users} view="month">
            <DndProvider>
                <div className="w-full border rounded-xl">
                    <CalendarHeader/>
                    <CalendarBody/>
                </div>
            </DndProvider>
        </CalendarProvider>
    );
}