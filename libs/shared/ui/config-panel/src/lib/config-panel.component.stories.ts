import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ConfigPanelComponent } from './config-panel.component';
import { RouterTestingModule } from '@angular/router/testing';

export default {
  title: 'ConfigPanelComponent',
  component: ConfigPanelComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule],
    })
  ],
} as Meta<ConfigPanelComponent>;

const Template: Story<ConfigPanelComponent> = (args: ConfigPanelComponent) => ({
  component: ConfigPanelComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}
