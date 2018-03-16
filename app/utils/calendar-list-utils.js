import { yearMonths, weekDays, getCurrentYear, getCurrentMonth, getDay } from '../utils/date-utils';

const processOneCalendarListElement = (payload) => {
  return Ember.Object.extend(payload, {

    "diaryName": function() {
      return moment(this.get('created_at')).format('YYYY-MM-DD');
    }.property('created_at'),

    "diaryNameInDiariesList": function() {
      return getDay(this.get('date'));
    }.property('date'),

    "isPending": function() {
      return this.get('reviewed_at') === null;
    }.property('reviewed_at'),

    "isCorrect": function() {
      return this.get('is_correct') === true;
    }.property('is_correct'),

    "notCorrect": function() {
      return this.get('is_correct') === false && !this.get('isPending');
    }.property('is_correct', 'isPending'),

    "selected": false

  }).create();
};

export const processCalendarList = (payload) => {
	const years = _.union(_.map(payload.collection, (c) => { return c.date.substring(0, 4); }));
  let collections = Ember.A();

  const currentYear = getCurrentYear();
  const currentMonth = getCurrentMonth();

  if (!_.includes(years, currentYear)) {
    years.unshift(currentYear);
  }

  for (let i = 0; i < years.length; i++) {
      
    collections.push(Ember.Object.create({
      "name": years[i],
      "months": Ember.A(),
      "expanded": false
    }));

    // expand only first year view
    collections[0].set('expanded', true);

    const months = _.pull(_.union(_.map(payload.collection, (c) => { if (c.date.substring(0, 4) === years[i]) { return c.date.substring(5, 7) } })), undefined);

    if (years[i] === currentYear && !_.includes(months, currentMonth)) {
      months.unshift(currentMonth);
    }

    for (let j = 0; j < months.length; j++) {

      const yearObj = _.find(collections, ['name', years[i]]);
      yearObj.get('months').pushObject(Ember.Object.create({
        "name": months[j],
        "displayName": yearMonths[months[j]],
        "days": Ember.A()
      }));

      for (let k = 0; k < payload.collection.length; k++) {
        if (payload.collection[k].date.substring(0, 4) === years[i] && payload.collection[k].date.substring(5, 7) === months[j]) {
          const monthObj = _.find(yearObj.get('months'), ['name', months[j]]);
          monthObj.get('days').pushObject(processOneCalendarListElement(payload.collection[k]));
        }
      }

      if (years[i] === currentYear && months[j] === currentMonth) {
        const monthObj = _.find(yearObj.get('months'), ['name', months[j]]);
        const currentDate = moment(new Date()).format("YYYY-MM-DD");
        const isTodayDayInCollection = _.find(monthObj.get('days'), ['date', currentDate]);

        if (!isTodayDayInCollection) monthObj.get('days').unshiftObject(Ember.Object.create({ "date": `${currentDate} - Uzupełnij`, "id": "new" }));
      }

    }

  }

  return collections;
};