/* Data dan interaksi khusus MTs Al-Ihsaniyah (dijalankan sebelum js/main.js). */
(function () {
  "use strict";

  // ---------- DATA GURU (ubah di sini) ----------
  // [nama, mata pelajaran, tugas tambahan, file foto di  ("" bila belum ada)]
  var GURU = [
    ["Harianto, S.Pd.I., M.Pd.", "Bahasa Indonesia", "Kepala Madrasah", "harianto"],
    ["Sunardi, S.Pd.I., M.Pd.", "IPA", "Waka Kurikulum", "sunardi"],
    ["Bahardi, S.Pd.", "Fikih, Muatan Lokal", "Waka Kesiswaan", "bahardi"],
    ["Hamdani.A, S.Pd.I.", "PJOK", "Waka Sarana dan Prasarana", "hamdani"],
    ["Siti Badriyah, S.Pd.", "Seni Budaya", "Kepala Urusan TU", "siti-badriyah"],
    ["Munawaroh, S.Pd.I.", "PPKn", "Bendahara", "munawaroh"],
    ["Ridho Ilahi, S.Pd.", "Bahasa Arab", "Pembina OSIM", "ridho-ilahi"],
    ["Amirudin, AQ", "Al-Qur'an Hadis", "Ketua Yayasan", "amirudin"],
    ["Hamdi, S.Pd.I., M.Pd.", "Bahasa Inggris", "", ""],
    ["Arnain Fauzi, S.Pd.I.", "Akidah Akhlak", "Wali Kelas", "arnain-fauzi"],
    ["Aditiawarman, S.Pd.I.", "SKI, Fikih", "Wali Kelas", "aditiawarman"],
    ["Lissaudah, S.Pd.I.", "Prakarya", "Kepala Perpustakaan", "lissaudah"],
    ["Dahlia, S.Pd.", "IPA", "Kepala Lab IPA, Wali Kelas", "dahlia"],
    ["Siti Apriani, S.Pd.", "IPS", "", ""],
    ["Azizah, S.Pd.", "Matematika", "Wali Kelas", "azizah"],
    ["Anggraini Puspitasari, S.Pd.", "Bahasa Indonesia", "", ""],
    ["Risky Widia Wulandari, S.Pd.", "Bahasa Inggris", "Wali Kelas", "risky-widia-wulandari"],
    ["Muhammad Al Fajri, S.Pd.", "Informatika", "Kepala Lab Komputer, Wali Kelas", "muhammad-al-fajri"],
    ["M. Ali Sobri, S.Pd.", "Bahasa Arab, Muatan Lokal", "", ""],
    ["Kosirin, S.Ag., M.Pd.", "IPS", "", ""],
    ["Guru Ayyub, S.Pd.I.", "Tahsin", "", ""]
  ];
  // [jabatan, nama] — foto diambil otomatis dari daftar GURU
  var STRUKTUR = [
    ["Ketua Yayasan", "Amirudin, AQ"], ["Kepala Madrasah", "Harianto, S.Pd.I., M.Pd."],
    ["Waka Kurikulum", "Sunardi, S.Pd.I., M.Pd."], ["Waka Kesiswaan", "Bahardi, S.Pd."],
    ["Waka Sarana dan Prasarana", "Hamdani.A, S.Pd.I."], ["Kepala Urusan TU", "Siti Badriyah, S.Pd."],
    ["Bendahara", "Munawaroh, S.Pd.I."], ["Kepala Perpustakaan", "Lissaudah, S.Pd.I."],
    ["Kepala Laboratorium IPA", "Dahlia, S.Pd."], ["Kepala Laboratorium Komputer", "Muhammad Al Fajri, S.Pd."],
    ["Pembina OSIM", "Ridho Ilahi, S.Pd."]
  ];

  var BLN = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
  var BLN_PANJANG = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function inisial(n) {
    return n.replace(/^(M\.|Muhammad)\s/, "M ").split(/[\s,]+/)
      .filter(function (w) { return /^[A-Z]/.test(w) && !/^(S\.|M\.Pd|AQ)/.test(w); })
      .slice(0, 2).map(function (w) { return w[0]; }).join("");
  }
  var fotoByName = {};
  GURU.forEach(function (g) { if (g[3]) fotoByName[g[0]] = "" + g[3] + ".jpg"; });

  // ---------- struktur ----------
  var st = document.getElementById("struktur");
  if (st) st.innerHTML = STRUKTUR.map(function (s) {
    var f = fotoByName[s[1]];
    return '<div class="jab reveal">' + (f ? '<img src="' + f + '" alt="" loading="lazy">' : '<span class="ini">' + esc(inisial(s[1])) + "</span>") +
      "<div><small>" + esc(s[0]) + "</small><b>" + esc(s[1]) + "</b></div></div>";
  }).join("");

  // ---------- guru + pencarian ----------
  var box = document.getElementById("daftar-guru"), q = document.getElementById("q"), jml = document.getElementById("jumlah");
  function renderGuru() {
    if (!box) return;
    var k = q ? q.value.trim().toLowerCase() : "";
    var rows = GURU.filter(function (g) { return !k || (g[0] + " " + g[1] + " " + g[2]).toLowerCase().indexOf(k) > -1; });
    box.innerHTML = rows.length ? rows.map(function (g) {
      var foto = g[3] ? '<img src="' + g[3] + '.jpg" width="300" height="400" alt="Foto ' + esc(g[0]) + '" loading="lazy">' : '<span class="ini" aria-hidden="true">' + esc(inisial(g[0])) + "</span>";
      return '<article class="prof"><div class="prof__photo">' + foto + '</div><div class="prof__body"><h3 class="prof__name">' + esc(g[0]) +
        '</h3><p class="prof__role">' + esc(g[1]) + "</p>" + (g[2] ? '<p class="prof__note">' + esc(g[2]) + "</p>" : "") + "</div></article>";
    }).join("") : '<p style="color:var(--muted)">Tidak ditemukan guru untuk "' + esc(q.value) + '".</p>';
    if (jml) jml.textContent = rows.length + " dari " + GURU.length + " guru";
  }
  if (q) q.addEventListener("input", renderGuru);
  renderGuru();

  // ---------- berita ----------
  var nb = document.getElementById("daftar-berita");
  if (nb) {
    var data = (window.BERITA || []).slice().sort(function (a, b) { return b.tanggal.localeCompare(a.tanggal); }).slice(0, 5);
    nb.innerHTML = data.length ? data.map(function (b) {
      var p = b.tanggal.split("-").map(Number);
      var media = b.foto ? '<span class="story__media frame"><img src="' + esc(b.foto) + '" alt="" loading="lazy"></span>'
        : '<span class="story__media frame no-img"><img src="logo-yayasan.png" alt=""></span>';
      return '<article class="story reveal">' + media + '<div class="story__body"><p class="story__meta"><span class="tag tag--plain">' + esc(b.kategori) +
        '</span><time datetime="' + esc(b.tanggal) + '">' + p[2] + " " + BLN[p[1] - 1] + " " + p[0] + '</time></p><h3 class="story__title">' + esc(b.judul) +
        '</h3><p class="story__excerpt">' + esc(b.isi) + "</p></div></article>";
    }).join("") : '<p style="color:var(--muted)">Belum ada berita.</p>';
  }

  // ---------- tahun ----------
  var th = document.getElementById("th"); if (th) th.textContent = new Date().getFullYear();

  // ---------- lightbox ----------
  var lb = document.getElementById("lb");
  if (lb) {
    var lbImg = lb.querySelector("img"), lbCap = lb.querySelector("p"), list = [], idx = 0;
    var SEL = ".gallery__item img, .brosur img, .program__photo img";
    function show(i) {
      idx = (i + list.length) % list.length;
      var im = list[idx]; lbImg.src = im.currentSrc || im.src; lbImg.alt = im.alt;
      var fc = im.closest("figure") && im.closest("figure").querySelector("figcaption");
      lbCap.textContent = fc ? fc.textContent : im.alt;
    }
    document.addEventListener("click", function (e) {
      var im = e.target.closest(SEL);
      if (!im) return;
      list = Array.prototype.slice.call(document.querySelectorAll(SEL));
      show(list.indexOf(im)); lb.classList.add("open"); lb.querySelector(".x").focus();
    });
    function close() { lb.classList.remove("open"); }
    lb.querySelector(".x").addEventListener("click", close);
    lb.querySelector(".prev").addEventListener("click", function () { show(idx - 1); });
    lb.querySelector(".next").addEventListener("click", function () { show(idx + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close(); else if (e.key === "ArrowLeft") show(idx - 1); else if (e.key === "ArrowRight") show(idx + 1);
    });
  }
})();
