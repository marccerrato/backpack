import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import BpkProgress from './BpkProgress';

describe('BpkProgress', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkProgress
        min={0}
        max={100}
        value={25}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "className" attribute', () => {
    const tree = renderer.create(
      <BpkProgress
        min={0}
        max={100}
        value={25}
        className="my-progress-bar"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "small" attribute', () => {
    const tree = renderer.create(
      <BpkProgress
        min={0}
        max={9}
        value={2}
        small
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "stepped" attribute', () => {
    const tree = renderer.create(
      <BpkProgress
        min={0}
        max={9}
        value={2}
        stepped
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "stepColor" attribute', () => {
    const tree = renderer.create(
      <BpkProgress
        min={0}
        max={9}
        value={2}
        stepped
        stepColor="blue"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "small" and "stepped" attributes', () => {
    const tree = renderer.create(
      <BpkProgress
        min={0}
        max={9}
        value={2}
        small
        stepped
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call "onComplete" when "value" is set to be >= "max"', () => {
    const onCompleteSpy = jest.fn();
    const tree = shallow(
      <BpkProgress
        min={0}
        max={100}
        value={10}
        onComplete={onCompleteSpy}
      />,
      { lifecycleExperimental: true }, // See https://github.com/airbnb/enzyme/pull/318
    );
    expect(onCompleteSpy).not.toHaveBeenCalled();
    tree.setProps({ value: 100 }).update();
    expect(onCompleteSpy).toHaveBeenCalled();
  });

  it('should call "onCompleteTransitionEnd" when "value" is set to be >= "max"', () => {
    const onCompleteTransitionEndSpy = jest.fn();
    const tree = shallow(
      <BpkProgress
        min={0}
        max={100}
        value={10}
        onCompleteTransitionEnd={onCompleteTransitionEndSpy}
      />,
      { lifecycleExperimental: true }, // See https://github.com/airbnb/enzyme/pull/318
    );
    expect(onCompleteTransitionEndSpy).not.toHaveBeenCalled();
    tree.setProps({ value: 100 }).update();
    expect(onCompleteTransitionEndSpy).toHaveBeenCalled();
    expect(onCompleteTransitionEndSpy.mock.calls.length).toBe(1);

    tree.childAt(0).props().onTransitionEnd();
    expect(onCompleteTransitionEndSpy).toHaveBeenCalled();
    expect(onCompleteTransitionEndSpy.mock.calls.length).toBe(2);
  });
});