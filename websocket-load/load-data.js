var contents = require("fs").readFileSync("./log.txt").toString().split("\n\n");

const userIds = {};
const generatePayload = (userContext, events, done) => {
  !Object.keys(userIds).includes(userContext._uid) &&
    (userIds[userContext._uid] = 0);
  console.log(userContext._uid);

  const payload = JSON.parse(contents[userIds[userContext._uid]]);
  userContext.vars.payload = payload;
  userIds[userContext._uid] += 1;
  return done();
};

const getCount = (userContext, event, done) => {
  userContext.vars.count = contents.length;
  return done();
};

module.exports = {
  generatePayload,
  getCount,
};
