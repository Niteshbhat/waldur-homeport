import * as React from 'react';
import * as Col from 'react-bootstrap/lib/Col';
import * as Row from 'react-bootstrap/lib/Row';
import * as Table from 'react-bootstrap/lib/Table';

import { getById, get } from '@waldur/core/api';
import { LoadingSpinner } from '@waldur/core/LoadingSpinner';
import { $state } from '@waldur/core/services';
import { useQuery } from '@waldur/core/useQuery';
import { translate } from '@waldur/i18n';
import { OfferingLogo } from '@waldur/marketplace/common/OfferingLogo';
import { connectAngularComponent } from '@waldur/store/connect';

import { FormattedMarkdown } from './FormattedMarkdown';

const getTemplate = templateUuid =>
  getById('/rancher-templates/', templateUuid);

const getTemplateVersion = (templateUuid, versionUuid) =>
  get(`/rancher-template-versions/${templateUuid}/${versionUuid}/`).then(
    response => response.data,
  );

const loadData = async () => {
  const template: any = await getTemplate($state.params.templateUuid);
  const version = await getTemplateVersion(
    template.uuid,
    template.default_version,
  );
  return { template, version };
};

const TemplateHeader = props => (
  <Row>
    <Col md={3}>
      <OfferingLogo src={props.template.icon} />
    </Col>
    <Col md={9}>
      <FormattedMarkdown text={props.version.app_readme} />
    </Col>
  </Row>
);

const TemplateQuestions = props => (
  <Table>
    <tbody>
      {props.questions.map((question, index) => (
        <tr key={index}>
          <td>{question.label}</td>
          <td>{question.description}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export const TemplateDetail = () => {
  const { state, call } = useQuery(loadData);
  React.useEffect(call, []);

  if (state.loading) {
    return <LoadingSpinner />;
  }

  if (state.error) {
    return <h3>{translate('Unable to load application template details.')}</h3>;
  }

  if (!state.loaded) {
    return null;
  }

  return (
    <>
      <TemplateHeader {...state.data} />

      <h4>{translate('Readme')}</h4>
      <FormattedMarkdown text={state.data.version.readme} />

      <h4>{translate('Questions')}</h4>
      <TemplateQuestions questions={state.data.version.questions} />
    </>
  );
};

export default connectAngularComponent(TemplateDetail);
