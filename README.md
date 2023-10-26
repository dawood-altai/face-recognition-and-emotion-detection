# Yüz Tanıma ve Duygu Analizi Uygulaması

Bu uygulama, yüz tanıma ve duygu analizi yapabilen basit bir JavaScript uygulamasıdır. Bu README dosyası, uygulamanızın nasıl çalıştığını ve nasıl kullanılacağını açıklar.

## Nasıl Kullanılır

1. Öncelikle, tarayıcınızda bu uygulamanın çalışabilmesi için kamera erişimine izin vermelisiniz.

2. Video görüntüsü, ekranın ortasına yerleştirilir ve yüz tanıma ile duygu analizi gerçekleştirilir.

3. "Start Recognition" düğmesine tıklayarak yüz tanıma işlemini başlatabilirsiniz. Başladığınızda, yüzler algılanacak ve duygularınız analiz edilecektir.

4. "Stop Recognition" düğmesine tıklayarak yüz tanıma işlemini durdurabilirsiniz.

## Gereksinimler

Bu uygulama, aşağıdaki kütüphanelere ihtiyaç duyar:
- [face-api.js](https://github.com/justadudewhohacks/face-api.js)

Gerekli kütüphaneleri "models" klasörüne eklediğinizden emin olun.

## Kod Açıklaması

- `video` elemanı, kameradan video akışını alır.
- `startVideo` işlevi, kameradan video akışını başlatır.
- Video oynatılmaya başladığında, yüz tanıma ve duygu analizi işlemi başlar ve sonuçlar canvas üzerine çizilir.

## Sorunlar

- Göz hareketlerinin daha iyi algılanması için daha fazla veri ve güçlü bir model kullanılabilir.



