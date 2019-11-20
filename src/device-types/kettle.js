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

const type = 'action.devices.types.KETTLE'

class Kettle extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['little teapot'],
      roomHint: 'Kitchen'
    }, {
      nicknames: ['ramen cooker'],
      roomHint: 'Bedroom'
    }, {
      nicknames: ['solder station'],
      roomHint: 'Shed'
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new Kettle()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type,
      traits: [
        'action.devices.traits.OnOff',
        'action.devices.traits.TemperatureControl',
      ],
      defaultNames: [`Smart Kettle`],
      name: `Smart Kettle`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      attributes: {
        temperatureRange: {
          minThresholdCelsius: 0.0,
          maxThresholdCelsius: 100.0
        },
        temperatureUnitForUX: 'C'
      },
      willReportState: true,
      states: {
        online: true,
        temperatureSetpointCelsius: 20,
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
  identifier: '_addKettle',
  icon: 'image:filter-frames',
  label: 'Kettle',
  function: (app) => { app._createDevice(Kettle.createDevice()); }
})
