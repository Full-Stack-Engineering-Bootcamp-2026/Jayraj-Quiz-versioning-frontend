import { jwtDecode } from "jwt-decode";

import type { JwtPayload } from "@/types/auth";

export const decodeToken = (
  token: string
): JwtPayload => {
  return jwtDecode<JwtPayload>(token);
};