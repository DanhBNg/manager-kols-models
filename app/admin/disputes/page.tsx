import { redirect } from "next/navigation";

export default function LegacyAdminDisputesPage() {
  redirect("/admin/payments-escrow/disputes");
}
