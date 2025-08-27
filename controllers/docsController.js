const Docs = require('../models/docsModel');

exports.getAll = async (req, res) => {
  try {
    const docs = await Docs.findAll();
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const doc = await Docs.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    if (!title) return res.status(400).json({ error: 'title is required' });
    const created = await Docs.create({ title, content: content || '', tags: tags || '' });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const updated = await Docs.update(req.params.id, { title, content, tags });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const ok = await Docs.remove(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Not found' });
    res.json({ deleted: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
