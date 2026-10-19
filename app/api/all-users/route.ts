// app/api/users/route.ts
import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';
import * as userService from "@/app/services/userService"

// FIXME: Test-api, remember to remove it before release! #prerelease
export async function GET() {
  const data = userService.findAllUsers()
  return NextResponse.json(data)
}