import dayjs from 'dayjs';

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
