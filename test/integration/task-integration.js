import { expect } from 'chai'
import { before, describe, test, after } from 'mocha'
import { initClient, createTestEnvironment, createTestSpace, getTestUser } from '../helpers'

describe('Task Api', () => {
  let space
  let environment
  let entry
  let assignee
  const taskBody = 'JS SDK Task Integration Test'

  before('Load test organization and user', async () => {
    const testUser = await getTestUser()
    assignee = { sys: { id: testUser.sys.id, linkType: 'User', type: 'Link' } }
  })

  before(async () => {
    space = await createTestSpace(initClient(), 'Task')
    environment = await createTestEnvironment(space, 'Task Testing Environment')
    const contentType = await environment.createContentType({ name: 'Content Type' })
    await contentType.publish()
    entry = await environment.createEntry(contentType.sys.id, { fields: {} })
  })

  after(async () => {
    if (space) {
      return space.delete()
    }
  })

  test('Get tasks', async () => {
    const {
      sys: { id },
    } = await entry.createTask({
      body: taskBody,
      status: 'active',
      assignedTo: assignee,
    })

    const response = await entry.getTasks()
    expect(response.items).to.be.an('array')
    expect(response.items.map((item) => item.sys.id)).to.include(id)

    const task = await entry.getTask(id)
    expect(task.body).to.eq(taskBody)
    await task.delete()
  })

  test('Create, update, delete task', async () => {
    const task = await entry.createTask({
      body: taskBody,
      status: 'active',
      assignedTo: assignee,
    })

    expect(task.body).to.eq(taskBody, 'body is set')
    task.body = 'new body'

    const updatedBody = await task.update()
    expect(updatedBody.body).to.eq('new body')

    await updatedBody.delete()
  })
})
