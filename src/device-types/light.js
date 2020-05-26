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

const type = 'action.devices.types.LIGHT'
const iconFunction = (attributes) => {
  if (attributes.colorTemperatureRange) {
    return 'image:wb-iridescent'
  }
  return 'image:wb-incandescent'
}

class Light extends DeviceType {
  constructor() {
    super()
    this.monochromeValuesArray = [{
      nicknames: ['ceiling lights'],
      roomHint: 'Family Room',
    }, {
      nicknames: ['garden lights'],
      roomHint: 'Front Yard',
    }, {
      nicknames: ['workshop light'],
      roomHint: 'Shed',
    }, {
      nicknames: ['porch light'],
      roomHint: 'Front Yard',
    }];

    this.rgbValuesArray = [{
      nicknames: ['table lamp'],
      roomHint: 'Living Room',
    }, {
      nicknames: ['reading lamp'],
      roomHint: 'Bedroom',
    }, {
      nicknames: ['doorway'],
      roomHint: 'Hallway',
    }, {
      nicknames: ['stairway'],
      roomHint: 'Hallway',
    }];
  }

  static createMonochromeLight() {
    if (!instance) {
      instance = new Light()
    }
    const element = instance.monochromeValuesArray.shift();

    return {
      id: instance.genUuid(),
      type,
      traits: [
        'action.devices.traits.Brightness',
        'action.devices.traits.OnOff',
        'action.devices.traits.ColorSetting',
      ],
      defaultNames: [`Smart Lamp`],
      name: `Smart Lamp`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      attributes: {
        colorModel: 'rgb',
        colorTemperatureRange: {
          temperatureMinK: 2000,
          temperatureMaxK: 9000,
        },
      },
      willReportState: true,
      states: {
        on: false,
        online: true,
        brightness: 90,
        color: {
          temperatureK: 2000,
        },
      },
      hwVersion: '1.0.0',
      swVersion: '2.0.0',
      model: 'L',
      manufacturer: 'L',
    };
  }

  static createRgbLight() {
    if (!instance) {
      instance = new Light()
    }
    const element = instance.rgbValuesArray.shift();

    return {
      id: instance.genUuid(),
      type,
      traits: [
        'action.devices.traits.Brightness',
        'action.devices.traits.OnOff',
        'action.devices.traits.ColorSetting',
      ],
      defaultNames: [`Smart RGB Light`],
      name: `Smart RGB Light`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      attributes: {
        colorModel: 'rgb',
      },
      willReportState: true,
      states: {
        on: false,
        online: true,
        brightness: 90,
        color: {
          spectrumRgb: 0xFF0000 /* Red */,
        },
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
  identifier: '_addMonochromeLight',
  icon: 'image:wb-iridescent',
  label: 'Monochrome Light',
  iconFunction,
  function: (app) => {
    app._createDevice(Light.createMonochromeLight());
  },
})


window.deviceTypes.push({
  type,
  identifier: '_addLight',
  icon: 'image:wb-incandescent',
  label: 'RGB Light',
  iconFunction,
  function: (app) => {
    app._createDevice(Light.createRgbLight());
  },
})
