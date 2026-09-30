
import "server-only";
import { ValidationResult } from "@/app/types/user";
import { UserString } from "@/app/types/user";
import * as userService from "@/app/services/userService";

export function ValidateUser(id_number: number): UserString | null {
        const profile: ValidationResult = userService.checkUserAgainstDatabase(id_number);
        const user:UserString | undefined = profile.parsed
        
        if (user?.username && profile.valid == true) {
            const DetectedUser: UserString = {
                emojiIndex: user.emojiIndex, 
                username: user.username, 
                words: user.words
            }
            return DetectedUser;
        }
        return null;
}