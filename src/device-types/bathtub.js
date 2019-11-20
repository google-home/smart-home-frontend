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

const type = 'action.devices.types.BATHTUB'

class Bathtub extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['Master Bathtub', 'Fancy Tub'],
      roomHint: 'Bathroom'
    }, {
      nicknames: ['Rubber Duck Pond', 'Goose Lake'],
      roomHint: 'Garden'
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new Bathtub()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type,
      traits: [
        'action.devices.traits.Fill'
      ],
      defaultNames: [`Smart Bathtub`],
      name: `Smart Bathtub`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      attributes: {
        availableFillLevels: [{
          levels: [{
            level_name: 'none',
            level_values: [{
              level_synonym: ['none', 'empty', 'drained'],
              lang: 'en'
            }]
          }, {
            level_name: 'quarter',
            level_values: [{
              level_synonym: ['quarter', 'a fourth', 'halfway to halfway'],
              lang: 'en'
            }]
          }, {
            level_name: 'half',
            level_values: [{
              level_synonym: ['half', 'halfway', 'half full', 'half empty'],
              lang: 'en'
            }]
          }, {
            level_name: 'full',
            level_values: [{
              level_synonym: ['full', 'all the way', 'max'],
              lang: 'en'
            }]
          }],
          ordered: true
        }]
      },
      willReportState: true,
      states: {
        online: true,
        on: false,
        isFilled: false,
        currentFillLevel: 'none'
      },
      hwVersion: '3.2',
      swVersion: '11.4',
      model: '442',
      manufacturer: 'sirius',
      customData: {
        honk: 'HONK'
      }
    };
  }
}

window.deviceTypes.push({
  type,
  identifier: '_addBathtub',
  icon: 'places:hot-tub',
  label: 'Bathtub',
  function: (app) => { app._createDevice(Bathtub.createDevice()); }
})
