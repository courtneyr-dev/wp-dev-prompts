#!/usr/bin/env node
/**
 * Fetch and cache WPHelpers API JSON
 * - Core blocks metadata
 * - Icons library
 *
 * Usage: node scripts/fetch-wphelpers-data.js
 *
 * @package wp-dev-prompts
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const DATA_DIR = path.join(__dirname, '..', 'data');

const ENDPOINTS = [
  {
    url: 'https://wphelpers.dev/api/core-blocks',
    file: 'core-blocks.json',
    description: 'WordPress core blocks metadata'
  },
  {
    url: 'https://wphelpers.dev/api/icons',
    file: 'core-icons.json',
    description: 'WordPress core icons library'
  }
];

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  console.log(`Created directory: ${DATA_DIR}`);
}

/**
 * Fetch URL with redirect handling
 */
async function fetchUrl(url, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    if (maxRedirects === 0) {
      reject(new Error('Too many redirects'));
      return;
    }

    const protocol = url.startsWith('https') ? https : require('http');

    protocol.get(url, {
      headers: {
        'User-Agent': 'wp-dev-prompts/1.0',
        'Accept': 'application/json'
      }
    }, (res) => {
      // Handle redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const redirectUrl = res.headers.location.startsWith('http')
          ? res.headers.location
          : new URL(res.headers.location, url).toString();
        console.log(`  Redirecting to: ${redirectUrl}`);
        resolve(fetchUrl(redirectUrl, maxRedirects - 1));
        return;
      }

      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
        return;
      }

      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * Validate and format JSON
 */
function processJson(raw, endpoint) {
  try {
    const parsed = JSON.parse(raw);

    // Add metadata
    return {
      _meta: {
        source: endpoint.url,
        fetchedAt: new Date().toISOString(),
        description: endpoint.description
      },
      data: parsed
    };
  } catch (e) {
    throw new Error(`Invalid JSON from ${endpoint.url}: ${e.message}`);
  }
}

/**
 * Main execution
 */
async function run() {
  console.log('WPHelpers Data Fetcher');
  console.log('======================\n');

  const results = {
    success: [],
    failed: []
  };

  for (const endpoint of ENDPOINTS) {
    console.log(`Fetching: ${endpoint.description}`);
    console.log(`  URL: ${endpoint.url}`);

    try {
      const raw = await fetchUrl(endpoint.url);
      const processed = processJson(raw, endpoint);
      const outPath = path.join(DATA_DIR, endpoint.file);

      fs.writeFileSync(outPath, JSON.stringify(processed, null, 2));
      console.log(`  Saved: ${outPath}`);

      // Log stats
      const dataKeys = Object.keys(processed.data);
      console.log(`  Items: ${Array.isArray(processed.data) ? processed.data.length : dataKeys.length}`);

      results.success.push(endpoint.file);
    } catch (e) {
      console.error(`  Error: ${e.message}`);
      results.failed.push({ file: endpoint.file, error: e.message });
    }

    console.log('');
  }

  // Summary
  console.log('Summary');
  console.log('-------');
  console.log(`Success: ${results.success.length}`);
  console.log(`Failed: ${results.failed.length}`);

  if (results.failed.length > 0) {
    console.log('\nFailed endpoints:');
    results.failed.forEach(f => console.log(`  - ${f.file}: ${f.error}`));
    process.exit(1);
  }

  console.log('\nDone!');
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
