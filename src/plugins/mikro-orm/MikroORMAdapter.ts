import { EntityMetadata, EntityProperty, MikroORM } from '@mikro-orm/core';
import { BaseMetadataAdapter, Class, FactoryOptions } from '../..';
import { FactoryHooks } from '../../FactoryHooks';
import { PropertyMetadata } from '../../metadata';
import { DeepRequired } from '../../utils';

interface MikroORMAdapterContext {
  orm: MikroORM;
}

interface Metadata {
  propertyName: string;
  propertyMeta: EntityProperty;
  uniqueMeta: EntityMetadata['uniques'];
}

export class MikroORMAdapter extends BaseMetadataAdapter<Metadata> {
  options!: DeepRequired<FactoryOptions> | undefined;

  makeOwnMetadata(
    classType: Class<any>,
    adapterContext: MikroORMAdapterContext,
    options?: DeepRequired<FactoryOptions>
  ): Metadata[] {
    this.options = options;
    if (adapterContext.orm.getMetadata().has(classType.name)) {
      const meta = adapterContext.orm.getMetadata().get(classType.name);
      return Object.entries(meta.properties)
        .filter(([, m]) => !('embedded' in m))
        .map(([name, m]) => ({
          propertyName: name,
          propertyMeta: m,
          uniqueMeta: meta.uniques.filter((v) => v.properties.includes(name)),
        }));
    }
    return [];
  }

  deduceMetadata(
    reflectProp: Readonly<PropertyMetadata> | undefined,
    ownProp: Readonly<Metadata>,
    propHooks: FactoryHooks,
    adapterContext: MikroORMAdapterContext
  ): Partial<PropertyMetadata> {
    const prop: Partial<PropertyMetadata> = {
      name: ownProp.propertyName,
      unique: ownProp.propertyMeta.unique === true,
    };

    const { propertyMeta: meta } = ownProp;
    const { type } = meta;

    const uniqueIndex = ownProp.uniqueMeta[0];

    if ('getter' in meta && 'setter' in meta && meta.getter && !meta.setter) {
      prop.readOnly = true;
    }

    if (uniqueIndex) {
      prop.unique = true;
      prop.uniqueCacheKey =
        typeof uniqueIndex.properties === 'string'
          ? uniqueIndex.properties
          : uniqueIndex.properties.join('-');
    }

    if ((meta.runtimeType as string) === 'array') {
      const itemType = meta.columnTypes[0].replace('[]', '');

      return {
        ...prop,
        scalar: true,
        array: true,
        type: itemType === 'text' ? 'string' : itemType,
      };
    }

    if (meta.runtimeType === 'Date') {
      return { ...prop, type: 'date', scalar: true };
    }

    if (type.endsWith('Type')) {
      return { ...prop, type: meta.runtimeType };
    }

    if (meta.default) {
      propHooks.setOverride(() => meta.default);
      return {
        ...prop,
        type,
      };
    }

    if (meta.items) {
      return {
        ...prop,
        scalar: meta.enum === true,
        array: meta.array,
        type: typeof meta.items[0],
        items: meta.items,
      };
    }

    if (!!meta.kind && meta.kind !== 'scalar') {
      return {
        ...prop,
        type,
        scalar: false,
        array: ['1:m', 'm:n'].includes(meta.kind),
      };
    }

    if (meta.primary) {
      if (this.options?.handlePrimaryColumns) {
        return {
          ...prop,
          type,
          unique: true,
          scalar: true,
        };
      }
      propHooks.setOverride(() => undefined);
      return {
        ...prop,
        type,
        unique: true,
        scalar: true,
      };
    }

    return {
      ...prop,
      type,
      scalar: true,
      max: meta.length,
    };
  }
}