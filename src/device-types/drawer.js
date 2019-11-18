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

class Drawer extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['Sock drawer'],
      roomHint: 'Bedroom'
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new Drawer()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type: 'action.devices.types.DRAWER',
      traits: [
        'action.devices.traits.OpenClose'
      ],
      defaultNames: [`Smart Drawer`],
      name: `Smart Drawer`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      attributes: {
        discreteOnlyOpenClose: true
      },
      willReportState: true,
      states: {
        online: true,
        openPercent: 0
      },
      hwVersion: '3.2',
      swVersion: '11.4',
      model: '442',
      manufacturer: 'sirius',
    };
  }
}

window.deviceTypes.push({
  identifier: '_addDrawer',
  icon: 'av:call-to-action',
  label: 'Drawer',
  function: (app) => { app._createDevice(Drawer.createDevice()); }
})
