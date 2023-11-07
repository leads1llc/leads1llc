/**
 * common-anchor-section router
 */

import { factories } from '@strapi/strapi';
import { customRouter } from '../../utils/custom-routes';
const defaultRouter = factories.createCoreRouter('api::common-anchor-section.common-anchor-section');

const myOverideRoutes = [
  {
    method: "GET",
    path: "/common-anchor-section/:slug",
    handler: "api::common-anchor-section.common-anchor-section.findOne",
  },
];

const myExtraRoutes = [];

export default customRouter(defaultRouter, myOverideRoutes, myExtraRoutes);

