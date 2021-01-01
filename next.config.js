const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

const dev = process.env.NODE_ENV === 'development';

const config = {
	reactStrictMode: true,
	poweredByHeader: false,
	poweredByHeader: false,
	target: 'serverless' // for netlify
}

module.exports = dev 
? config
: withPWA({
  pwa: {
    dest: 'public',
    runtimeCaching,
	},
	...config,
})