export default {
  'Does not show the task list if there are no tasks': (client) => {
    client //eslint-disable-line
      .url('http://todomvc.com/examples/react/#/')
      .waitForElementVisible('.header h1')
      .expect.element('.main').to.not.be.present

    client.end()
  },
}
