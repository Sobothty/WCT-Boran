export const COUPON_CODES = {
    NIHAO: "NIHAO",
    XMAS2025: "XMAS2025",
    KYN: "KYN2025"
} as const;

export type CouponCode = keyof typeof COUPON_CODES;