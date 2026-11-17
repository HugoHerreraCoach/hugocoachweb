import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const INFO_DIR = path.join(ROOT, 'src/app/subdomains/info');
const PUBLIC_DIR = path.join(ROOT, 'public');

test('subdominio info: middleware vive en src/middleware.ts junto a src/app para que Next 16 lo ejecute', () => {
  assert.equal(
    fs.existsSync(path.join(ROOT, 'src/middleware.ts')),
    true,
    'src/middleware.ts debe existir junto a src/app para inyectar x-is-subdomain y reescribir info.hugoherreracoach.com',
  );
  assert.equal(
    fs.existsSync(path.join(ROOT, 'middleware.ts')),
    false,
    'No debe quedar middleware.ts duplicado en la raíz fuera de src/',
  );
});

test('subdominio info: layout y page no anidan <html>, <body> ni <main>', () => {
  const layoutSource = fs.readFileSync(path.join(INFO_DIR, 'layout.tsx'), 'utf8');
  const pageSource = fs.readFileSync(path.join(INFO_DIR, 'page.tsx'), 'utf8');

  assert.equal(/<html[\s>]/i.test(layoutSource), false, 'layout.tsx no debe anidar <html>');
  assert.equal(/<body[\s>]/i.test(layoutSource), false, 'layout.tsx no debe anidar <body>');
  assert.equal(/<main[\s>]/i.test(pageSource), false, 'page.tsx no debe anidar <main>');
});

test('subdominio info: enlaces a ConexiGO usan UTMs limpios y no inyectan ?origen=', () => {
  const catalogoSource = fs.readFileSync(
    path.join(INFO_DIR, 'lib/info-catalogo.utils.ts'),
    'utf8',
  );

  assert.match(catalogoSource, /url\.searchParams\.delete\('origen'\)/);
  assert.match(catalogoSource, /url\.searchParams\.set\('utm_source',\s*'instagram'\)/);
  assert.match(catalogoSource, /url\.searchParams\.set\('utm_medium',\s*'bio_info'\)/);
  assert.match(catalogoSource, /51938530423/);
});

test('subdominio info: todas las imágenes referenciadas existen en public/', () => {
  const filesToScan = [
    path.join(INFO_DIR, 'lib/info-catalogo.utils.ts'),
    ...fs
      .readdirSync(path.join(INFO_DIR, 'components'))
      .filter((f) => f.endsWith('.tsx'))
      .map((f) => path.join(INFO_DIR, 'components', f)),
  ];

  const imagePaths = new Set();
  const regex = /\/subdomains\/info\/images\/[a-zA-Z0-9._-]+/g;

  for (const file of filesToScan) {
    const content = fs.readFileSync(file, 'utf8');
    for (const match of content.matchAll(regex)) {
      imagePaths.add(match[0]);
    }
  }

  assert.ok(imagePaths.size >= 9, 'Se esperaban al menos 9 imágenes referenciadas');
  for (const relPath of imagePaths) {
    const fullPath = path.join(PUBLIC_DIR, relPath);
    assert.equal(
      fs.existsSync(fullPath),
      true,
      `Falta el archivo de imagen en public: ${relPath}`,
    );
  }
});

test('subdominio info: todos los enlaces target="_blank" incluyen rel="noopener noreferrer"', () => {
  const componentFiles = fs
    .readdirSync(path.join(INFO_DIR, 'components'))
    .filter((f) => f.endsWith('.tsx'))
    .map((f) => path.join(INFO_DIR, 'components', f));

  for (const file of componentFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const anchorTags = content.match(/<a\b[\s\S]*?>/g) ?? [];
    for (const tag of anchorTags) {
      if (tag.includes('target="_blank"')) {
        assert.match(
          tag,
          /rel="noopener noreferrer"/,
          `Enlace externo sin rel seguro en ${path.basename(file)}: ${tag}`,
        );
      }
    }
  }
});

test('subdominio info: cada ancla de navegación tiene su sección destino con scroll-margin', () => {
  const catalogoSource = fs.readFileSync(
    path.join(INFO_DIR, 'lib/info-catalogo.utils.ts'),
    'utf8',
  );
  const componentSources = fs
    .readdirSync(path.join(INFO_DIR, 'components'))
    .filter((f) => f.endsWith('.tsx'))
    .map((f) => fs.readFileSync(path.join(INFO_DIR, 'components', f), 'utf8'))
    .join('\n');

  for (const id of ['conexigo', 'libros', 'recursos', 'empresas']) {
    assert.match(catalogoSource, new RegExp(`id:\\s*'${id}'`));
    assert.match(componentSources, new RegExp(`id="${id}"`));
  }
});

test('subdominio info: cumplimiento LCP optimize-image-priority (máximo 2 priority y sin combinar con lazy)', () => {
  const componentFiles = fs
    .readdirSync(path.join(INFO_DIR, 'components'))
    .filter((f) => f.endsWith('.tsx'))
    .map((f) => path.join(INFO_DIR, 'components', f));

  let priorityCount = 0;
  for (const file of componentFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const imageTags = content.match(/<Image\b[\s\S]*?\/>/g) ?? [];
    for (const tag of imageTags) {
      const hasPriority = /\bpriority\b/.test(tag);
      if (hasPriority) {
        priorityCount += 1;
        assert.equal(
          /loading="lazy"/.test(tag),
          false,
          `No combinar priority con loading="lazy" en ${path.basename(file)}`,
        );
      }
      assert.equal(
        /fetchPriority="auto"|loading="auto"/.test(tag),
        false,
        `No usar atributos auto innecesarios/obsoletos en ${path.basename(file)}`,
      );
    }
  }

  assert.ok(
    priorityCount >= 1 && priorityCount <= 2,
    `Deben existir entre 1 y 2 imágenes con priority para LCP, encontradas: ${priorityCount}`,
  );
});

