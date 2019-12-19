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

const type = 'action.devices.types.HUMIDIFIER'

class Humidifier extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['Bedroom Humidifier'],
      roomHint: 'Bedroom',
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new Humidifier()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type,
      traits: [
        'action.devices.traits.StartStop',
        'action.devices.traits.FanSpeed',
        'action.devices.traits.HumiditySetting',
      ],
      defaultNames: [`Smart Humidifier`],
      name: `Smart Humidifier`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      attributes: {
        pausable: true,
        humiditySetpointRange: {
          minPercent: 50,
          maxPercent: 100,
        },
        availableFanSpeeds: {
          speeds: [{
            speed_name: '0',
            speed_values: [{
              speed_synonym: ['off'],
              lang: 'en',
            }],
          }, {
            speed_name: '1',
            speed_values: [{
              speed_synonym: ['low'],
              lang: 'en',
            }],
          }, {
            speed_name: '2',
            speed_values: [{
              speed_synonym: ['medium'],
              lang: 'en',
            }],
          }, {
            speed_name: '3',
            speed_values: [{
              speed_synonym: ['high'],
              lang: 'en',
            }],
          }],
          ordered: true,
        },
        reversible: true,
      },
      willReportState: true,
      states: {
        online: true,
        currentFanSpeedSetting: '1',
        humiditySetpointPercent: 75,
        humidityAmbientPercent: 60,
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
  type,
  identifier: '_addHumidifier',
  icon: 'av:volume-up',
  label: 'Humidifier',
  function: (app) => {
    app._createDevice(Humidifier.createDevice());
  },
})
