import * as classNames from 'classnames';
import * as React from 'react';

import { defaultCurrency } from '@waldur/core/services';
import { Tooltip } from '@waldur/core/Tooltip';
import { translate } from '@waldur/i18n';
import { OfferingLogo } from '@waldur/marketplace/common/OfferingLogo';
import { OfferingLink } from '@waldur/marketplace/links/OfferingLink';
import { OrderItemResponse } from '@waldur/marketplace/orders/types';

import './ShoppingCartItem.scss';

interface ShoppingCartItemProps {
  item: OrderItemResponse;
  onRemove(): void;
  isRemovingItem: boolean;
}

export const ShoppingCartItem = (props: ShoppingCartItemProps) => (
  <tr>
    <td>
      <div className="offering-item">
        <div className="offering-thumb">
          <Tooltip id="offering-tooltip" label={props.item.offering_name}>
            <OfferingLink offering_uuid={props.item.offering_uuid}>
              <OfferingLogo src={props.item.offering_thumbnail}/>
            </OfferingLink>
          </Tooltip>
        </div>
        <div className="offering-info">
          <h5 className="offering-title">
            <OfferingLink offering_uuid={props.item.offering_uuid}>
              {props.item.attributes.name || props.item.offering_name}
            </OfferingLink>
          </h5>
          <p>{props.item.attributes.description || props.item.offering_description}</p>
        </div>
      </div>
    </td>
    <td className="text-center text-lg">
      {defaultCurrency(props.item.estimate)}
    </td>
    <td className="text-center">
      <span className="btn-group">
        <a className={classNames('btn btn-outline btn-danger btn-sm', {disabled: props.isRemovingItem})}
          onClick={props.onRemove}>
          <i className="fa fa-trash"/>
          {' '}
          {translate('Remove')}
        </a>
      </span>
    </td>
  </tr>
);
