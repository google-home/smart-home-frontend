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

const type = 'action.devices.types.FIREPLACE'

class Fireplace extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['Downstairs Fireplace'],
      roomHint: 'Living Room'
    }, {
      nicknames: ['firepit'],
      roomHint: 'Garden'
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new Fireplace()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type,
      traits: [
        'action.devices.traits.OnOff',
        'action.devices.traits.Toggles',
      ],
      defaultNames: [`Smart Fireplace`],
      name: `Smart Fireplace`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      attributes: {
        availableToggles: [{
          name: 'backlight',
          name_values: [{
            name_synonym: ['backlight', 'mood light'],
            lang: 'en',
          }, {
            name_synonym: ['Hintergrundbeleuchtung', 'Stimmungslicht'],
            lang: 'de'
          }]
        }]
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
  identifier: '_addFireplace',
  icon: 'social:whatshot',
  label: 'Fireplace',
  function: (app) => { app._createDevice(Fireplace.createDevice()); }
})
