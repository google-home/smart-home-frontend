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

class Closet extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['Coat closet'],
      roomHint: 'Bedroom'
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new Closet()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type: 'action.devices.types.CLOSET',
      traits: [
        'action.devices.traits.OpenClose'
      ],
      defaultNames: [`Smart Closet`],
      name: `Smart Closet`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      attributes: {
        openDirection: ['LEFT', 'RIGHT']
      },
      willReportState: true,
      states: {
        online: true,
        openState: [{
          openDirection: 'LEFT',
          openPercent: 0
        }, {
          openDirection: 'RIGHT',
          openPercent: 0
        }]
      },
      hwVersion: '3.2',
      swVersion: '11.4',
      model: '442',
      manufacturer: 'sirius',
    };
  }
}

window.deviceTypes.push({
  identifier: '_addCloset',
  icon: 'icons:view-array',
  label: 'Closet',
  function: (app) => { app._createDevice(Closet.createDevice()); }
})
