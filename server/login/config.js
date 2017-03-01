module.exports = {
	types: {
		access_token: 1,
		refresh_token: 2
	},
  expiration: {
  	access_token: 60 * 60 * 24 * 7, 	// SECONDS
  	refresh_token: 60 * 60 * 24 * 60 	// SECONDS
  },
	secret: 'Top-secret'
};
