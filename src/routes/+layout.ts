import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
  // NB This should be scalar data.
  // Accessors should not violate the spirit of this.
  return {
    fromLayout: 'foo'
  };
};

export const prerender = true;
