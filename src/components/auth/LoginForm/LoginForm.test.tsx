/*
 * Copyright (c) p-mazhnik 09/12/2020.
 * https://github.com/p-mazhnik
 */

import React from "react";
import { mount } from "enzyme"
import { Default } from "./LoginForm.stories";

describe('<LoginForm />', () => {
  // mock onLogin function
  const onLogin = jest.fn();
  afterEach(() => {
    onLogin.mockReset();
  })

  it('should handle form submitting properly', () => {
    // mount the Default story
    const wrapper = mount(<Default onLogin={onLogin} {...Default.args} />);

    // simulate user input and form submitting
    // @ts-ignore
    wrapper.find('input#email').instance().value = 'some_text';
    wrapper.find('input#email').simulate('change');

    // @ts-ignore
    wrapper.find('input#password').instance().value = 'password';
    wrapper.find('input#password').simulate('change');
    // @ts-ignore
    wrapper.find("input[type='checkbox']").instance().checked = true;
    wrapper.find("input[type='checkbox']").simulate('change');

    wrapper.find("button[type='submit']").simulate('submit');

    expect(onLogin).toBeCalledWith('some_text', 'password', true);
  })
  it('shouldn\'t call onLogin if email or password is empty', () => {
    const wrapper = mount(<Default onLogin={onLogin} {...Default.args} />);
    // @ts-ignore
    wrapper.find('input#email').instance().value = '';
    wrapper.find('input#email').simulate('change');
    // @ts-ignore
    wrapper.find('input#password').instance().value = 'password1';
    wrapper.find('input#password').simulate('change');
    wrapper.find("button[type='submit']").simulate('submit');
    expect(onLogin).not.toBeCalled();
    expect(wrapper.find('p#error').text()).toEqual('email and password are required');
    // @ts-ignore
    wrapper.find('input#password').instance().value = '';
    wrapper.find('input#password').simulate('change');
    wrapper.find("button[type='submit']").simulate('submit');
    expect(onLogin).not.toBeCalled();
  })
  it('should update `error` property', () => {
    const wrapper = mount(<Default onLogin={onLogin} {...Default.args} />);
    expect(wrapper.find('p#error').text()).toEqual('');
    // modify `error` property
    wrapper.setProps({error: 'Game over!'});
    expect(wrapper.find('p#error').text()).toEqual('Game over!');
  })
})
