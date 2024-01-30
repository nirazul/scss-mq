import fs from 'node:fs'
import css from 'css'
import { expect } from 'chai'
import chunk from 'lodash.chunk'

const data = fs.readFileSync('./test/test.css')
const ast = css.parse(data.toString())
const sources = chunk(ast.stylesheet.rules, 2)

describe('Media queries', () => {
  sources.forEach(([commentNode, mediaNode]) => {
    it(`renders with config: ${commentNode.comment.trim()}`, () => {
      const { media, rules } = mediaNode
      const { comment } = rules.find(({ type }) => type === 'comment')
      expect(comment).to.equal(media)
    })
  })
})
