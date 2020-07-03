import * as classNames from 'classnames';
import * as React from 'react';
import Button from 'react-bootstrap/lib/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useMedia } from 'react-use';

import { truncate } from '@waldur/core/utils';
import { translate } from '@waldur/i18n';
import { openModalDialog } from '@waldur/modal/actions';
import { wrapTooltip } from '@waldur/table/ActionButton';
import {
  getWorkspace,
  getCustomer,
  getProject,
} from '@waldur/workspace/selectors';

import './SelectWorkspaceToggle.scss';
import { SelectWorkspaceDialog } from './SelectWorkspaceDialog';

const workspaceIconClasses = {
  organization: 'fa-sitemap',
  project: 'fa-bookmark',
  user: 'fa-user',
  support: 'fa-question-circle',
};

const workspaceButtonClasses = {
  organization: 'primary',
  project: 'success',
  user: 'info',
  support: 'warning',
};

const getIconClass = (workspace) => workspaceIconClasses[workspace];

const getButtonClass = (workspace) =>
  workspaceButtonClasses[workspace] || 'default';

const getOrganizationDisplayName = (isWide, organization) => {
  return !isWide && organization.abbreviation
    ? organization.abbreviation
    : organization.display_name;
};

const getTitle = (isWide, workspace, customer, project) => {
  const customerName = customer && getOrganizationDisplayName(isWide, customer);
  if (customer && workspace === 'organization') {
    return truncate(customerName);
  } else if (project && workspace === 'project') {
    return `${truncate(customerName)} > ${truncate(project.name)}`;
  }
};

const getTitleTooltip = (isWide, workspace, customer, project) => {
  if (customer && customer.display_name.length < 30) {
    return;
  }
  const customerName = customer && getOrganizationDisplayName(isWide, customer);
  if (customer && workspace === 'organization') {
    return customerName;
  } else if (project && workspace === 'project') {
    return `${customerName} > ${project.name}`;
  }
};

export const SelectWorkspaceToggle = () => {
  const dispatch = useDispatch();
  const workspace = useSelector(getWorkspace);
  const customer = useSelector(getCustomer);
  const project = useSelector(getProject);
  const isWide = useMedia('(min-width: 640px)');
  const title = getTitle(isWide, workspace, customer, project);
  const titleTooltip = getTitleTooltip(isWide, workspace, customer, project);
  const changeWorkspace = () => {
    dispatch(
      openModalDialog(SelectWorkspaceDialog, {
        size: 'lg',
      }),
    );
  };
  return (
    <Button
      bsStyle={getButtonClass(workspace)}
      className="select-workspace-toggle"
      onClick={changeWorkspace}
    >
      <i className={classNames(['fa', 'm-r-xs', getIconClass(workspace)])} />{' '}
      {wrapTooltip(
        titleTooltip,
        <span id="select-workspace-title">
          {title || translate('Select workspace')}
        </span>,
        { placement: 'bottom' },
      )}{' '}
      <i className="fa fa-angle-down" />
    </Button>
  );
};