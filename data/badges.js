require('isomorphic-fetch');
const cheerio = require('cheerio');

// export me after testing
export const BADGES_URL = `https://www.ukfootballontv.co.uk/`;

// export me after testing
export const getBadgeMap = (body) => {
  console.log('--------------[FETCHING]--------------\n', `${BADGES_URL}\n`);

  const $ = cheerio.load(body, {
    normalizeWhitespace: true,
    _useHtmlParser2: true,
  });

  const title = $('title');
  console.log(`(${title.text()})\n`);

  //

  const imgs = $('table tr.event-row img');

  // REMOVE ACCENTS/DIACRITICS >>>>>>>>>>>>>>>
  // https://gist.github.com/alisterlf/3490957#gistcomment-3407271
  const accents =
    'ÀÁÂÃÄÅĄĀāàáâãäåąßÒÓÔÕÕÖØŐòóôőõöøĎďDŽdžÈÉÊËĘèéêëęðÇçČčĆćÐÌÍÎÏĪìíîïīÙÚÛÜŰùűúûüĽĹŁľĺłÑŇŃňñńŔŕŠŚŞšśşŤťŸÝÿýŽŻŹžżźđĢĞģğ';
  const accentsOut =
    'AAAAAAAAaaaaaaaasOOOOOOOOoooooooDdDZdzEEEEEeeeeeeCcCcCcDIIIIIiiiiiUUUUUuuuuuLLLlllNNNnnnRrSSSsssTtYYyyZZZzzzdGGgg';
  const accentsMap = new Map();
  for (const i in accents) {
    accentsMap.set(accents.charCodeAt(i), accentsOut.charCodeAt(i));
  }

  function removeAccents(str) {
    const nstr = new Array(str.length);
    let x, i;
    for (i = 0; i < nstr.length; i++)
      nstr[i] = accentsMap.get((x = str.charCodeAt(i))) || x;
    return String.fromCharCode.apply(null, nstr);
  }
  // <<<<<<<<<<<<<<<<<<<<<<<<<

  const teamMap = new Map();

  imgs.each((i, el) => {
    // normalize accent letters to latin/english
    const node = $(el);
    const team = removeAccents(node.attr('alt'));
    if (!teamMap.has(team)) {
      teamMap.set(team, node.attr('data-src'));
    }
  });

  const badgesObj = {};
  teamMap.forEach((v, k) => (badgesObj[k] = v));

  return badgesObj;
};
