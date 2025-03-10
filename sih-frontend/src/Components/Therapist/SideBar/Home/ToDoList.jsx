import React, { useState } from 'react';
import { Button } from "@/Components/ui/Button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/Components/ui/dropdown-menu";
import { Table, TableHeader, TableBody, TableCell, TableRow, TableHead } from "@/Components/ui/table";
import { MoreHorizontal } from "lucide-react";

const TodoList = () => {
  // Predefined tasks that therapists can select from the dropdown
  const predefinedDuties = [
    { id: 1, task: "Review Patient Reports" },
    { id: 2, task: "Verify Therapist Progress" },
    { id: 3, task: "Assess Speech Therapy Notes" },
    { id: 4, task: "Update Progress Reports" },
  ];

  // State for tasks (therapists' active to-do list)
  const [tasks, setTasks] = useState([]);

  // State for currently selected dropdown task
  const [selectedTask, setSelectedTask] = useState("");

  // Handle adding a new task via the dropdown selection
  const handleAddTask = () => {
    const taskToAdd = predefinedDuties.find(duty => duty.id === parseInt(selectedTask));
    if (taskToAdd) {
      // Avoid duplicates
      if (!tasks.some(task => task.task === taskToAdd.task)) {
        setTasks([
          ...tasks,
          { id: Date.now(), task: taskToAdd.task, status: "Pending", completed: false, isCritical: false }
        ]);
      }
    }
  };

  // Handle checkbox toggling only for non-critical tasks
  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map(task =>
        task.id === taskId && !task.isCritical
          ? { ...task, completed: true }
          : task
      )
    );
  };

  // Handle task status change from dropdown menu
  const changeTaskStatus = (taskId, newStatus) => {
    setTasks(
      tasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <div className="w-full m-3 p-3">
      {/* Dropdown to Select and Add Tasks */}
      <div className="mb-4">
        {/* <label className="mr-2 font-semibold">Select a Task to Add: </label> */}
        <select
          value={selectedTask}
          onChange={(e) => setSelectedTask(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="">--Select a Task--</option>
          {predefinedDuties.map((duty) => (
            <option key={duty.id} value={duty.id}>
              {duty.task}
            </option>
          ))}
        </select>
        <Button
          variant="outline"
          className="ml-2"
          onClick={handleAddTask}
          disabled={!selectedTask}
        >
          Add Task
        </Button>
      </div>

      {/* Tasks Table */}
      <div className="rounded-md border mr-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.filter(task => !task.completed).length ? (
              tasks.filter(task => !task.completed).map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <label className="flex items-center">
                      {!task.isCritical ? (
                        <>
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTaskCompletion(task.id)}
                            className="mr-2"
                          />
                          {task.task}
                        </>
                      ) : (
                        task.task
                      )}
                    </label>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-block px-3 py-1 text-white rounded-full 
                        ${task.status === "In Progress" ? "bg-blue-500" : "bg-yellow-500"}`}
                    >
                      {task.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 ml-2">
                          <span className="sr-only">Options</span>
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => changeTaskStatus(task.id, task.status === "Pending" ? "In Progress" : "Pending")}
                        >
                          {task.status === "Pending" ? "Mark In Progress" : "Mark Pending"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="3" className="text-center h-24">
                  No tasks added.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TodoList;
