import { connect } from 'react-redux';
import { compose } from 'redux';

import { withTranslation } from '@waldur/i18n';
import { getOfferingTypes, showOfferingOptions, getProviderType, isOfferingTypeSchedulable } from '@waldur/marketplace/common/registry';
import { Offering } from '@waldur/marketplace/types';
import { findProvider } from '@waldur/providers/registry';

import { getOffering, getType, getTypeLabel } from '../store/selectors';
import { ManagementStep, ManagementStepProps } from './ManagementStep';

const mapStateToProps = state => {
  const offering: Offering = getOffering(state).offering;
  const props: Partial<ManagementStepProps> = {
    offeringTypes: getOfferingTypes(),
    editable: !offering,
    typeLabel: getTypeLabel(state),
  };
  const type = getType(state);
  if (type) {
    props.showOptions = showOfferingOptions(type);
    props.schedulable = isOfferingTypeSchedulable(type);
    const providerType = getProviderType(type);
    if (providerType) {
      const providerConfig = findProvider(providerType);
      props.serviceSettingsForm = providerConfig.component;
    }
  }
  return props;
};

const connector = compose(withTranslation, connect(mapStateToProps));

export const ManagementStepContainer = connector(ManagementStep);
