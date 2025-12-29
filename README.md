# OpenNext ISR on-demand revalidate issue showcase

This project is meant to showcase issues related to OpenNext on-demand revalidation issues.

## Working D1 & Next.js 15 example

### Prerequisites

Custom zone is required to test this scenario.

### Deploy - manual steps

To deploy the project to Cloudflare please:

1. Create R2 bucket with the name "isr-on-demant-revalidate-issue-r2",
2. Create D1 database with name "isr-on-demant-revalidate-issue". Save ID of the created database.
3. Update wrangler.json file. Replace "<isr-on-demant-revalidate-issue-database-id>" with ID of the "isr-on-demant-revalidate-issue" D1 database and "<zone-name>" with the zone to which this OpenNext project will be bound.

Deploy the application to Cloudflare:

```bash
npm install
npm run deploy
```