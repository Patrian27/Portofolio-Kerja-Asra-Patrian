import { Router } from "express";
import { db, educationTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";

const router = Router();

const AUTH_PASSWORD = process.env.ADMIN_PASSWORD ?? "asra2024";

router.get("/education", async (req, res) => {
  try {
    const rows = await db.select().from(educationTable).orderBy(asc(educationTable.sortOrder), asc(educationTable.id));
    res.json(rows);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Gagal mengambil data" });
  }
});

router.post("/education", async (req, res) => {
  try {
    const { adminPassword, institution, major, year, schoolLogo, sortOrder } = req.body;
    if (adminPassword !== AUTH_PASSWORD) return res.status(401).json({ error: "Password admin salah" });
    if (!institution || !major || !year) return res.status(400).json({ error: "Data tidak lengkap" });

    const [row] = await db.insert(educationTable).values({
      institution,
      major,
      year,
      schoolLogo: schoolLogo || null,
      sortOrder: sortOrder ?? 0,
    }).returning();

    res.status(201).json(row);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Gagal menyimpan" });
  }
});

router.put("/education/:id", async (req, res) => {
  try {
    const { adminPassword, institution, major, year, schoolLogo } = req.body;
    if (adminPassword !== AUTH_PASSWORD) return res.status(401).json({ error: "Password admin salah" });
    if (!institution || !major || !year) return res.status(400).json({ error: "Data tidak lengkap" });

    const id = parseInt(req.params.id);
    const existing = await db.select().from(educationTable).where(eq(educationTable.id, id));
    if (existing.length === 0) return res.status(404).json({ error: "Data tidak ditemukan" });

    const [row] = await db.update(educationTable).set({
      institution,
      major,
      year,
      schoolLogo: schoolLogo !== undefined ? (schoolLogo || null) : existing[0].schoolLogo,
      sortOrder: existing[0].sortOrder,
    }).where(eq(educationTable.id, id)).returning();

    res.json(row);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Gagal menyimpan" });
  }
});

router.post("/education/reorder", async (req, res) => {
  try {
    const { adminPassword, ids } = req.body;
    if (adminPassword !== AUTH_PASSWORD) return res.status(401).json({ error: "Password admin salah" });
    if (!Array.isArray(ids)) return res.status(400).json({ error: "ids harus array" });

    await Promise.all(
      ids.map((id: number, index: number) =>
        db.update(educationTable).set({ sortOrder: index }).where(eq(educationTable.id, id))
      )
    );
    res.json({ ok: true });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Gagal menyimpan urutan" });
  }
});

router.delete("/education/:id", async (req, res) => {
  try {
    const { adminPassword } = req.body;
    if (adminPassword !== AUTH_PASSWORD) return res.status(401).json({ error: "Password admin salah" });
    await db.delete(educationTable).where(eq(educationTable.id, parseInt(req.params.id)));
    res.json({ ok: true });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Gagal menghapus" });
  }
});

export default router;
