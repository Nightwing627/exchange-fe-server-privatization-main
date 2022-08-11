import Vue from 'vue';
import VueI18n from 'vue-i18n';
import axios from '@/api/http/axios';
import {
  myStorage, getComplexType, getLocationLang,
} from '@/utils';
import localesMap from './filesMap.json';
import defLan from './default';

Vue.use(VueI18n);

let urlLang = '';

if (window.publicInfo && window.publicInfo.lan.lanList) {
  urlLang = getLocationLang();
  const result = window.publicInfo.lan.lanList.some(el => el.id === urlLang);

  if (!result) urlLang = '';
}

const lang = window.location.href.match(/[a-z]+_[A-Z]+/) && window.location.href.match(/[a-z]+_[A-Z]+/)[0];
const langKey = localesMap[lang];

const messages = {
  def_Lan: {
    ...defLan,
  },
};
export const i18n = new VueI18n({
  locale: 'def_Lan',
  messages,
  missing() {
    return '';
  },
});

function loadLocaleMessage(locale, cb) {
  const localeCache = myStorage.get('locale') || {};
  const localeJson = localeCache[langKey];
  if (localeJson) {
    cb(null, localeJson);
  } else {
    axios({
      url: `/static/locales/${localesMap[lang]}`,
      method: 'get',
      hostType: 'def',
    }).then((res) => {
      cb(null, res);
    }).catch((error) => {
      cb(error);
    });
  }
}

export function changeLanguage(lan, change) {
  const localeCache = myStorage.get('locale') || {};
  loadLocaleMessage(lan, (error, message) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    if (getComplexType(message) !== 'Object') return;

    i18n.locale = lan;
    i18n.setLocaleMessage(lan, message);
    const keys = Object.keys(localeCache);
    keys.forEach((item) => {
      if (item.indexOf(lan) > -1 && !change) {
        delete localeCache[item];
      }
    });
    localeCache[langKey] = message;
    myStorage.set('locale', localeCache);
    if (change) {
      const locationLang = getLocationLang();
      if (locationLang) {
        window.location.href = window.location.href.replace(locationLang, lan);
      } else {
        window.location.reload();
      }
    }
  });
}

changeLanguage(lang);
