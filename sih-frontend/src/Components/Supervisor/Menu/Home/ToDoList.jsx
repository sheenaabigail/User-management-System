import React, { useState } from 'react';
import { Button } from "@/Components/ui/Button";
import { Input } from "@/Components/ui/Input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/Components/ui/dropdown-menu";
import { Table, TableHeader, TableBody, TableCell, TableRow, TableHead } from "@/Components/ui/table";
import { MoreHorizontal } from "lucide-react";

const TodoList = () => {
  // State for supervisor's tasks
  const [tasks, setTasks] = useState([
    { id: 1, task: "Review Patient Reports", completed: false },
    { id: 2, task: "Verify Therapist Progress", completed: true },
    // Add more tasks here
  ]);

  // State for submitted reports
  const [reports, setReports] = useState([
    { id: "rep123", status: "Pending" },
    { id: "rep124", status: "In Progress" },
    // Add more reports here
  ]);

  // State for new task input
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: tasks.length + 1, task: newTask, completed: false }]);
      setNewTask(""); // Clear input after adding
    }
  };

  // Handling task completion toggle
  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // Handling report status change and removal if completed
  const changeReportStatus = (reportId, newStatus) => {
    setReports(reports.map(report => {
      if (report.id === reportId) {
        const updatedReport = { ...report, status: newStatus };
        if (newStatus === "Completed") {
          return null;  // Remove the report if completed
        }
        return updatedReport;
      }
      return report;
    }).filter(report => report !== null));  // Filter out null reports
  };

  return (
    <div className="w-full">
      <div className="py-4 flex items-center">
        <Input
          placeholder="Add new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="max-w"
        />
        <Button onClick={handleAddTask} className="ml-2">Add Task</Button>
      </div>

      {/* Tasks Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.filter(task => !task.completed).length ? ( // Only display incomplete tasks
              tasks.filter(task => !task.completed).map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskCompletion(task.id)}
                        className="mr-2"
                      />
                      {task.task}
                    </label>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-block px-3 py-1 text-white rounded-full 
                        ${task.completed ? "bg-green-500" : "bg-yellow-500"}`}
                    >
                      {task.completed ? "Completed" : "Pending"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      onClick={() => toggleTaskCompletion(task.id)}
                    >
                      {task.completed ? "Mark Incomplete" : "Mark Complete"}
                    </Button>
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

      {/* Submitted Reports Table */}
      <div className="py-4">
        <h3 className="text-lg font-medium">Submitted Reports</h3>
        <Table className="w-full table-auto text-sm">
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 py-2 text-left font-semibold">Report ID</TableHead>
              <TableHead className="px-4 py-2 text-left font-semibold">Status</TableHead>
              <TableHead className="px-4 py-2 text-left font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Map through reports */}
            {reports.map((report) => (
              <TableRow key={report.id} className="border-t">
                <TableCell className="px-4 py-2">{report.id}</TableCell>
                <TableCell className="px-4 py-2">
                  <span
                    className={`inline-block px-3 py-1 text-white rounded-full 
                      ${report.status === "In Progress" ? "bg-blue-500" : "bg-yellow-500"}`}
                  >
                    {report.status}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-2 flex justify-start space-x-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0 ml-2">
                        <span className="sr-only">Options</span>
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {report.status === "Pending" && (
                        <DropdownMenuItem onClick={() => changeReportStatus(report.id, "In Progress")}>
                          Mark In Progress
                        </DropdownMenuItem>
                      )}
                      {report.status !== "Completed" && (
                        <DropdownMenuItem onClick={() => changeReportStatus(report.id, "Completed")}>
                          Mark as Complete
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TodoList;
