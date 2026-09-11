export interface FeaturedProfile {
  login: string;
  name: string;
  role: string;
  avatar: string;
}

export const TOP_FEATURED_PROFILES: FeaturedProfile[] = [
  {
    login: 'torvalds',
    name: 'Linus Torvalds',
    role: 'Creator of Linux & Git',
    avatar: 'https://github.com/torvalds.png'
  },
  {
    login: 'gaearon',
    name: 'Dan Abramov',
    role: 'Co-creator of Redux & React DevTools',
    avatar: 'https://github.com/gaearon.png'
  },
  {
    login: 'yyx990803',
    name: 'Evan You',
    role: 'Creator of Vue.js & Vite',
    avatar: 'https://github.com/yyx990803.png'
  },
  {
    login: 'shadcn',
    name: 'shadcn',
    role: 'Creator of shadcn/ui & UI Engineer',
    avatar: 'https://github.com/shadcn.png'
  },
  {
    login: 'leerob',
    name: 'Lee Robinson',
    role: 'VP of Product at Vercel / Next.js',
    avatar: 'https://github.com/leerob.png'
  },
  {
    login: 'antfu',
    name: 'Anthony Fu',
    role: 'Vue, Vite, Nuxt & UnoCSS Core Contributor',
    avatar: 'https://github.com/antfu.png'
  },
  {
    login: 'sindresorhus',
    name: 'Sindre Sorhus',
    role: 'Prolific Open Source Author & Maintainer',
    avatar: 'https://github.com/sindresorhus.png'
  },
  {
    login: 'tj',
    name: 'TJ Holowaychuk',
    role: 'Creator of Express, Koa & Apex',
    avatar: 'https://github.com/tj.png'
  },
  {
    login: 'rich-harris',
    name: 'Rich Harris',
    role: 'Creator of Svelte, SvelteKit & Rollup',
    avatar: 'https://github.com/rich-harris.png'
  },
  {
    login: 'kentcdodds',
    name: 'Kent C. Dodds',
    role: 'Creator of Testing Library & Remix Advocate',
    avatar: 'https://github.com/kentcdodds.png'
  },
  {
    login: 'addyosmani',
    name: 'Addy Osmani',
    role: 'Engineering Lead at Google Chrome & Author',
    avatar: 'https://github.com/addyosmani.png'
  },
  {
    login: 'taylorotwell',
    name: 'Taylor Otwell',
    role: 'Creator of the Laravel Framework',
    avatar: 'https://github.com/taylorotwell.png'
  },
  {
    login: 'mitchellh',
    name: 'Mitchell Hashimoto',
    role: 'Founder of HashiCorp & Creator of Terraform',
    avatar: 'https://github.com/mitchellh.png'
  },
  {
    login: 'fabpot',
    name: 'Fabien Potencier',
    role: 'Creator of Symfony & Twig',
    avatar: 'https://github.com/fabpot.png'
  },
  {
    login: 'dhh',
    name: 'David Heinemeier Hansson',
    role: 'Creator of Ruby on Rails & 37signals CTO',
    avatar: 'https://github.com/dhh.png'
  },
  {
    login: 'karpathy',
    name: 'Andrej Karpathy',
    role: 'AI Researcher & Former Tesla / OpenAI Scientist',
    avatar: 'https://github.com/karpathy.png'
  },
  {
    login: 'geohot',
    name: 'George Hotz',
    role: 'Founder of comma.ai & Creator of tinygrad',
    avatar: 'https://github.com/geohot.png'
  },
  {
    login: 'mrdoob',
    name: 'Ricardo Cabello',
    role: 'Creator of Three.js 3D Engine',
    avatar: 'https://github.com/mrdoob.png'
  },
  {
    login: 'developit',
    name: 'Jason Miller',
    role: 'Creator of Preact & Web Perf Engineer',
    avatar: 'https://github.com/developit.png'
  },
  {
    login: 'wesbos',
    name: 'Wes Bos',
    role: 'Full Stack Web Developer & Educator',
    avatar: 'https://github.com/wesbos.png'
  },
  {
    login: 'swyx',
    name: 'Shawn Wang',
    role: 'AI Engineer Foundation & Latent Space Lead',
    avatar: 'https://github.com/swyx.png'
  },
  {
    login: 'cassidoo',
    name: 'Cassidy Williams',
    role: 'Head of DX, Advisor & Developer Educator',
    avatar: 'https://github.com/cassidoo.png'
  },
  {
    login: 'getify',
    name: 'Kyle Simpson',
    role: 'Author of "You Don\'t Know JS" & Teacher',
    avatar: 'https://github.com/getify.png'
  },
  {
    login: 'kelseyhightower',
    name: 'Kelsey Hightower',
    role: 'Cloud Native & Kubernetes Technologist',
    avatar: 'https://github.com/kelseyhightower.png'
  },
  {
    login: 'ry',
    name: 'Ryan Dahl',
    role: 'Creator of Node.js & Deno',
    avatar: 'https://github.com/ry.png'
  },
  {
    login: 'mcollina',
    name: 'Matteo Collina',
    role: 'Creator of Fastify & Node.js TSC Member',
    avatar: 'https://github.com/mcollina.png'
  },
  {
    login: 'egoist',
    name: 'EGOIST',
    role: 'Creator of tsup, cac & Modern Dev Tools',
    avatar: 'https://github.com/egoist.png'
  },
  {
    login: 'posva',
    name: 'Eduardo San Martin Morote',
    role: 'Creator of Pinia & Vue Router Lead',
    avatar: 'https://github.com/posva.png'
  },
  {
    login: 'timneutkens',
    name: 'Tim Neutkens',
    role: 'Next.js Lead & Core Architect',
    avatar: 'https://github.com/timneutkens.png'
  },
  {
    login: 'rauchg',
    name: 'Guillermo Rauch',
    role: 'CEO of Vercel & Creator of Socket.io',
    avatar: 'https://github.com/rauchg.png'
  },
  {
    login: 'kamranahmedse',
    name: 'Kamran Ahmed',
    role: 'Creator of roadmap.sh & Open Source Developer',
    avatar: 'https://github.com/kamranahmedse.png'
  },
  {
    login: 't3dotgg',
    name: 'Theo Browne',
    role: 'Creator of Create T3 App & Ping Labs CEO',
    avatar: 'https://github.com/t3dotgg.png'
  },
  {
    login: 'sdras',
    name: 'Sarah Drasner',
    role: 'Engineering Director at Google & Author',
    avatar: 'https://github.com/sdras.png'
  },
  {
    login: 'orta',
    name: 'Orta Therox',
    role: 'TypeScript & CocoaPods Contributor',
    avatar: 'https://github.com/orta.png'
  },
  {
    login: 'soumith',
    name: 'Soumith Chintala',
    role: 'Co-creator of PyTorch & AI Lead',
    avatar: 'https://github.com/soumith.png'
  },
  {
    login: 'lucidrains',
    name: 'Phil Wang',
    role: 'Deep Learning & PyTorch Replications Pioneer',
    avatar: 'https://github.com/lucidrains.png'
  },
  {
    login: 'fchollet',
    name: 'François Chollet',
    role: 'Creator of Keras & AI Researcher',
    avatar: 'https://github.com/fchollet.png'
  },
  {
    login: 'rasbt',
    name: 'Sebastian Raschka',
    role: 'AI Researcher at Lightning AI & Author',
    avatar: 'https://github.com/rasbt.png'
  },
  {
    login: 'bradtraversy',
    name: 'Brad Traversy',
    role: 'Traversy Media Founder & Educator',
    avatar: 'https://github.com/bradtraversy.png'
  },
  {
    login: 'mxcl',
    name: 'Max Howell',
    role: 'Creator of Homebrew & tea.xyz',
    avatar: 'https://github.com/mxcl.png'
  },
  {
    login: 'defunkt',
    name: 'Chris Wanstrath',
    role: 'Co-founder of GitHub & Game Developer',
    avatar: 'https://github.com/defunkt.png'
  },
  {
    login: 'mojombo',
    name: 'Tom Preston-Werner',
    role: 'Co-founder of GitHub & Creator of TOML',
    avatar: 'https://github.com/mojombo.png'
  },
  {
    login: 'JakeWharton',
    name: 'Jake Wharton',
    role: 'Android Open Source Legend (ButterKnife, OkHttp)',
    avatar: 'https://github.com/JakeWharton.png'
  },
  {
    login: 'mdo',
    name: 'Mark Otto',
    role: 'Co-creator of Bootstrap & GitHub Design Director',
    avatar: 'https://github.com/mdo.png'
  },
  {
    login: 'LeaVerou',
    name: 'Lea Verou',
    role: 'W3C CSS Expert, Author & MIT Researcher',
    avatar: 'https://github.com/LeaVerou.png'
  },
  {
    login: 'wesm',
    name: 'Wes McKinney',
    role: 'Creator of Python pandas & Apache Arrow',
    avatar: 'https://github.com/wesm.png'
  },
  {
    login: 'tiangolo',
    name: 'Sebastián Ramírez',
    role: 'Creator of FastAPI, Typer & SQLModel',
    avatar: 'https://github.com/tiangolo.png'
  },
  {
    login: 'mitsuhiko',
    name: 'Armin Ronacher',
    role: 'Creator of Flask, Jinja & Sentry Principal',
    avatar: 'https://github.com/mitsuhiko.png'
  },
  {
    login: 'antirez',
    name: 'Salvatore Sanfilippo',
    role: 'Creator of Redis In-Memory Database',
    avatar: 'https://github.com/antirez.png'
  },
  {
    login: 'danvk',
    name: 'Dan Vanderkam',
    role: 'Author of "Effective TypeScript"',
    avatar: 'https://github.com/danvk.png'
  },
  {
    login: 'colinhacks',
    name: 'Colin McDonnell',
    role: 'Creator of Zod Schema Validator',
    avatar: 'https://github.com/colinhacks.png'
  },
  {
    login: 'KATT',
    name: 'Alex Johansson',
    role: 'Creator of tRPC End-to-End Typesafe APIs',
    avatar: 'https://github.com/KATT.png'
  },
  {
    login: 'tannerlinsley',
    name: 'Tanner Linsley',
    role: 'Creator of TanStack (Query, Table, Router)',
    avatar: 'https://github.com/tannerlinsley.png'
  },
  {
    login: 'bvaughn',
    name: 'Brian Vaughn',
    role: 'Creator of React-Virtualized & React DevTools',
    avatar: 'https://github.com/bvaughn.png'
  },
  {
    login: 'sebmarkbage',
    name: 'Sebastian Markbåge',
    role: 'React Architecture Lead & Server Components',
    avatar: 'https://github.com/sebmarkbage.png'
  },
  {
    login: 'acdlite',
    name: 'Andrew Clark',
    role: 'React Core Team & Co-creator of Redux',
    avatar: 'https://github.com/acdlite.png'
  },
  {
    login: 'lukeed',
    name: 'Luke Edwards',
    role: 'Creator of Polka, Klona, Dequal & Uvu',
    avatar: 'https://github.com/lukeed.png'
  },
  {
    login: 'dai-shi',
    name: 'Daishi Kato',
    role: 'Creator of Zustand, Jotai & Valtio',
    avatar: 'https://github.com/dai-shi.png'
  },
  {
    login: 'adamwathan',
    name: 'Adam Wathan',
    role: 'Creator of Tailwind CSS & Tailwind Labs CEO',
    avatar: 'https://github.com/adamwathan.png'
  },
  {
    login: 'steveschoger',
    name: 'Steve Schoger',
    role: 'Co-creator of Refactoring UI & Heroicons',
    avatar: 'https://github.com/steveschoger.png'
  },
  {
    login: 'jaredpalmer',
    name: 'Jared Palmer',
    role: 'Creator of Turborepo & Formik',
    avatar: 'https://github.com/jaredpalmer.png'
  },
  {
    login: 'paulirish',
    name: 'Paul Irish',
    role: 'Chrome DevTools & Web Performance Engineer',
    avatar: 'https://github.com/paulirish.png'
  },
  {
    login: 'chriscoyier',
    name: 'Chris Coyier',
    role: 'Founder of CSS-Tricks & Co-founder of CodePen',
    avatar: 'https://github.com/chriscoyier.png'
  },
  {
    login: 'una',
    name: 'Una Kravets',
    role: 'Chrome Developer Relations & CSS Advocate',
    avatar: 'https://github.com/una.png'
  },
  {
    login: 'argyleink',
    name: 'Adam Argyle',
    role: 'Chrome CSS Engineer & Open Props Creator',
    avatar: 'https://github.com/argyleink.png'
  },
  {
    login: 'nzakas',
    name: 'Nicholas C. Zakas',
    role: 'Creator of ESLint & Author',
    avatar: 'https://github.com/nzakas.png'
  },
  {
    login: 'feross',
    name: 'Feross Aboukhadijeh',
    role: 'Creator of WebTorrent & StandardJS',
    avatar: 'https://github.com/feross.png'
  },
  {
    login: 'isaacs',
    name: 'Isaac Z. Schlueter',
    role: 'Creator of npm & Node.js Core Lead',
    avatar: 'https://github.com/isaacs.png'
  },
  {
    login: 'wycats',
    name: 'Yehuda Katz',
    role: 'Ember.js, Rust Core Team & Bundler Creator',
    avatar: 'https://github.com/wycats.png'
  },
  {
    login: 'matz',
    name: 'Yukihiro Matsumoto',
    role: 'Creator of the Ruby Programming Language',
    avatar: 'https://github.com/matz.png'
  },
  {
    login: 'gvanrossum',
    name: 'Guido van Rossum',
    role: 'Creator of the Python Programming Language',
    avatar: 'https://github.com/gvanrossum.png'
  },
  {
    login: 'brendaneich',
    name: 'Brendan Eich',
    role: 'Creator of JavaScript & CEO of Brave',
    avatar: 'https://github.com/brendaneich.png'
  },
  {
    login: 'junegunn',
    name: 'Junegunn Choi',
    role: 'Creator of fzf & vim-plug',
    avatar: 'https://github.com/junegunn.png'
  },
  {
    login: 'BurntSushi',
    name: 'Andrew Gallant',
    role: 'Creator of ripgrep & Rust Regex Lead',
    avatar: 'https://github.com/BurntSushi.png'
  },
  {
    login: 'sharkdp',
    name: 'David Peter',
    role: 'Creator of bat, fd & hyperfine',
    avatar: 'https://github.com/sharkdp.png'
  },
  {
    login: 'charliermarsh',
    name: 'Charlie Marsh',
    role: 'Founder of Astral & Creator of Ruff and uv',
    avatar: 'https://github.com/charliermarsh.png'
  },
  {
    login: 'simonw',
    name: 'Simon Willison',
    role: 'Creator of Datasette & Co-creator of Django',
    avatar: 'https://github.com/simonw.png'
  },
  {
    login: 'hwchase17',
    name: 'Harrison Chase',
    role: 'Creator of LangChain & AI Frameworks',
    avatar: 'https://github.com/hwchase17.png'
  },
  {
    login: 'jerryjliu',
    name: 'Jerry Liu',
    role: 'Creator of LlamaIndex & Data Frameworks',
    avatar: 'https://github.com/jerryjliu.png'
  },
  {
    login: 'ggerganov',
    name: 'Georgi Gerganov',
    role: 'Creator of llama.cpp & whisper.cpp',
    avatar: 'https://github.com/ggerganov.png'
  },
  {
    login: 'shuding',
    name: 'Shu Ding',
    role: 'Creator of Nextra & SWR at Vercel',
    avatar: 'https://github.com/shuding.png'
  },
  {
    login: 'pacocoursey',
    name: 'Paco Coursey',
    role: 'Creator of Sonner Toasts & next-themes',
    avatar: 'https://github.com/pacocoursey.png'
  },
  {
    login: 'emilkowalski',
    name: 'Emil Kowalski',
    role: 'Design Engineer & Creator of Vaul Drawer',
    avatar: 'https://github.com/emilkowalski.png'
  },
  {
    login: 'rauno53',
    name: 'Rauno Freiberg',
    role: 'Design Engineer at Vercel & Craft Specialist',
    avatar: 'https://github.com/rauno53.png'
  },
  {
    login: 'peduarte',
    name: 'Pedro Duarte',
    role: 'Co-creator of Radix UI & Stitches',
    avatar: 'https://github.com/peduarte.png'
  },
  {
    login: 'fabian-hiller',
    name: 'Fabian Hiller',
    role: 'Creator of Valibot Schema Library',
    avatar: 'https://github.com/fabian-hiller.png'
  },
  {
    login: 'eps1lon',
    name: 'Sebastian Silbermann',
    role: 'Material UI Core & Testing Library Maintainer',
    avatar: 'https://github.com/eps1lon.png'
  },
  {
    login: 'oliviertassinari',
    name: 'Olivier Tassinari',
    role: 'Co-founder of Material-UI / MUI',
    avatar: 'https://github.com/oliviertassinari.png'
  },
  {
    login: 'cart',
    name: 'Carter Anderson',
    role: 'Creator of Bevy Game Engine in Rust',
    avatar: 'https://github.com/cart.png'
  },
  {
    login: 'nicolo-ribaudo',
    name: 'Nicolò Ribaudo',
    role: 'Babel Core Lead & TC39 Invited Expert',
    avatar: 'https://github.com/nicolo-ribaudo.png'
  },
  {
    login: 'btholt',
    name: 'Brian Holt',
    role: 'Frontend Masters Educator & Engineer',
    avatar: 'https://github.com/btholt.png'
  },
  {
    login: 'shiffman',
    name: 'Daniel Shiffman',
    role: 'Creator of The Coding Train & p5.js Contributor',
    avatar: 'https://github.com/shiffman.png'
  },
  {
    login: 'trekhleb',
    name: 'Oleksii Trekhleb',
    role: 'Author of JavaScript Algorithms & Data Structures',
    avatar: 'https://github.com/trekhleb.png'
  },
  {
    login: 'bradfrost',
    name: 'Brad Frost',
    role: 'Pioneer of Atomic Design & Design Systems',
    avatar: 'https://github.com/bradfrost.png'
  },
  {
    login: 'dtolnay',
    name: 'David Tolnay',
    role: 'Author of Serde, Syn, Anyhow & Thiserror',
    avatar: 'https://github.com/dtolnay.png'
  },
  {
    login: 'carllerche',
    name: 'Carl Lerche',
    role: 'Creator of Tokio Asynchronous Runtime',
    avatar: 'https://github.com/carllerche.png'
  },
  {
    login: 'seanmonstar',
    name: 'Sean McArthur',
    role: 'Creator of Hyper HTTP & Reqwest in Rust',
    avatar: 'https://github.com/seanmonstar.png'
  },
  {
    login: 'alexcrichton',
    name: 'Alex Crichton',
    role: 'Rust Core Developer & Wasmtime Architect',
    avatar: 'https://github.com/alexcrichton.png'
  },
  {
    login: 'TheBloke',
    name: 'Tom Jobbins',
    role: 'Open-Source Quantised LLM Pioneer',
    avatar: 'https://github.com/TheBloke.png'
  },
  {
    login: 'hwchase17',
    name: 'Harrison Chase',
    role: 'LangChain Founder & LLM Frameworks',
    avatar: 'https://github.com/hwchase17.png'
  }
];

// Helper to get N unique random profiles
export function getRandomFeaturedProfiles(count = 8): FeaturedProfile[] {
  // Deduplicate by login first
  const seen = new Set<string>();
  const unique = TOP_FEATURED_PROFILES.filter(p => {
    if (seen.has(p.login)) return false;
    seen.add(p.login);
    return true;
  });

  // Fisher-Yates shuffle on a clone
  const shuffled = [...unique];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
}

