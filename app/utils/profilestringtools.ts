export function ProfileEncoder() {
    //TODO: implement, use same code as last time
}

export function ProfileDecoder() {
    //TODO: decode, x2 ^^
}

export function ReadProfileString() {

}

export function GetProfileEmoji(index: number) {
    const EMOJI_CHOICES = ["🦉","🦊","🐨","🐢","🦁","🐙","🐝","🦄","🐺","🐧","🦖","🐬"];
    if (index >= EMOJI_CHOICES.length) // index cannot be equal to its length, if length is 10, highest index is 9, aka if index==length then the index is invalid
    {
        return "❔"
    } else {
        return EMOJI_CHOICES[index]
    }
}
