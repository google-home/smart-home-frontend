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

const type = 'action.devices.types.VACUUM'

class Vacuum extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['kitchen vacuum'],
      roomHint: 'Kitchen'
    }, {
      nicknames: ['robo vacuum'],
      roomHint: 'Master Bedroom'
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new Vacuum()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type,
      traits: [
        'action.devices.traits.StartStop',
        'action.devices.traits.Toggles',
        'action.devices.traits.Dock'
      ],
      defaultNames: [`Smart Vacuum`],
      name: `Smart Vacuum`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      attributes: {
        pausable: true,
        availableToggles: [{
          name: 'quiet',
          name_values: [{
            name_synonym: ['quiet', 'silent'],
            lang: 'en'
          }]
        }]
      },
      willReportState: true,
      states: {
        online: true,
        isRunning: false,
        isPaused: false,
        isDocked: false,
        currentToggleSettings: {
          quiet: false
        }
      },
      hwVersion: '1.0.0',
      swVersion: '2.0.0',
      model: 'L',
      manufacturer: 'L',
    };
  }
}

window.deviceTypes.push({
  type,
  identifier: '_addVacuum',
  icon: 'hardware:router',
  label: 'Vacuum',
  function: (app) => { app._createDevice(Vacuum.createDevice()); }
})
