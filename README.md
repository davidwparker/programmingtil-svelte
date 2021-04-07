# COMMANDS and things

```
npm run dev -- --port 5000
```

## EPISODE 15

``` ruby
# Update Rails post_policy: if didn't already
# Users can only create up to 3 posts
def create?
  # user.posts.size < 3
  true
end
```

```
package.json
src/lib/components/navbar/Nav.svelte
src/routes/index.svelte
src/routes/users/settings.svelte
```

Thanks to @flayks and @mushineesan on Discord for helping me with DOMPurify.


* Prettier
* Nav = klasses
* Settings = goto if no $user
* index = transition, create form, edit form, delete post

## EPISODE 14

Load fake DB
```
rails c (or create data how you want first)

Content from: https://jaspervdj.be/lorem-markdownum/

content = """
# Nec latratibus armos una

## Exactus dederunt dignabitur ventre armis altera

Lorem markdownum oculos. Pennis sunt hoc olim qui, clausa
[quo](http://traharrobustior.net/) illa adpositi. Auratis latet ense quondam
Occupat tempus.

- Flammae vastique est quod quod solito honor
- Ara cursu
- Vidisse motibus

Et testa extemplo pectoris mactatarumque fatentem rupit: terruit arva, non. Ait
[mons arva non](http://www.quoque-scelerato.com/), non atque perpetimur satis
coniuge rostro enim, *est* fugit? A sum per addendum in mihi carminibus fecit,
dedisset *aequora*. Functo aut officioque pharetra gentis gerebat Phasidos ab
tenus sunt sequitur nulla tinguatur occupat Palladaque. Postarum dum felix, pia
nimbi facta, serpens pondere generis forte potest sanguine arma lactantiaque
tegit!

Erit ut correpti, quique veri auditaque hastam fetibus iuventus harenis utroque
linguae iungat. [Incaluere illa](http://quod.org/pericula) labentia ventris in
angues ne suas sulcum tiliae exanimem obvertit, in fames ursi accipit praecordia
*at*. Ictu ut, meo qui tamen quisquis, nunc quem alternare, umero! Ornatos
proelia magno, **inde longius** et adspexit iaculoque condidit septem dolet
Damasicthona *colla* refert veniam.

## Quod cur saturae Armeniae Oriente

Erat propiore quas quaerentibus victima memorabat artis inmittitur notatas illis
quos demittant trepidare: procul. Quaeritur liceret iamque? Has in nec croceo
cum possit, successor perterrita voles blandimenta deos *puellam*, dixit, annos
nil. Viscera e Pallas illis; erat vocant mirum sed! Filius unxit carpit *addit
primum regna* herbas, custodemque [inmittitur](http://www.desibi.org/sub) nutrit
inspirare caligine fiducia currus, tibi senta retenta.

- Minor cruor versato et Tethyn
- Hunc novit postquam dura sua avidissima ad
- Novato in sedit expugnacior expulit concurreret audita
- Pars in sed cum Minos quid rimas
- Antra sub corpus castos
- Ardere illud inde longe

Nec *monte* celerem monet at pavere, virtus ebibit Dianae. Des nunc aut suis:
certum fortunata at curis [et](http://www.adsensit.org/alimentaque.html).
Mercede non male illa Peleusque, frater vicit et vocem, in noctis. Fecerat
templum ponit, substravit, *unco se quam* notum et. Sed dimittere fervet.

    drm_push.mysql = usSnippetScraping;
    uddi -= terminalHexadecimal;
    if (21 > -4) {
        on_vga.uat_bmp_directory(lossless, dimm + baseIpBlu, rate(
                click_standalone_full));
        banner.frameworkCDel(backlinkShell, 2);
    } else {
        ibm.addressQbe += qwerty_syn_pdf;
        language(3224, architectureBarDesktop);
        baseband_software_source(modifierRestore - ascii);
    }
    var riscCtr = card_kilohertz.dropFlopsAffiliate(matrixEditor) +
            protector_file(sharewareBrowserRecursion + freewarePaper);
    recursionWindow += latency * websiteEbookPlagiarism;

Et linquit cedere de intrarunt in sumere Cythno dum, stellatus solito compressit
nosset et exsiliantque inmitis **profundi**. Iecur legumque avidoque sublimia
taedia pavit qui furor dant truces et *deque*.
"""

20.times do |n|
  user = User.all.sample
  Post.create!(
    user: user,
    title: "This is a test #{n}",
    content: content,
    published_at: Time.now - rand(1..8).day
  )
end
```

New NPM packages:
```
npm i snarkdown --save
npm i @tailwindcss/line-clamp --save
```

```
src/app.html
src/routes/$layout.svelte
src/routes/index.svelte
tailwind.config.cjs
```

## EPISODE 13

Backend, and why using localStorage:
https://github.com/waiting-for-dev/devise-jwt/issues/126

tldr;
* cannot use different domains.
* long-term, we'll be using the same APIs with our mobile app.
* update to check and compare/use the AUD

Concerns
* XSS

```
package.json
src/components/navbar/Nav.svelte
src/routes/_layout.svelte
src/routes/users/settings.svelte
src/routes/users/sign-in.svelte
src/shared/helpers.js
src/shared/stores.js
```

## EPISODE 12

```
new alerts
new submit button
new icons
cmp/navbar/nav > settings link
routes/users/sign-in > submit button
routes/users/sign-up > submit button
routes/users/settings
```

## EPISODE 10

```
sign-up.svelte
sign-in.svelte
```

## EPISODE 9

```
.env > API_ENDPOINT
package.json
sign-in.svelte
sign-up.svelte
Nav.svelte
```

Sign up Vercel.
Add project via Vercel > Github (authorize).
(let fail if not "main/prod")
Change branch (if not on main yet), for example this is on `ep9`.
Set ENV Variables. For this one, since this is "production" (for now), we'll put on staging + production.
We'll later setup a proper staging vs production environment on Vercel.

TODO: once this episode is published, we'll be switching our main branch around.

## EPISODE 8

```
src/components/navbar/Nav.svelte
src/routes/users/sign-in.svelte
src/shared/stores.js
Bugfix: sign in AUD
```

## EPISODE 7

```
src/components/navbar/Nav.svelte
src/routes/_layout.svelte
src/routes/users/sign-in.svelte
src/shared/stores.js
```

## EPISODE 6

Basic styling

## EPISODE 5

```
package.json
webpack.config.js
static/tailwind.css
postcss/*
```

## EPISODE 4

## EPISODE 3

## EPISODE 2 - short install some packages + discuss

package.json
```
  "dependencies": {
    "@fullhuman/postcss-purgecss": "^2.3.0",
    "@tailwindcss/forms": "^0.2.1",
    "autoprefixer": "^9.8.6",
    "body-parser": "^1.19.0",
    "cssnano": "^4.1.10",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "helmet": "^3.23.3",
    "postcss": "^7.0.35",
    "sirv": "^1.0.11", *
    "tailwindcss": "npm:@tailwindcss/postcss7-compat@^2.0.1"
  },
  "devDependencies": {
    "css-loader": "^3.6.0",
    "node-fetch": "^2.6.1",
    "npm-run-all": "^4.1.5",
    "postcss-cli": "^7.1.1",
    "postcss-loader": "^3.0.0",
  }
```

## EPISODE 1

```
npx degit "sveltejs/sapper-template#webpack" my-app
cd my-app

npm install
npm run dev
```
