import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";

const f = createUploadthing();

export const ourFileRouter = {
  thumbnailUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      const self = await getSelf();

      if (!self) throw new UploadThingError("Unauthorized");
      return { user: self };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { thumbnailUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
