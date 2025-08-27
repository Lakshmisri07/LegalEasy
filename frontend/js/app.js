const API_BASE = window.location.origin.includes('localhost') ? 'http://localhost:4000' : '';

const docsGrid = document.getElementById('docsGrid');
const alerts = document.getElementById('alerts');
const docForm = document.getElementById('docForm');
const docModalEl = document.getElementById('docModal');
const docModal = new bootstrap.Modal(docModalEl);

function showAlert(message, type='success') {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `<div class="alert alert-${type} alert-dismissible" role="alert">
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  </div>`;
  alerts.append(wrapper);
  setTimeout(() => wrapper.remove(), 4000);
}

function tagBadges(tagStr) {
  if (!tagStr) return '';
  return tagStr.split(',').map(t => t.trim()).filter(Boolean).map(t => `<span class="badge text-bg-secondary me-1">${t}</span>`).join('');
}

async function fetchDocs() {
  const res = await fetch(`${API_BASE}/api/docs`);
  const data = await res.json();
  renderDocs(data);
}

function renderDocs(docs) {
  docsGrid.innerHTML = '';
  if (!docs.length) {
    docsGrid.innerHTML = `<div class="col-12"><div class="alert alert-info">No documents yet. Create one!</div></div>`;
    return;
  }
  docs.forEach(doc => {
    const col = document.createElement('div');
    col.className = 'col-12 col-md-6 col-lg-4';
    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${doc.title}</h5>
          <div class="mb-2">${tagBadges(doc.tags)}</div>
          <p class="card-text flex-grow-1" style="white-space: pre-line;">${(doc.content || '').slice(0, 180)}${(doc.content || '').length > 180 ? '…' : ''}</p>
          <div class="d-flex gap-2">
            <button class="btn btn-outline-primary btn-sm" data-action="edit" data-id="${doc.id}">Edit</button>
            <button class="btn btn-outline-danger btn-sm" data-action="delete" data-id="${doc.id}">Delete</button>
          </div>
        </div>
        <div class="card-footer text-muted small">Created: ${new Date(doc.created_at).toLocaleString()}</div>
      </div>`;
    docsGrid.appendChild(col);
  });
}

docsGrid.addEventListener('click', async (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  const id = btn.getAttribute('data-id');
  const action = btn.getAttribute('data-action');
  if (action === 'delete') {
    if (!confirm('Delete this document?')) return;
    const res = await fetch(`${API_BASE}/api/docs/${id}`, { method: 'DELETE' });
    if (res.ok) { showAlert('Deleted'); fetchDocs(); } else { showAlert('Delete failed', 'danger'); }
  }
  if (action === 'edit') {
    const res = await fetch(`${API_BASE}/api/docs/${id}`);
    const doc = await res.json();
    document.getElementById('docId').value = doc.id;
    document.getElementById('title').value = doc.title || '';
    document.getElementById('tags').value = doc.tags || '';
    document.getElementById('content').value = doc.content || '';
    document.getElementById('docModalLabel').textContent = 'Edit Document';
    docModal.show();
  }
});

docForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('docId').value;
  const body = {
    title: document.getElementById('title').value.trim(),
    tags: document.getElementById('tags').value.trim(),
    content: document.getElementById('content').value
  };
  const method = id ? 'PUT' : 'POST';
  const url = id ? `${API_BASE}/api/docs/${id}` : `${API_BASE}/api/docs`;
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (res.ok) {
    showAlert('Saved');
    docForm.reset();
    document.getElementById('docId').value = '';
    document.getElementById('docModalLabel').textContent = 'New Document';
    docModal.hide();
    fetchDocs();
  } else {
    const err = await res.json().catch(() => ({}));
    showAlert(err.error || 'Save failed', 'danger');
  }
});

// init
fetchDocs();
