// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
require('isomorphic-fetch');
const cheerio = require('cheerio');
const Cors = require('cors');

const today = new Date();
const year = today.getUTCFullYear();
const month = today.getUTCMonth() + 1;
const day = today.getUTCDate();

const dateStr = '' + year + month + day;
const URL = `https://www.wheresthematch.com/live-football-on-tv/?showdatestart=${dateStr}`;

const transformBody = body => {
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
    
    if (!teams || !teams.length || teams.length !== 2 || teams.find(t => !t)) {
      console.warn('Teams not properly accrued');
      return [];
    }
      
    return teams;
  }
  
  /** @type {function(cheerio.Cheerio): Event} */
  const getEventForRow = (row) => {
    const eventStr = row.find('.fixture-details .event-text').text().trim().replace(/\s\s+/g, ' ');
      
    return eventStr || null;
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
      event: getEventForRow(row),
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
  // const filterOutWomen = match => !(
  //   match.competition.match(/(women|ladies|female)/i) || match.teams.find(teamName => teamName.match(/(women|ladies|female)/i))
  //   )

  ///////////////////////////////////////////////////////
  // Mapper

  /** @type {function(Match): Match} */
  const applyWomen = match => {
    const rx = /(women|ladies|female)/i;
    const comp = () => match.competition && match.competition.match(rx);
    const event = () => match.event && match.event.match(rx);
    const team = () => match.teams.length && match.teams.find(teamName => teamName.match(rx));
    return {
      ...match,
      women: Boolean(comp() || event() || team())
    };
  };

  /** @type {function(Match): Match} */
  const applyYouth = match => {    
    const rx = (/(u|under)\d\ds?/gi);
    const comp = () => match.competition && match.competition.match(rx);
    const event = () => match.event && match.event.match(rx);
    const team = () => match.teams.length && match.teams.find(teamName => teamName.match(rx));

    return {
      ...match,
      youth: Boolean(comp() || event() || team())
    };
  }
  
  /** @type {function(Match[]): Match[]} */
  const applyFilters = (matches) => {
    return matches.filter((match) => {
      return filterOutChannels(match.channels)
    })
  };

  const applyMapping = (matches) => {
    return matches
      .map(applyWomen)
      .map(applyYouth)
  }

  const filteredMatches = applyFilters(unfilteredMatches);
  const mappedMatches = applyMapping(filteredMatches);

  return mappedMatches;
}

///////////////////////////////////////////////////////
// exports / testing

// hide/unhide me for testing scraping
(async () => {
  const matches = await fetch(URL, {mode: Cors({methods: 'GET'})}).then(res => res.text()).then(body => {    
    const matches = transformBody(body);
    return matches;
  });

  console.log(matches)
})()

/**
 * @typedef Teams @type {string[]}
 * @typedef Event @type {string}
 * @typedef Time @type {string}
 * @typedef Competition @type {string}
 * @typedef Channels @type {{title: string, src: string}[]}
 * @typedef Women @type {boolean}
 * @typedef Youth @type {boolean}
 * 
 * @typedef Match
 * @type {{
  * teams: Teams,
  * event: Event,
  * time: Time,
  * competition: Competition,
  * channels: Channels,
  * women: Women,
  * youth: Youth,
  * }}
  */