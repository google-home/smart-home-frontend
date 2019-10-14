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

class Mop extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['micro mop'],
      roomHint: 'Kitchen'
    }, {
      nicknames: ['dog hair mop'],
      roomHint: 'Garage'
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new Mop()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type: 'action.devices.types.MOP',
      traits: [
        'action.devices.traits.Dock',
        'action.devices.traits.StartStop',
        'action.devices.traits.Toggles'
      ],
      defaultNames: [`Smart Mop`],
      name: `Smart Mop`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      willReportState: true,
      attributes: {
        availableToggles: [{
          name: 'turbo',
          name_values: [{
            name_synonym: ['extra cleaning', 'turbo'],
            lang: 'en'
          }, {
            name_synonym: ['zusätzliche Reinigung', 'turbo'],
            lang: 'de'
          }]
        }],
        pausable: true
      },
      states: {
        online: true,
        isRunning: false,
        isPaused: false,
        isDocked: false,
        currentToggleSettings: {
          turbo: false
        }
      },
      hwVersion: '3.2',
      swVersion: '11.4',
      model: '442',
      manufacturer: 'sirius',
    };
  }
}

window.deviceTypes.push({
  identifier: '_addMop',
  icon: 'image:brush',
  label: 'Mop',
  function: (app) => { app._createDevice(Mop.createDevice()); }
})
