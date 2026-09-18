# Portföy — Orhun Baykan

İki dilli (TR/EN), tamamen bağımsız, statik bir portföy sitesi.
Harici CDN/font bağımlılığı yok — GitHub Pages'te olduğu gibi çalışır
(tek istisna: `games/` altındaki oyunlar kendi fontlarını Google Fonts'tan çeker).

## İçerik

```
index.html                    Ana sayfa: hero, metrikler, proje özetleri, HTML oyunları, case study, yetkinlik, deneyim, CV
projects/otomasyon/index.html Proje 01 detay sayfası — Hibrit Mobil Test Otomasyonu
projects/platform/index.html  Proje 02 detay sayfası — Slot Oyun Platformu
projects/moflow/index.html    Proje 03 detay sayfası — Moflow, AI Pazarlama Ekibi
games/<oyun>/index.html       Tek dosyalık HTML oyunları (site.css/site.js kullanmaz; ana sayfadaki `#oyunlar` kartlarından açılır)
assets/css/site.css           Ortak stil (ana sayfa ve proje sayfaları bunu kullanır)
assets/fonts/                 Self-host woff2 fontlar — JetBrains Mono + IBM Plex Sans (CDN yok)
assets/js/site.js             Dil anahtarı, mobil menü, hero terminal animasyonu, lightbox
assets/img/                   Ekran görüntüleri
assets/clips/                 Faz koşum videolarından kısa, sessiz mp4 klipler
assets/*.pdf                  CV
qa-reports/                   Test otomasyonu koşum raporları ve senaryo kataloğu
.nojekyll                     GitHub Pages'in Jekyll işlemesini atlaması için (gerekli)
```

Ana sayfada projeler yalnızca özet kart olarak yer alır; "Projeyi incele →"
ile detay sayfasına gidilir. Yeni bir proje eklerken `projects/<ad>/index.html`
oluşturup ana sayfadaki `#projeler` bölümüne bir `.proj` kartı ekle.

## GitHub Pages'te yayınlama

```bash
cd portfolio
git init
git add .
git commit -m "Portfolio"
git branch -M main
git remote add origin https://github.com/<kullanici-adi>/<repo-adi>.git
git push -u origin main
```

Sonra: **Settings → Pages → Source: Deploy from a branch → Branch: `main` / `/ (root)` → Save**

Birkaç dakika içinde `https://<kullanici-adi>.github.io/<repo-adi>/` adresinde yayında olur.

> Repo adını `<kullanici-adi>.github.io` yaparsan adres doğrudan
> `https://<kullanici-adi>.github.io/` olur (alt dizin olmadan).

## Yerelde önizleme

```bash
python3 -m http.server 8899
# http://127.0.0.1:8899/
```

`index.html`'i doğrudan çift tıklayarak açmak yerine sunucu üzerinden aç —
`file://` protokolünde gömülü PDF ve bazı yollar düzgün çalışmaz.

## Dil

Sayfa ilk açılışta tarayıcı diline göre TR veya EN başlar; sağ üstteki
düğmeyle değiştirilir ve tercih `localStorage`'da saklanır (alt sayfalara da
taşınır). Sayfa başlığı `<html data-title-tr data-title-en>` özniteliklerinden okunur.
Çeviriler HTML içinde `data-lang="tr"` / `data-lang="en"` ile işaretli —
metin güncellerken **iki dili birlikte** güncelle.

## Gizlilik notu

Yayına giden kopyada şunlar temizlendi:
- iOS raporundaki donanım kimlikleri (IMEI, seri numaraları, MAC adresleri, chip id)
- Terminal ekran görüntüsündeki cihaz UDID'i ve Android seri numarası
- iOS Ayarlar ekran görüntüsündeki Wi-Fi ağ adı
- Kurum adı geçen `docs/CI.md` yayına dahil edilmedi

Yeni bir ekran görüntüsü veya rapor eklerken aynı taramayı çalıştır:

```bash
grep -riE "udid|imei|serial|[0-9a-f]{2}(:[0-9a-f]{2}){5}" qa-reports/
```
