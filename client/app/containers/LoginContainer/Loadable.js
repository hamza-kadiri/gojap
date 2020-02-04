/**
 *
 * Asynchronously loads the component for LoginContainer
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
