var test = require('tape')

var game = require('../rotns.js')

test('test setup working', function (t) {
  t.pass()
  t.end()
})

test('shuffle returns an array the same size as it was given', function (t) {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
  const expected = 17
  const actual = game.shuffle(arr).length
  t.equals(actual, expected)
  t.end()
})

test('shuffle returns an array with the same contents as it was given', function (t) {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
  const expected = arr
  const shuffled = game.shuffle(arr)
  const actual = shuffled.sort((a, b) => a - b)
  t.deepEqual(actual, expected)
  t.end()
})
