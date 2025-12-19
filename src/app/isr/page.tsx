import { Timestamp } from "@/components/timestamp";

export default function ISRPage() {
    return (
        <Timestamp />
    );
}

export const revalidate = 60;