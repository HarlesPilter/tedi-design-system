import { Meta, StoryFn } from '@storybook/react';

import StorybookDecorator from '../../../.storybook/storybook-decorator';
import LabelProvider, { LabelProviderProps } from './label-provider';
import { LabelProviderPage } from './storie-page';
import { useLabels } from './use-labels';

export default {
  title: 'components/LabelProvider',
  component: LabelProvider,
  decorators: [
    (Story, options) => {
      console.log(options.args);
      return (
        <StorybookDecorator {...options.args}>
          <Story />
        </StorybookDecorator>
      );
    },
  ],
  parameters: {
    docs: {
      page: () => <LabelProviderPage />,
    },
  },
} as Meta<LabelProviderProps>;

const Template: StoryFn<LabelProviderProps> = (args) => {
  const { getLabel } = useLabels();
  const pluralLabel = getLabel('pagination.results');

  return (
    <>
      <p>
        {getLabel('close')}
        <span className="text-secondary text-small"> (Custom label provided by Application)</span>
      </p>
      <p>1 {typeof pluralLabel === 'string' ? pluralLabel : pluralLabel(1)}</p>
      <p>4 {typeof pluralLabel === 'string' ? pluralLabel : pluralLabel(4)}</p>
      <p>
        {/* Intentional missing label to showcase error in console */}
        {getLabel('missing.label' as any)} -{' '}
        <span className="text-secondary text-small">
          (Error in console that label is missing for key: missing.label)
        </span>
      </p>
    </>
  );
};

export const Default = {
  render: Template,

  args: {
    locale: 'en',
    labels: {
      close: 'Close this',
    },
  },

  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
};
