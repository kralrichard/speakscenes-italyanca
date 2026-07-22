# SpeakScenes İtalyanca — Kaydır, Konuş, Büyü

SpeakScenes'in **Shorts odaklı İtalyanca** klonu. TikTok tarzı dikey akışta
gerçek, seviyelendirilmiş (A0→C2) İtalyanca cümleler: her yukarı kaydırma
karakterini büyütür (bebek → kendinden emin yetişkin) ve cümleler tam o hızda
zorlaşır. Her kart dinlenebilir (🔊 / 🐢 yavaş), **mikrofonla sesli söylenip**
gerçek konuşma tanımayla puanlanır (it-IT), Türkçe çevirisi bir dokunuşla açılır.

- **Dünya haritası ve Karakter ekranı** — büyüyen avatarınla konuma göre pratik (Ev, Sokak, Park, Çarşı, Ofis...), avatar özelleştirme.
- **Binlerce üretilmiş, dil bilgisi doğrulanmış cümle** — artikel (un/uno/una/
  un', il/lo/la/l') ve sıfat-cinsiyet uyumu kelime bankasında elle işlenmiştir;
  deterministik üretim, her açılışta aynı sıra.
- **Konuşma puanlama** dürüst hizalama motoru: eksik/yanlış/fazla kelimeler
  gerçek ASR çıktısından; olumsuzluk (non/mai) ve sayı hataları her seviyede
  reddedilir. Aksansız yazım adil karşılaştırılır (è→e her iki tarafta).
- **Mikrofon yoksa** net şekilde belirtilen yazılı moda düşer.

Orijinal İngilizce uygulamanın diyalog/hikaye modları İngilizce içeriğe özel
olduğundan bu klonda kayıtlı değildir.

## Çalıştırma

```powershell
powershell -ExecutionPolicy Bypass -File serve.ps1 -LocalOnly
# http://localhost:8123
```

Testler: `http://localhost:8123/tests/`
