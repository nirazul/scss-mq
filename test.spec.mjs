import fs from 'fs'
import css from 'css'
import chai from 'chai'
import chunk from 'lodash.chunk'

const data = fs.readFileSync('./test.css')
const ast = css.parse(data.toString())
const sources = chunk(ast.stylesheet.rules, 2)

describe('Media queries', () => {
  sources.forEach(([commentNode, mediaNode]) => {
    it(`renders with config: ${commentNode.comment.trim()}`, () => {
      const { media, rules } = mediaNode
      const { comment } = rules.find(({ type }) => type === 'comment')
      chai.expect(comment).to.equal(media)
    })
  })
})
