import gptData from "./data/GPT_Data.json";
const TASK_HEIGHT = 2.5;

export default function ScheduleView() {
  const scheduleContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
  };
  return (
    <section className="d-flex flex-column align-items-center w-100">
      <h1>Generated Schedule</h1>
      <section style={scheduleContainerStyle}>
        <div className="schedule-container">
          <Day day="Monday" dayNum={0} />
        </div>
        <div className="schedule-container">
          <Day day="Tuesday" dayNum={1} />
        </div>
        <div className="schedule-container">
          <Day day="Wednesday" dayNum={2} />
        </div>
      </section>
    </section>
  );
}

const Day = ({ day, dayNum }) => {
  const processedTasks =
    dayNum < gptData.length ? processTimes(gptData[dayNum]) : [];
  console.log(processedTasks, dayNum, gptData.length);
  return (
    <section>
      <h2>{day}</h2>
      <section>
        {processedTasks.map((task, index) => {
          if (task.type === "task") {
            return <Task key={index} task={task.task} />;
          } else {
            return <Filler key={index} height={task.height} />;
          }
        })}
      </section>
    </section>
  );
};

/**
 * This function will take in an array of tasks and return an array of those tasks plus filler elements with the correct width to fill in the gaps between tasks. This will allow us to display the tasks in a schedule view with the correct spacing between them. Times start at 8am and end at 8pm, with each hour represented by a 1rem tall element. The tasks will be displayed in the correct position based on their start and end times.
 * @param {Object[]} tasks
 * @returns {Object[]} processedTasks
 */
const processTimes = (day) => {
  let processedTasks = [];
  let currentHour = 8;
  let tasks = day.study_schedule;
  for (let j = 0; j < tasks.length; j++) {
    let task = tasks[j];
    let taskStart = convertTimeToHour(task.start_time);
    let taskEnd = convertTimeToHour(task.end_time);
    let fillerHeight = taskStart - currentHour;
    if (fillerHeight > 0) {
      processedTasks.push({
        type: "filler",
        height: fillerHeight * TASK_HEIGHT,
      });
    }
    processedTasks.push({ type: "task", task: task });
    currentHour = taskEnd;
  }
  const END_HOUR = 16;
  let fillerHeight = END_HOUR - currentHour;
  if (fillerHeight > 0) {
    processedTasks.push({ type: "filler", height: fillerHeight * TASK_HEIGHT });
  }

  return processedTasks;
};

const convertTimeToHour = (time) => {
  const [hour, minutePeriod] = time.split(":");
  const [minute, period] = minutePeriod.split(" ");
  let convertedHour = parseInt(hour);
  if (period === "PM" && convertedHour !== 12) {
    convertedHour += 12;
  } else if (period === "AM" && convertedHour === 12) {
    convertedHour = 0;
  }
  return convertedHour + parseInt(minute) / 60;
};

const Task = ({ task }) => {
  let taskStart = convertTimeToHour(task.start_time);
  let taskEnd = convertTimeToHour(task.end_time);
  const taskStyle = {
    height: (taskEnd - taskStart) * TASK_HEIGHT + "rem",
  };
  console.log(task, taskStyle);
  return <section style={taskStyle} className="border"></section>;
};

const Filler = ({ height }) => {
  const fillerStyle = {
    height: height + "rem",
    backgroundColor: "lightgray",
  };
  return <section style={fillerStyle} className="border"></section>;
};
