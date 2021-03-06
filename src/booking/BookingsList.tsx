import type { EventInput } from '@fullcalendar/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getFormValues } from 'redux-form';

import { BookingActions } from '@waldur/booking/BookingActions';
import { BookingStateField } from '@waldur/booking/BookingStateField';
import { TABLE_NAME } from '@waldur/booking/constants';
import { formatDateTime, formatShortDateTime } from '@waldur/core/dateUtils';
import { Tooltip } from '@waldur/core/Tooltip';
import { withTranslation, translate } from '@waldur/i18n';
import { PublicResourceLink } from '@waldur/marketplace/resources/list/PublicResourceLink';
import { Table, connectTable, createFetcher } from '@waldur/table';
import { getCustomer, isOwnerOrStaff } from '@waldur/workspace/selectors';

interface BookingsList {
  offeringUuid?: string;
  providerUuid?: string;
}

interface DetailedInfo {
  row: {
    uuid: string;
    state: string;
    attributes: {
      schedules: EventInput[];
    };
  };
}

const wrapScheduleTitleTooltip = (label, children) =>
  label ? (
    <Tooltip label={label} id="schedule-title-label">
      {children}
    </Tooltip>
  ) : (
    children
  );

const ExpandableRow = ({ row }: DetailedInfo) => (
  <div className="container-fluid">
    <h3>{translate('Schedules')}:</h3>
    <label>{translate('Date')}</label>{' '}
    {row.attributes.schedules.map((schedule, index) => (
      <React.Fragment key={index}>
        {wrapScheduleTitleTooltip(
          schedule.title,
          <>
            {formatShortDateTime(schedule.start)}
            {' - '}
            {formatShortDateTime(schedule.end)}
          </>,
        )}
        {row.attributes.schedules.length > 1 &&
          row.attributes.schedules.length !== index + 1 && <>{'; '}</>}
      </React.Fragment>
    ))}
  </div>
);

const TableComponent = (props) => {
  const columns = [
    {
      title: translate('Name'),
      render: PublicResourceLink,
      orderField: 'name',
    },
    {
      title: translate('Project'),
      render: ({ row }) => row.project_name,
    },
    {
      title: translate('Created'),
      render: ({ row }) => formatDateTime(row.created),
      orderField: 'created',
    },
    {
      title: translate('State'),
      render: BookingStateField,
    },
  ];

  if (!props.actionsDisabled) {
    columns.push({
      title: translate('Actions'),
      render: ({ row }) => (
        <BookingActions row={row} refresh={() => props.fetch()} />
      ),
    });
  }
  return (
    <Table
      {...props}
      columns={columns}
      showPageSizeSelector={true}
      verboseName={translate('Bookings')}
      initialSorting={{ field: 'created', mode: 'desc' }}
      expandableRow={ExpandableRow}
    />
  );
};

const mapPropsToFilter = (props) => {
  const filter: Record<string, string | boolean> = {
    offering_type: 'Marketplace.Booking',
  };
  if (props.offeringUuid) {
    filter.offering_uuid = props.offeringUuid;
  }
  if (props.providerUuid) {
    filter.provider_uuid = props.providerUuid;
  }
  if (props.filter) {
    if (props.filter.state) {
      filter.state = props.filter.state.map((option) => option.value);
    }
  }
  return filter;
};

const TableOptions = {
  table: TABLE_NAME,
  fetchData: createFetcher('booking-resources'),
  mapPropsToFilter,
};

const mapStateToProps = (state) => ({
  customer: getCustomer(state),
  actionsDisabled: !isOwnerOrStaff(state),
  filter: getFormValues('BookingsFilter')(state),
});

const enhance = compose(
  connect(mapStateToProps),
  connectTable(TableOptions),
  withTranslation,
);

export const BookingsList = enhance(TableComponent) as React.ComponentType<
  BookingsList
>;
