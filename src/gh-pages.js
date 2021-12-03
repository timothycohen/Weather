var ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/timothycohen/Weather.git',
        user: {
            name: 'Timothy Cohen', // update to use your name
            email: 'tco.physics@gmail.com' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)
