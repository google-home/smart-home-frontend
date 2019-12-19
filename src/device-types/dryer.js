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

const type = 'action.devices.types.DRYER'

class Dryer extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['clothes dryer'],
      roomHint: 'Laundry Room',
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new Dryer()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type,
      traits: [
        'action.devices.traits.OnOff',
        'action.devices.traits.StartStop',
        'action.devices.traits.Modes',
        'action.devices.traits.Toggles',
        'action.devices.traits.RunCycle',
      ],
      defaultNames: [`Smart Dryer`],
      name: `Smart Dryer `,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      attributes: {
        pausable: true,
        availableModes: [{
          name: 'load',
          name_values: [{
            name_synonym: ['load', 'size', 'load size'],
            lang: 'en',
          }],
          settings: [{
            setting_name: 'small',
            setting_values: [{
              setting_synonym: ['small', 'half'],
              lang: 'en',
            }],
          },
          {
            setting_name: 'large',
            setting_values: [{
              setting_synonym: ['large', 'full'],
              lang: 'en',
            }],
          },
          ],
          ordered: true,
        }],
        availableToggles: [{
          name: 'Sterilization',
          name_values: [{
            name_synonym: ['Bio-clean', 'UltraSound'],
            lang: 'en',
          }],
        },
        {
          name: 'Energy Saving',
          name_values: [{
            name_synonym: ['normal', 'medium', 'high'],
            lang: 'en',
          }],
        },
        ],
      },
      willReportState: true,
      states: {
        online: true,
        currentModeSettings: {
          load: 'small',
        },
        currentToggleSettings: {
          'Sterilization': false,
          'Energy Saving': false,
        },
        currentRunCycle: [{
          currentCycle: 'rinse',
          nextCycle: 'spin',
          lang: 'en',
        }],
        currentTotalRemainingTime: 1212,
        currentCycleRemainingTime: 301,
        isRunning: false,
        isPaused: false,
        on: false,
      },
      hwVersion: '3.2',
      swVersion: '11.4',
      model: '442',
      manufacturer: 'sirius',
    };
  }
}

window.deviceTypes.push({
  type,
  identifier: '_addDryer',
  icon: 'places:casino',
  label: 'Dryer',
  function: (app) => {
    app._createDevice(Dryer.createDevice());
  },
})
