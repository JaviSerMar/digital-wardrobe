function CalendarPanel({ currentDate }) {
  const monthNames = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  const weekDays = ["L", "M", "X", "J", "V", "S", "D"];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = currentDate.getDate();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const startOffset = (firstDayOfMonth.getDay() + 6) % 7;
  const daysInMonth = lastDayOfMonth.getDate();

  const calendarDays = [];

  for (let i = 0; i < startOffset; i += 1) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    calendarDays.push(day);
  }

  return (
    <aside className="calendar-panel">
      <div className="calendar-panel-header">
        <h2 className="calendar-panel-title">
          {monthNames[month]} {year}
        </h2>
      </div>

      <div className="calendar-weekdays">
        {weekDays.map((weekDay) => (
          <span key={weekDay}>{weekDay}</span>
        ))}
      </div>

      <div className="calendar-days">
        {calendarDays.map((day, index) => (
          <span
            className={`calendar-day ${day === today ? "is-today" : ""} ${
              day === null ? "is-empty" : ""
            }`}
            key={`${day}-${index}`}
          >
            {day}
          </span>
        ))}
      </div>
    </aside>
  );
}

export default CalendarPanel;