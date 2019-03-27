import * as React from 'react';

import { LoadingSpinner } from '@waldur/core/LoadingSpinner';
import { Query } from '@waldur/core/Query';
import { translate } from '@waldur/i18n';

import { getOffering } from '@waldur/marketplace/common/api';
import { PlanUnit } from '@waldur/marketplace/orders/types';

import { ResourceUsageForm } from './ResourceUsageForm';

export interface ResourceUsageContainerProps {
  offering_uuid: string;
  plan_unit: PlanUnit;
  submitting: boolean;
}

// tslint:disable-next-line: variable-name
const getUsageComponents = (offering_uuid: string) => {
  return getOffering(offering_uuid).then(offering => {
    return {
      components: offering.components.filter(component => component.billing_type === 'usage'),
    };
  });
};

export const ResourceUsageContainer = (props: ResourceUsageContainerProps) => (
  <Query loader={getUsageComponents} variables={props.offering_uuid}>
    {({ loading, error, data }) => {
      if (loading) {
        return <LoadingSpinner/>;
      } else if (error) {
        return <h3>{translate('Unable to load marketplace offering details.')}</h3>;
      } else if (data.components.length === 0) {
        return <h3>{translate('Marketplace offering does not have any usage-based components.')}</h3>;
      } else {
        return (
          <ResourceUsageForm
            components={data.components}
            plan_unit={props.plan_unit}
            submitting={props.submitting}
          />
        );
      }
    }}
  </Query>
);
