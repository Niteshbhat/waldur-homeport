import { ReactWrapper } from 'enzyme';
import * as React from 'react';
import { formValues, change, getFormValues } from 'redux-form';

import { FormContainer } from './FormContainer';
import { StringField } from './StringField';
import { mountTestForm } from './testUtils';
import { TextField } from './TextField';

export const Component = options => props => {
  const { submitting, required, onSubmit } = options;
  return (
    <form onSubmit={onSubmit && props.handleSubmit(onSubmit)}>
      <FormContainer submitting={submitting}>
        <StringField
          name="name"
          label="Project name"
          required={required}
        />
        <TextField
          name="description"
          label="Project description"
          required={required}
        />
      </FormContainer>
    </form>
  );
};

export const getNameField = (wrapper: ReactWrapper) => wrapper.find('input').first();
export const getDescriptionField = (wrapper: ReactWrapper) => wrapper.find('textarea').first();
export const getFieldGroups = (wrapper: ReactWrapper) => wrapper.find('.form-group');
export const getRequiredFields = (wrapper: ReactWrapper) => wrapper.find('.text-danger');
export const submitForm = (wrapper: ReactWrapper) => wrapper.find('form').simulate('submit');
export const getErrors = (wrapper: ReactWrapper) => wrapper.find('.help-block');
export const renderTestForm = options => mountTestForm(Component(options));

export const OptionalFieldForm = formValues('type')(props => (
  <FormContainer submitting={false}>
    <StringField
      name="type"
      label="Type"
    />
    {(props as any).type === 'subtask' && (
      <StringField
        name="parent"
        label="Parent"
      />
    )}
  </FormContainer>
));

export const renderOptionalFieldForm = () => mountTestForm(OptionalFieldForm);

export const setFieldValue = (wrapper, field, value) =>
  wrapper.props().store.dispatch(change('testForm', field, value));

export const getTestFormValues = wrapper =>
  getFormValues('testForm')(wrapper.props().store.getState());
