import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/Components/ui/sheet"
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/Components/ui/form";
import { Textarea } from "@/Components/ui/textarea";
import { Input } from "@/Components/ui/Input";
import { Button } from "@/Components/ui/Button";

const formSchema = z.object({
  skills: z.string().min(1, { message: "Skills field is required." }),
  baseline: z.string().min(1, { message: "Baseline field is required." }),
  shortTermGoals: z
    .string()
    .min(1, { message: "Short-term goals field is required." }),
  activities: z.string().min(1, { message: "Activities field is required." }),
  reinforcement: z
    .string()
    .min(1, { message: "Reinforcement field is required." }),
});

export default function LessonPlanDialog() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skills: "",
      baseline: "",
      shortTermGoals: "",
      activities: "",
      reinforcement: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
  }

  return (
   
<SheetContent className="overflow-y-scroll m-5 max-h-screen">        <SheetHeader>
          <SheetTitle>Lesson Plan</SheetTitle>
          <SheetDescription>
            Please fill out the lesson plan details below.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Skills Field */}
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter skills" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Baseline Field */}
            <FormField
              control={form.control}
              name="baseline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Baseline</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter baseline" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Short-Term Goals Field */}
            <FormField
              control={form.control}
              name="shortTermGoals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short-Term Goals</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter short-term goals"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Activities Field */}
            <FormField
              control={form.control}
              name="activities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Activities</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter activities" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Reinforcement Field */}
            <FormField
              control={form.control}
              name="reinforcement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reinforcement</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter reinforcement strategies"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Submit Button */}
            <Button type="submit">Save Lesson Plan</Button>
          </form>
        </Form>
      </SheetContent>
   
  );
}
