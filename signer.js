const webdriverio = require('webdriverio');
const crypto = require('crypto-js');
const dotenv = require('dotenv');

dotenv.load();

const ghpwd = 'U2FsdGVkX19FhPs7Urdzq8/Szzmczz9RmxPvEz2ZacFqynxIy+s6PYFHSgEgejdQ';

const checkIn = function checkIn() {
  const options = { desiredCapabilities: { browserName: 'chrome' } };
  const client = webdriverio.remote(options);
  client
      .init()
      .url('https://attendance.makerpass.com')
      .waitForExist('.login-component', 2000)
      .click('button')
      .click('.auth-panel a')
      .waitForExist('.oauth-options', 2000)
      .click('.oauth-options a')
      .saveScreenshot('screenshot.png')
      // .then(screenshot => fs.writeFileSync('./myShot.png', screenshot.value))
      .getTitle()
      .then(title => console.log(title))
      // .then(screenshot => console.log(screenshot))
      .end();
};

const decrypt = (cypher) => {
  const bytes = crypto.AES.decrypt(cypher, process.env.SECRET);
  return bytes.toString(crypto.enc.Utf8);
};

module.exports = {
  checkIn,
};
