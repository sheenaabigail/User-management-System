import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/Components/ui/select";
import { Button } from "@/Components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/Input";
import { Textarea } from "@/Components/ui/textarea";
import { Checkbox } from "@/Components/ui/checkbox";
import { Label } from "@/Components/ui/label";
import {
  Sheet,
  SheetTrigger,
} from "@/Components/ui/sheet";
import LessonPlanDialog from "./LessonPlanDialog";



// Validation Schema
const formSchema = z.object({
  provisionalDiagnosis: z.string().min(5, {
    message: "Provisional diagnosis must be at least 5 characters.",
  }),
  prelinguisticSkills: z.string().optional(),
  reception: z.string().optional(),
  expression: z.string().optional(),
  pragmatics: z.string().optional(),
  behavioralProfile: z.string().optional(),
  shortTermGoal: z.string().optional(),
  longTermGoal: z.string().optional(),
  sessionTimings: z.array(z.string()).optional(),
  sessionTime: z.string().optional(),
  progress: z.string().optional(),
});

export function ReportForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      provisionalDiagnosis: "",
      prelinguisticSkills: "",
      reception: "",
      expression: "",
      pragmatics: "",
      behavioralProfile: "",
      shortTermGoal: "",
      longTermGoal: "",
      sessionTimings: [],
      sessionTime: "",
      progress: "",
    },
  });

  const submitHandler = async (data) => {
    const patientId = "673de310173bfb0272228fb7"; // Replace with your actual logic to fetch patient ID
  
    const formData = {
      ...data,
      patient_id: patientId, // Ensure patient_id is added here
    };
  
    console.log("Payload being sent to backend:", formData); // Debug log to verify payload
  
    try {
      const response = await axios.post(
        "http://localhost:8000/generate-report/",
        formData
      );
      console.log("Form submitted successfully:", response.data);
      form.reset(); // Reset form after submission
    } catch (error) {
      console.error("Error during form submission:", error.response?.data || error.message);
    }
  };
  
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8">
        {/* Session Timings (Checkboxes) */}
        <FormField
          control={form.control}
          name="sessionTimings"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Session Days</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-4">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value?.includes(day) || false}
                        onChange={() => {
                          const updatedValue = field.value?.includes(day)
                            ? field.value.filter((d) => d !== day)
                            : [...(field.value || []), day];
                          field.onChange(updatedValue);
                        }}
                      />
                      <Label>{day}</Label>
                    </div>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Session Time Dropdown */}
        <FormField
          control={form.control}
          name="sessionTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Session Timings (45 mins)</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Session Time" />
                  </SelectTrigger>
                  <SelectContent>
                    {["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM"].map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Other Form Fields */}
        {[
          { name: "provisionalDiagnosis", label: "Provisional Diagnosis" },
          { name: "prelinguisticSkills", label: "Prelinguistic Skills" },
          { name: "reception", label: "Reception / Comprehension" },
          { name: "expression", label: "Expression" },
          { name: "pragmatics", label: "Pragmatics" },
          { name: "behavioralProfile", label: "Behavioral Profile" },
          { name: "shortTermGoal", label: "Short-term Goal" },
          { name: "longTermGoal", label: "Long-term Goal" },
          { name: "progress", label: "Progress" },
        ].map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: inputField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  {[
                    "behavioralProfile",
                    "pragmatics",
                    "reception",
                    "expression",
                    "prelinguisticSkills",
                    "provisionalDiagnosis",
                    "shortTermGoal",
                    "longTermGoal",
                    "progress",
                  ].includes(field.name) ? (
                    <Textarea
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      {...inputField}
                    />
                  ) : (
                    <Input
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      {...inputField}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {/* Lesson Plan Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button className="m-4">Create Lesson Plan</Button>
          </SheetTrigger>
          <LessonPlanDialog />
        </Sheet>

        {/* Submit Button */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default ReportForm;
