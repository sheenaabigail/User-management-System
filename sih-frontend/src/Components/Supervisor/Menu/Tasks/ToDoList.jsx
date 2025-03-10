import React, { useState, useEffect } from "react";
import { Button } from "@/Components/ui/Button";
import { Input } from "@/Components/ui/Input";
import { Checkbox } from "@/Components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from "@/Components/ui/table";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/Components/ui/tabs";
import { Badge } from "@/Components/ui/badge"; // Importing Badge component

const TodoList = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      task: "Review Patient Reports",
      type: "Patient: John Doe",
      date: "2024-12-01",
      time: "10:00",
      notes: "Follow up on recent session",
      Completed: false,
      status: "Pending",
    },
    {
      id: 2,
      task: "Verify Therapist Progress",
      type: "Therapist: Dr. Smith",
      date: "2024-12-03",
      time: "15:00",
      notes: "Submit report to supervisor",
      Completed: true,
      status: "Completed",
    },
  ]);

  const [reports, setReports] = useState([
    {
      id: 1,
      patient: "John Doe",
      reportType: "Therapy Progress",
      date: "2024-12-01",
      status: "Pending",
    },
    {
      id: 2,
      patient: "Jane Smith",
      reportType: "Initial Assessment",
      date: "2024-12-03",
      status: "Approved",
    },
  ]);

  const [taskType, setTaskType] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const handleAddTask = () => {
    if (taskType.trim() !== "") {
      const newTask = {
        id: tasks.length + 1,
        task: taskType,
        type: assignedTo,
        date: date || null,
        time: time || null,
        notes: notes.trim(),
        Completed: false,
        status: "Pending",
      };
      setTasks([...tasks, newTask]);
      setTaskType("");
      setAssignedTo(""); // Fixed typo here
      setDate("");
      setTime("");
      setNotes("");
    }
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const updateReportStatus = (reportId, newStatus) => {
    setReports(
      reports.map((report) =>
        report.id === reportId ? { ...report, status: newStatus } : report
      )
    );
  };
  const handleCheckboxChange = (e, taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            isChecked: e.target.checked,
            completed: e.target.checked ? true : false,
          }
        : task
    );
    setTasks(updatedTasks);
  };

  // Filter tasks based on selected tab
  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") {
      return true;
    } else {
      return task.status === filter;
    }
  });

  return (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden flex-1 m-5">
      <CardHeader className="bg-gray-100 p-4 grid grid-cols-4 justify-between items-center">
        <Input
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="col-span-3"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add New Task</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <Select onValueChange={setTaskType} value={taskType}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose task" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Review Reports">Review Reports</SelectItem>
                  <SelectItem value="Organise Meeting">
                    Organise Meeting
                  </SelectItem>
                  <SelectItem value="Therapy Session">
                    Therapy Session
                  </SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Assigned to (e.g., Patient: John Doe)"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="w-full"
              />
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-1/2"
              />
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-1/2"
              />
              <Input
                placeholder="Add notes..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full"
              />
              <Button
                onClick={handleAddTask}
                disabled={!taskType || !assignedTo}
                className="mt-2"
              >
                Add Task
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs defaultValue="All" onValueChange={setFilter}>
          <TabsList>
            <TabsTrigger value="All">All</TabsTrigger>
            <TabsTrigger value="Pending">Pending</TabsTrigger>
            <TabsTrigger value="Completed">Completed</TabsTrigger>
            <TabsTrigger value="InProgress">In Progress</TabsTrigger>

            <TabsTrigger value="Reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="All">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Task</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>
                      {/* Checkbox: Change status to 'Completed' when checked */}
                      <Checkbox
                        checked={task.isChecked}
                        onChange={(e) => handleCheckboxChange(e, task.id)}
                      />
                    </TableCell>
                    <TableCell>{task.task}</TableCell>
                    <TableCell>{task.date}</TableCell>
                    <TableCell>{task.notes}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Badge
                            color={
                              task.status === "Completed"
                                ? "green"
                                : task.status === "Pending"
                                ? "yellow"
                                : "red"
                            }
                          >
                            {task.status}
                          </Badge>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() => updateTaskStatus(task.id, "Pending")}
                          >
                            Pending
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() =>
                              updateTaskStatus(task.id, "InProgress")
                            }
                          >
                            In progress
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="InProgress">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Task</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks
                  .filter((task) => task.status === "InProgress")
                  .map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>
                        {/* Checkbox: Change status to 'Completed' when checked */}
                        <Checkbox
                          checked={task.isChecked}
                          onChange={(e) => handleCheckboxChange(e, task.id)}
                        />
                      </TableCell>
                      <TableCell>{task.task}</TableCell>
                      <TableCell>{task.date}</TableCell>
                      <TableCell>{task.notes}</TableCell>
                      <TableCell>
                        <Badge
                          color={
                            task.status === "Completed"
                              ? "green"
                              : task.status === "Pending"
                              ? "yellow"
                              : "red"
                          }
                        >
                          {task.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="Pending">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Task</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks
                  .filter((task) => task.status === "Pending")
                  .map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>
                        {/* Checkbox: Change status to 'Completed' when checked */}
                        <Checkbox
                          checked={task.isChecked}
                          onChange={(e) => handleCheckboxChange(e, task.id)}
                        />
                      </TableCell>
                      <TableCell>{task.task}</TableCell>
                      <TableCell>{task.date}</TableCell>
                      <TableCell>{task.notes}</TableCell>
                      <TableCell>
                        <Badge
                          color={
                            task.status === "Completed"
                              ? "green"
                              : task.status === "Pending"
                              ? "yellow"
                              : "red"
                          }
                        >
                          {task.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="Completed">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Task</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks
                  .filter((task) => task.completed === true)
                  .map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>
                        {/* Checkbox: Change status to 'Completed' when checked */}
                        <Checkbox
                          checked={task.isChecked}
                          onChange={(e) => handleCheckboxChange(e, task.id)}
                        />
                      </TableCell>
                      <TableCell>{task.task}</TableCell>
                      <TableCell>{task.date}</TableCell>
                      <TableCell>{task.notes}</TableCell>
                      <TableCell>
                        <Badge color="green">{task.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="Reports">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Report Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell></TableCell>
                    <TableCell>{report.patient}</TableCell>
                    <TableCell>{report.reportType}</TableCell>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>
                      {" "}
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Badge
                            color={
                              report.status === "Completed"
                                ? "green"
                                : report.status === "Pending"
                                ? "yellow"
                                : "red"
                            }
                          >
                            {report.status}
                          </Badge>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() =>
                              updateReportStatus(report.id, "Pending")
                            }
                          >
                            Pending
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() =>
                              updateReportStatus(report.id, "InProgress")
                            }
                          >
                            In progress
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TodoList;
