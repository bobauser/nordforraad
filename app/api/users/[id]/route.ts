// app/api/users/route.ts
import { NextResponse } from "next/server";
import { notFound } from 'next/navigation';
import { ValidationResult } from "@/app/types/user";
import { UserString } from "@/app/types/user";
import { checkUserAgainstDatabase } from "@/app/services/userService";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> })
{
    const { id } = await params; // async i nyere versjoner
    const { searchParams } = new URL(req.url);
    const emoji_id = Number(searchParams.get('emoji_id'))

    const id_number = Number(id);
    // Valgfritt: Sjekk om ID faktisk er et gyldig tall
    if (isNaN(id_number)) {
        return NextResponse.json({ error: 'Ugyldig ID-format' }, { status: 400 });
    }

    let profile: ValidationResult = checkUserAgainstDatabase(id_number);

    if (!profile.valid || !profile.parsed) {
        notFound();
    } else {
        // let emoji = GetProfileEmoji(emoji_id)
        let user:UserString = profile.parsed
        return NextResponse.json({emojiIndex: user.emojiIndex, username: user.username, words: user.words});
    }
}