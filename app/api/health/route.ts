import { NextResponse } from "next/server";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin-config";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    ok: true,
    firebaseAdminConfigured: isFirebaseAdminConfigured(),
  });
}
