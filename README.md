# SpeakScenes İtalyanca — Kaydır, Konuş, Büyü

SpeakScenes'in **İtalyanca sürümü**. Motor (konuşma tanıma, anlam tabanlı
puanlayıcı, seslendirme, büyüyen avatar, coin) orijinalin aynısıdır ve `it-IT`
üzerinde çalışır; içerik İtalyanca olarak yazılmıştır.

## Modlar

- **🗺️ Dünya** — büyüyen avatarın, ilerleme çubuğu ve konuma göre pratik
  (Ev, Sokak, Park, Çarşı, Nezaket Okulu, Ofis, Serbest Akış).
- **📱 Shorts** — TikTok tarzı dikey akış; **12.846 seviyelendirilmiş İtalyanca
  cümle** (A0→C2). Her kaydırma karakteri büyütür; tam yolculuk 6.000 kaydırma.
  Her seviyenin cümle sayısı, o seviyenin süresinden fazladır — tekrara düşmez.
- **🎙️ Diyalog** — iki kişilik, sıra tabanlı gerçek konuşmalar. Karakter
  İtalyanca konuşur, sen repliği **mikrofonla söylersin**; cümle kabul edilmeden
  diyalog ilerlemez. Her replikte IPA, Türkçe çeviri, kelime bazlı gramer notu,
  anahtar ifadeler ve telaffuz ipuçları vardır.
- **🔁 Tekrar** — yanlış söylenen cümleler SM-2 aralıklı tekrar kuyruğuna girer.
- **📈 İlerleme** — seri, günlük hedef ve mekân bazlı ilerleme.

## İçerik

| Tür | Miktar |
|---|---|
| Shorts cümlesi | 12.846 (A0→C2) |
| Diyalog | 20 (15 mekân, A1→B2) |
| Günlük hazır cümle (DAILY) | 60 |

Diyalog mekânları: bar, ristorante, albergo, indicazioni, supermercato,
farmacia, conoscere qualcuno, colloquio di lavoro, amici, taxi.

**Diyalog eklemek:** `js/data/dialogues/` altına `createDialogue({...})` dizisi
dışa aktaran bir dosya yaz ve `index.js`'e ekle. Bozuk içerik açılışta ilgili
diyalog kimliğiyle birlikte açıkça hata verir — sessizce yarım render edilmez.

## Dürüstlük notu

Kelime doğruluğu, eksik/fazla/yanlış kelimeler gerçek konuşma tanıma çıktısından
hizalanarak hesaplanır. Olumsuzluk (non/mai) ve sayı hataları her seviyede
reddedilir. Aksansız yazım adil karşılaştırılır (è→e her iki tarafta).
Telaffuz puanı **fonem düzeyinde değildir** ve arayüzde öyle iddia edilmez.
Mikrofon yoksa açıkça belirtilen yazılı moda düşer.

## Çalıştırma

Konuşma tanıma güvenli bağlam ister (localhost veya https):

```powershell
powershell -ExecutionPolicy Bypass -File serve.ps1 -LocalOnly
```

Testler: `http://localhost:8123/tests/`
