import { revalidateTag } from "next/cache";

export async function POST(_req: Request) {
    revalidateTag("data-cache");
    return Response.json({ revalidated: true, now: Date.now() });
}
