const equipments = [
  {
    id: 'UPS-01',
    name: 'UPS A계통',
    type: 'UPS',
    location: 'B3 UPS Room',
    manufacturer: 'Schneider Electric Galaxy VXL',
    documents: [
      { type: 'SOP', title: 'UPS 정상 운전 절차서', url: 'docs/UPS-01_SOP.pdf' },
      { type: 'MOP', title: 'UPS 유지보수 절차서', url: 'docs/UPS-01_MOP.pdf' },
      { type: 'EOP', title: 'UPS 장애 대응 절차서', url: 'docs/UPS-01_EOP.pdf' },
      { type: 'Drawing', title: '단선결선도 / 통신 구성도', url: 'docs/UPS-01_Drawing.pdf' }
    ]
  },
  {
    id: 'CDU-01',
    name: 'CDU #1',
    type: 'Cooling',
    location: '5-2DH LC Row',
    manufacturer: 'Vendor TBD',
    documents: [
      { type: 'SOP', title: 'CDU 정상 운전 절차서', url: 'docs/CDU-01_SOP.pdf' },
      { type: 'MOP', title: 'CDU 점검 및 보수 절차서', url: 'docs/CDU-01_MOP.pdf' },
      { type: 'EOP', title: 'CDU 누수/압력 이상 대응', url: 'docs/CDU-01_EOP.pdf' }
    ]
  },
  {
    id: 'STS-01',
    name: 'STS A계통',
    type: 'STS',
    location: 'Electrical Room',
    manufacturer: 'Legrand',
    documents: [
      { type: 'SOP', title: 'STS 정상 운전 절차서', url: 'docs/STS-01_SOP.pdf' },
      { type: 'MOP', title: 'STS 유지보수 절차서', url: 'docs/STS-01_MOP.pdf' },
      { type: 'EOP', title: 'STS 절체 이상 대응 절차서', url: 'docs/STS-01_EOP.pdf' }
    ]
  }
];

const app = document.getElementById('app');
document.getElementById('homeBtn').addEventListener('click', () => {
  history.pushState({}, '', location.pathname);
  renderList();
});

function getEquipmentFromUrl() {
  const params = new URLSearchParams(location.search);
  return params.get('equipment');
}

function openEquipment(id) {
  history.pushState({}, '', `${location.pathname}?equipment=${encodeURIComponent(id)}`);
  renderDetail(id);
}

function renderList() {
  app.innerHTML = `
    <input class="search" id="search" placeholder="장비명, ID, 위치로 검색 예: UPS-01, CDU, 5-2DH" />
    <section class="grid" id="equipmentGrid"></section>
  `;
  const grid = document.getElementById('equipmentGrid');
  const search = document.getElementById('search');

  function draw(keyword = '') {
    const k = keyword.toLowerCase();
    const filtered = equipments.filter(eq =>
      [eq.id, eq.name, eq.type, eq.location, eq.manufacturer].join(' ').toLowerCase().includes(k)
    );
    grid.innerHTML = filtered.map(eq => `
      <article class="card">
        <span class="badge">${eq.type}</span>
        <h2>${eq.name}</h2>
        <div class="meta">
          ID: ${eq.id}<br />
          위치: ${eq.location}<br />
          제조사: ${eq.manufacturer}
        </div>
        <br />
        <button onclick="openEquipment('${eq.id}')">문서 보기</button>
      </article>
    `).join('') || `<p class="warning">검색 결과가 없습니다.</p>`;
  }

  search.addEventListener('input', e => draw(e.target.value));
  draw();
}

function renderDetail(id) {
  const eq = equipments.find(item => item.id === id);
  if (!eq) {
    app.innerHTML = `<div class="card"><p class="warning">해당 장비를 찾을 수 없습니다: ${id}</p></div>`;
    return;
  }

  const qrUrl = `${location.origin}${location.pathname}?equipment=${encodeURIComponent(eq.id)}`;
  app.innerHTML = `
    <section class="card">
      <span class="badge">${eq.type}</span>
      <h2>${eq.name}</h2>
      <div class="meta">
        장비 ID: ${eq.id}<br />
        위치: ${eq.location}<br />
        제조사/모델: ${eq.manufacturer}
      </div>

      <div class="doc-list">
        ${eq.documents.map(doc => `
          <div class="doc">
            <div>
              <strong>${doc.type}</strong>
              <span>${doc.title}</span>
            </div>
            <a class="btn" href="${doc.url}" target="_blank" rel="noopener">열기</a>
          </div>
        `).join('')}
      </div>

      <div class="qrbox">
        <strong>QR에 넣을 URL</strong><br />
        ${qrUrl}
      </div>
    </section>
  `;
}

window.addEventListener('popstate', () => {
  const equipmentId = getEquipmentFromUrl();
  equipmentId ? renderDetail(equipmentId) : renderList();
});

const equipmentId = getEquipmentFromUrl();
equipmentId ? renderDetail(equipmentId) : renderList();
