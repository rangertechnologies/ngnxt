import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url);
const { gitDescribeSync } = require('git-describe');
const { version } = require('../package.json');
const { resolve, relative } = require('path');
const { writeFileSync } = require('fs-extra');

import forceDeploy from 'gulp-jsforce-deploy';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const gitInfo = gitDescribeSync({
    dirtyMark: false,
    dirtySemver: false
});

gitInfo.version = version;

const file = resolve(__dirname, '..', 'src', 'environments', 'version.ts');
writeFileSync(file,
`// IMPORTANT: THIS FILE IS AUTO GENERATED! DO NOT MANUALLY EDIT OR CHECKIN!
/* tslint:disable */
export const VERSION = ${JSON.stringify(gitInfo, null, 4)};
/* tslint:enable */
`, { encoding: 'utf-8' });

//console.log(`Wrote version info ${gitInfo.raw} to ${relative(resolve(__dirname, '..'), file)}`);
