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

const type = 'action.devices.types.HOOD'

class Hood extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['Range hood'],
      roomHint: 'Kitchen',
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new Hood()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type,
      traits: [
        'action.devices.traits.OnOff',
        'action.devices.traits.Toggles',
        'action.devices.traits.FanSpeed',
      ],
      defaultNames: [`Smart Hood`],
      name: `Smart Hood`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      attributes: {
        availableToggles: [{
          name: 'Light',
          name_values: [{
            name_synonym: [
              'light',
            ],
            lang: 'en',
          }],
        }],
        availableFanSpeeds: {
          speeds: [{
            speed_name: 'Low',
            speed_values: [{
              speed_synonym: [
                'low',
                'slow',
              ],
              lang: 'en',
            }],
          },
          {
            speed_name: 'High',
            speed_values: [{
              speed_synonym: [
                'high',
              ],
              lang: 'en',
            }],
          },
          ],
          ordered: true,
        },
        reversible: true,
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
  type,
  identifier: '_addHood',
  icon: 'icons:view-day',
  label: 'Hood',
  function: (app) => {
    app._createDevice(Hood.createDevice());
  },
})
