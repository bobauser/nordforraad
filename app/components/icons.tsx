import { useId, type SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
    size?: number | string;
};

function BaseIcon({ size = 24, children, ...props }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            {...props}
        >
            {children}
        </svg>
    );
}

/* ---------- Status ---------- */

export function InfoIcon(props: IconProps) {
    return (
        <BaseIcon {...props}>
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="11" x2="12" y2="16.5" />
            <circle cx="12" cy="7.5" r="1.25" fill="currentColor" stroke="none" />
        </BaseIcon>
    );
}

export function WarningIcon(props: IconProps) {
    return (
        <BaseIcon {...props}>
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13.5" />
            <circle cx="12" cy="17" r="1.25" fill="currentColor" stroke="none" />
        </BaseIcon>
    );
}

export function ErrorIcon(props: IconProps) {
    return (
        <BaseIcon {...props}>
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="7" x2="12" y2="12.5" />
            <circle cx="12" cy="16.5" r="1.25" fill="currentColor" stroke="none" />
        </BaseIcon>
    );
}

/* ---------- Laster inn / synk ---------- */

type SyncIconProps = IconProps & {
    /** Roterer ikonet kontinuerlig (laster inn / lagrer) */
    spinning?: boolean;
    /** Sekunder per runde */
    speed?: number;
};

export function SyncIcon({ spinning = false, speed = 1, ...props }: SyncIconProps) {
    return (
        <BaseIcon {...props}>
            <g>
                <path d="M20 12a8 8 0 0 0-14.55-4.59" />
                <polyline points="5.5 3 5.5 7.5 10 7.5" />
                <path d="M4 12a8 8 0 0 0 14.55 4.59" />
                <polyline points="18.5 21 18.5 16.5 14 16.5" />
                {spinning && (
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 12 12"
                        to="-360 12 12"
                        dur={`${speed}s`}
                        repeatCount="indefinite"
                    />
                )}
            </g>
        </BaseIcon>
    );
}

/* ---------- Piler (play-stil) ---------- */
/* Outline som standard. Fylt: <ArrowRightIcon fill="currentColor" /> */

export function ArrowRightIcon(props: IconProps) {
    return (
        <BaseIcon {...props}>
            <polygon points="8 5 19.5 12 8 19" />
        </BaseIcon>
    );
}

export function ArrowLeftIcon(props: IconProps) {
    return (
        <BaseIcon {...props}>
            <polygon points="16 5 4.5 12 16 19" />
        </BaseIcon>
    );
}

/* ---------- Lagre ---------- */

export function SaveIcon(props: IconProps) {
    return (
        <BaseIcon {...props}>
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
        </BaseIcon>
    );
}

/* ---------- Flagg ---------- */
/* Flaggene har faste farger (ikke currentColor). `size` = bredde. */

type FlagProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
    size?: number;
    /** Hjørneradius i viewBox-enheter */
    radius?: number;
};

export function NorwayFlagIcon({ size = 24, radius = 2, ...props }: FlagProps) {
    const clip = useId();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 22 16"
            width={size}
            height={(size * 16) / 22}
            aria-hidden="true"
            {...props}
        >
            <defs>
                <clipPath id={clip}>
                    <rect width="22" height="16" rx={radius} />
                </clipPath>
            </defs>
            <g clipPath={`url(#${clip})`}>
                <rect width="22" height="16" fill="#BA0C2F" />
                <rect x="6" width="4" height="16" fill="#FFFFFF" />
                <rect y="6" width="22" height="4" fill="#FFFFFF" />
                <rect x="7" width="2" height="16" fill="#00205B" />
                <rect y="7" width="22" height="2" fill="#00205B" />
            </g>
        </svg>
    );
}

export function UKFlagIcon({ size = 24, radius = 4, ...props }: FlagProps) {
    const clip = useId();
    const diag = useId();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 60 30"
            width={size}
            height={size / 2}
            aria-hidden="true"
            {...props}
        >
            <defs>
                <clipPath id={clip}>
                    <rect width="60" height="30" rx={radius} />
                </clipPath>
                <clipPath id={diag}>
                    <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
                </clipPath>
            </defs>
            <g clipPath={`url(#${clip})`}>
                <rect width="60" height="30" fill="#012169" />
                <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" strokeWidth={6} />
                <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth={4} clipPath={`url(#${diag})`} />
                <path d="M30,0 v30 M0,15 h60" stroke="#FFFFFF" strokeWidth={10} />
                <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth={6} />
            </g>
        </svg>
    );
}