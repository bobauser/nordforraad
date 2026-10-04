export function InfoIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="11" x2="12" y2="16.5"/>
            <circle cx="12" cy="7.5" r="1.25" fill="currentColor" stroke="none"/>
        </svg>
    )
}

export function Warning() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13.5"/>
            <circle cx="12" cy="17" r="1.25" fill="currentColor" stroke="none"/>
        </svg>
    )
}

export function Error() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="7" x2="12" y2="12.5"/>
            <circle cx="12" cy="16.5" r="1.25" fill="currentColor" stroke="none"/>
        </svg>
    )
}