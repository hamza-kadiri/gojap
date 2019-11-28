/*
 * Footer Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.components.Footer';

export default defineMessages({
  licenseMessage: {
    id: `${scope}.license.message`,
    defaultMessage: 'This project is licensed under the MIT license.',
  },
  authorMessage: {
    id: `${scope}.author.message`,
    defaultMessage: `
      Made with love by {author}.
    `,
  },
  japList: {
    id: `${scope}.bottombar.list`,
    defaultMessage: `
      Liste des japs
    `,
  },
  dashboard: {
    id: `${scope}.bottombar.dashboard`,
    defaultMessage: `
      Statistiques
    `,
  },
  profile: {
    id: `${scope}.bottombar.profile`,
    defaultMessage: `
      Profil
    `,
  },
});
