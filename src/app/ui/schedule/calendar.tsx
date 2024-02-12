"use client";
import React from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./event-utils";

export default function Calendar() {
  const handleEventClick = (clickInfo: any) => {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  function renderEventContent(eventInfo: any) {
    const formatTimeStart = eventInfo.event.start.toLocaleString("en-US", {
      timeZone: "Asia/Bangkok",
      hour: "numeric",
      hour12: true,
    });

    const formatTimeEnd = eventInfo.event.end.toLocaleString("en-US", {
      timeZone: "Asia/Bangkok",
      hour: "numeric",
      hour12: true,
    });

    return (
      <>
        <i>
          {formatTimeStart} - {formatTimeEnd}
        </i>
        <br />
        <b>{eventInfo.event.title}</b>
        <br />
        {eventInfo.event.extendedProps.description.map(
          (each: string, index: number) => (
            <div key={index}>
              <i key={index}>* {each}</i>
            </div>
          )
        )}
      </>
    );
  }

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={
          {
            // left: 'prev,next today',
            // center: 'title',
            // right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }
        }
        initialView="timeGridWeek"
        allDaySlot={false}
        height={800}
        slotDuration={"00:15:00"}
        slotMaxTime={"17:00:00"}
        slotMinTime={"09:00:00"}
        // ... other options
        // editable={true}
        // selectable={true}
        // selectMirror={true}
        // dayMaxEvents={true}
        // weekends={this.state.weekendsVisible}
        initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
        // select={this.handleDateSelect}
        // eventContent={renderEventContent} // custom render function
        // eventClick={(clickInfo) => handleEventClick(clickInfo)}
        // eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
        /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
        eventContent={renderEventContent}
      />
    </>
  );
}
