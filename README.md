# E-Portfolio PPG Informatika — Nofu Afi Surya Ekatama

Website statis sederhana untuk dipublikasikan dengan GitHub Pages.

## Isi folder
- `index.html` — konten halaman utama.
- `style.css` — desain responsif.
- `script.js` — navigasi mobile, penanda menu aktif, dan tahun footer.

## Cara publikasi di GitHub Pages
1. Masuk ke GitHub dengan akun `NASET27`.
2. Buat repository baru bernama `portofolio-ppg` (atau nama lain yang diinginkan).
3. Pilih **Public** agar GitHub Pages dapat diakses melalui tautan publik.
4. Unggah `index.html`, `style.css`, `script.js`, dan `README.md` ke direktori utama repository.
5. Buka **Settings → Pages**.
6. Di bagian **Build and deployment**, pilih **Deploy from a branch**.
7. Pilih branch **main** dan folder **/(root)**, lalu klik **Save**.
8. Tunggu proses publikasi. URL biasanya berbentuk `https://naset27.github.io/portofolio-ppg/`.
9. Buka URL yang ditampilkan di halaman Settings → Pages untuk memeriksa website.

## Cara mengganti placeholder foto
Saat ini foto profil berupa ilustrasi placeholder berbasis SVG di dalam `index.html`, jadi tidak perlu menambahkan gambar untuk menjalankan website.
Jika ingin menggantinya dengan foto:
1. Buat folder `assets` di repository dan unggah foto, misalnya `foto-profil.jpg`.
2. Di `index.html`, cari blok `<div class="photo-placeholder"> ... </div>`.
3. Ganti blok tersebut dengan:
   `<img class="profile-photo" src="assets/foto-profil.jpg" alt="Foto profil Nofu Afi Surya Ekatama">`
4. Tambahkan aturan berikut ke `style.css`:
   `.profile-photo { width: 100%; height: 100%; object-fit: cover; border-radius: 15px; }`

## Catatan konten
Teks dibuat sebagai draf awal berdasarkan konteks PPG Informatika yang tersedia. Sebelum dikumpulkan, periksa kembali detail yang wajib sesuai rubrik, tambahkan bukti autentik, dan ubah pernyataan yang belum sesuai dengan pengalaman atau dokumen final. Jangan mengunggah data pribadi siswa atau dokumen sensitif.
