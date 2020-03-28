const generateUniqueId = require('../../src/utils/generateUniqueId')

describe('Generate Unique ID', () => {
  it('should generate an unique ID', async () => {
    const id = await generateUniqueId()

    expect(id).toHaveLength(8)
  })
})
