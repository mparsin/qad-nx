import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CustomLayoutComponent } from './custom-layout.component';
import { RouterTestingModule } from '@angular/router/testing';

export default {
  title: 'CustomLayoutComponent',
  component: CustomLayoutComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule],
    })
  ],
} as Meta<CustomLayoutComponent>;

const Template: Story<CustomLayoutComponent> = (args: CustomLayoutComponent) => ({
  component: CustomLayoutComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}
