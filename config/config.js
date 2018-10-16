// Copy this file as config.js in the same folder, with the proper database connection URI.

module.exports = {
  //this is required for live envornment... will update when we get there... 
  db: 'mongodb://username:password@url:port/db',
  //port 3000 while in dev environment and mongodb collection for login 
  db_dev: 'mongodb://localhost:27017/login_info_db',
};
 