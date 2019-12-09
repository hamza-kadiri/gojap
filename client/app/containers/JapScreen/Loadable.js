/**
 *
 * Asynchronously loads the component for JapScreen
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
