// app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/lib/auth"; // Pastikan path ini benar

// Ekspor GET dan POST secara eksplisit
export const { GET, POST } = handlers;