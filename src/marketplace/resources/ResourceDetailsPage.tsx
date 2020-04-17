import * as React from 'react';
import * as Col from 'react-bootstrap/lib/Col';
import * as Row from 'react-bootstrap/lib/Row';
import useAsync from 'react-use/lib/useAsync';

import { LoadingSpinner } from '@waldur/core/LoadingSpinner';
import { $state, ngInjector } from '@waldur/core/services';
import { translate } from '@waldur/i18n';
import { connectAngularComponent } from '@waldur/store/connect';

import { getResource } from '../common/api';

import { ResourceSummary } from './ResourceSummary';
import { ResourceTabs } from './ResourceTabs';

async function fetchResource(uuid) {
  const BreadcrumbsService = ngInjector.get('BreadcrumbsService');
  const resource = await getResource(uuid);
  BreadcrumbsService.activeItem = resource.name;
  BreadcrumbsService.items = [
    {
      label: translate('Organization workspace'),
      state: 'organization.details',
      params: {
        uuid: resource.customer_uuid,
      },
    },
    {
      label: translate('Public resources'),
    },
  ];
  return resource;
}

export const ResourceDetailsPage = () => {
  const state = useAsync(() => fetchResource($state.params.resource_uuid));
  if (state.error) {
    $state.go('errorPage.notFound');
    return;
  }
  if (state.loading) {
    return <LoadingSpinner />;
  }
  const resource = state.value;
  return (
    <>
      <Row className="m-b-md">
        <Col sm={12}>
          <ResourceSummary resource={resource} />
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <ResourceTabs resource={resource} />
        </Col>
      </Row>
    </>
  );
};

export default connectAngularComponent(ResourceDetailsPage);
