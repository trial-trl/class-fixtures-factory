import { ValidationMetadata } from 'class-validator/types/metadata/ValidationMetadata';
import { getMetadataStorage } from 'class-validator';
import { faker } from '@faker-js/faker';
import { PropertyMetadata } from '../../metadata';
import { Class } from '../..';
import { BaseMetadataAdapter } from '../../metadata/BaseMetadataAdapter';
import { FactoryHooks } from 'FactoryHooks';
export class ClassValidatorAdapter extends BaseMetadataAdapter<ValidationMetadata> {
  makeOwnMetadata(classType: Class) {
    return getMetadataStorage().getTargetValidationMetadatas(
      classType,
      '',
      true,
      false
    );
  }

  deduceMetadata(
    _reflectProp: Readonly<PropertyMetadata> | undefined,
    cvMeta: Readonly<ValidationMetadata>,
    propHooks: FactoryHooks
  ): Partial<PropertyMetadata> {
    const prop: Partial<PropertyMetadata> = {
      name: cvMeta.propertyName,
    };

    if (cvMeta.each) {
      prop.array = true;
    }

    switch (cvMeta.name) {
      case 'isBoolean':
      case 'isBooleanString':
        prop.type = 'boolean';
        prop.scalar = true;
        break;
      case 'isDate': {
        prop.type = 'date';
        prop.scalar = true;
        break;
      }
      case 'isString': {
        prop.type = 'string';
        prop.scalar = true;
        break;
      }
      case 'isNumber':
      case 'isInt':
      case 'isNumberString': {
        prop.type = 'number';
        prop.scalar = true;
        break;
      }
      case 'isIn': {
        const items = cvMeta.constraints[0];
        return {
          ...prop,
          items,
        };
      }
      case 'equals':
        propHooks.setOverride(() => cvMeta.constraints[0]);
        break;
      case 'isEmpty':
        propHooks.setOverride(() => null);
        break;
      case 'isPositive':
        prop.type = 'number';
        prop.min = 1;
        prop.scalar = true;
        break;
      case 'isNegative':
        prop.type = 'number';
        prop.max = -1;
        prop.scalar = true;
        break;
      case 'min': {
        const value: number = cvMeta.constraints[0];
        prop.type = 'number';
        prop.scalar = true;
        prop.min = value;
        break;
      }
      case 'max': {
        const value: number = cvMeta.constraints[0];
        prop.type = 'number';
        prop.scalar = true;
        prop.max = value;
        break;
      }
      case 'minDate': {
        const value: Date = cvMeta.constraints[0];
        prop.type = 'date';
        prop.scalar = true;
        prop.min = value;
        break;
      }
      case 'maxDate': {
        const value: Date = cvMeta.constraints[0];
        prop.type = 'date';
        prop.scalar = true;
        prop.max = value;
        break;
      }
      case 'contains': {
        const value = cvMeta.constraints[0];
        propHooks.setOnGenerateScalar((_min?: number, _max?: number) => {
          // TODO: support min/max
          return `${faker.lorem.word()}${value}${faker.lorem.word()}`;
        });
        prop.type = 'string';
        prop.scalar = true;
        break;
      }
      case 'isAlpha':
        propHooks.addAfterValueGenerated((value: string) =>
          value.replace(/\d/g, faker.lorem.word()[0])
        );
        prop.type = 'string';
        prop.scalar = true;
        break;
      case 'isAlphanumeric':
        prop.type = 'alphanumeric';
        prop.scalar = true;
        break;
      case 'isDecimal': {
        const data = cvMeta.constraints[0];
        prop.type = 'decimal';
        prop.scalar = true;
        propHooks.setOnGenerateScalar((min?: number, max?: number) => {
          const digits = Number(data.decimal_digits || '1');
          return parseFloat(faker.finance.amount({ min, max, dec: digits }));
        });
        break;
      }
      case 'isEmail':
        propHooks.setOverride(() => faker.internet.email());
        return {
          ...prop,
          type: 'string',
          scalar: true,
        };
      case 'isFqdn':
        propHooks.setOverride(() => faker.internet.domainName());
        return {
          ...prop,
          type: 'string',
          scalar: true,
        };
      case 'isHexColor':
        propHooks.setOverride(() => faker.internet.color());
        prop.type = 'string';
        prop.scalar = true;
        break;
      case 'isHexadecimal':
        propHooks.setOverride(() => faker.string.hexadecimal());
        prop.type = 'string';
        prop.scalar = true;
        break;
      case 'isLowercase':
        prop.type = 'string';
        prop.scalar = true;
        propHooks.addAfterValueGenerated((value: string) =>
          value.toLowerCase()
        );
        break;
      case 'isUppercase':
        prop.type = 'string';
        prop.scalar = true;
        propHooks.addAfterValueGenerated((value: string) =>
          value.toUpperCase()
        );
        break;
      case 'isLength': {
        const [min, max] = cvMeta.constraints as [number, number];
        prop.min = min;
        prop.max = max;
        prop.type = 'string';
        prop.scalar = true;
        break;
      }
      case 'minLength': {
        const value: number = cvMeta.constraints[0];
        prop.min = value;
        prop.type = 'string';
        prop.scalar = true;
        break;
      }
      case 'maxLength': {
        const value: number = cvMeta.constraints[0];
        prop.max = value;
        prop.type = 'string';
        prop.scalar = true;
        break;
      }
      case 'arrayContains': {
        propHooks.setOverride(() => cvMeta.constraints[0]);
        return {
          ...prop,
          array: true,
        };
      }
      case 'arrayMinSize': {
        const value: number = cvMeta.constraints[0];
        prop.array = true;
        prop.min = value;
        break;
      }
      case 'arrayMaxSize': {
        const value: number = cvMeta.constraints[0];
        prop.array = true;
        prop.max = value;
        break;
      }
      case 'isLatitude': {
        propHooks.setOverride(() => faker.location.latitude());
        prop.type = 'number';
        prop.scalar = true;
        break;
      }
      case 'isLongitude': {
        propHooks.setOverride(() => faker.location.longitude());
        prop.type = 'number';
        prop.scalar = true;
        break;
      }
      case 'isUrl': {
        propHooks.setOverride(() => faker.internet.url());
        prop.type = 'number';
        prop.scalar = true;
        break;
      }
      case 'isPhoneNumber':
      case 'isMobilePhone': {
        propHooks.setOverride(() => faker.phone.number());
        prop.type = 'string';
        prop.scalar = true;
        break;
      }
      case 'isDateString': {
        propHooks.setOverride(() => faker.date.recent().toISOString());
        prop.type = 'string';
        prop.scalar = true;
        break;
      }
      case 'isUuid': {
        propHooks.setOverride(() => faker.string.uuid());
        prop.type = 'string';
        prop.scalar = true;
        break;
      }
      case 'isCurrency': {
        propHooks.setOverride(() => faker.finance.amount());
        prop.type = 'string';
        prop.scalar = true;
        break;
      }
      case 'isCreditCard': {
        propHooks.setOverride(() => faker.finance.creditCardNumber());
        prop.type = 'string';
        prop.scalar = true;
        break;
      }
      case 'isStrongPassword': {
        propHooks.setOverride(() =>
          faker.internet.password({
            length: 24,
            pattern: /[a-zA-Z0-9!@#$%^&*()\\/-_+]/,
          })
        );
        prop.type = 'string';
        prop.scalar = true;
        break;
      }
      case 'isPostalCode': {
        propHooks.setOverride(() => faker.location.zipCode());
        prop.type = 'string';
        prop.scalar = true;
        break;
      }
      case 'isMongoId': {
        propHooks.setOverride(() => faker.database.mongodbObjectId());
        prop.type = 'string';
        prop.scalar = true;
        break;
      }
    }

    if (!prop.type && _reflectProp?.type) {
      prop.type = _reflectProp.type;
    }

    return prop;
  }
}
