globalThis.process ??= {}; globalThis.process.env ??= {};
import './chunks/astro-designed-error-pages_KK5-SaER.mjs';
import './chunks/astro/server_-3bOTmA6.mjs';
import { s as sequence } from './chunks/index_DxmB3vRf.mjs';

const onRequest$1 = (context, next) => {
  if (context.isPrerendered) {
    context.locals.runtime ??= {
      env: process.env
    };
  }
  return next();
};

const onRequest = sequence(
	onRequest$1,
	
	
);

export { onRequest };
