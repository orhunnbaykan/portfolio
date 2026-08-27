# Portföy — Orhun Baykan

Tek dosyalık, iki dilli (TR/EN), tamamen bağımsız bir portföy sayfası.
Harici CSS/JS/font yok — GitHub Pages'te olduğu gibi çalışır.

## İçerik

```
index.html          Portföy sayfası (CSS + JS + diyagramlar gömülü)
assets/img/         Ekran görüntüleri
assets/*.pdf        CV
qa-reports/         Test otomasyonu koşum raporları ve senaryo kataloğu
.nojekyll           GitHub Pages'in Jekyll işlemesini atlaması için (gerekli)
```

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
düğmeyle değiştirilir ve tercih `localStorage`'da saklanır.
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
