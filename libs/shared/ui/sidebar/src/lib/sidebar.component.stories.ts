import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { SidebarComponent } from './sidebar.component';

export default {
  title: 'SidebarComponent',
  component: SidebarComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<SidebarComponent>;

const Template: Story<SidebarComponent> = (args: SidebarComponent) => ({
  component: SidebarComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
    position:  'left',
    invisibleBackdrop:  false,
    opened:  true,
}
