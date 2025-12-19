import { revalidatePath } from "next/cache";

export async function POST(_req: Request) {
    revalidatePath("/isr", "page");
    return Response.json({ revalidated: true, now: Date.now() });
}
