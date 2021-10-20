import { Config, ConfigName, mergeDeep } from '@qad-nx/shared-utils';

const defaultConfig: Config = {
  id: ConfigName.apollo,
  name: 'Classic',
  imgSrc: '/assets/img/classic.svg',
  layout: 'horizontal',
  boxed: false,
  sidenav: {
    title: 'EQMS',
    imageUrl: 'assets/img/qad-logo.svg',
    showCollapsePin: true,
    state: 'expanded',
  },
  toolbar: {
    fixed: true,
  },
  navbar: {
    position: 'below-toolbar',
  },
  footer: {
    visible: true,
    fixed: true,
  },
};

export const configs: Config[] = [
  defaultConfig,
  mergeDeep(
    { ...defaultConfig },
    {
      id: ConfigName.hermes,
      name: 'Centered',
      imgSrc: '/assets/img/centered.svg',
      layout: 'vertical',
      boxed: true,
      toolbar: {
        fixed: false,
      },
      footer: {
        fixed: false,
      },
    }
  ),
  mergeDeep(
    { ...defaultConfig },
    {
      id: ConfigName.ares,
      name: 'Classy',
      imgSrc: '/assets/img/classy.svg',
      toolbar: {
        fixed: false,
      },
      navbar: {
        position: 'in-toolbar',
      },
      footer: {
        fixed: false,
      },
    }
  ),
  mergeDeep(
    { ...defaultConfig },
    {
      id: ConfigName.zeus,
      name: 'Thin',
      imgSrc: '/assets/img/thin.svg',
      sidenav: {
        state: 'collapsed',
      },
    }
  ),
  mergeDeep(
    { ...defaultConfig },
    {
      id: ConfigName.ikaros,
      name: 'Enterprise',
      imgSrc: '/assets/img/enterprise.svg',
      layout: 'vertical',
      boxed: true,
      toolbar: {
        fixed: false,
      },
      navbar: {
        position: 'in-toolbar',
      },
      footer: {
        fixed: false,
      },
    }
  ),
];
