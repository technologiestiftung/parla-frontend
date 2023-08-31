![](https://img.shields.io/badge/Built%20with%20%E2%9D%A4%EF%B8%8F-at%20Technologiestiftung%20Berlin-blue)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

# _>ki.anfragen (frontend)_

This is a the frontend for the explorational project _>ki.anfragen_. This is not production ready. Currently we explore if we can make the parliamentary documentation provided by the "The Abgeordnetenhaus" of Berlin as open data https://www.parlament-berlin.de/dokumente/open-data more accessible by embedding all the data and do search it using vector similarity search. The project is heavily based on [this example](https://github.com/supabase-community/nextjs-openai-doc-search) from the supabase community. Built with [Next.js](https://nextjs.org/) deployed on vercel.com.

## Prerequisites

- vercel.com account
- supabase.com account
- running instance of the related API https://github.com/technologiestiftung/ki-anfragen-api
- running supabase project. Source can be found here https://github.com/technologiestiftung/ki-anfragen-supabase
- Populated database. Using these tools https://github.com/technologiestiftung/ki-anfragen-data-extractor

## Needed Environment Variables

```plain
NEXT_PUBLIC_KI_ANFRAGEN_API_URL=https://domain-of-your-api-server.dev
```

## Installation

```bash
npm ci
```

## Deploy

Assuming you have a vercel.com account and you are logged in.

```bash
# does the first deployment and project creation
npx vercel
# add your env variables (interactive)
npx vercel env add NEXT_PUBLIC_KI_ANFRAGEN_API_URL
# deploy again for production
npx vercel --prod
```

## Development

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## Tests

```bash
npm t
```

## Contributing

Before you create a pull request, write an issue so we can discuss your changes.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://fabianmoronzirfas.me"><img src="https://avatars.githubusercontent.com/u/315106?v=4?s=64" width="64px;" alt="Fabian Morón Zirfas"/><br /><sub><b>Fabian Morón Zirfas</b></sub></a><br /><a href="https://github.com/technologiestiftung/ki-anfragen-frontend/commits?author=ff6347" title="Code">💻</a> <a href="#infra-ff6347" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## Credits

<table>
  <tr>
    <td>
      Made by <a href="https://citylab-berlin.org/de/start/">
        <br />
        <br />
        <img width="200" src="https://logos.citylab-berlin.org/logo-citylab-berlin.svg" />
      </a>
    </td>
    <td>
      A project by <a href="https://www.technologiestiftung-berlin.de/">
        <br />
        <br />
        <img width="150" src="https://logos.citylab-berlin.org/logo-technologiestiftung-berlin-de.svg" />
      </a>
    </td>
    <td>
      Supported by <a href="https://www.berlin.de/rbmskzl/">
        <br />
        <br />
        <img width="80" src="https://logos.citylab-berlin.org/logo-berlin-senatskanzelei-de.svg" />
      </a>
    </td>
  </tr>
</table>

## Related Projects

- https://github.com/technologiestiftung/ki-anfragen-api
- https://github.com/technologiestiftung/ki-anfragen-data-extractor
- https://github.com/technologiestiftung/ki-anfragen-supabase
- https://github.com/technologiestiftung/oeffentliches-gestalten-gpt-search
- https://github.com/supabase-community/nextjs-openai-doc-search
<!-- touch again -->
