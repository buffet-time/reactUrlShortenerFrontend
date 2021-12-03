# URL Shortener: Front End

Steps to use:

1. Install PNPM `npm install -g pnpm`
2. Run `pnpm install` to install all necessary node modules
3. Create apiKey File

   1. create a file in the root directory named `apiKey.ts`
   2. paste in `export const key = '[YOUR API KEY HERE]'`

4. run `pnpm test` to run the jest test

## Thoughts and descisions during Dev

I decided to use the latest version of React for obivous reasons.

Vite is used because it's drastically easier to setup and use as well as is much faster for builds, starting servers, and hot loads over webpack. As well as the builds being smalled due to it using JSBuild and Terser for it's building.

PNPM is used for it's faster installs and lower install footprint and given I use it in other projects I have many of these packages already saved in the local cache for PNPM.

ESLint and Prettier are used for linting and formatting becuase of the sheer ubiquoty and ease of use and configuration due to the massive size. I also find Prettier to have better presets than that of any ESLint pre installed formatters.

Bootstrap 5.x was used because it's rather light and if I wanted it's very easy to with SASS or any similar do a la carte importing of the CSS and JS I need. As well as familiarity.

Fetch is used because there's no need in this project to use anything more than it

I will note that writing this in latest react with hooks makes me appreciate Vue 3.2x `script setup` syntax and the Composition API much more. As it in my honest opinion is not only easier to work with but also much more readable.

Jest was used for testing because of it's ease of integration with React because it's maintained by React Team
