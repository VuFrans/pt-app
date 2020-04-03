import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../styles/App.css';

export default function Calendar(props) {
  return (
    <div className="Calendar-container">
      <FullCalendar
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        header={{
          left: 'prev, next today',
          center: 'title',
          right: 'timeGridDay,timeGridWeek,dayGridMonth'
        }}
        height={700}
        events={props.trainings.map(training => {
          const container = {};
          container.date = training.date;
          container.title = [
            training.activity +
              ' / ' +
              training.customer.firstname +
              ' ' +
              training.customer.lastname
          ];
          return container;
        })}
      />
    </div>
  );
}
