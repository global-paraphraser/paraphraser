// Src: https://www.npmjs.com/package/@solid-primitives/i18n?activeTab=code

import { createContext, createSignal, useContext, DEV } from 'solid-js';
import { createStore } from 'solid-js/store';
import { createContextProvider } from '@solid-primitives/context';
import { isServer } from 'solid-js/web';

// src/i18n.ts
function deepReadObject(obj, path, defaultValue) {
  const value = path.trim().split(".").reduce((a, b) => a ? a[b] : void 0, obj);
  return value !== void 0 ? value : defaultValue;
}
var template = (str, params, reg = /{{([^{}]+)}}/g) => str.replace(reg, (_, key) => deepReadObject(params, key, ""));
var createI18nContext = (init = {}, lang = typeof navigator !== "undefined" && navigator.language in init ? navigator.language : Object.keys(init)[0] ?? "") => {
  const [locale, setLocale] = createSignal(lang);
  const [dict, setDict] = createStore(init);
  const translate = (key, params, defaultValue) => {
    const val = deepReadObject(dict[locale()], key, defaultValue || "");
    if (typeof val === "function")
      return val(params);
    if (typeof val === "string")
      return template(val, params || {});
    return val;
  };
  const actions = {
    /**
     * Add (or edit an existing) locale
     *
     * @param lang {string} - The locale to add or edit
     * @param table {Record<string, any>} - The dictionary
     *
     * @example
     * ```js
     * const [_, { add }] = useI18n();
     *
     * const addSwedish = () => add('sw', { hello: 'Hej {{ name }}' })
     * ```
     */
    add(lang2, table) {
      setDict(lang2, (t) => Object.assign(t || {}, table));
    },
    /**
     * Switch to the language in the parameters.
     * Retrieve the current locale if no params
     *
     * @param [lang] {string} - The locale to switch to
     *
     * * @example
     * ```js
     * const [_, { locale }] = useI18n();
     *
     * locale()
     * // => 'fr'
     * locale('sw')
     * locale()
     * // => 'sw'
     *
     * ```
     */
    locale: (lang2) => lang2 ? setLocale(lang2) : locale(),
    /**
     * Retrieve the dictionary of a language
     *
     * @param lang {string} - The language to retrieve from
     */
    dict: (lang2) => deepReadObject(dict, lang2)
  };
  return [translate, actions];
};
var I18nContext = createContext({});
var useI18n = () => useContext(I18nContext);
var useScopedI18n = (scope) => {
  const [translate, actions] = useI18n();
  return [
    (key, ...rest) => translate(`${scope}.${key}`, ...rest),
    actions
  ];
};
function buildChainedDictionary(obj) {
  const mapped = {};
  for (const [key, value] of Object.entries(obj)) {
    switch (typeof value) {
      case "object":
        mapped[key] = buildChainedDictionary(value);
        break;
      case "function":
        mapped[key] = value;
        break;
      case "string":
        mapped[key] = (args) => value.replace(/{{([^{}]+)}}/g, (_, key2) => deepReadObject(args, key2, ""));
        break;
      default:
        throw new Error(
          !isServer && DEV ? `Unsupported data format on the keys. Values must resolve to a string or a function that returns a string. Key name: "${key}"` : ""
        );
    }
  }
  return mapped;
}
function createChainedI18nDictionary(dictionaries) {
  const dict = {};
  for (const locale in dictionaries) {
    dict[locale] = buildChainedDictionary(dictionaries[locale]);
  }
  return dict;
}
function createChainedI18n(props) {
  const [locale, setLocale] = createSignal(props.locale);
  const [translations] = createSignal(createChainedI18nDictionary(props.dictionaries));
  const translate = new Proxy(
    { translate: translations()[locale()] },
    {
      get(_, prop) {
        return translations()[locale()][prop];
      }
    }
  );
  return [
    translate,
    {
      /**
       * Accessor that returns the current locale.
       */
      locale,
      /**
       * Setter that takes in a locale (keyof dictionaries) and sets it as the current locale.
       */
      setLocale,
      /**
       *
       * @param language Optional keyof dictionaries. If one is not passed in, it uses the currently selected one.
       * @returns The dictionary of the language passed in or the currently selected locale
       */
      getDictionary(language) {
        if (language)
          return props.dictionaries[language];
        return props.dictionaries[locale()];
      }
    }
  ];
}
function createChainedI18nContext(props, setFallback) {
  const i18n = createChainedI18n(props);
  return createContextProvider(() => i18n, setFallback ? i18n : null);
}

export { I18nContext, createChainedI18n, createChainedI18nContext, createChainedI18nDictionary, createI18nContext, useI18n, useScopedI18n };