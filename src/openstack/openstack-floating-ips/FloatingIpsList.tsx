import * as React from 'react';

import { Link } from '@waldur/core/Link';
import { NestedListActions } from '@waldur/resource/actions/NestedListActions';
import { ResourceName } from '@waldur/resource/ResourceName';
import { ResourceState } from '@waldur/resource/state/ResourceState';
import { connectAngularComponent } from '@waldur/store/connect';
import { Table, connectTable, createFetcher } from '@waldur/table-react';

const TableComponent = props => {
  const { translate } = props;
  return (
    <Table
      {...props}
      columns={[
        {
          title: translate('Floating IP'),
          render: ({ row }) => <ResourceName resource={row} />,
        },
        {
          title: translate('State'),
          render: ({ row }) => <ResourceState resource={row} />,
        },
        {
          title: translate('Instance'),
          render: ({ row }) => {
            if (!row.instance_uuid) {
              return translate('Not assigned');
            }
            return (
              <Link
                state="resources.details"
                params={{
                  uuid: row.instance_uuid,
                  resource_type: 'OpenStackTenant.Instance',
                }}
                label={row.instance_name}
              />
            );
          },
        },
      ]}
      verboseName={translate('floating IPs')}
      actions={
        <NestedListActions resource={props.resource} tab="floating_ips" />
      }
    />
  );
};

const TableOptions = {
  table: 'openstack-floating-ips',
  fetchData: createFetcher('openstack-floating-ips'),
  mapPropsToFilter: props => ({
    tenant_uuid: props.resource.uuid,
  }),
};

const FloatingIpsList = connectTable(TableOptions)(TableComponent);

export default connectAngularComponent(FloatingIpsList, ['resource']);
