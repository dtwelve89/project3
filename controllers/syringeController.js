const Nightmare = require('nightmare')
const nightmare = Nightmare({
  openDevTools: {
    mode: 'detach'
  },
  show: true
})

module.exports = {
  reportSyringe: function (req, res) {
  // deconstruct args
  console.log("inside syringeController reportSyringe");
  nightmare
  .goto('https://duckduckgo.com')
  .type('#search_form_input_homepage', 'github nightmare') // push args to fields
  .click('#search_button_homepage')
  .wait('#r1-0 a.result__a')
  .evaluate(() => {
    console.log("inside evaluate");
    return document.querySelector('#r1-0 a.result__a').href})
  .end()
  .then(console.log)
  .catch(error => {
    console.error('Search failed:', error)
  })
  console.log("after nightmare");
  res.send("submitted to SF311");
}
}
