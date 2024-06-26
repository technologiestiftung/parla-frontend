![](https://img.shields.io/badge/Built%20with%20%E2%9D%A4%EF%B8%8F-at%20Technologiestiftung%20Berlin-blue)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

<div align="center">
<img src="public/images/parla-logo-v1.png" width="50%">
</div>

# _Parla - AI-driven Information Retrieval System_

Parla is an AI-driven prototype designed to streamline the retrieval of information from the vast amount of documents managed by public administrations. It leverages artificial intelligence to simplify access to over 11,000 public documents, including answers to parliamentary inquiries and main committee procedures.

## Why did we develop Parla?

The initiative for Parla emerged from the need to improve efficiency in public administration's handling of information. Traditional methods involve cumbersome manual searches through scattered and non-standardized data sources. Parla addresses this by providing a centralized, AI-supported platform for rapid and reliable information retrieval, benefiting not just the administration but also the public, companies, and various stakeholders.

## How does Parla work?

Parla operates by scanning through a wide array of public documents available on the parliamentary documentation system, PARDOK. Users can query Parla, which then processes these inquiries using its AI to generate responses, ensuring each answer is accompanied by references to the source documents for transparency. This system not only aids in day-to-day administrative tasks but also supports broader access to governmental information.

Despite its potential, Parla remains a work in progress, with ongoing efforts to mitigate AI inaccuracies and expand its document base, mindful of data security and privacy constraints. As an experiment in AI application within public administration, Parla exemplifies the need for well-structured data and highlights the path toward more sophisticated, secure AI implementations in government processes.

## Further information and contact

About the Parla project: https://citylab-berlin.org/en/projects/parla/

Blog article about Parla: https://citylab-berlin.org/en/blog/parla-intelligent-knowledge-management-for-administrative-documents/

Technical Deep Dive (german): https://citylab-berlin.org/de/blog/parla-technische-entwicklung-des-neuen-ki-tools/ 

For further information contact us at CityLAB Berlin: info@citylab-berlin.org

# _Parla (frontend)_

This is the frontend for the project _Parla_. Currently we explore if we can make the parliamentary documentation provided by the Berlin House of Representatives as open data https://www.parlament-berlin.de/dokumente/open-data more accessible by embedding all the data and do search it using vector similarity search. The project is heavily based on [this example](https://github.com/supabase-community/nextjs-openai-doc-search) from the supabase community. Built with [Next.js](https://nextjs.org/) deployed on vercel.com.

## How it works with retrieval-augmented generation (RAG)

```mermaid
sequenceDiagram
    participant User as User
    participant Browser as Browser
    participant OurAPI as Our API
    participant OpenAI as OpenAI API
    participant Supabase as Supabase

    User ->> Browser: User writes question in frontend
    Browser ->> OurAPI: Question is sent to our API
    OurAPI ->> OpenAI: Our API moderates the question using OpenAI API
    OpenAI -->> OurAPI: OpenAI API returns moderated question
    OurAPI ->> OpenAI: Our API turns question to embedding through OpenAI API
    OpenAI -->> OurAPI: OpenAI API returns embedding
    OurAPI ->> Supabase: Our API compares question embedding to embeddings stored in database in Supabase
    Supabase -->> OurAPI: Top n most similar questions are retrieved from the database in Supabase
    OurAPI ->> OpenAI: Text from n most similar questions is used to augment a prompt and send to OpenAI API
    OpenAI -->> OurAPI: OpenAI GPT generates response
    OurAPI ->> Browser: Our API sends response back to user in frontend
    Browser -->> User: User sees response in browser

```

## Prerequisites

- vercel.com account
- supabase.com account
- running instance of the related API and database https://github.com/technologiestiftung/parla-api
- Populated database. Using these tools https://github.com/technologiestiftung/parla-document-processor

## Needed Environment Variables

```plain
NEXT_PUBLIC_PARLA_API_URL=https://domain-of-your-api-server.dev
```

## Optional Environment Variables

To enable [Matomo](https://matomo.org/) tracking, set the following environment variables:

```plain
NEXT_PUBLIC_MATOMO_URL=
NEXT_PUBLIC_MATOMO_SITE_ID=
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
npx vercel env add NEXT_PUBLIC_PARLA_API_URL
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
      <td align="center" valign="top" width="14.28%"><a href="https://fabianmoronzirfas.me"><img src="https://avatars.githubusercontent.com/u/315106?v=4?s=64" width="64px;" alt="Fabian Morón Zirfas"/><br /><sub><b>Fabian Morón Zirfas</b></sub></a><br /><a href="https://github.com/technologiestiftung/parla-frontend/commits?author=ff6347" title="Code">💻</a> <a href="#infra-ff6347" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#design-ff6347" title="Design">🎨</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.awsm.de"><img src="https://avatars.githubusercontent.com/u/434355?v=4?s=64" width="64px;" alt="Ingo Hinterding"/><br /><sub><b>Ingo Hinterding</b></sub></a><br /><a href="https://github.com/technologiestiftung/parla-frontend/pulls?q=is%3Apr+reviewed-by%3AEsshahn" title="Reviewed Pull Requests">👀</a> <a href="#content-Esshahn" title="Content">🖋</a> <a href="#ideas-Esshahn" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/raphael-arce"><img src="https://avatars.githubusercontent.com/u/8709861?v=4?s=64" width="64px;" alt="Raphael.A"/><br /><sub><b>Raphael.A</b></sub></a><br /><a href="https://github.com/technologiestiftung/parla-frontend/commits?author=raphael-arce" title="Code">💻</a> <a href="https://github.com/technologiestiftung/parla-frontend/pulls?q=is%3Apr+reviewed-by%3Araphael-arce" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/technologiestiftung/parla-frontend/issues?q=author%3Araphael-arce" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://vogelino.com"><img src="https://avatars.githubusercontent.com/u/2759340?v=4?s=64" width="64px;" alt="Lucas Vogel"/><br /><sub><b>Lucas Vogel</b></sub></a><br /><a href="https://github.com/technologiestiftung/parla-frontend/pulls?q=is%3Apr+reviewed-by%3Avogelino" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/technologiestiftung/parla-frontend/commits?author=vogelino" title="Code">💻</a> <a href="https://github.com/technologiestiftung/parla-frontend/issues?q=author%3Avogelino" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Jaszkowic"><img src="https://avatars.githubusercontent.com/u/10830180?v=4?s=64" width="64px;" alt="Jonas Jaszkowic"/><br /><sub><b>Jonas Jaszkowic</b></sub></a><br /><a href="https://github.com/technologiestiftung/parla-frontend/commits?author=Jaszkowic" title="Code">💻</a> <a href="https://github.com/technologiestiftung/parla-frontend/issues?q=author%3AJaszkowic" title="Bug reports">🐛</a> <a href="https://github.com/technologiestiftung/parla-frontend/pulls?q=is%3Apr+reviewed-by%3AJaszkowic" title="Reviewed Pull Requests">👀</a></td>
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

- https://github.com/technologiestiftung/parla-api
- https://github.com/technologiestiftung/parla-document-processor
<!-- touch again -->
