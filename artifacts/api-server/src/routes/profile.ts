import { Router } from "express";
import { db, profileSettingsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();
const AUTH_PASSWORD = process.env.ADMIN_PASSWORD ?? "asra2024";

function parseProfile(row: any) {
  return {
    ...row,
    posisiDilamar: JSON.parse(row.posisiDilamar || "[]"),
    skills: JSON.parse(row.skills || "[]"),
    softSkills: JSON.parse(row.softSkills || "[]"),
    additionalInfo: JSON.parse(row.additionalInfo || "[]"),
  };
}

router.get("/profile", async (req, res) => {
  try {
    const rows = await db.select().from(profileSettingsTable).where(eq(profileSettingsTable.id, 1));
    if (rows.length === 0) return res.status(404).json({ error: "Profil belum dikonfigurasi" });
    res.json(parseProfile(rows[0]));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Gagal mengambil data" });
  }
});

router.put("/profile", async (req, res) => {
  try {
    const { adminPassword, ...fields } = req.body;
    if (adminPassword !== AUTH_PASSWORD) return res.status(401).json({ error: "Password admin salah" });

    const values = {
      name: fields.name ?? "",
      tagline: fields.tagline ?? "",
      summary: fields.summary ?? "",
      phone: fields.phone ?? "",
      email: fields.email ?? "",
      location: fields.location ?? "",
      linkedin: fields.linkedin ?? "",
      pintarnya: fields.pintarnya ?? "",
      glints: fields.glints ?? "",
      jobstreet: fields.jobstreet ?? "",
      kitalulus: fields.kitalulus ?? "",
      siapkerja: fields.siapkerja ?? "",
      instagram: fields.instagram ?? "",
      tiktok: fields.tiktok ?? "",
      telegram: fields.telegram ?? "",
      facebook: fields.facebook ?? "",
      posisiDilamar: JSON.stringify(Array.isArray(fields.posisiDilamar) ? fields.posisiDilamar : []),
      skills: JSON.stringify(Array.isArray(fields.skills) ? fields.skills : []),
      softSkills: JSON.stringify(Array.isArray(fields.softSkills) ? fields.softSkills : []),
      additionalInfo: JSON.stringify(Array.isArray(fields.additionalInfo) ? fields.additionalInfo : []),
    };

    const existing = await db.select().from(profileSettingsTable).where(eq(profileSettingsTable.id, 1));
    let row;
    if (existing.length === 0) {
      [row] = await db.insert(profileSettingsTable).values({ id: 1, ...values }).returning();
    } else {
      [row] = await db.update(profileSettingsTable).set(values).where(eq(profileSettingsTable.id, 1)).returning();
    }
    res.json(parseProfile(row));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Gagal menyimpan" });
  }
});

export default router;
