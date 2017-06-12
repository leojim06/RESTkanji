export default function getQuery(query) {
   return query = {
      limit: query.hasOwnProperty('page') ?
         query.hasOwnProperty('limit') ? parseInt(query.limit, 0) : 10 :
         query.hasOwnProperty('limit') ? parseInt(query.limit, 0) : 0,
      skip: query.hasOwnProperty('skip') ? parseInt(query.skip, 0) : 0,
      page: query.hasOwnProperty('page') ? parseInt(query.page, 0) : 0,
      level: query.hasOwnProperty('level') ? parseInt(query.level, 0) : null,
      letter: query.hasOwnProperty('letter') ? `${query.letter}.*` : '',
      count: query.hasOwnProperty('count'),
   }
}