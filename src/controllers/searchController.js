const { searchByName, searchByNim, searchByYmd, fetchExternalData } = require("../services/externalApiService");

exports.findByName = async (req, res) => {
  try {
    const name = req.query.name || "Turner Mia";
    const data = await searchByName(name);
    return res.status(200).json({ success: true, query: { name }, total: data.length, data });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Search failed.", error: err.message });
  }
};

exports.findByNim = async (req, res) => {
  try {
    const nim = req.query.nim || "9352078461";
    const data = await searchByNim(nim);
    return res.status(200).json({ success: true, query: { nim }, total: data.length, data });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Search failed.", error: err.message });
  }
};

exports.findByYmd = async (req, res) => {
  try {
    const ymd = req.query.ymd || "20230405";
    const data = await searchByYmd(ymd);
    return res.status(200).json({ success: true, query: { ymd }, total: data.length, data });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Search failed.", error: err.message });
  }
};

exports.getAllExternalData = async (req, res) => {
  try {
    const data = await fetchExternalData();
    return res.status(200).json({ success: true, total: data.length, data });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Fetch failed.", error: err.message });
  }
};
