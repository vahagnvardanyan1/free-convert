# Well-Known Directory

This directory contains configuration files for AI plugins and API specifications.

## Important: Domain Configuration

When changing the domain name (currently configured in `src/config/constants.js`), you must also manually update the URLs in the following JSON files:

1. **ai-plugin.json**
   - `api.url`
   - `logo_url`
   - `legal_info_url`

2. **openapi.json**
   - `servers[0].url`

These files cannot dynamically reference the `SITE_URL` constant because they are static JSON files served directly.

## Files in this directory

- `ai-plugin.json` - Configuration for AI assistant plugins (ChatGPT, Claude, etc.)
- `openapi.json` - OpenAPI specification for the public API

