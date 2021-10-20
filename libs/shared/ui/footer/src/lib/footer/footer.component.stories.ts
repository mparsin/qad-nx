import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { FooterComponent } from './footer.component';
import { MaterialModule } from '@eqms-ws/material';
import { ExtendedModule, FlexModule } from '@angular/flex-layout';
import { ContainerModule } from '@fm/directives/container/container.module';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

export default {
  title: 'FooterComponent',
  component: FooterComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, RouterTestingModule, MaterialModule, FlexModule, ExtendedModule, ContainerModule],
    })
  ],
} as Meta<FooterComponent>;

const Template: Story<FooterComponent> = (args: FooterComponent) => ({
  component: FooterComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}
