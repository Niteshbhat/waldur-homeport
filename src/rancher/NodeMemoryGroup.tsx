import * as React from 'react';
import { Field } from 'redux-form';

import { translate } from '@waldur/i18n';
import { FormGroup } from '@waldur/marketplace/offerings/FormGroup';

import { IntegerUnitField } from './IntegerUnitField';

export const NodeMemoryGroup = () => (
  <FormGroup
    label={translate('Memory')}
    required={true}>
    <Field
      name="memory"
      units={translate('GB')}
      component={IntegerUnitField}
    />
  </FormGroup>
);