import React from "react";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import JobPage from "@/components/JobPage";
import AdminSidebar from "./AdminSidebar";

interface PageProps {
  params: { slug: string };
}
const page = async ({ params: { slug } }: PageProps) => {
  const job = await prisma.job.findUnique({
    where: {
      slug,
    },
  });
  console.log(job);

  if (!job) notFound();

  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobPage job={job} />
      <AdminSidebar job={job} />
    </main>
  );
};

export default page;
