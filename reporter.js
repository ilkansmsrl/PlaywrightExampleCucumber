const reporter = require('cucumber-html-reporter');

const options = {
    theme: 'bootstrap',
    jsonFile: 'cucumber-report.json',
    output: 'reports/cucumber-report.html',
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: false,
    metadata: {
        "App Version": "1.0.0",
        "Test Environment": "Test",
        "Browser": "Chrome (Headless)",
        "Platform": "Windows 10",
        "Parallel": "No",
        "Executed": "Remote"
    },
    failedSummaryReport: true,
    brandTitle: "Test Otomasyon Raporu",
    name: "Playwright-Cucumber Test Sonuçları"
};

reporter.generate(options); 