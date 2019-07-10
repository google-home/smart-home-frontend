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

class Heater extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['upstairs heater'],
      roomHint: 'Bedroom'
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new Heater()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type: 'action.devices.types.HEATER',
      traits: [
        'action.devices.traits.OnOff',
        'action.devices.traits.FanSpeed'
      ],
      defaultNames: [`Smart Heater`],
      name: `Smart Heater`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      attributes: {
        availableFanSpeeds: {
          speeds: [{
            speed_name: 'Low',
            speed_values: [{
              speed_synonym: ['low', 'slow'],
              lang: 'en'
            }]
          }, {
            speed_name: 'High',
            speed_values: [{
              speed_synonym: ['high'],
              lang: 'en'
            }]
          }],
          ordered: true
        },
        reversible: true
      },
      willReportState: true,
      states: {
        online: true,
      },
      hwVersion: '3.2',
      swVersion: '11.4',
      model: '442',
      manufacturer: 'sirius',
    };
  }
}

window.deviceTypes.push({
  identifier: '_addHeater',
  icon: 'icons:account-balance-wallet',
  label: 'Heater',
  function: (app) => { app._createDevice(Heater.createDevice()); }
})
