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

const type = 'action.devices.types.CURTAIN'

class Curtain extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['living room curtain'],
      roomHint: 'Living Room'
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new Curtain()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type,
      traits: [
        'action.devices.traits.OpenClose'
      ],
      defaultNames: [`Smart Curtain`],
      name: `Smart Curtain`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      attributes: {
        openDirection: ['LEFT', 'RIGHT']
      },
      willReportState: true,
      states: {
        online: true,
        openState: [{
          openPercent: 0,
          openDirection: 'LEFT'
        }, {
          openPercent: 0,
          openDirection: 'RIGHT'
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
  type,
  identifier: '_addCurtain',
  icon: 'icons:flag',
  label: 'Curtain',
  function: (app) => { app._createDevice(Curtain.createDevice()); }
})
