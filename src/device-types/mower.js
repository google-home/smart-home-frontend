/**
 * Copyright 2019, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { DeviceType } from './device-type';

let instance;

class Mower extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['Electric mower'],
      roomHint: 'Garage'
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new Mower()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type: 'action.devices.types.MOWER',
      traits: [
        'action.devices.traits.StartStop',
        'action.devices.traits.Toggles',
        'action.devices.traits.Dock',
      ],
      defaultNames: [`Smart Mower`],
      name: `Smart Mower`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      attributes: {
        availableToggles: [{
          name: 'turbo',
          name_values: [{
            name_synonym: ['extra cleaning', 'turbo'],
            lang: 'en'
          }]
        }],
        pausable: true,
        availableZones: ['left driveway', 'right driveway', 'around the hedges']
      },
      willReportState: true,
      states: {
        online: true,
        currentToggleSettings: {
          turbo: false,
        },
        isPaused: false,
        isRunning: false,
        isDocked: false
      },
      hwVersion: '1.0.0',
      swVersion: '2.0.0',
      model: 'L',
      manufacturer: 'L',
    };
  }
}

window.deviceTypes.push({
  identifier: '_addMower',
  icon: 'maps:local-grocery-store',
  label: 'Mower',
  function: (app) => { app._createDevice(Mower.createDevice()); }
})
