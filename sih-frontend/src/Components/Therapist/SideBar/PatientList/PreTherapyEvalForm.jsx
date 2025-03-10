import { Card, CardHeader, CardTitle, CardContent } from '@/Components/ui/card';
import { Button } from '@/Components/ui/Button';
import {Textarea } from '@/Components/ui/textarea';
import { Dialog, DialogTrigger, DialogContent } from '@/Components/ui/dialog';
import TreatmentPlanForm from './TreatmentPlanForm';

const PreTherapyEvalForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Pre-Therapy Evaluation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <p>
            <strong>Date of Session:</strong> 2024-11-20
          </p>
          <p>
            <strong>Student Clinician:</strong> Sarah Lee
          </p>
          <p>
            <strong>Clinical Supervisor:</strong> Dr. Martin
          </p>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Provisional Diagnosis:</h3>
          <Textarea
            placeholder="Enter provisional diagnosis..."
            rows={4}
            className="mt-2"
          />
          <h3 className="mt-4 text-lg font-semibold">Findings:</h3>
          <Textarea
            placeholder="Enter findings that are aspects other than noticed in the diagnostic evaluation"
            rows={4}
            className="mt-2"
          />
        </div>
        <div className="m-5 mb-0">
          <Dialog>
            <DialogTrigger>
              <Button variant="outline" className="mr-5">
                Save Report
              </Button>
            </DialogTrigger>
            <DialogContent>
              <TreatmentPlanForm />
            </DialogContent>
          </Dialog>
          <Button variant="outline" className="mr-5">
            Upload Image
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PreTherapyEvalForm;
