const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Tutup navigasi" : "Buka navigasi");
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Buka navigasi");
      menuToggle.textContent = "☰";
    });
  });
}

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".main-nav a");

if ("IntersectionObserver" in window && sections.length && navLinks.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-30% 0px -60% 0px" });

  sections.forEach((section) => observer.observe(section));
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();


/* Pengelola konten lokal untuk draf portofolio */
(() => {
  const main = document.querySelector("main");
  if (!main) return;
  const pagePath = location.pathname.split("/").pop() || "index.html";
  const storageKey = "ppg-portfolio-draft:" + pagePath;
  const fileKey = "ppg-portfolio-files:" + pagePath;
  let editMode = false;

  const toolbar = document.createElement("section");
  toolbar.className = "editor-toolbar";
  toolbar.setAttribute("aria-label", "Pengelola konten portofolio");
  toolbar.innerHTML = `
    <div class="editor-toolbar-inner">
      <div class="editor-copy"><strong>Kelola halaman</strong><span>Ubah teks, tambah bagian, dan simpan draf di perangkat ini.</span></div>
      <div class="editor-actions">
        <button type="button" class="editor-btn editor-primary" id="editorToggle">✎ Edit halaman</button>
        <button type="button" class="editor-btn" id="editorAdd">＋ Tambah bagian</button>
        <button type="button" class="editor-btn" id="editorUpload">↑ Tambah berkas</button>
        <button type="button" class="editor-btn" id="editorExport">↓ Ekspor cadangan</button>
        <button type="button" class="editor-btn" id="editorImport">↑ Impor cadangan</button>
        <button type="button" class="editor-btn editor-muted" id="editorReset">Pulihkan versi GitHub</button>
        <input type="file" id="editorFile" hidden>
        <input type="file" id="editorBackup" accept="application/json,.json" hidden>
      </div>
    </div>
    <p class="editor-notice" id="editorNotice" role="status">Catatan: draf dan berkas disimpan hanya di browser/perangkat ini. Untuk menerbitkannya agar dapat dilihat semua pengunjung, perubahan harus dipublikasikan ke GitHub.</p>
  `;
  main.parentNode.insertBefore(toolbar, main);

  function notice(message) {
    const el = document.getElementById("editorNotice");
    if (el) el.textContent = message;
  }
  function applyEditable(on) {
    main.querySelectorAll("h1,h2,h3,p").forEach(el => {
      if (el.closest(".page-navigation") || el.closest(".editor-toolbar")) return;
      el.contentEditable = on ? "true" : "false";
      el.classList.toggle("editable-field", on);
    });
    document.getElementById("editorToggle").textContent = on ? "✓ Selesai mengedit" : "✎ Edit halaman";
    editMode = on;
    if (on) notice("Mode edit aktif. Klik teks untuk mengubahnya, lalu tekan Simpan draf. Perubahan masih lokal sampai dipublikasikan ke GitHub.");
  }

  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      main.innerHTML = saved;
      notice("Draf lokal halaman ini dipulihkan dari browser. Draf tidak otomatis mengubah website publik.");
    }
    const storedFiles = localStorage.getItem(fileKey);
    if (storedFiles) renderFiles(JSON.parse(storedFiles));
  } catch (e) {
    notice("Browser tidak dapat memulihkan sebagian draf lokal. Ekspor cadangan secara berkala.");
  }

  const saveBtn = document.createElement("button");
  saveBtn.type = "button";
  saveBtn.className = "editor-btn editor-primary";
  saveBtn.id = "editorSave";
  saveBtn.textContent = "Simpan draf";
  document.querySelector(".editor-actions").insertBefore(saveBtn, document.getElementById("editorAdd"));

  document.getElementById("editorToggle").addEventListener("click", () => applyEditable(!editMode));
  saveBtn.addEventListener("click", () => {
    try {
      localStorage.setItem(storageKey, main.innerHTML);
      applyEditable(false);
      notice("Draf halaman tersimpan di browser ini. Untuk memublikasikannya, ekspor cadangan lalu terapkan perubahan pada repositori GitHub.");
    } catch (e) {
      notice("Penyimpanan gagal—kemungkinan ruang browser penuh. Hapus berkas besar atau ekspor cadangan.");
    }
  });

  document.getElementById("editorAdd").addEventListener("click", () => {
    const title = prompt("Judul bagian baru:");
    if (!title || !title.trim()) return;
    const body = prompt("Deskripsi awal bagian (boleh dikosongkan):") || "Klik Edit halaman untuk menambahkan isi bagian ini.";
    const list = main.querySelector(".detail-list");
    if (list) {
      const card = document.createElement("article");
      card.className = "detail-card";
      card.innerHTML = '<div class="detail-index">+</div><div><h2></h2><p></p><button type="button" class="remove-content-card">Hapus bagian</button></div>';
      card.querySelector("h2").textContent = title.trim();
      card.querySelector("p").textContent = body;
      list.insertBefore(card, list.querySelector(".content-note") || list.querySelector(".page-navigation"));
    } else {
      let grid = main.querySelector(".journey-grid");
      if (!grid) {
        const section = document.createElement("section");
        section.className = "section journey-section";
        section.innerHTML = '<div class="container"><div class="section-heading"><div><p class="section-label">BAGIAN TAMBAHAN</p><h2>Konten <span>portofolio</span></h2></div></div><div class="journey-grid"></div></div>';
        main.appendChild(section);
        grid = section.querySelector(".journey-grid");
      }
      const card = document.createElement("article");
      card.className = "journey-card";
      card.innerHTML = '<div class="card-icon gold"><span>+</span></div><p class="card-tag">BAGIAN TAMBAHAN</p><h3></h3><p></p><button type="button" class="remove-content-card">Hapus bagian</button>';
      card.querySelector("h3").textContent = title.trim();
      card.querySelector("p:not(.card-tag)").textContent = body;
      grid.appendChild(card);
    }
    if (editMode) applyEditable(true);
    notice("Bagian baru ditambahkan. Tekan Simpan draf untuk menyimpannya di browser.");
  });

  main.addEventListener("click", e => {
    const remove = e.target.closest(".remove-content-card");
    if (remove && confirm("Hapus bagian ini dari draf halaman?")) {
      remove.closest(".detail-card,.journey-card")?.remove();
      notice("Bagian dihapus dari tampilan draf. Tekan Simpan draf agar perubahan tersimpan.");
    }
  });

  const upload = document.getElementById("editorFile");
  document.getElementById("editorUpload").addEventListener("click", () => upload.click());
  upload.addEventListener("change", async () => {
    const file = upload.files && upload.files[0];
    if (!file) return;
    const limit = 750 * 1024;
    if (file.size > limit) {
      notice("Berkas lebih dari 750 KB. Unggah berkas besar ke Google Drive/GitHub lalu tambahkan tautannya agar penyimpanan browser tidak penuh.");
      upload.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      let files = [];
      try { files = JSON.parse(localStorage.getItem(fileKey) || "[]"); } catch {}
      files.push({name:file.name,type:file.type || "application/octet-stream",size:file.size,data:reader.result});
      try {
        localStorage.setItem(fileKey, JSON.stringify(files));
        renderFiles(files);
        notice("Berkas ditambahkan ke draf lokal halaman ini. Berkas belum diunggah ke GitHub atau diterbitkan untuk pengunjung.");
      } catch (e) {
        notice("Penyimpanan berkas gagal karena kapasitas browser terbatas. Gunakan tautan Google Drive atau GitHub untuk berkas ini.");
      }
      upload.value = "";
    };
    reader.readAsDataURL(file);
  });

  function renderFiles(files) {
    let area = main.querySelector("#portfolioLocalFiles");
    if (!area) {
      area = document.createElement("section");
      area.id = "portfolioLocalFiles";
      area.className = "local-files-section";
      area.innerHTML = '<div class="container"><p class="section-label">BERKAS DRAF LOKAL</p><h2>Dokumentasi dan berkas tambahan</h2><div class="local-file-list"></div></div>';
      main.appendChild(area);
    }
    const list = area.querySelector(".local-file-list");
    list.innerHTML = "";
    files.forEach((file, i) => {
      const row = document.createElement("div");
      row.className = "local-file-row";
      const link = document.createElement("a");
      link.href = file.data;
      link.download = file.name;
      link.textContent = "↗ " + file.name;
      link.className = "local-file-link";
      const meta = document.createElement("span");
      meta.textContent = Math.max(1, Math.round(file.size / 1024)) + " KB · tersimpan lokal";
      const del = document.createElement("button");
      del.type = "button";
      del.className = "editor-btn";
      del.textContent = "Hapus";
      del.addEventListener("click", () => {
        files.splice(i,1);
        localStorage.setItem(fileKey, JSON.stringify(files));
        renderFiles(files);
      });
      row.append(link, meta, del);
      list.appendChild(row);
    });
  }

  document.getElementById("editorExport").addEventListener("click", () => {
    const bundle = {format:"ppg-portfolio-draft-v1",exportedAt:new Date().toISOString(),pages:{}};
    for (let i=0;i<localStorage.length;i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("ppg-portfolio-draft:")) bundle.pages[key.slice("ppg-portfolio-draft:".length)] = {html:localStorage.getItem(key)};
      if (key && key.startsWith("ppg-portfolio-files:")) {
        const page = key.slice("ppg-portfolio-files:".length);
        bundle.pages[page] = bundle.pages[page] || {};
        bundle.pages[page].files = JSON.parse(localStorage.getItem(key) || "[]");
      }
    }
    bundle.pages[pagePath] = bundle.pages[pagePath] || {};
    bundle.pages[pagePath].html = main.innerHTML;
    const blob = new Blob([JSON.stringify(bundle,null,2)],{type:"application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href=url; a.download="cadangan-eportfolio-ppg.json"; a.click();
    URL.revokeObjectURL(url);
    notice("Cadangan JSON dibuat. Simpan file ini dengan aman. Ekspor adalah cadangan draf, bukan publikasi otomatis ke website.");
  });

  document.getElementById("editorImport").addEventListener("click", () => document.getElementById("editorBackup").click());
  document.getElementById("editorBackup").addEventListener("change", async e => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    try {
      const bundle = JSON.parse(await file.text());
      if (bundle.format !== "ppg-portfolio-draft-v1" || !bundle.pages) throw new Error("format");
      const data = bundle.pages[pagePath];
      if (!data) throw new Error("page");
      if (data.html) main.innerHTML = data.html;
      if (data.files) localStorage.setItem(fileKey, JSON.stringify(data.files));
      localStorage.setItem(storageKey, main.innerHTML);
      if (data.files) renderFiles(data.files);
      notice("Cadangan untuk halaman ini berhasil diimpor ke browser.");
    } catch {
      notice("Cadangan tidak valid atau tidak berisi halaman ini. Pastikan memilih file JSON hasil Ekspor cadangan.");
    }
    e.target.value = "";
  });

  document.getElementById("editorReset").addEventListener("click", () => {
    if (!confirm("Pulihkan halaman ke versi GitHub? Draf lokal halaman ini dan lampirannya akan dihapus dari browser.")) return;
    localStorage.removeItem(storageKey);
    localStorage.removeItem(fileKey);
    location.reload();
  });
})();
