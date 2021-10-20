import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ToolbarComponent } from './toolbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatRippleModule } from '@angular/material/core';
import { IconModule } from '@visurel/iconify-angular';
import { ContainerModule } from '@fm/directives/container/container.module';

export default {
  title: 'Toolbar',
  component: ToolbarComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule, MatMenuModule, MatButtonModule, FlexLayoutModule, MatRippleModule, IconModule,ContainerModule],
      declarations: [ToolbarComponent]
    })
  ]
} as Meta<ToolbarComponent>;

const Template: Story<ToolbarComponent> = (args: ToolbarComponent) => ({
  component: ToolbarComponent,
  props: args
});


export const Primary = Template.bind({});
Primary.args = {
  mobileQuery: false,
  hasShadow: true
};
