// app/api/users/route.ts
import { NextResponse } from "next/server";
import { notFound } from 'next/navigation';
import { UserString } from "@/app/types/user";
import * as userController from "@/app/controllers/userController";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> })
{
    const { id } = await params; // async i nyere versjoner

    const id_number = Number(id); 

    // Valgfritt: Sjekk om ID faktisk er et gyldig tall
    if (isNaN(id_number)) {
        return NextResponse.json({ error: 'Ugyldig ID-format' }, { status: 400 });
    }

    const profile: UserString | null = userController.ValidateUser(id_number);

    if (profile == null) {
        notFound();
    } else {
        return NextResponse.json(profile);
    }
}