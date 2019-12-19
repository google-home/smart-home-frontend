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

const type = 'action.devices.types.BOILER'

class Boiler extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['my boiler'],
      roomHint: 'Laundry Room',
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new Boiler()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type,
      traits: [
        'action.devices.traits.TemperatureControl',
        'action.devices.traits.OnOff',
      ],
      defaultNames: [`Smart Boiler`],
      name: `Smart Boiler`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      attributes: {
        temperatureRange: {
          minThresholdCelsius: 50,
          maxThresholdCelsius: 125,
        },
        temperatureUnitForUX: 'C',
      },
      willReportState: true,
      states: {
        online: true,
        on: false,
        temperatureSetpointCelsius: 105,
        temperatureAmbientCelsius: 110,
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
  identifier: '_addBoiler',
  icon: 'icons:invert-colors',
  label: 'Boiler',
  function: (app) => {
    app._createDevice(Boiler.createDevice());
  },
})
