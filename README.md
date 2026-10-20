# E-Portfolio PPG Informatika — Nofu Afi Surya Ekatama

Website portofolio multi-halaman untuk GitHub Pages. Identitas visual menggunakan biru tua, emas, dan putih, dilengkapi mode terang/gelap serta navigasi responsif.

## Peta repository

| Berkas | Fungsi | Bagian yang dikelola |
|---|---|---|
| `index.html` | Halaman beranda | Hero, pengantar, ringkasan bagian portofolio, dan tautan navigasi |
| `profil.html` | Profil Guru | Identitas, pendidikan/pengalaman, dan filosofi mengajar |
| `perangkat-ajar.html` | Perangkat Ajar | Modul ajar, ATP, bahan ajar, LKPD, media, dan asesmen |
| `lk3.html` | LK-3 | Analisis rancangan, materi, media, video praktik, kegiatan nonmengajar, dan asesmen |
| `uts-siklus-1.html` | UTS – Siklus 1 | Perangkat terpilih, dokumentasi pelaksanaan, dan refleksi |
| `uas-siklus-2-4.html` | UAS – Siklus 2–4 | Perangkat terbaik, dokumentasi praktik, dan refleksi perkembangan |
| `lampiran.html` | Lampiran | Sertifikat, dokumentasi tambahan, dan tautan pendukung |
| `style.css` | Desain global | Warna, tipografi, tata letak, responsivitas, mode terang/gelap, dan gaya tombol |
| `script.js` | Interaksi global | Menu mobile, mode tema, tahun footer, dan tombol edit halaman |
| `assets/` | Media portofolio | Foto profil, gambar, dan aset statis lain yang memang ingin dipublikasikan |
| `README.md` | Panduan repository | Peta berkas dan petunjuk penyuntingan/publikasi |

> Setiap halaman memakai berkas HTML terpisah, sedangkan gaya dan interaksi bersama dikelola pada `style.css` dan `script.js`. Simpan hanya artefak yang memang boleh ditampilkan di website publik.

## Cara mengedit isi portofolio dari website

1. Buka [website E-Portfolio](https://naset27.github.io/portofolio-ppg/).
2. Masuk ke bagian yang ingin diperbarui.
3. Klik tombol **Edit halaman ini** di kanan bawah. Tombol membuka berkas halaman aktif di editor GitHub.
4. Jika diminta, masuk ke akun GitHub yang memiliki izin menulis pada repository.
5. Ubah teks atau tautan pada editor. Untuk isi teks, cari judul atau kalimat yang ingin diganti; jangan menghapus tag HTML pembuka/penutup di sekitarnya.
6. Tinjau perubahan, lalu pilih **Commit changes** untuk menyimpan.
7. Tunggu GitHub Pages menerbitkan pembaruan, kemudian muat ulang website. Jika perubahan belum terlihat, coba muat ulang paksa dengan `Ctrl + F5`.

### Berkas mana yang harus diedit?

- Isi **Beranda** → `index.html`
- Isi **Profil Guru** → `profil.html`
- Isi **Perangkat Ajar** → `perangkat-ajar.html`
- Isi **LK-3** → `lk3.html`
- Isi **UTS – Siklus 1** → `uts-siklus-1.html`
- Isi **UAS – Siklus 2–4** → `uas-siklus-2-4.html`
- Isi **Lampiran** → `lampiran.html`
- Mengubah tampilan semua halaman → `style.css`
- Mengubah fungsi tombol/navigasi → `script.js`

## Menambahkan foto atau dokumen

1. Buka repository GitHub dan masuk ke folder `assets/` (buat folder tersebut bila belum tersedia).
2. Pilih **Add file → Upload files**, lalu unggah berkas yang aman untuk dipublikasikan.
3. Pada halaman yang sesuai, tambahkan tautan relatif seperti `assets/nama-berkas.pdf` atau gambar seperti `assets/foto-kegiatan.jpg` ke HTML.
4. Commit perubahan dan periksa hasilnya di website.

Berkas yang diunggah ke repository publik dapat diakses publik. Jangan mengunggah token, kata sandi, data pribadi peserta didik, atau dokumen PPG yang harus tetap privat. Tombol edit hanya membuka editor GitHub; tombol tersebut tidak melewati izin akses repository dan tidak mengunggah berkas secara otomatis.

## Publikasi GitHub Pages

Repository ini menggunakan berkas statis. Jika konfigurasi Pages belum aktif, buka **Settings → Pages**, pilih **Deploy from a branch**, kemudian pilih branch `main` dan folder `/(root)`. Situs proyek biasanya tersedia di [https://naset27.github.io/portofolio-ppg/](https://naset27.github.io/portofolio-ppg/).

## Catatan sebelum pengumpulan PPG

Konten awal pada beberapa bagian masih berupa kerangka. Ganti dengan artefak asli yang sudah diperiksa, refleksi berdasarkan pengalaman nyata, dan bukti yang sesuai dengan rubrik. Pastikan setiap tautan dapat diakses oleh audiens yang dituju serta tidak mengungkap informasi sensitif.

 
## Alur kerja yang disarankan: atur satu halaman setiap kali

Di setiap halaman situs tersedia dua pintasan:
- **Edit halaman ini** — membuka berkas HTML halaman yang sedang dibuka, sehingga Beranda dan setiap menu dapat diatur secara terpisah.
- **Unggah media** — membuka halaman unggah GitHub untuk folder `assets/`. Setelah unggah, tautkan berkas tersebut dari halaman yang sesuai.

### Menambahkan media satu per satu

1. Unggah satu foto, PDF, atau media yang ingin dipublikasikan melalui tombol **Unggah media**.
2. Setelah unggahan disimpan (*commit*), salin nama berkas persis seperti yang muncul di GitHub.
3. Buka halaman tujuan dan pilih **Edit halaman ini**.
4. Untuk foto, gunakan pola `<img src="assets/nama-foto.jpg" alt="Deskripsi foto">`. Untuk dokumen, gunakan pola `<a href="assets/nama-dokumen.pdf">Lihat dokumen</a>`.
5. Simpan perubahan, lalu periksa halaman yang sudah terbit. Ulangi untuk media berikutnya.

Saran penamaan: gunakan huruf kecil, tanpa spasi, dan deskripsi singkat, misalnya `foto-ppl-kelas-xii.jpg`, `lkpd-berpikir-komputasional.pdf`, atau `video-praktik-siklus-1.mp4`. Untuk video berukuran besar, lebih baik gunakan tautan ke platform video yang sesuai daripada menyimpan file besar di repository.

**Penting:** tombol unggah memerlukan login GitHub dan izin menulis pada repository. GitHub Pages bersifat publik; semua file yang disimpan di repository publik dapat dilihat atau diunduh publik. Jangan mengunggah dokumen privat atau data pribadi siswa.
