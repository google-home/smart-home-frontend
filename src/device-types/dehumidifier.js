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

class Dehumidifier extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['Garage Dehumidifier'],
      roomHint: 'Garage'
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new Dehumidifier()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type: 'action.devices.types.DEHUMIDIFIER',
      traits: [
        'action.devices.traits.StartStop',
        'action.devices.traits.FanSpeed',
        'action.devices.traits.HumiditySetting'
      ],
      defaultNames: [`Smart Dehumidifier`],
      name: `Smart Dehumidifier`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      attributes: {
        pausable: true,
        humiditySetpointRange: {
          minPercent: 0,
          maxPercent: 50
        },
        availableFanSpeeds: {
          speeds: [{
            speed_name: '0',
            speed_values: [{
              speed_synonym: ['off'],
              lang: 'en'
            }]
          }, {
            speed_name: '1',
            speed_values: [{
              speed_synonym: ['low'],
              lang: 'en'
            }]
          }, {
            speed_name: '2',
            speed_values: [{
              speed_synonym: ['medium'],
              lang: 'en'
            }]
          }, {
            speed_name: '3',
            speed_values: [{
              speed_synonym: ['high'],
              lang: 'en'
            }]
          }],
          ordered: true,
        },
        reversible: true
      },
      willReportState: true,
      states: {
        online: true,
        currentFanSpeedSetting: '1',
        humiditySetpointPercent: 35,
        humidityAmbientPercent: 30,
        isRunning: true,
        isPaused: false,
      },
      hwVersion: '1.0.0',
      swVersion: '2.0.0',
      model: 'L',
      manufacturer: 'L',
    };
  }
}

window.deviceTypes.push({
  identifier: '_addDehumidifier',
  icon: 'av:volume-off',
  label: 'Dehumidifier',
  function: (app) => { app._createDevice(Dehumidifier.createDevice()); }
})
