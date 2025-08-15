# Only Us — Site (Vite + React + Tailwind)

## Développement local (facultatif)
```bash
npm i
npm run dev
```

## Build
```bash
npm run build
```

## Déploiement

### Vercel (recommandé)
- Importer le projet dans Vercel via GitHub
- Build command: `npm run build`
- Output: `dist`
- `vercel.json` gère le fallback pour React Router.

### Netlify
- Le fichier `public/_redirects` contient `/* /index.html 200`

### GitHub Pages
- Après `npm run build`, copier `dist/index.html` → `dist/404.html` pour les routes SPA.
