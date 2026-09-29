import type { ReactNode, SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number | string; strokeWidth?: number | string }

function Icon({ children, size = 20, strokeWidth = 2, ...props }: IconProps & { children: ReactNode }) {
  return <svg aria-hidden="true" fill="none" height={size} viewBox="0 0 24 24" width={size} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} {...props}>{children}</svg>
}

export const ArrowRight = (props: IconProps) => <Icon {...props}><path d="M5 12h14M12 5l7 7-7 7" /></Icon>
export const ArrowUpRight = (props: IconProps) => <Icon {...props}><path d="M7 17 17 7M7 7h10v10" /></Icon>
export const BookOpen = (props: IconProps) => <Icon {...props}><path d="M12 7v14m0-14C9.5 4.8 6.5 4 3 4v14c3.5 0 6.5.8 9 3m0-14c2.5-2.2 5.5-3 9-3v14c-3.5 0-6.5.8-9 3" /></Icon>
export const Bot = (props: IconProps) => <Icon {...props}><path d="M12 8V4m-2 0h4M8 11h.01M16 11h.01M7 16h10M5 9h14a2 2 0 0 1 2 2v7a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-7a2 2 0 0 1 2-2Z" /><path d="M3 14H1m22 0h-2" /></Icon>
export const Check = (props: IconProps) => <Icon {...props}><path d="m5 12 4 4L19 6" /></Icon>
export const CreditCard = (props: IconProps) => <Icon {...props}><rect x="2" y="4" width="20" height="16" rx="3" /><path d="M2 10h20m-15 5h3" /></Icon>
export const ChevronRight = (props: IconProps) => <Icon {...props}><path d="m9 18 6-6-6-6" /></Icon>
export const CircleHelp = (props: IconProps) => <Icon {...props}><circle cx="12" cy="12" r="10" /><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3m.1 4h.01" /></Icon>
export const Clock3 = (props: IconProps) => <Icon {...props}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></Icon>
export const Compass = (props: IconProps) => <Icon {...props}><circle cx="12" cy="12" r="10" /><path d="m16.2 7.8-2.7 5.7-5.7 2.7 2.7-5.7 5.7-2.7Z" /></Icon>
export const Flame = (props: IconProps) => <Icon {...props}><path d="M8.5 14.5c0-2.1 1.5-3.2 2.5-5.5.5 2.5 3.5 3.5 3.5 6.5a4.5 4.5 0 1 1-9 0c0-1.9.9-3.6 2-4.5 0 1.5.3 2.5 1 3.5Zm7.1-9.2c.4 2.1 2.9 3.4 2.9 6.7a6.5 6.5 0 1 1-13 0" /></Icon>
export const GraduationCap = (props: IconProps) => <Icon {...props}><path d="m2 10 10-5 10 5-10 5-10-5Zm4 2v5c3.5 2.7 8.5 2.7 12 0v-5m4-2v6" /></Icon>
export const LayoutDashboard = (props: IconProps) => <Icon {...props}><rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="3" width="8" height="5" rx="1.5" /><rect x="13" y="10" width="8" height="11" rx="1.5" /><rect x="3" y="13" width="8" height="8" rx="1.5" /></Icon>
export const Award = (props: IconProps) => <Icon {...props}><circle cx="12" cy="8" r="6" /><path d="m8.2 13-1.3 8 5.1-2.5 5.1 2.5-1.3-8" /></Icon>
export const UserRound = (props: IconProps) => <Icon {...props}><circle cx="12" cy="8" r="4" /><path d="M5 21v-2a7 7 0 0 1 14 0v2" /></Icon>
export const Plus = (props: IconProps) => <Icon {...props}><path d="M12 5v14M5 12h14" /></Icon>
export const Printer = (props: IconProps) => <Icon {...props}><path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v7H6z" /><path d="M18 12h.01" /></Icon>
export const Search = (props: IconProps) => <Icon {...props}><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></Icon>
export const Sparkles = (props: IconProps) => <Icon {...props}><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Zm7 12 .9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z" /></Icon>
export const Target = (props: IconProps) => <Icon {...props}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></Icon>
export const Trophy = (props: IconProps) => <Icon {...props}><path d="M8 21h8m-4-4v4m-5-18h10v5a5 5 0 0 1-10 0V3ZM7 6H3v2a5 5 0 0 0 5 5m9-7h4v2a5 5 0 0 1-5 5" /></Icon>
