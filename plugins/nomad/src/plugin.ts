/*
 * Copyright 2023 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {
  configApiRef,
  createApiFactory,
  createPlugin,
  createRoutableExtension,
  createRouteRef,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';
import { NomadHttpApi, nomadApiRef } from './api';

export const entityContentRouteRef = createRouteRef({
  id: 'nomad:entity-content',
});

export const nomadPlugin = createPlugin({
  id: 'nomad',
  apis: [
    createApiFactory({
      api: nomadApiRef,
      deps: { configApi: configApiRef },
      factory: ({ configApi }) => NomadHttpApi.fromConfig(configApi),
    }),
  ],
  routes: {
    root: rootRouteRef,
    entityContent: entityContentRouteRef,
  },
});

/** @public */
export const NomadPage = nomadPlugin.provide(
  createRoutableExtension({
    name: 'NomadPage',
    component: () =>
      import('./components/NomadComponent').then(m => m.NomadComponent),
    mountPoint: rootRouteRef,
  }),
);

/** @public */
export const EntityNomadContent = nomadPlugin.provide(
  createRoutableExtension({
    name: 'EntityNomadContent',
    component: () => import('./Router').then(m => m.EmbeddedRouter),
    mountPoint: entityContentRouteRef,
  }),
);
