module.exports = {
    // Browser konfigürasyonları
    browsers: {
        chromium: {
            name: 'chromium',
            enabled: true,
            headless: true,
            viewport: { width: 1920, height: 1080 },
            ignoreHTTPSErrors: true
        },
        firefox: {
            name: 'firefox',
            enabled: false,
            headless: true,
            viewport: { width: 1920, height: 1080 },
            ignoreHTTPSErrors: true
        },
        webkit: {
            name: 'webkit',
            enabled: false,
            headless: true,
            viewport: { width: 1920, height: 1080 },
            ignoreHTTPSErrors: true
        }
    },
    
    // Browser başlatma ayarları
    launchOptions: {
        timeout: 30000,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        slowMo: 50,
        downloadsPath: './test-downloads',
        chromiumSandbox: false
    },

    // Context ayarları
    contextOptions: {
        recordVideo: {
            dir: './test-results/videos/',
            size: { width: 1920, height: 1080 }
        },
        viewport: { width: 1920, height: 1080 },
        acceptDownloads: true
    },

    // Test çalışma ayarları
    testOptions: {
        defaultTimeout: 30000,
        navigationTimeout: 30000,
        actionTimeout: 15000,
        assertionTimeout: 10000,
        screenshotOnFailure: true
    }
}; 