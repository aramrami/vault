import { helper as buildHelper } from '@ember/component/helper';
import { capitalize } from '@ember/string';
import { assign } from '@ember/polyfills';

const DEFAULT_DISPLAY = {
  searchPlaceholder: 'Filter secrets',
  item: 'secret',
  create: 'Create secret',
  navigateTree: true,
  editComponent: 'secret-edit',
  listItemPartial: 'partials/secret-list/item',
};
const SECRET_BACKENDS = {
  aws: {
    displayName: 'AWS',
    searchPlaceholder: 'Filter roles',
    item: 'role',
    create: 'Create role',
    navigateTree: false,
    editComponent: 'role-aws-edit',
    listItemPartial: 'partials/secret-list/aws-role-item',
  },
  pki: {
    displayName: 'PKI',
    navigateTree: false,
    listItemPartial: 'partials/secret-list/pki-role-item',
    tabs: [
      {
        name: 'roles',
        label: 'Roles',
        searchPlaceholder: 'Filter roles',
        item: 'role',
        create: 'Create role',
        editComponent: 'role-pki-edit',
      },
      {
        name: 'certs',
        modelPrefix: 'cert/',
        label: 'Certificates',
        searchPlaceholder: 'Filter certificates',
        item: 'certificates',
        create: 'Create role',
        tab: 'certs',
        listItemPartial: 'partials/secret-list/pki-cert-item',
        editComponent: 'pki-cert-show',
      },
    ],
  },
  ssh: {
    displayName: 'SSH',
    searchPlaceholder: 'Filter roles',
    item: 'role',
    create: 'Create role',
    navigateTree: false,
    editComponent: 'role-ssh-edit',
    listItemPartial: 'partials/secret-list/ssh-role-item',
  },
  transform: {
    displayName: 'Transformation',
    navigateTree: false,
    listItemPartial: 'partials/secret-list/transform-transformation-item',
    tabs: [
      {
        name: 'transformations',
        label: 'Transformations',
        searchPlaceholder: 'Filter transformations',
        item: 'transformation',
        create: 'Create transformation',
        editComponent: 'transformation-edit',
      },
      // TODO: Add tabs as needed
      // {
      //   name: 'roles',
      //   modelPrefix: 'role/',
      //   label: 'Roles',
      //   searchPlaceholder: 'Filter roles',
      //   item: 'roles',
      //   create: 'Create role',
      //   tab: 'role',
      //   listItemPartial: 'partials/secret-list/item',
      //   editComponent: 'transform-role-edit',
      // },
      // {
      //   name: 'templates',
      //   modelPrefix: 'template/',
      //   label: 'Templates',
      //   searchPlaceholder: 'Filter templates',
      //   item: 'templates',
      //   create: 'Create template',
      //   tab: 'template',
      //   listItemPartial: 'partials/secret-list/item',
      //   editComponent: 'transform-template-edit',
      // },
      // {
      //   name: 'alphabets',
      //   modelPrefix: 'alphabet/',
      //   label: 'Alphabets',
      //   searchPlaceholder: 'Filter alphabets',
      //   item: 'alphabets',
      //   create: 'Create alphabet',
      //   tab: 'alphabet',
      //   listItemPartial: 'partials/secret-list/item',
      //   editComponent: 'alphabet-edit',
      // },
    ],
  },
  transit: {
    searchPlaceholder: 'Filter keys',
    item: 'key',
    create: 'Create encryption key',
    navigateTree: false,
    editComponent: 'transit-edit',
    listItemPartial: 'partials/secret-list/item',
  },
};

export function optionsForBackend([backend, tab]) {
  const selected = SECRET_BACKENDS[backend];
  let backendOptions;

  if (selected && selected.tabs) {
    let tabData =
      selected.tabs.findBy('name', tab) || selected.tabs.findBy('modelPrefix', tab) || selected.tabs[0];
    backendOptions = assign({}, selected, tabData);
  } else if (selected) {
    backendOptions = selected;
  } else {
    backendOptions = assign({}, DEFAULT_DISPLAY, {
      displayName: backend === 'kv' ? 'KV' : capitalize(backend),
    });
  }
  return backendOptions;
}

export default buildHelper(optionsForBackend);
