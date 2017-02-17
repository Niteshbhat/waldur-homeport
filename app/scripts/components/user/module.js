import hookDetails from './hook-details';
import hookList from './hook-list';
import formatEventTitle from './hook-filter';
import keyCreate from './key-create';
import keyList from './key-list';
import userEvents from './user-events';
import userManage from './user-manage';
import userSidebar from './user-sidebar';
import userDetails from './user-details';
import { userEdit } from './user-edit';
import userDashboard from './user-dashboard';
import userOrganizations from './user-organizations';
import userProjects from './user-projects';
import { userPopover } from './user-popover';
import userPopoverTable from './user-popover-table';
import { stateUtilsService, attachStateUtils } from './utils';
import userRoutes from './routes';
import usersService from './users-service';
import userToken from '../user/user-token';
import filtersModule from './filters';

export default module => {
  module.directive('hookDetails', hookDetails);
  module.filter('formatEventTitle', formatEventTitle);
  module.directive('hookList', hookList);
  module.directive('keyList', keyList);
  module.directive('keyCreate', keyCreate);
  module.directive('userEvents', userEvents);
  module.directive('userManage', userManage);
  module.component('userSidebar', userSidebar);
  module.directive('userDetails', userDetails);
  module.component('userEdit', userEdit);
  module.directive('userDashboard', userDashboard);
  module.directive('userOrganizations', userOrganizations);
  module.directive('userProjects', userProjects);
  module.component('userPopover', userPopover);
  module.directive('userPopoverTable', userPopoverTable);
  module.service('stateUtilsService', stateUtilsService);
  module.service('usersService', usersService);
  module.run(attachStateUtils);
  module.config(userRoutes);
  module.component('userToken', userToken);
  filtersModule(module);
};
