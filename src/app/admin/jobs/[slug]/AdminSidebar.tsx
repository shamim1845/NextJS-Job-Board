"use client";

import FormSubmitButton from "@/components/FormSubmitButton";
import { Job } from "@prisma/client";
import { useFormState } from "react-dom";
import { approvedSubmission, deleteJob } from "./actions";

interface AdminSidebarProps {
  job: Job;
}
const AdminSidebar = ({ job }: AdminSidebarProps) => {
  return (
    <aside className="flex w-[200px] flex-none flex-row items-center gap-2 md:flex-col md:items-stretch">
      {job.approved ? (
        <span className="text-center font-semibold text-green-500">
          Approved
        </span>
      ) : (
        <ApprovedSubmissionButton jobId={job.id} />
      )}

      <DeleteJobButton jobId={job.id} />
    </aside>
  );
};

export default AdminSidebar;

function ApprovedSubmissionButton({ jobId }: { jobId: number }) {
  const [formState, formAction] = useFormState(approvedSubmission, undefined);
  return (
    <form action={formAction} className="space-y-1">
      <input hidden type="number" name="jobId" value={jobId} readOnly />
      <FormSubmitButton className="w-full bg-green-500 hover:bg-green-600">
        Approve
      </FormSubmitButton>

      {formState?.error && (
        <p
          className="text-sm
         text-red-500"
        >
          {formState.error}
        </p>
      )}
    </form>
  );
}

function DeleteJobButton({ jobId }: { jobId: number }) {
  const [formState, formAction] = useFormState(deleteJob, undefined);

  return (
    <form action={formAction} className="space-y-1">
      <input hidden type="number" name="jobId" value={jobId} readOnly />
      <FormSubmitButton className="w-full bg-red-500 hover:bg-red-600">
        Delete
      </FormSubmitButton>

      {formState?.error && (
        <p
          className="text-sm
           text-red-500"
        >
          {formState.error}
        </p>
      )}
    </form>
  );
}
