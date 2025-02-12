# Create T3 App Postgres

This project is a fork of [my-t3-drizzle](https://github.com/retconned/my-t3-drizzle), which uses MySQL. I've converted it here to use Postgres.

---

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app` using [Drizzle-orm](https://github.com/drizzle-team/drizzle-orm).

# Postgres

To run this app entirely on localhost, you'll need to install Postgres

### PostgresQL

https://www.postgresql.org/download/

### Postbird (optional)

https://github.com/Paxa/postbird

## Get started

1. Copy and fill secrets

```bash
npm i
cp .env.example .env
```

2. Generate the postgres queries (and run them in your local postgres server)

```bash
npm run db:generate
```

3. Start developing

```bash
npm run dev
```

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Drizzle-orm](https://github.com/drizzle-team/drizzle-orm)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
