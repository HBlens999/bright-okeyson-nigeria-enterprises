/**
 * Dynamic SEO and OpenGraph tag updater
 */
export function updatePageSEO(options: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}) {
  if (typeof document === 'undefined') return;

  const baseTitle = 'Bright Okeyson Nigeria Enterprises';
  const fullTitle = options.title ? `${options.title} | ${baseTitle}` : `${baseTitle} | Complete Motorcycles & Genuine Spare Parts`;
  document.title = fullTitle;

  const desc = options.description || 'Home of All Motorcycle Healing Center. Authorized dealer in complete motorcycles (Bajaj, TVS, Keke, Haojue) and genuine spare parts across Ondo and Kogi State.';

  // Update or create meta tags
  const setMeta = (name: string, content: string, isProperty = false) => {
    const attr = isProperty ? 'property' : 'name';
    let element = document.querySelector(`meta[${attr}="${name}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attr, name);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  setMeta('description', desc);
  setMeta('og:title', fullTitle, true);
  setMeta('og:description', desc, true);
  setMeta('twitter:title', fullTitle);
  setMeta('twitter:description', desc);

  if (options.image) {
    setMeta('og:image', options.image, true);
    setMeta('twitter:image', options.image);
  }
}
