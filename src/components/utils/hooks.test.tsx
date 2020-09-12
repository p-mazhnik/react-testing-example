import React from "react";
import { useInput } from "./hooks";
import {mount, shallow} from "enzyme";

describe('useInput hook', () => {
  function ComponentWithHook({ initialState: initial = '123' }) {
    const [value, setValue, bind, reset] = useInput(initial);

    return (
      <React.Fragment>
        <button className="double" type="button" onClick={() => setValue(`${initial}${initial}`)}>-</button>
        <span className="value">
          {value}
        </span>
        <button className="empty" type="button" onClick={() => setValue('')}>+</button>
        <button className="reset" type="button" onClick={() => reset()}/>
        <input className="input" {...bind}/>
      </React.Fragment>
    );
  }
  const initialState = 'initialState';

  it('initial render', () => {
    const wrapper = shallow(<ComponentWithHook initialState={initialState} />);
    expect(wrapper.find('.value').text()).toEqual(initialState);
  });

  it('lets double initial value', () => {
    const wrapper = shallow(<ComponentWithHook initialState={initialState} />);
    wrapper.find('.double').simulate('click');
    expect(wrapper.find('.value').text()).toEqual(initialState + initialState);
  });

  it('should reset to initial value', () => {
    const wrapper = shallow(<ComponentWithHook initialState={initialState} />);
    wrapper.find('.empty').simulate('click');
    expect(wrapper.find('.value').text()).toEqual('');
    wrapper.find('.reset').simulate('click');
    expect(wrapper.find('.value').text()).toEqual(initialState);
  })

  it('should update value if input has changed', () => {
    const wrapper = mount(<ComponentWithHook initialState={initialState} />);
    // @ts-ignore
    wrapper.find('.input').instance().value = 'some_text';
    wrapper.find('.input').simulate('change');
    expect(wrapper.find('.value').text()).toEqual('some_text');
  })
})

