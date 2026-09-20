// app/api/users/route.ts
import { NextResponse } from "next/server";
import { notFound } from 'next/navigation';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) 
{
    const { id } = await params; // async i nyere versjoner

    const id_number = Number(id);
    // Valgfritt: Sjekk om ID faktisk er et gyldig tall
    if (isNaN(id_number)) {
        return NextResponse.json({ error: 'Ugyldig ID-format' }, { status: 400 });
    }

    let name = testProfiles(id_number);
    if (name === null) {
        notFound();
    } else {
        return NextResponse.json([{ id: id_number, name: name }]);
    }
}


function testProfiles(id: number) {
    switch (id) {
        case 1:
            return "Bob";
            break;
        case 2:
            return "Garry";
            break;
        case 3:
            return "Terrence";
            break;
        case 4:
            return "Perry";
            break;
    }
    return null;
}