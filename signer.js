const webdriverio = require('webdriverio');
const crypto = require('crypto-js');
const dotenv = require('dotenv');

dotenv.load();

const users = [{
  username: 'rhinodavid',
  password: 'U2FsdGVkX19FhPs7Urdzq8/Szzmczz9RmxPvEz2ZacFqynxIy+s6PYFHSgEgejdQ',
}];

const decrypt = (cypher) => {
  const bytes = crypto.AES.decrypt(cypher, process.env.SECRET);
  return bytes.toString(crypto.enc.Utf8);
};

const checkIn = function checkIn(user) {
  const options = { desiredCapabilities: { browserName: 'chrome' } };
  const client = webdriverio.remote(options);
  client
      .init()
      .url('https://attendance.makerpass.com')
      .waitForExist('.login-component', 2000)
      .getTitle()
      .then(title => console.log(title))
      .click('button')
      .getTitle()
      .then(title => console.log(title))
      .click('.auth-panel a')
      .waitForExist('.oauth-options', 2000)
      .getTitle()
      .then(title => console.log(title))
      .click('.oauth-options a')
      // github sign in
      .setValue('input#login_field', user.username)
      .setValue('input#password', decrypt(user.password))
      .click('input[name=\'commit\']')
      .waitForExist('.checkins', 2000)
      .click('.checkins button') // This actually checks you in!
      .saveScreenshot('screenshot.png')
      .end();
};

checkIn(users[0]);

module.exports = {
  checkIn,
};
