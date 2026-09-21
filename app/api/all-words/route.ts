// app/api/users/route.ts
import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Finner stien til public/data.json fra rotmappen
    const filePath = path.join(process.cwd(), 'public', 'ordlaeringordliste.json');
    // Leser filen fra disken som tekst
    const fileData = fs.readFileSync(filePath, 'utf8');
    // Gjør om teksten til et JSON-objekt/liste
    const data = JSON.parse(fileData);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Klarte ikke lese filen' }, { status: 500 });
  }
}