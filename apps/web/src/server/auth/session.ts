import { getServerSession } from "next-auth";
import { authConfig } from "./config";

export async function getSession() {
  return getServerSession(authConfig);
}
