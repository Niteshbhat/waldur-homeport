import * as React from 'react';
import { FieldArray, FormSection } from 'redux-form';

import { required } from '@waldur/core/validators';
import { FormContainer, SelectField } from '@waldur/form-react';
import { StaticField } from '@waldur/form-react/StaticField';
import { TranslateProps } from '@waldur/i18n';
import { Option } from '@waldur/marketplace/common/registry';
import { ProviderFormProps } from '@waldur/providers/types';

import { OfferingOptions } from '../option/OfferingOptions';

export interface ManagementStepProps extends TranslateProps {
  showOptions: boolean;
  serviceSettingsForm?: React.ComponentType<ProviderFormProps>;
  offeringTypes: Option[];
  typeEditable: boolean;
  typeLabel?: string;
}

const ContainerProps = {
  submitting: false,
  labelClass: 'col-sm-2',
  controlClass: 'col-sm-8',
  clearOnUnmount: false,
};

export const ManagementStep = (props: ManagementStepProps) => (
  <>
    <FormContainer {...ContainerProps}>
      {props.typeEditable ? (
        <SelectField
          name="type"
          label={props.translate('Type')}
          required={true}
          options={props.offeringTypes}
          clearable={false}
          validate={required}
        />
      ) : (
        <StaticField
          label={props.translate('Type')}
          value={props.typeLabel}
          {...ContainerProps}
        />
      )}
    </FormContainer>
    {props.serviceSettingsForm && (
      <FormSection name="service_settings">
        {React.createElement(props.serviceSettingsForm, {
          translate: props.translate,
          container: ContainerProps,
        })}
      </FormSection>
    )}
    {props.showOptions && <FieldArray name="options" component={OfferingOptions}/>}
  </>
);
