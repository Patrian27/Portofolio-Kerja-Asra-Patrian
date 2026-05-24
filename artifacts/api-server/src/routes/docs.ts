import { Router } from "express";
import { db, workDocsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/docs", async (req, res) => {
  try {
    const docs = await db
      .select()
      .from(workDocsTable)
      .orderBy(workDocsTable.createdAt);
    res.json(docs);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Gagal mengambil data" });
  }
});

router.post("/docs", async (req, res) => {
  try {
    const { title, category, company, location, date, description, imageBefore, imageProgress, imageAfter, adminPassword } = req.body;

    if (adminPassword !== process.env.ADMIN_PASSWORD && adminPassword !== "asra2024") {
      return res.status(401).json({ error: "Password admin salah" });
    }

    if (!title || !category || !company || !date || !imageAfter) {
      return res.status(400).json({ error: "Data tidak lengkap" });
    }

    const [doc] = await db
      .insert(workDocsTable)
      .values({
        title,
        category,
        company,
        location: location || "",
        date,
        description: description || "",
        imageBefore: imageBefore || null,
        imageProgress: imageProgress || null,
        imageAfter,
      })
      .returning();

    res.status(201).json(doc);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Gagal menyimpan data" });
  }
});

router.delete("/docs/:id", async (req, res) => {
  try {
    const { adminPassword } = req.body;
    if (adminPassword !== process.env.ADMIN_PASSWORD && adminPassword !== "asra2024") {
      return res.status(401).json({ error: "Password admin salah" });
    }

    const id = parseInt(req.params.id);
    await db.delete(workDocsTable).where(eq(workDocsTable.id, id));
    res.json({ ok: true });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Gagal menghapus data" });
  }
});

export default router;
