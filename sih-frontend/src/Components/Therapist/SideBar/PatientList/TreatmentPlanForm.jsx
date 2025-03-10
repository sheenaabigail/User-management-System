import React, { useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Textarea } from "@/Components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Button } from "@/Components/ui/Button";

const TreatmentPlanForm = () => {
  const [provisionalDiagnosis, setProvisionalDiagnosis] = useState("");
  const [goals, setGoals] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [shortTermGoals, setShortTermGoals] = useState("");
  const [approach, setApproach] = useState("");
  const [activities, setActivities] = useState("");
  const [parentsInput, setParentsInput] = useState("");
  const [prognosis, setPrognosis] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      provisionalDiagnosis,
      goals,
      fromDate,
      toDate,
      shortTermGoals,
      approach,
      activities,
      parentsInput,
      prognosis,
    };
    console.log(formData);
    // Replace with an API call to save the data
  };

  return (
    <DialogContent className="overflow-x-scroll size-full h-[90vh]">
      <DialogHeader>
        <DialogTitle>Patient Treatment Plan</DialogTitle>
        <DialogDescription>
          Fill out the form below with the required information to create the
          treatment plan.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Provisional Diagnosis */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Provisional Diagnosis
          </label>
          <Textarea
            value={provisionalDiagnosis}
            onChange={(e) => setProvisionalDiagnosis(e.target.value)}
            rows={4}
            placeholder="Enter provisional diagnosis"
          />
        </div>

        {/* Goals Planned For Sessions */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Goals have been planned For{" "}
            <i>
              <Select
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                className="w-full"
              >
                <SelectTrigger>
                  <SelectValue placeholder="How many?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                </SelectContent>
              </Select>
            </i>{" "}
            Sessions
          </label>
        </div>

        {/* Date Range: From and To */}
        <div className="flex gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">From</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">To</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>
        </div>

        {/* Short Term Goals */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Short Term Goals
          </label>
          <Textarea
            value={shortTermGoals}
            onChange={(e) => setShortTermGoals(e.target.value)}
            rows={2}
            placeholder="Enter short term goals (separate with commas)"
          />
        </div>

        {/* Approach/Technique */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Approach/Technique
          </label>
          <Textarea
            value={approach}
            onChange={(e) => setApproach(e.target.value)}
            rows={4}
            placeholder="Describe the approach or technique"
          />
        </div>

        {/* Activities To Achieve Goals */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Activities To Achieve Goals
          </label>
          <Textarea
            value={activities}
            onChange={(e) => setActivities(e.target.value)}
            rows={4}
            placeholder="List activities to achieve goals"
          />
        </div>

        {/* Parents Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Parents' Input
          </label>
          <Textarea
            value={parentsInput}
            onChange={(e) => setParentsInput(e.target.value)}
            rows={3}
            placeholder="Enter parents' input"
          />
        </div>

        {/* Prognosis */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Prognosis
          </label>
          <Textarea
            value={prognosis}
            onChange={(e) => setPrognosis(e.target.value)}
            rows={4}
            placeholder="Enter prognosis"
          />
        </div>

        <DialogFooter>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default TreatmentPlanForm;
