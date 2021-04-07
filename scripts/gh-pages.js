var ghpages = require('gh-pages');

ghpages.publish(
    '__sapper__/export/bryanoliveira.github.io',// <-- replace yourproject with your repo name
    {
        branch: 'gh-pages',
        repo: 'https://github.com/bryanoliveira/bryanoliveira.github.io.git',
        user: {
            name: 'Bryan Oliveira',
            email: 'bryanlmoliveira@gmail.com'
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)