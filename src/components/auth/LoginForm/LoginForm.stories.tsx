/*
 * Copyright (c) p-mazhnik 09/10/2020.
 * https://github.com/p-mazhnik
 */

import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import LoginForm, { ILoginFormProps } from "./LoginForm";

export default {
    title: 'auth/LoginForm',
    component: LoginForm,
} as Meta;

const Template: Story<ILoginFormProps> = (args) => <LoginForm {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithSignUpAndPasswordRecovery = Template.bind({})
WithSignUpAndPasswordRecovery.args  = {
    includePasswordRecovery: true,
    includeSignUp: true,
}

