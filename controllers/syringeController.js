const Nightmare = require('nightmare')
const nightmare = Nightmare({
  openDevTools: {
    mode: 'detach'
  },
  show: true
})

module.exports = {
  reportSyringe: function (req, res) {
  //console.log("inside nightmare, req ", req);
  // deconstruct args
  // console.log("inside syringeController reportSyringe");
  nightmare
  .goto('https://shollatz.github.io/MockUpPageForProject3/')
  .type('#address-search', req.body.location) // push address
  .type('#activity_details_description', req.body.description) // push desciption field
  .evaluate(function(selector, value) {
    jQuery(selector).val(value);
 }, '#activity_details_request_type', 'Needles_less_than_20')
  .type('#activity_details_contact_first_name', 'Sabine') // Push first name
  .type('#activity_details_contact_last_name', 'Hollatz') // Push last name
  .type('#activity_details_contact_email', 'sh@gmail.com') // email
  .type('#activity_details_contact_phone', '555-555') // phone
  //.end()
  .click('.btn')
  .then(console.log)
  .catch(error => {
    console.error('Search failed:', error)
  })
  //console.log("after nightmare");
  res.send("submitted to SF311");
 }
 }
