/**
 * common-anchor-section controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::common-anchor-section.common-anchor-section', ({strapi}) => ({
  async findOne(ctx) {
    const { slug } = ctx.params;

    const query = {
      filters: { slug },
      ...ctx.query,
    };

    const post = await strapi.entityService.findMany("api::common-anchor-section.common-anchor-section", query);

    const sanitizedEntity = await this.sanitizeOutput(post, ctx);

    return this.transformResponse(sanitizedEntity[0]);
  },
}));
