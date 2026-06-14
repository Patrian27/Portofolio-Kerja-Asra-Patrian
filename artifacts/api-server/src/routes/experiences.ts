import { Router } from "express";
import { db, workExperiencesTable } from "@workspace/db";
import { eq, asc, inArray } from "drizzle-orm";

const router = Router();

const AUTH_PASSWORD = process.env.ADMIN_PASSWORD ?? "asra2024";

router.get("/experiences", async (req, res) => {
  try {
    const rows = await db.select().from(workExperiencesTable).orderBy(asc(workExperiencesTable.sortOrder), asc(workExperiencesTable.id));
    const data = rows.map((r) => ({
      ...r,
      responsibilities: JSON.parse(r.responsibilities || "[]"),
    }));
    res.json(data);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Gagal mengambil data" });
  }
});

router.post("/experiences", async (req, res) => {
  try {
    const { adminPassword, role, company, via, period, location, responsibilities, sortOrder } = req.body;
    if (adminPassword !== AUTH_PASSWORD) return res.status(401).json({ error: "Password admin salah" });
    if (!role || !company || !period) return res.status(400).json({ error: "Data tidak lengkap" });

    const [row] = await db.insert(workExperiencesTable).values({
      role,
      company,
      via: via || null,
      period,
      location: location || "",
      responsibilities: JSON.stringify(Array.isArray(responsibilities) ? responsibilities : []),
      sortOrder: sortOrder ?? 0,
    }).returning();

    res.status(201).json({ ...row, responsibilities: JSON.parse(row.responsibilities) });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Gagal menyimpan" });
  }
});

router.put("/experiences/:id", async (req, res) => {
  try {
    const { adminPassword, role, company, via, period, location, responsibilities } = req.body;
    if (adminPassword !== AUTH_PASSWORD) return res.status(401).json({ error: "Password admin salah" });
    if (!role || !company || !period) return res.status(400).json({ error: "Data tidak lengkap" });

    const id = parseInt(req.params.id);
    const existing = await db.select().from(workExperiencesTable).where(eq(workExperiencesTable.id, id));
    if (existing.length === 0) return res.status(404).json({ error: "Data tidak ditemukan" });

    const [row] = await db.update(workExperiencesTable).set({
      role,
      company,
      via: via || null,
      period,
      location: location || "",
      responsibilities: JSON.stringify(Array.isArray(responsibilities) ? responsibilities : []),
      sortOrder: existing[0].sortOrder,
    }).where(eq(workExperiencesTable.id, id)).returning();

    res.json({ ...row, responsibilities: JSON.parse(row.responsibilities) });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Gagal menyimpan" });
  }
});

router.post("/experiences/reorder", async (req, res) => {
  try {
    const { adminPassword, ids } = req.body;
    if (adminPassword !== AUTH_PASSWORD) return res.status(401).json({ error: "Password admin salah" });
    if (!Array.isArray(ids)) return res.status(400).json({ error: "ids harus array" });

    await Promise.all(
      ids.map((id: number, index: number) =>
        db.update(workExperiencesTable).set({ sortOrder: index }).where(eq(workExperiencesTable.id, id))
      )
    );
    res.json({ ok: true });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Gagal menyimpan urutan" });
  }
});

router.delete("/experiences/:id", async (req, res) => {
  try {
    const { adminPassword } = req.body;
    if (adminPassword !== AUTH_PASSWORD) return res.status(401).json({ error: "Password admin salah" });
    await db.delete(workExperiencesTable).where(eq(workExperiencesTable.id, parseInt(req.params.id)));
    res.json({ ok: true });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Gagal menghapus" });
  }
});

export default router;
