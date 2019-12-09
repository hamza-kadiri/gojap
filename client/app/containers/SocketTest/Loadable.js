/**
 *
 * Asynchronously loads the component for SocketTest
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
