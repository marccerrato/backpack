# bpk-component-input

> Backpack input component.

## Installation

```sh
npm install bpk-component-input --save-dev
```

## Usage

```js
import React from 'react';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';

export default () => (
  <BpkInput
    id="origin"
    type={INPUT_TYPES.TEXT}
    name="origin"
    value="Edinburgh"
    onChange={() => console.log('input changed!')}
    placeholder="Country, city or airport"
  />
);
```

## Props

| Property     | PropType             | Required  | Default Value    |
| ------------ | -------------------- | --------- | ---------------- |
| id           | string               | true      | -                |
| name         | string               | true      | -                |
| value        | string               | true      | -                |
| type         | INPUT_TYPES (one of) | false     | INPUT_TYPES.TEXT |
| valid        | bool                 | false     | null             |
| large        | bool                 | false     | false            |
| docked       | bool                 | false     | false            |
| dockedFirst  | bool                 | false     | false            |
| dockedMiddle | bool                 | false     | false            |
| dockedLast   | bool                 | false     | false            |
| inputRef     | func                 | false     | null             |

Additionally, all native `<input />` attributes such as `placeholder` and `onChange` are supported.

### withOpenEvents

The `withOpenEvents` higher-order component encapsulates input event handlers for opening popovers or modals.

The `onOpen` callback is called on the following events:

* click
* focus
* touchend
* keydown (Enter key)
* keyup (Space key)

You can still attach custom handlers for these events as they will still be called. All other key events are prevented.

> It is important you pass the `isOpen` prop, as it is necessary to work around an IE bug.

| Property        | PropType             | Required  | Default Value       |
| --------------- | -------------------- | --------- | ------------------- |
| isOpen          | bool                 | false     | false               |
| onOpen          | func                 | false     | null                |
| hasTouchSupport | bool                 | false     | (feature detection) |

```js
import React from 'react';
import BpkInput, { withOpenEvents } from 'bpk-component-input';
import BpkPopover from 'bpk-component-popover';

const EnhancedInput = withOpenEvents(BpkInput);

export default () => {
  constructor() {
    super();

    this.state = { isOpen: false };
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onOpen() {
    this.setState({ isOpen: true });
  }

  onClose() {
    this.setState({ isOpen: false });
  }

  render() {
    return (
      <BpkPopover
        id="popover"
        target={
          <EnhancedInput
            id="input"
            value="An input?"
            isOpen={this.state.isOpen}
            onOpen={this.onOpen}
            onChange={() => null}
          />
        }
        onClose={this.onClose}
        isOpen={this.state.isOpen}
        label="Popover"
        closeButtonText="Close"
      >
        A popover!
      </BpkPopover>
    );
  }
}
```
