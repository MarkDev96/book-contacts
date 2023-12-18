import { z } from "zod";

const EnvSchema = z.object({
    DB_HOST_DEV: z.string(),
    DB_USERNAME_DEV: z.string(),
    DB_PASSWORD_DEV: z.string(),
    PORT: z.string().optional().default("8000").transform((val) => Number(val)),
});

export default EnvSchema;