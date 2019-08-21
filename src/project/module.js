import ProjectDashboard from './ProjectDashboardContainer';
import projectDetails from './ProjectUpdateContainer';
import projectDetailsButton from './project-details-button';
import projectCreate from './ProjectCreateContainer';
import ProjectWorkspaceController from './project-workspace';
import projectPolicies from './project-policies';
import ProviderProjectsService from './project-providers-service';
import projectProviders from './project-providers';
import projectDialog from './project-dialog';
import projectIssues from './ProjectIssuesList';
import projectEvents from './ProjectEventsList';
import projectsList from './ProjectsList';
import projectTeam from './project-team';
import projectRemoveDialog from './ProjectRemoveDialog';
import projectsService from './projects-service';
import projectRoutes from './routes';
import './events';

export default module => {
  module.component('projectDashboard', ProjectDashboard);
  module.component('projectDetails', projectDetails);
  module.component('projectDetailsButton', projectDetailsButton);
  module.component('projectCreate', projectCreate);
  module.controller('ProjectWorkspaceController', ProjectWorkspaceController);
  module.component('projectPolicies', projectPolicies);
  module.service('ProviderProjectsService', ProviderProjectsService);
  module.component('projectProviders', projectProviders);
  module.component('projectDialog', projectDialog);
  module.component('projectIssues', projectIssues);
  module.component('projectEvents', projectEvents);
  module.component('projectsList', projectsList);
  module.component('projectTeam', projectTeam);
  module.component('projectRemoveDialog', projectRemoveDialog);
  module.service('projectsService', projectsService);
  module.config(projectRoutes);
};
