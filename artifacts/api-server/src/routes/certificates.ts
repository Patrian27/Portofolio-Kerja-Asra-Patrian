import { Router } from "express";
import { db, certificatesTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";

const router = Router();
const AUTH_PASSWORD = process.env.ADMIN_PASSWORD ?? "asra2024";

router.get("/certificates", async (req, res) => {
  try {
    const rows = await db.select().from(certificatesTable).orderBy(asc(certificatesTable.id));
    res.json(rows);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Gagal mengambil data" });
  }
});

router.post("/certificates", async (req, res) => {
  try {
    const { adminPassword, title, issuer, date, category, image } = req.body;
    if (adminPassword !== AUTH_PASSWORD) return res.status(401).json({ error: "Password admin salah" });
    if (!title || !image) return res.status(400).json({ error: "Data tidak lengkap" });

    const [row] = await db.insert(certificatesTable).values({
      title,
      issuer: issuer || "",
      date: date || "",
      category: category || "Lainnya",
      image,
    }).returning();

    res.status(201).json(row);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Gagal menyimpan" });
  }
});

router.delete("/certificates/:id", async (req, res) => {
  try {
    const { adminPassword } = req.body;
    if (adminPassword !== AUTH_PASSWORD) return res.status(401).json({ error: "Password admin salah" });
    await db.delete(certificatesTable).where(eq(certificatesTable.id, parseInt(req.params.id)));
    res.json({ ok: true });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Gagal menghapus" });
  }
});

export default router;
