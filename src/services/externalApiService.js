const axios = require("axios");
require("dotenv").config();

let cache = { data: null, timestamp: 0 };
const CACHE_TTL = 60 * 1000; // 1 menit

/**
 * Fetch data dari external API (bit.ly redirect ke ogienurdiana.com).
 * Format response:
 * {
 *   "RC": 200,
 *   "RCM": "OK",
 *   "DATA": "NIM|YMD|NAMA\n0178453629|20220803|Abigail Williams\n..."
 * }
 */
async function fetchExternalData() {
  const now = Date.now();
  if (cache.data && now - cache.timestamp < CACHE_TTL) {
    return cache.data;
  }

  const response = await axios.get(process.env.EXTERNAL_API_URL, {
    timeout: 15000,
    maxRedirects: 5,
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; AdhivasindoBackend/1.0)",
    },
  });

  const payload = response.data;

  // Validasi response
  if (!payload || payload.RC !== 200 || typeof payload.DATA !== "string") {
    throw new Error("Unexpected response format from external API");
  }

  // Parse pipe-delimited string menjadi array of object
  const lines = payload.DATA.trim().split("\n");
  const headers = lines[0].split("|").map((h) => h.trim().toLowerCase());

  const rows = lines.slice(1).map((line) => {
    const values = line.split("|");
    const obj = {};
    headers.forEach((key, i) => {
      obj[key] = (values[i] || "").trim();
    });
    return obj;
  });

  console.log(`Fetched ${rows.length} rows from external API. Headers: ${headers.join(", ")}`);

  cache = { data: rows, timestamp: now };
  return rows;
}

/**
 * Cari berdasarkan NAMA (case-insensitive, partial match).
 * Contoh: "Turner Mia"
 */
async function searchByName(name) {
  const data = await fetchExternalData();
  const target = String(name).toLowerCase().trim();

  return data.filter((row) => {
    const nameVal = (row.nama || row.name || "").toLowerCase();
    return nameVal.includes(target);
  });
}

/**
 * Cari berdasarkan NIM (exact match).
 * Contoh: "9352078461"
 */
async function searchByNim(nim) {
  const data = await fetchExternalData();
  const target = String(nim).trim();

  return data.filter((row) => String(row.nim || "").trim() === target);
}

/**
 * Cari berdasarkan YMD (exact match).
 * Contoh: "20230405"
 */
async function searchByYmd(ymd) {
  const data = await fetchExternalData();
  const target = String(ymd).trim();

  return data.filter((row) => String(row.ymd || "").trim() === target);
}

module.exports = {
  fetchExternalData,
  searchByName,
  searchByNim,
  searchByYmd,
};
