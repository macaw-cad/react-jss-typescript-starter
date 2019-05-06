import { pipelineFactory } from '@sitecore-jss/sitecore-jss-dev-tools';

const pipeline = pipelineFactory.create('dummypipeline');

export const config = (pipelines) => {
  pipelines.addPipeline(pipeline);
};
