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

class Washer extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['washing machine'],
      roomHint: 'Laundry Room'
    }, {
      nicknames: ['acme washer'],
      roomHint: 'Laundry Room'
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new Washer()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type: 'action.devices.types.WASHER',
      traits: [
        'action.devices.traits.RunCycle',
        'action.devices.traits.Modes',
        'action.devices.traits.Toggles',
      ],
      defaultNames: [`Smart Washer`],
      name: `Smart Washer`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      attributes: {
        pausable: true,
        availableModes: [{
          name: 'load',
          name_values: [{
            name_synonym: ['load', 'size'],
            lang: 'en'
          }],
          settings: [{
            setting_name: 'small',
            setting_values: [{
              setting_synonym: ['small'],
              lang: 'en'
            }]
          }, {
            setting_name: 'large',
            setting_values: [{
              setting_synonym: ['large'],
              lang: 'en'
            }]
          }]
        }],
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
        currentModeSettings: {
          load: 'small',
        },
        currentToggleSettings: {
          quiet: false,
        },
        currentRunCycle: [{
          currentCycle: "rinse",
          nextCycle: "spin",
          lang: "en"
        }],
        currentTotalRemainingTime: 1212,
        currentCycleRemainingTime: 301,
      },
      hwVersion: '1.0.0',
      swVersion: '2.0.0',
      model: 'L',
      manufacturer: 'L',
    };
  }
}

window.deviceTypes.push({
  identifier: '_addWasher',
  icon: 'maps:local-laundry-service',
  label: 'Washer',
  function: (app) => { app._createDevice(Washer.createDevice()); }
})
