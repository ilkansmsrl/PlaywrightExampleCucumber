async function forAllBrowsers(pages, action) {
    const results = [];
    for (const [browserType, page] of pages.entries()) {
        try {
            const result = await action(page, browserType);
            results.push({ browserType, result, success: true });
        } catch (error) {
            results.push({ browserType, error, success: false });
            console.error(`${browserType} browser'ında hata:`, error);
        }
    }
    return results;
}

module.exports = { forAllBrowsers }; 