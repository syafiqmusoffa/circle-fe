import { z } from "zod";

export const CreateThread = z.object({
    content: z.string().optional(),
    imageUrl: z.union([z.string(), z.instanceof(File)]).optional(),
}).refine((data) => data.content || data.imageUrl, {
    message: "minimal salah satunya harus terisi",
    path: ['content']
})

export type CreateThreadDTO = z.infer<typeof CreateThread>