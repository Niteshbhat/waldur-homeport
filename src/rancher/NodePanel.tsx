import * as React from 'react';
import * as Panel from 'react-bootstrap/lib/Panel';
import { FormSection } from 'redux-form';

import { translate } from '@waldur/i18n';

import { NodeCPUGroup } from './NodeCPUGroup';
import { NodeMemoryGroup } from './NodeMemoryGroup';
import { NodeRemoveButton } from './NodeRemoveButton';
import { NodeRoleGroup } from './NodeRoleGroup';
import { NodeStorageGroup } from './NodeStorageGroup';

export const NodePanel = props => (
  <Panel>
    <Panel.Heading>
      <NodeRemoveButton onClick={() => props.onRemove(props.index)}/>
      <h4>{translate('Node #{index}', {index: props.index + 1})}</h4>
    </Panel.Heading>
    <Panel.Body>
      <FormSection name={props.node}>
        <NodeMemoryGroup/>
        <NodeStorageGroup/>
        <NodeCPUGroup/>
        <NodeRoleGroup/>
      </FormSection>
    </Panel.Body>
  </Panel>
);