// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
require('isomorphic-fetch');
const cheerio = require('cheerio');

const today = new Date();
const year = today.getUTCFullYear();
const month = today.getUTCMonth() + 1;
const day = today.getUTCDate();

const dateStr = '' + year + month + day;
export const URL = `https://www.wheresthematch.com/live-football-on-tv/?showdatestart=${dateStr}`;

export const transformBody = body => {
  console.log(
    "--------------[FETCHING]--------------\n",
    `${URL}\n`,
  )
    
  const $ = cheerio.load(body, {normalizeWhitespace: true, _useHtmlParser2: true });
  
  const title = $('title');
  console.log(`(${title.text()})\n`);  
  
  const rows = $('#fixtureswrapper table tr').has('[class*="fixture"]');
  
  ///////////////////////////////////////////////////////
  // Match table property getters
  
  /** @type {function(cheerio.Cheerio): Teams} */
  const getTeamsForRow = (row) => {
    const teams = row.find('.fixture')
      .text()
      .split(' v ')
      .map(str => str.trim());
    
    return teams;
  }
  
  /** @type {function(cheerio.Cheerio): Time} */
  const getTimeForRow = (row) => {
    const el = $(row.find('.time'));
    const str = el.text().trim();
    return str;
  }

  /** @type {function(cheerio.Cheerio): Competition} */
  const getCompetitionForRow = (row) => {
    const el = $(row.find('.competition-name'));
    const str = el.text().trim();
    return str;
  }

  /** @type {function(cheerio.Cheerio): Channels */
  const getChannelsForRow = (row) => {
    const el = $(row.find('.channel-details'));
    const imgUrls = $(el.find('a img')).toArray().map((el) => ({
      title: $(el).attr('alt'),
      src: $(el).attr('data-src'),
    }));
    return imgUrls;
  }
  
  /** @type {function(cheerio.Cheerio): Match} */
  const formatMatchFromRow = (row) => {
    return {
      teams: getTeamsForRow(row),
      time: getTimeForRow(row),
      competition: getCompetitionForRow(row),
      channels: getChannelsForRow(row),
    }
  }

  ///////////////////////////////////////////////////////
  // Filtering

  /** @type {Match[]} */
  const unfilteredMatches = $(rows).map((_,e) => formatMatchFromRow($(e))).toArray();
  
  const channelsToHide = ['EFL iFollow', 'SaintsTV', 'MotherwellTV', 'RedTV', 'AcciesTV', 'BluesTV', 'AFCBTV', 'RamsTV', 'QPR+'];
  
  /** @type {function(Channels): Boolean} */
  const filterOutChannels = channels => !(channels.length === 1 && channelsToHide.includes(channels[0].title));

  /** @type {function(Match): Boolean} */
  const filterOutWomen = match => !(match.competition.match(/(women|ladies)/i) || match.teams.find(teamName => teamName.match(/(women|ladies)/i)))
  
  /** @type {function(Match[]): Match[]} */
  const applyFilters = (matches) => {
    return matches.filter((match) => {
      return filterOutChannels(match.channels) && filterOutWomen(match)
    })
  };

  const filteredMatches = applyFilters(unfilteredMatches);

  return filteredMatches;
}


/**
 * @typedef Teams @type {string[]}
 * @typedef Time @type {string}
 * @typedef Competition @type {string}
 * @typedef Channels @type {{title: string, src: string}[]}
 * 
 * @typedef Match
 * @type {{
  * teams: Teams,
  * time: Time,
  * competition: Competition,
  * channels: Channels,
  * }}
  */