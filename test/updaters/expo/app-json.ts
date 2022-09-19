// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {readFileSync} from 'fs';
import {resolve} from 'path';
import * as snapshot from 'snap-shot-it';
import {describe, it} from 'mocha';
import {AppJson} from '../../../src/updaters/expo/app-json';
import {Version} from '../../../src/version';

const fixturesPath = './test/updaters/fixtures';

describe('AppJson', () => {
  describe('updateContent', () => {
    it('updates the app versions', async () => {
      const oldContent = readFileSync(
        resolve(fixturesPath, './expo/app.json'),
        'utf8'
      );
      const packageJson = new AppJson({
        version: Version.parse('3.2.1'),
        expoSDKVersion: '44.0.0',
      });
      const newContent = packageJson.updateContent(oldContent);
      snapshot(newContent.replace(/\r\n/g, '\n'));
    });
  });
});
