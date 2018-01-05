/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import BpkMultivalueInput, { INPUT_TYPES } from './index';

class WrapperComponent extends React.Component {
  constructor(props) {
    super(props)
    this.options = [
      { value: 'en-gb', label: 'English' },
      { value: 'es-es', label: 'Spanish' },
      { value: 'it-it', label: 'Italian' },
      { value: 'fr-fr', label: 'French' },
    ];
    this.state = {
      value: {},
      currentOption: 'en-gb',
    };
    this.onOptionChange = this.onOptionChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.renderSelectValue = this.renderSelectValue.bind(this);
    this.renderSelectOption = this.renderSelectOption.bind(this);
  }

  onOptionChange(currentOption) {
    action('option changed')(currentOption);
    this.setState({ currentOption });
  }

  onInputChange(event) {
    action('input changed')(event);
    this.setState({
      value: event.target.value,
    });
  }

  renderSelectValue(option) {
    return option.label;
  }

  renderSelectOption(option) {
    const { label: optionLabel, value: optionValue } = option;
    const { value } = this.state;
    if (value[optionValue]) {
      return (
        <span>
          <strong>{optionLabel}</strong> - {value[optionValue]}
        </span>
      );
    }
    return <span>{optionLabel}</span>;
  }

  render() {
    const { value, currentOption } = this.state;
    return (
      <BpkMultivalueInput
        id="multitext_value"
        name="multitext_value"
        value={value}
        currentOption={currentOption}
        options={this.options}
        renderSelectValue={this.renderSelectValue}
        renderSelectOption={this.renderSelectOption}
        onOptionChange={this.onOptionChange}
        onInputChange={this.onInputChange}
        {...this.props}
      />
    );
  }
}

storiesOf('bpk-component-multivalue-input', module)
  .add('Multitext value', () => <WrapperComponent type={INPUT_TYPES.TEXT} />)
  .add('Multinumber value', () => (
    <WrapperComponent type={INPUT_TYPES.NUMBER} />
  ))
  .add('Disabled', () => <WrapperComponent inputProps={{ disabled: true }} />)
  .add('Valid', () => <WrapperComponent inputProps={{ valid: true }} />)
  .add('Invalid', () => <WrapperComponent inputProps={{ valid: false }} />)
  .add('Placeholder', () => (
    <WrapperComponent inputProps={{ placeholder: 'Type some text...' }} />
  ))
  .add('Click event', () => (
    <WrapperComponent inputProps={{ placeholder: 'Click me', onClick: () => alert('You clicked the input!' ) }} />
  ));
