import { cookies } from "next/headers";
import { PasswordGate } from "@/components/PasswordGate";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  const authorized = session === process.env.ADMIN_PASSWORD;

  if (!authorized) {
    return <PasswordGate />;
  }

  return <>{children}</>
}
