const genUsers = (num) => {
  const array = new Array;
  for(let i=0; i<num; i++){
    const item = [
      faker.internet.email(),
      faker.date.past()
    ];
    array.push(item);
  }
  return array;
}

const insert = connection.query('INSERT INTO users (email, created_at) VALUES ?', [genUsers(500)], function(err,result){
  if(err) throw err;
  console.log(result)
});

console.log(insert.sql)

const earliestDate = 'SELECT email, created_at FROM users ORDER BY created_at LIMIT 1';

const query = connection.query(q, function(err, results, fields){
  if(err) throw err;
  console.log(pretty(results));
});
