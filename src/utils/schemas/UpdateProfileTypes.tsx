import { z } from "zod";

export const UpdateProfileTypes = z.object({
    name: z.string().optional(),
    username: z.string().optional(),
    bio: z.string().optional(),
    avatarUrl: z.string().optional(),
    bannerUrl: z.string().optional()
})

export type UpdateProfileschemaType = z.infer<typeof UpdateProfileTypes>