// src/app/dashboard/add-anime/page.js

import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth";
import { redirect } from "next/navigation";
import AddAnimeForm from "../../../components/AddAnimeForm";

export default async function AddAnimePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login?callbackUrl=/dashboard/add-anime");

  return (
    <div className="space-y-3 text-center">
      <h1 className="text-2xl font-semibold">Add Anime</h1>
      <AddAnimeForm />
    </div>
  );
}