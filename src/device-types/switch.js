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

const type = 'action.devices.types.SWITCH'

class Switch extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['smart switch'],
      roomHint: 'Living Room'
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new Switch()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type,
      traits: [
        'action.devices.traits.OnOff',
      ],
      defaultNames: [`Smart Switch`],
      name: `Smart Switch`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      willReportState: true,
      states: {
        online: true,
        on: false
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
  identifier: '_addSwitch',
  icon: 'communication:call-merge',
  label: 'Switch',
  function: (app) => { app._createDevice(Switch.createDevice()); }
})
