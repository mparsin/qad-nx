import { ConfigName } from '@qad-nx/shared-utils';

export interface Config {
  id: ConfigName;
  rtl?: boolean;
  name: string;
  imgSrc: string;
  layout: 'vertical' | 'horizontal';
  boxed: boolean;
  sidenav: {
    title: string;
    imageUrl: string;
    showCollapsePin: boolean;
    state: 'expanded' | 'collapsed';
  };
  toolbar: {
    fixed: boolean;
  };
  navbar: {
    position: 'below-toolbar' | 'in-toolbar';
  };
  footer: {
    visible: boolean;
    fixed: boolean;
  };
}
