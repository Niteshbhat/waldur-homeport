import * as React from 'react';

import { translate } from '@waldur/i18n';
import { TablePlaceholder } from '@waldur/table-react/placeholder/TablePlaceholder';

// tslint:disable-next-line: no-var-requires
const illustration = require('@waldur/images/table-placeholders/undraw_data_report_bi6l.svg');

export const PublicResourcesListPlaceholder = () => {
  const description = translate(`Seems you don't have any public resources yet`);
  const title = translate(`No entries to show here`);
  return (
    <TablePlaceholder illustration={illustration}>
      <div className="text-center">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </TablePlaceholder>
  );
};