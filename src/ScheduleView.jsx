import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import gptData from "./data/GPT_Data.json";
import styled from "styled-components";

const TASK_HEIGHT = 60; // Adjust this value as needed for task height

const ScheduleView = () => {
  const [data, setData] = useState(gptData);

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
  
    const { source, destination } = result;
  
    // deep copy of your tasks array
    const newTasks = JSON.parse(JSON.stringify(data));
  
    // remove the dragged task from source index
    const [removed] = newTasks[source.droppableId].splice(source.index, 1);
  
    // insert the dragged task at destination index
    newTasks[destination.droppableId].splice(destination.index, 0, removed);
  
    // update state
    setData(newTasks);
  };
  

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ScheduleContainer>
        <h1>Generated Schedule</h1>
        <DayContainer>
          {data.map((day, index) => (
            <Day key={index} day={day} dayIndex={index} />
          ))}
        </DayContainer>
      </ScheduleContainer>
    </DragDropContext>
  );
};

const Day = ({ day, dayIndex }) => {
  return (
    <DayColumn>
      <h2>{day.day}</h2>
      <Droppable droppableId={String(dayIndex)}>
        {(provided) => (
          <TaskList ref={provided.innerRef} {...provided.droppableProps}>
            {day.study_schedule.map((task, index) => (
              <Task key={index} task={task} index={index} dayIndex={dayIndex} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </DayColumn>
  );
};

const Task = ({ task, index, dayIndex }) => {
  return (
    <Draggable draggableId={`task-${dayIndex}-${index}-${task.assignment_name}`} index={index}>
  {(provided) => (
    <TaskContainer
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <h3>{task.assignment_name}</h3>
      <p>{task.class}</p>
      <p>{task.start_time} - {task.end_time}</p>
    </TaskContainer>
  )}
  </Draggable>
  );
};

// Styled components
const ScheduleContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DayContainer = styled.div`
  display: flex;
`;

const DayColumn = styled.div`
  margin-right: 20px;
`;

const TaskList = styled.div`
  padding: 8px;
  width: 250px;
  min-height: 500px;
  background-color: #f7f7f7;
  border-radius: 4px;
`;

const TaskContainer = styled.div`
  padding: 16px;
  margin-bottom: 8px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;

export default ScheduleView;