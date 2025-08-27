const pool = require('../config/db');

const mapRow = (row) => ({
  id: row.id,
  title: row.title,
  content: row.content,
  tags: row.tags,
  created_at: row.created_at
});

module.exports = {
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM documents ORDER BY created_at DESC');
    return rows.map(mapRow);
  },

  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM documents WHERE id = ?', [id]);
    return rows[0] ? mapRow(rows[0]) : null;
  },

  async create({ title, content, tags }) {
    const [result] = await pool.query(
      'INSERT INTO documents (title, content, tags) VALUES (?, ?, ?)',
      [title, content, tags]
    );
    return this.findById(result.insertId);
  },

  async update(id, { title, content, tags }) {
    const [result] = await pool.query(
      'UPDATE documents SET title = COALESCE(?, title), content = COALESCE(?, content), tags = COALESCE(?, tags) WHERE id = ?',
      [title, content, tags, id]
    );
    if (result.affectedRows === 0) return null;
    return this.findById(id);
  },

  async remove(id) {
    const [result] = await pool.query('DELETE FROM documents WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};
