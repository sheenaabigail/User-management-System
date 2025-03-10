import React, { useEffect, useState } from "react";
import {
  DayPilot,
  DayPilotCalendar,
  DayPilotNavigator,
} from "@daypilot/daypilot-lite-react";
import "./Calendar.css";
import axios from "axios";

const Calendar = ({ therapistId }) => {
  const [calendar, setCalendar] = useState(null);
  const [events, setEvents] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  const config = {
    viewType: "Week",
    durationBarVisible: false,
    timeRangeSelectedHandling: "Enabled",
    onTimeRangeSelected: async (args) => {
      const modal = await DayPilot.Modal.prompt(
        "Enter session details:",
        "Therapist-Patient Session"
      );
      calendar.clearSelection();
      if (!modal.result) {
        return;
      }
      calendar.events.add({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        text: modal.result,
      });
    },
    onEventClick: async (args) => {
      await editEvent(args.e);
    },
    contextMenu: new DayPilot.Menu({
      items: [
        {
          text: "Delete",
          onClick: async (args) => {
            calendar.events.remove(args.source);
          },
        },
        {
          text: "-",
        },
        {
          text: "Edit...",
          onClick: async (args) => {
            await editEvent(args.source);
          },
        },
      ],
    }),
    onBeforeEventRender: (args) => {
      args.data.areas = [
        {
          top: 3,
          right: 3,
          width: 20,
          height: 20,
          symbol: "icons/daypilot.svg#x-circle",
          fontColor: "#fff",
          action: "None",
          toolTip: "Delete session",
          onClick: async (args) => {
            calendar.events.remove(args.source);
          },
        },
      ];
    },
  };

  const editEvent = async (e) => {
    const modal = await DayPilot.Modal.prompt(
      "Update session details:",
      e.text()
    );
    if (!modal.result) {
      return;
    }
    e.data.text = modal.result;
    calendar.events.update(e);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/patient/patientDetails?therapistId=${therapistId}`
        );
        const patientData = response.data;
        console.log(patientData);
        const events = patientData.map((session) => ({
          id: session.sessionId,
          text: `${session.name} - ${session.age} years old`,
          start: session.nextAppointment,
          end: new Date(
            new Date(session.nextAppointment).getTime() + 60 * 60 * 1000
          ).toISOString(),
        }));

        setEvents(events);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchEvents();
  }, []);
  console.log(events);
  return (
    <div className="grid grid-cols-4 gap-4 bg-gray-50 h-screen items-center justify-center">
      <div className=" col-span-1 place-self-center h-[100vh] bg-white shadow-lg rounded-lg">
        <DayPilotNavigator
          selectMode={"Week"}
          showMonths={2}
          skipMonths={2}
          selectionDay={startDate}
          onTimeRangeSelected={(args) => {
            setStartDate(args.day);
          }}
        />
      </div>
      <div className="col-span-3 h-[100vh] overflow-auto bg-white shadow-lg rounded-lg">
        <DayPilotCalendar
          {...config}
          events={events}
          startDate={startDate}
          controlRef={setCalendar}
        />
      </div>
    </div>
  );
};

export default Calendar;
