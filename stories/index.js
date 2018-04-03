import React from 'react'
import { storiesOf } from '@storybook/react'
import Button from '../src/client/Button'

storiesOf('Button', module)
  .add('with text', () => (
    <Button>
      Olá
    </Button>
  ))
