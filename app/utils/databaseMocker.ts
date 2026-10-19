import { UserDB, WordItem } from "../types/user"

//TODO: delete mockDB later and connect to actual database
export function mockUserDB_GetUserStringFromID(id: number): string | null {
    const userobject = USERDATABASEMOCK[id]
    let userString: string | null = ""
    try {
        userString = userobject.userString
    }
    catch {
        userString = null
    }
    return userString;
}

// FIXME: Remove later on. This is an internal test, and the API shouldnt exist in the finished product "api/all-users" <--. Remove before release!
export function mockUserDB_GetAllUsersStrings() {
    return [
        "MHxOeVN0YXJ0fG1lcml0dDoyOjIscHJlbWlzczotMTox", 
        "MnxNaWR0TCVDMyVCOHlwZXxtZXJpdHQ6Njo0LHByZW1pc3M6NDozLGhpc3RvcmlzazotMToyLGludHJhdmVuLXM6MjozLGJlc2tqZWRlbjo4OjUsb21mYXR0ZW5kZTowOjEsc21hcmFnZDozOjIsYmVicmVpZGU6LTM6Mg==", 
        "N3xPcmRNZXN0ZXJ8bWVyaXR0OjE0OjcscHJlbWlzczoxMjo2LGhpc3RvcmlzazoxMDo1LGludHJhdmVuLXM6OTo1LGJlc2tqZWRlbjoxMzo2LG9tZmF0dGVuZGU6MTE6NixzbWFyYWdkOjg6NCxiZWJyZWlkZTo3OjQsaXZlcjoxNTo4LGFuc3ZhcnNsLXNoZXQ6Njo0LGludHJpa2F0Ojk6NSxvbWZvcmVudDoxMjo2LGVrc3Rhc2U6NTozLGdsZWRlc3J1czoxMDo1LGRpc3RyZTo0OjM=", 
        "OXxUcmVuZ2VyJUMzJTk4dmluZ3xtZXJpdHQ6LTU6NixwcmVtaXNzOi00OjUsaGlzdG9yaXNrOi01OjcsaW50cmF2ZW4tczotMjo0LGJlc2tqZWRlbjoxOjMsb21mYXR0ZW5kZTotMzo0LGJseWdzZWw6LTU6NSxzamVuYW5zZTotMToy"
    ]
}

export function mockUserDB_GetAllUsers() {
    return LOCALSTRINGDATABASE;
}

// this function has data pre-prepped. This is because this would be genuine data in the database alongside the user's userstring.
export function mockUserDB_GetWeeklyWords(id: number) {
    switch (id) {
        case 1:
            return [
                {"id": "iver"},
                {"id": "intrikat"},
                {"id": "historisk"},
            ];
            break;
        case 2:
            return [
                {"id": "distre"},
                {"id": "ekstase"},
                {"id": "blygsel"},
                {"id": "sjenanse"},
                {"id": "fort-rnet"},
            ];
            break;
        case 3:
            return [
                {"id": "utilstrekkelighet"},
                {"id": "indignert"},
                {"id": "butt"},
            ];
            break;
        case 4:
            return [
                {"id": "bebreide"},
                {"id": "omfattende"},
            ];
            break;
    }
    return null;
}

export function mockUserDB_getUserId(usrnm: string): number {
    let userIdFound = -1 // -1 is not possible, this is why its given uppon assign here
    USERDATABASEMOCK.every((user, index) => {
        if (user.username === usrnm) {
            userIdFound = index
            return false;
        }
        return true;
    });
    return userIdFound
}

export function mockUserDB_GetUserFromId(id: number): UserDB | null {
    let user: UserDB | null = USERDATABASEMOCK[id]
    try {
        const username = user.username
    }
    catch {
        user = null
    }
    return user;
}

export function mockUserDB_GetWeeklyFromUserID(id: number): WordItem[] | null {
    const userobject = USERDATABASEMOCK[id]
    let weeklyList: WordItem[] | null
    try {
        weeklyList = userobject.weekly_wordlist
    }
    catch {
        weeklyList = null
    }
    return weeklyList;
}

//TODO: add function to check wether cookie matches with stored value. This should replace the RANDOM ID system we have during testing!
// export function mockUserDB_CheckSessionString(session: string) {

// }

// TODO: Add the data from the other objects aswell! Use the databsemodel from README
const USERDATABASEMOCK: UserDB[] = [
    {
        "username": "NyStart",
        "userString": "MHxOeVN0YXJ0fG1lcml0dDoyOjIscHJlbWlzczotMTox",
        "sessionID": "23ijiu5h3h8f",
        "weekly_wordlist": [
            {"id": "meritt"}
        ]
    },
    {
        "username": "MidtLøype",
        "userString": "MnxNaWR0TCVDMyVCOHlwZXxtZXJpdHQ6Njo0LHByZW1pc3M6NDozLGhpc3RvcmlzazotMToyLGludHJhdmVuLXM6MjozLGJlc2tqZWRlbjo4OjUsb21mYXR0ZW5kZTowOjEsc21hcmFnZDozOjIsYmVicmVpZGU6LTM6Mg",
        "sessionID": "wh5j4jehj45j",
        "weekly_wordlist": [
            {"id": "premiss"},
            {"id": "beskjeden"}
        ]
    },
    {
        "username": "OrdMester",
        "userString": "N3xPcmRNZXN0ZXJ8bWVyaXR0OjE0OjcscHJlbWlzczoxMjo2LGhpc3RvcmlzazoxMDo1LGludHJhdmVuLXM6OTo1LGJlc2tqZWRlbjoxMzo2LG9tZmF0dGVuZGU6MTE6NixzbWFyYWdkOjg6NCxiZWJyZWlkZTo3OjQsaXZlcjoxNTo4LGFuc3ZhcnNsLXNoZXQ6Njo0LGludHJpa2F0Ojk6NSxvbWZvcmVudDoxMjo2LGVrc3Rhc2U6NTozLGdsZWRlc3J1czoxMDo1LGRpc3RyZTo0OjM",
        "sessionID": "tyk56k56e",
        "weekly_wordlist": [
            {"id": "bebreide"}
        ]
    },
    {
        "username": "TrengerØving",
        "userString": "OXxUcmVuZ2VyJUMzJTk4dmluZ3xtZXJpdHQ6LTU6NixwcmVtaXNzOi00OjUsaGlzdG9yaXNrOi01OjcsaW50cmF2ZW4tczotMjo0LGJlc2tqZWRlbjoxOjMsb21mYXR0ZW5kZTotMzo0LGJseWdzZWw6LTU6NSxzamVuYW5zZTotMToy",
        "sessionID": "whjj45465rj",
        "weekly_wordlist": [
            {"id": "intraven-s"},
            {"id": "blygsel"},
            {"id": "sjenanse"}
        ]
    }
]

// OBS: This is a ValidationResult type setup, this is incorrect! FIXME! This is the local instance of the database. This data comes from GetAllUsers (the hard way) of de-stringifying the userstrings. Instead, this list can simply be returned of our testguys
const LOCALSTRINGDATABASE = [
  {
    "valid": true,
    "errors": [],
    "parsed": {
      "emojiIndex": 0,
      "username": "NyStart",
      "words": [
        {
          "id": "meritt",
          "score": 2,
          "attempts": 2
        },
        {
          "id": "premiss",
          "score": -1,
          "attempts": 1
        }
      ]
    }
  },
  {
    "valid": true,
    "errors": [],
    "parsed": {
      "emojiIndex": 2,
      "username": "MidtLøype",
      "words": [
        {
          "id": "meritt",
          "score": 6,
          "attempts": 4
        },
        {
          "id": "premiss",
          "score": 4,
          "attempts": 3
        },
        {
          "id": "historisk",
          "score": -1,
          "attempts": 2
        },
        {
          "id": "intraven-s",
          "score": 2,
          "attempts": 3
        },
        {
          "id": "beskjeden",
          "score": 8,
          "attempts": 5
        },
        {
          "id": "omfattende",
          "score": 0,
          "attempts": 1
        },
        {
          "id": "smaragd",
          "score": 3,
          "attempts": 2
        },
        {
          "id": "bebreide",
          "score": -3,
          "attempts": 2
        }
      ]
    }
  },
  {
    "valid": true,
    "errors": [],
    "parsed": {
      "emojiIndex": 7,
      "username": "OrdMester",
      "words": [
        {
          "id": "meritt",
          "score": 14,
          "attempts": 7
        },
        {
          "id": "premiss",
          "score": 12,
          "attempts": 6
        },
        {
          "id": "historisk",
          "score": 10,
          "attempts": 5
        },
        {
          "id": "intraven-s",
          "score": 9,
          "attempts": 5
        },
        {
          "id": "beskjeden",
          "score": 13,
          "attempts": 6
        },
        {
          "id": "omfattende",
          "score": 11,
          "attempts": 6
        },
        {
          "id": "smaragd",
          "score": 8,
          "attempts": 4
        },
        {
          "id": "bebreide",
          "score": 7,
          "attempts": 4
        },
        {
          "id": "iver",
          "score": 15,
          "attempts": 8
        },
        {
          "id": "ansvarsl-shet",
          "score": 6,
          "attempts": 4
        },
        {
          "id": "intrikat",
          "score": 9,
          "attempts": 5
        },
        {
          "id": "omforent",
          "score": 12,
          "attempts": 6
        },
        {
          "id": "ekstase",
          "score": 5,
          "attempts": 3
        },
        {
          "id": "gledesrus",
          "score": 10,
          "attempts": 5
        },
        {
          "id": "distre",
          "score": 4,
          "attempts": 3
        }
      ]
    }
  },
  {
    "valid": true,
    "errors": [],
    "parsed": {
      "emojiIndex": 9,
      "username": "TrengerØving",
      "words": [
        {
          "id": "meritt",
          "score": -5,
          "attempts": 6
        },
        {
          "id": "premiss",
          "score": -4,
          "attempts": 5
        },
        {
          "id": "historisk",
          "score": -5,
          "attempts": 7
        },
        {
          "id": "intraven-s",
          "score": -2,
          "attempts": 4
        },
        {
          "id": "beskjeden",
          "score": 1,
          "attempts": 3
        },
        {
          "id": "omfattende",
          "score": -3,
          "attempts": 4
        },
        {
          "id": "blygsel",
          "score": -5,
          "attempts": 5
        },
        {
          "id": "sjenanse",
          "score": -1,
          "attempts": 2
        }
      ]
    }
  }
]