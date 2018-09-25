import * as React from 'react';
import { Option } from 'react-select';

import { ENV } from '@waldur/core/services';
import { TranslateProps, withTranslation } from '@waldur/i18n';
import { OfferingGrid } from '@waldur/marketplace/common/OfferingGrid';
import { CategoriesListType, OfferingsListType } from '@waldur/marketplace/types';

import { AutocompleteField } from './AutocompleteField';
import { CategoriesList } from './CategoriesList';
import { HeroSection } from './HeroSection';

interface LandingPageProps extends TranslateProps {
  categories: CategoriesListType;
  offerings: OfferingsListType;
  loadOfferings: (query: string) => Option;
  gotoOffering: (offeringId: string) => void;
}

export const LandingPage = withTranslation((props: LandingPageProps) => (
  <div>
    <HeroSection title={props.translate(
      'Explore {deployment} Marketplace',
      {deployment: ENV.shortPageTitle})}>
      <AutocompleteField
        placeholder={props.translate('Search for apps and services...')}
        loadOfferings={props.loadOfferings}
        onChange={props.gotoOffering}
      />
    </HeroSection>
    <div className="row">
      <CategoriesList
        translate={props.translate}
        {...props.categories}
      />
    </div>
    <h2 className="m-b-md">
      {props.translate('Recent additions')}
    </h2>
    <OfferingGrid {...props.offerings}/>
  </div>
));
