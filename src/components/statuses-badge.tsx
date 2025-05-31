import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority"
import { Ban, CircleAlert, CircleCheck, CirclePause } from "lucide-react";

const badgeVariants = cva(
  "tracking-wide border bg-transparent px-3 py-1 rounded-full flex items-center gap-1",
  {
    variants : {
        variant: {
            unverified: "border-[#800C05] text-[#C01048]",
            verified: "border-[#027948] text-[#027948]",
            pending: "border-[#B93815] text-[#B93815]",

            active: "border-[#027948] text-[#75E0A7] bg-[#053321]",
            blacklisted: "border-[#F63D68] text-[#FDA19B] bg-[#55160C]",
            disabled: "border-[#333741] text-white bg-[#161B26]",
        },
    }
  },
)

const circleStyle = "w-[6px] h-[6px] rounded-full";


// Verification status badge
export function VerifiedBadge() {
  return (
    <Badge className={badgeVariants({ variant: "verified" })}>
        <span className={cn(circleStyle, "bg-[#12B76A]")} />
        Verified
    </Badge>
  );
}

export function UnverifiedBadge() {
  return (
    <Badge className={badgeVariants({ variant: "unverified" })}>
        <span className={cn(circleStyle, "bg-[#F63D68]")} />
        Unverified
    </Badge>
  );
}

export function PendingBadge() {
  return (
    <Badge className={badgeVariants({ variant: "pending" })}>
        <span className={cn(circleStyle, "bg-[#EF6820]")} />
        Pending
    </Badge>
  );
}


// Status badge
export function ActiveBadge() {
  return (
    <Badge className={badgeVariants({ variant: "active" })}>
        {/* <span className={cn(circleStyle, "bg-[#12B76A]")} /> */}
        <CircleCheck />
        Active
    </Badge>
  );
}

export function BlacklistedBadge() {
  return (
    <Badge className={badgeVariants({ variant: "blacklisted" })}>
        <CircleAlert />
        Blacklisted
    </Badge>
  );
}

export function DisabledBadge() {
  return (
    <Badge className={badgeVariants({ variant: "disabled" })}>
        <Ban />
        Disabled
    </Badge>
  );
}

export function SuspendedBadge() {
  return (
    <Badge className={badgeVariants({ variant: "disabled" })}>
        <CirclePause />
        Suspended
    </Badge>
  );
}