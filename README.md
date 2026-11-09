# naturalmentevet.it

Sito vetrina della dott.ssa Graziella Viganò, medico veterinario omeopata. HTML e CSS statici, senza build, senza cookie, senza servizi esterni.

## Struttura

```
index.html                         Home: chi sono, servizi, contatti segreteria
biofeedback/index.html             Biofeedback quantistico
inquinamento-elettromagnetico/     Inquinamento elettromagnetico: consulenza e videocorso in preparazione
privacy/index.html                 Informativa privacy
404.html                           Pagina non trovata
assets/css/style.css               Unico foglio di stile (token colore in cima)
assets/js/main.js                  Menu mobile e anno nel footer
assets/img/                        Logo vettoriale (scuro e chiaro) e sprite icone
assets/foto/                       Ritratto (WebP e JPG, 480 e 800 px) e immagine di condivisione
assets/fonts/                      Newsreader (titoli) e Atkinson Hyperlegible Next (testo), ospitati in locale
CNAME                              Dominio personalizzato per GitHub Pages
```

## Materiali originali

I file sorgente (foto originali, biglietto da visita, documenti Word dei testi) sono nella cartella `../materiali/`, fuori dal sito, così non vengono pubblicati.

## Modifiche frequenti

- Testi: si cambiano direttamente nei file `.html`.
- Numero WhatsApp: cercare `393534615805` in tutti i file.
- Attivare le consulenze: in `index.html` togliere la classe `is-soon` e il badge "In arrivo" dal blocco 03.
- Colori: variabili in `:root` all'inizio di `assets/css/style.css` (esadecimale e OKLCH).

## Anteprima in locale

```bash
python3 -m http.server 8000
```

Poi aprire http://localhost:8000.

## Pubblicazione (GitHub Pages + dominio Aruba)

1. Repository GitHub pubblico, branch `main`. In Settings > Pages: Source "Deploy from a branch", branch `main`, cartella `/ (root)`.
2. Custom domain: `naturalmentevet.it` (già presente nel file `CNAME`).
3. Nel pannello Aruba, Gestione DNS del dominio, eliminare i record A e CNAME esistenti per `@` e `www`, poi inserire:

| Tipo  | Nome | Valore                      |
|-------|------|-----------------------------|
| A     | @    | 185.199.108.153             |
| A     | @    | 185.199.109.153             |
| A     | @    | 185.199.110.153             |
| A     | @    | 185.199.111.153             |
| CNAME | www  | samuelemazzocco.github.io.  |

4. Dopo la propagazione DNS (da pochi minuti a 24 ore) GitHub emette il certificato HTTPS. Quando la casella "Enforce HTTPS" in Settings > Pages diventa attivabile, spuntarla.
5. I record MX del dominio (posta) non vanno toccati.
