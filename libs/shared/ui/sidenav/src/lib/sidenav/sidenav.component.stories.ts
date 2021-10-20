import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { SidenavComponent } from './sidenav.component';
import { RouterTestingModule } from '@angular/router/testing';

export default {
  title: 'SidenavComponent',
  component: SidenavComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule],
    })
  ],
} as Meta<SidenavComponent>;

const Template: Story<SidenavComponent> = (args: SidenavComponent) => ({
  component: SidenavComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
    collapsed:  false,
}
