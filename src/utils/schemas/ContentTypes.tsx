import { z } from "zod";

export const UpdateComment = z.object({
    content: z.string().optional(),
   
})

export type UpdateCommentType = z.infer<typeof UpdateComment>