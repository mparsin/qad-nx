import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { LoadErrorComponent } from './load-error.component';

export default {
  title: 'LoadErrorComponent',
  component: LoadErrorComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<LoadErrorComponent>;

const Template: Story<LoadErrorComponent> = (args: LoadErrorComponent) => ({
  component: LoadErrorComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
    message:  '',
}