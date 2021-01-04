import dayjs from 'dayjs';
import { compareTwoStrings } from 'string-similarity';

export function groupByFilters(matches) {
  return matches.reduce(
    (groups, cur) => {
      groups.gender.both.push(cur);
      if (cur.women) groups.gender.female.push(cur);
      else groups.gender.male.push(cur);

      if (cur.youth) groups.youth.true.push(cur);
      else groups.youth.false.push(cur);

      groups.televised.both.push(cur);
      if (cur.televised) groups.televised.true.push(cur);
      else groups.televised.false.push(cur);

      return groups;
    },
    {
      gender: { male: [], female: [], both: [] },
      youth: { true: [], false: [] },
      televised: { true: [], false: [], both: [] },
    },
  );
}

export function isWithinHourAndHalf(dateToCompare, currentDate = new Date()) {
  return currentDate > dayjs(dateToCompare).add(105, 'minute');
}

export function scrollToTop() {
  if (typeof document !== 'undefined') {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
}

export function findClosestTeamName(input, badges) {
  input = input.toLowerCase();
  if (input in badges) return input;

  if (input.replace(/^(\w\w)\s/, '') in badges) {
    return input.replace(/^(\w\w)\s/, ''); // starts w/ 2 letters
  }

  if (input.replace(/\s(\w\w)$/, '') in badges) {
    return input.replace(/\s(\w\w)$/, ''); // ends w/ 2 letters
  }

  if (input.replace(/^(\w\w\s)/, '') in badges) {
    return input.replace(/^(\d+)\s/, ''); // starts w/ numbers
  }

  if (input.replace(/\s(\d+)$/, '') in badges) {
    return input.replace(/\s(\d+)$/, ''); // ends w/ numbers
  }

  let bestStr = '';
  let bestMatchPc = 0;

  for (const key in badges) {
    const pc = compareTwoStrings(input, key);
    if (pc > 0.75) {
      if (pc > bestMatchPc) {
        bestStr = key;
        bestMatchPc = pc;
      }
    }
  }

  return bestStr;
}
