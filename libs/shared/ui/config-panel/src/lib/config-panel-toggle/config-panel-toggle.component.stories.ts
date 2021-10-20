import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ConfigPanelToggleComponent } from './config-panel-toggle.component';

export default {
  title: 'ConfigPanelToggleComponent',
  component: ConfigPanelToggleComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<ConfigPanelToggleComponent>;

const Template: Story<ConfigPanelToggleComponent> = (args: ConfigPanelToggleComponent) => ({
  component: ConfigPanelToggleComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}