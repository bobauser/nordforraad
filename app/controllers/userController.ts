
import "server-only";
import { ValidationResult } from "@/app/types/user";
import { UserString } from "@/app/types/user";
import * as userService from "@/app/services/userService";

export function CheckValidation(userstring: string): ValidationResult {
    const profile: ValidationResult = userService.validateProfileCode(userstring);
    return profile
}

export function ValidateUser(user_profile: ValidationResult): UserString | null {
    const user:UserString | undefined = user_profile.parsed
    
    if (user?.username && user_profile.valid == true) {
        const DetectedUser: UserString = {
            emojiIndex: user.emojiIndex, 
            username: user.username, 
            words: user.words
        }
        return DetectedUser;
    }
    return null;
}

// TODO: Make a ValidateUserString method instead??
// export function ValidateUser(id_number: number): UserDB | null {
//         const profile: ValidationResult = userService.checkUserAgainstDatabase(id_number);
//         const user:UserString | undefined = profile.parsed
        
//         if (user?.username && profile.valid == true) {
//             const DetectedUser: UserString = {
//                 emojiIndex: user.emojiIndex, 
//                 username: user.username, 
//                 words: user.words
//             }
//             return DetectedUser;
//         }
//         return null;
// }