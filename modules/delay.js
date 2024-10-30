const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
    const ms = parseInt(process.argv[2], 10) || 0;
    console.log(`Waiting for ${ms} milliseconds...`);
    await delay(ms);
    console.log('Done waiting.');
})();