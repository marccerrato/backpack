import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import BpkInput from 'bpk-component-input';
import { cssModules } from 'bpk-react-utils';

import 'react-select/dist/react-select.css';

import STYLES from './bpk-multivalue-input.scss';

const getClassName = cssModules(STYLES);

const BpkMultivalueInput = props => {
  const {
    id,
    name,
    type,
    value,
    options,
    currentOption,
    className,
    selectClassName,
    inputClassName,
    renderSelectValue,
    renderSelectOption,
    onOptionChange,
    onInputChange,
    selectProps,
    inputProps,
  } = props;
  let inputRef = null;

  const handleOptionChange = option => {
    if (onOptionChange) {
      onOptionChange(option);
    }
    if (inputRef) {
      inputRef.focus();
    }
  };

  const handleInputChange = event => {
    if (onInputChange) {
      onInputChange({
        target: {
          name,
          value: { ...value, [currentOption]: event.target.value },
        },
      });
    }
  };

  const inputRefFn = inputProps.inputRef;
  inputProps.inputRef = input => {
    inputRef = input;
    if (inputRefFn) {
      inputRefFn(input);
    }
  };

  const classNames = [getClassName('bpk-multivalue-input')];
  if (className) {
    classNames.push(className);
  }

  const selectClassNames = [getClassName('bpk-multivalue-input__select')];
  if (selectClassName) {
    selectClassNames.push(selectClassName);
  }

  const inputClassNames = [getClassName('bpk-multivalue-input__input')];
  if (inputClassName) {
    inputClassNames.push(inputClassName);
  }

  return (
    <div id={id} className={classNames.join(' ')}>
      <Select
        className={selectClassNames.join(' ')}
        id={`${id}-select`}
        name={`${name}-select`}
        value={currentOption}
        onChange={handleOptionChange}
        options={options}
        valueRenderer={renderSelectValue}
        optionRenderer={renderSelectOption}
        controlClassName={getClassName('bpk-multivalue-input__select-control')}
        menuContainerClassName={getClassName(
          'bpk-multivalue-input__select-menu-container',
        )}
        {...selectProps}
      />
      <BpkInput
        className={inputClassNames.join(' ')}
        id={`${id}-input`}
        name={`${name}-input`}
        type={type}
        value={value[currentOption] || ''}
        onChange={handleInputChange}
        {...inputProps}
      />
    </div>
  );
};


BpkMultivalueInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  currentOption: PropTypes.string.isRequired,
  value: PropTypes.objectOf(PropTypes.string).isRequired,
  renderSelectValue: PropTypes.func.isRequired,
  renderSelectOption: PropTypes.func.isRequired,
  onOptionChange: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  clearable: PropTypes.bool,
  type: BpkInput.propTypes.type,
  selectProps: PropTypes.object,
  inputProps: PropTypes.object,
  className: PropTypes.string,
  selectClassName: PropTypes.string,
  inputClassName: PropTypes.string,
};

BpkMultivalueInput.defaultProps = {
  type: BpkInput.defaultProps.type,
  selectProps: {
    simpleValue: true,
    searchable: true,
    clearable: false,
  },
  inputProps: {},
  clearable: false,
  className: null,
  selectClassName: null,
  inputClassName: null,
};

export default BpkMultivalueInput;
