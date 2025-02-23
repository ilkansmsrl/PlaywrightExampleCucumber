module.exports = {
    default: {
        require: [
            'features/step_definitions/*.js',
            'features/support/hooks.js'
        ],
        format: [
            '@cucumber/pretty-formatter',
            'json:cucumber-report.json'
        ],
        formatOptions: { snippetInterface: 'async-await' },
        timeout: 30000
    }
}; 