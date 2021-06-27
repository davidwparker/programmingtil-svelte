# COMMANDS and things

```
npm run dev -- --port 5000
```

## EPISODE 33 - making a simple tour using svelte motion

```
modified:   src/lib/components/navbar/Nav.svelte
new file:   src/lib/components/navbar/_TourStep.svelte
modified:   src/lib/shared/stores.ts
```

## EPISODE 32 - svelte motion

Resources
* https://github.com/micha-lmxt/svelte-motion

```
modified:   package-lock.json
modified:   package.json
new file:   src/lib/components/motion/AnimateSharedLayout.svelte
new file:   src/lib/components/motion/BasicAnimation1.svelte
new file:   src/lib/components/motion/BasicAnimation2.svelte
new file:   src/lib/components/motion/DragExample.svelte
new file:   src/lib/components/motion/MotionConfig.svelte
new file:   src/lib/components/motion/UseAnimationExample.svelte
new file:   src/lib/components/motion/UseMotionValueExample.svelte
new file:   src/routes/motion.svelte
```

## EPISODE 31 - dark mode (part 2)

```
modified:   README.md
modified:   src/hooks.ts
new file:   src/lib/components/icons/UiMoonSolid.svelte
new file:   src/lib/components/icons/UiSunOutline.svelte
modified:   src/lib/components/icons/index.ts
modified:   src/lib/components/navbar/Nav.svelte
modified:   src/lib/shared/stores.ts
new file:   src/lib/shared/theme.ts
modified:   src/routes/__layout.svelte
new file:   src/routes/app/theme.ts
```

## EPISODE 30 - dark mode (part 1)

Note: skipped name "episode 29" to sync up with my other SvelteKit post about examples.

Resources
* https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually

```
modified:   src/lib/app/comments/CommentCard.svelte
modified:   src/lib/app/comments/CommentForm.svelte
modified:   src/lib/app/posts/PostCard.svelte
modified:   src/lib/app/posts/PostForm.svelte
modified:   src/lib/components/navbar/Nav.svelte
modified:   src/routes/__layout.svelte
modified:   src/routes/index.svelte
modified:   src/routes/posts/[slug].svelte
modified:   src/routes/posts/[slug]/edit.svelte
modified:   src/routes/users/sign-in.svelte
modified:   src/routes/users/sign-up.svelte
modified:   tailwind.config.cjs
```

## EPISODE 28 - adding RSS feed

Resources
* https://validator.w3.org/feed/check.cgi

```
modified:   src/routes/index.svelte
modified:   src/routes/posts/index.ts
new file:   src/routes/rss.ts
```

## EPISODE 27 - adding typescript to an existing application

```
new file:   .eslintrc.cjs
modified:   README.md
modified:   package-lock.json
modified:   package.json
deleted:    scripts/setupTypeScript.js
renamed:    src/hooks.js -> src/hooks.ts
modified:   src/lib/app/comments/CommentForm.svelte
modified:   src/lib/app/posts/PostCard.svelte
modified:   src/lib/app/posts/PostForm.svelte
renamed:    src/lib/components/icons/index.js -> src/lib/components/icons/index.ts
modified:   src/lib/components/navbar/Nav.svelte
deleted:    src/lib/shared/apis.js
new file:   src/lib/shared/apis.ts
renamed:    src/lib/shared/helpers.js -> src/lib/shared/helpers.ts
renamed:    src/lib/shared/stores.js -> src/lib/shared/stores.ts
modified:   src/routes/__layout.svelte
modified:   src/routes/index.svelte
renamed:    src/routes/posts/[id].js -> src/routes/posts/[id].ts
modified:   src/routes/posts/[slug].svelte
modified:   src/routes/posts/[slug]/edit.svelte
renamed:    src/routes/posts/index.js -> src/routes/posts/index.ts
deleted:    src/routes/sitemap.xml.js
new file:   src/routes/sitemap.xml.ts
modified:   src/routes/users/[slug].svelte
modified:   src/routes/users/settings.svelte
modified:   src/routes/users/sign-in.svelte
modified:   src/routes/users/sign-up.svelte
renamed:    src/routes/users/sign_in.js -> src/routes/users/sign_in.ts
renamed:    src/routes/users/sign_out.js -> src/routes/users/sign_out.ts
deleted:    src/service-worker.js
new file:   src/service-worker.ts
deleted:    static/tailwind.css
modified:   svelte.config.js
new file:   tsconfig.json
```

## EPISODE 26 - better protected routes with endpoints, hooks, and load

```
modified:   src/hooks.js
deleted:    src/hooks/index.js
modified:   src/lib/app/posts/PostCard.svelte
deleted:    src/lib/components/layouts/ProtectedLayout.svelte
modified:   src/lib/components/navbar/Nav.svelte
modified:   src/lib/shared/helpers.js
modified:   src/lib/shared/stores.js
modified:   src/routes/__layout.svelte
modified:   src/routes/about.svelte
modified:   src/routes/index.svelte
modified:   src/routes/users/settings.svelte
modified:   src/routes/users/sign-in.svelte
modified:   src/routes/users/sign_in.js
modified:   src/routes/users/sign_out.js
```

## EPISODE 25 - upgrading between sveltekit versions

Resources:
* https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md

```
npm update
```

```
modified:   .gitignore
new file:   .prettierignore
modified:   README.md
modified:   package-lock.json
modified:   package.json
modified:   src/global.d.ts
modified:   src/hooks/index.js
renamed:    src/hooks/index.js -> src/hooks.js
modified:   src/lib/shared/apis.js
renamed:    src/routes/$error.svelte -> src/routes/__error.svelte
renamed:    src/routes/$layout.svelte -> src/routes/__layout.svelte
modified:   src/routes/posts/[id].js
modified:   src/routes/posts/index.js
modified:   src/routes/users/sign_in.js
modified:   src/routes/users/sign_out.js
deleted:    svelte.config.cjs
new file:   svelte.config.js
modified:   tailwind.config.cjs
```

## EPISODE 24 - Two ways to create a Sitemap

```
new file:   src/routes/sitemap.xml.js
```

## EPISODE 23 - Deletes and Updating comments with SvelteKit Endpoints

```
modified:   README.md
modified:   src/lib/app/posts/PostCard.svelte
modified:   src/lib/app/posts/PostForm.svelte
modified:   src/lib/components/navbar/Nav.svelte
modified:   src/lib/shared/apis.js
modified:   src/routes/index.svelte
modified:   src/routes/posts/index.js
modified:   src/routes/users/sign_in.js
modified:   src/routes/users/sign_out.js
new file:   src/routes/posts/[id].js
```

## EPISODE 22 - Doing more with endpoints and no-JS

```
modified:   README.md
modified:   src/hooks/index.js
modified:   src/lib/app/posts/PostCard.svelte
modified:   src/lib/app/posts/PostForm.svelte
modified:   src/lib/components/navbar/Nav.svelte
modified:   src/lib/shared/stores.js
modified:   src/routes/$layout.svelte
modified:   src/routes/index.svelte
modified:   src/routes/posts/index.js
modified:   src/routes/users/sign-in.svelte
modified:   src/routes/users/sign_in.js
modified:   src/routes/users/sign_out.js
new file:   src/routes/posts/[slug]/
new file:   src/routes/posts/new.svelte
```

## EPISODE 21 - implementing useContext and cookies with our JWTs and AUDs

```
README.md
package-lock.json
package.json
src/ambient.d.ts
src/global.d.ts
src/hooks/index.js
src/lib/app/comments/CommentForm.svelte
src/lib/app/posts/PostCard.svelte
src/lib/app/posts/PostForm.svelte
src/lib/components/buttons/Submit.svelte
src/lib/components/layouts/ProtectedLayout.svelte
src/lib/components/navbar/Nav.svelte
src/lib/shared/apis.js
src/lib/shared/helpers.js
src/lib/shared/stores.js
src/routes/$layout.svelte
src/routes/index.svelte
src/routes/posts/[slug].svelte
src/routes/posts/index.js
src/routes/users/[slug].svelte
src/routes/users/settings.svelte
src/routes/users/sign-in.svelte
src/routes/users/sign-up.svelte
src/routes/users/sign_in.js
src/routes/users/sign_out.js
src/service-worker.js
```

## EPISODE 20 - refactors and creating comments

```
new file:   .prettierrc
modified:   README.md
new file:   src/lib/app/comments/CommentCard.svelte
new file:   src/lib/app/comments/CommentForm.svelte
new file:   src/lib/app/posts/PostCard.svelte
new file:   src/lib/app/posts/PostForm.svelte
modified:   src/lib/shared/helpers.js
modified:   src/routes/index.svelte
modified:   src/routes/posts/[slug].svelte
modified:   src/routes/users/sign-in.svelte
modified:   src/routes/users/sign-up.svelte
```

## EPISODE 19 - Post Slug and Display Comments

```
# modified:   src/routes/index.svelte
# new file:   src/routes/posts/[slug].svelte
# modified:   src/routes/users/[slug].svelte
# modified:   src/routes/users/sign-in.svelte
```

## EPISODE 18 - Simple Protected Layout pages

```
#	new file:   src/lib/components/layouts/ProtectedLayout.svelte
#	modified:   src/lib/components/navbar/Nav.svelte
#	modified:   src/routes/about.svelte
#	modified:   src/routes/users/settings.svelte
```

## EPISODE 17 - friendly URLs (named routes)

```
#	modified:   README.md
#	modified:   package-lock.json
#	modified:   package.json
#	modified:   src/app.html
#	modified:   src/routes/$error.svelte
#	modified:   src/routes/index.svelte
#	new file:   src/routes/users/[slug].svelte
#	modified:   svelte.config.cjs
```

## EPISODE 16 - cookies

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
