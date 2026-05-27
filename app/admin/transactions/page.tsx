import { redirect } from "next/navigation";

export default function LegacyAdminTransactionsPage() {
  redirect("/admin/payments-escrow/transactions");
}
