import path from 'path'
import fs from 'fs'
import { transformFileSync } from '@babel/core'

describe('fixtures', () => {
  const fixturesDir = path.join(__dirname, 'fixtures')
  fs.readdirSync(fixturesDir)
    .sort()
    .map(caseName => {
      if (caseName === '.DS_Store') return
      it(`should ${caseName.split('-').join(' ')}`, () => {
        const fixtureDir = path.join(fixturesDir, caseName)
        const fixturePath = path.join(fixtureDir, 'index.js')
        const fixture = transformFileSync(fixturePath).code

        expect(fixture).toMatchSnapshot()
      })
    })
})
