import type { Faker } from '@faker-js/faker';
import { Class } from '../common/typings';
import reflect, { ClassReflection, PropertyReflection } from 'tinspector';
import { FixtureOptions } from '../decorators/Fixture';
import { getEnumValues } from '../common/utils';
import {
  BaseMetadataAdapter,
  BasePropertyMetadata,
} from './BaseMetadataAdapter';
import { FactoryHooks } from '../FactoryHooks';
import { DeepRequired } from '../utils';
import { FactoryOptions, FixtureFactory } from '..';

export interface ClassMetadata {
  name: string;
  properties: PropertyMetadata[];
}

export interface PropertyMetadata {
  name: string;
  type: string | Class;
  runtimeType: string;
  scalar?: boolean;
  enum?: boolean;
  items?: any[];
  array?: boolean;
  ignore?: boolean;
  min?: number | Date;
  max?: number | Date;
  precision?: number;
  readOnly?: boolean;
  /**
   * A value that completely bypass everything and sets the generate value equals to its own
   */
  input?: (...args: any[]) => any;
  hooks?: FactoryHooks;
  maxDepthLevel?: number | ((value: number) => number);
  reuseCircularRelationships?: boolean;
  doNotReuseDirectFriendship?: boolean;
  maxOccurrencesPerPath?: number | ((value: number) => number);
  unique?: boolean;
  uniqueCacheKey?: string;
  dependsOn?: string[];
}

export class MetadataStore {
  private static adapters: BaseMetadataAdapter[] = [];
  protected store: Record<string, ClassMetadata> = {};

  constructor(
    private adapterContext: any = {},
    private readonly acceptPartialResult = false
  ) {}

  static addAdapter(...adapters: BaseMetadataAdapter[]) {
    MetadataStore.adapters.push(...adapters);
  }

  /**
   * Retrieve the metadata of a given class from the store
   */
  get(classType: Class | string): ClassMetadata {
    const name = typeof classType === 'string' ? classType : classType.name;
    const value = this.store[name];
    if (!value) throw new Error(`Cannot find metadata for class "${name}"`);
    return value;
  }

  /**
   * Make type metadata for a class
   */
  make(
    classType: Class,
    options: DeepRequired<FactoryOptions> = FixtureFactory.DEFAULT_OPTIONS
  ): ClassMetadata {
    const reflectMetadata = reflect(classType);

    /**
     * Sorting by dependency graph
     */
    const sortedProperties = this.resolveDependencies(reflectMetadata);

    /**
     * Metadata from adapters
     */
    const adapterMetadata: ({
      adapter: BaseMetadataAdapter;
    } & BasePropertyMetadata)[] = [];
    for (const adapter of MetadataStore.adapters) {
      const meta = adapter
        .makeOwnMetadata(classType, this.adapterContext, options)
        .filter(Boolean);
      adapterMetadata.push(...meta.map((v) => ({ adapter, ...v })));
    }

    const unknownTypes = new Set<string>();
    /**
     * Metadata from reflection
     */
    let reflectProps = sortedProperties
      .map((prop) => this.makePropertyMetadata(prop, options!)!)
      .filter(Boolean);

    for (const reflectProp of reflectProps) {
      if (reflectProp?.ignore || !!reflectProp?.input) continue;
      if (!reflectProp.type) {
        unknownTypes.add(reflectProp.name);
      }
    }

    const allPropNames = [
      ...new Set([
        ...adapterMetadata.map((v) => v.propertyName),
        ...reflectProps.map((v) => v.name),
      ]),
    ];

    /**
     * Merge with the properties made from the adapter
     * Basically the property from the adapter takes precedence unless
     * the Fixture decorator is used to ignore the property or a force a given value
     */
    const finalProps: PropertyMetadata[] = [];
    for (const propName of allPropNames) {
      const reflectProp = reflectProps.find((prop) => prop.name === propName);
      if (reflectProp?.ignore || !!reflectProp?.input) {
        finalProps.push(reflectProp);
        continue;
      }

      const propHooks = new FactoryHooks();
      const adapterProps = adapterMetadata.filter(
        (v) => v.propertyName === propName
      );
      const finalDeducedProp: PropertyMetadata = reflectProp || ({} as any);
      for (const metaProp of adapterProps) {
        const deducedProp = metaProp.adapter.deduceMetadata(
          reflectProp ? Object.freeze({ ...reflectProp }) : undefined,
          Object.freeze({ ...metaProp }),
          propHooks,
          this.adapterContext
        );
        if (!deducedProp) continue;
        Object.assign(finalDeducedProp, deducedProp);
      }

      finalDeducedProp.hooks = propHooks;
      finalProps.push(finalDeducedProp);
      if (!finalDeducedProp.type) {
        unknownTypes.add(propName);
      } else {
        unknownTypes.delete(propName);
      }
    }

    if (unknownTypes.size > 0) {
      throw new Error(
        `Couldn't extract the type of ${[...unknownTypes]
          .map((v) => `"${v}"`)
          .join(', ')}. Use @Fixture({ type: () => Foo })`
      );
    }

    const classMetadata: ClassMetadata = {
      name: reflectMetadata.name,
      properties: finalProps,
    };
    return (this.store[classType.name] = classMetadata);
  }

  private makePropertyMetadata(
    prop: PropertyReflection,
    options: DeepRequired<FactoryOptions>
  ): PropertyMetadata | null {
    const decorator = this.getFixtureDecorator(prop);
    const meta: Partial<PropertyMetadata> = {
      name: prop.name,
      scalar: prop.typeClassification === 'Primitive',
    };
    if (decorator) {
      if (typeof decorator === 'function') {
        meta.input = decorator.bind(decorator, options.fakerInstance as Faker);
      } else if (typeof decorator === 'string') {
        meta.input = () => decorator;
      } else if (typeof decorator === 'object') {
        if (decorator.ignore) {
          return {
            ...meta,
            type: '',
            ignore: true,
          } as PropertyMetadata;
        }
        meta.input = decorator.get?.bind(
          decorator.get,
          options.fakerInstance as Faker
        );
        if (
          typeof decorator.min === 'number' ||
          typeof decorator.max === 'number'
        ) {
          meta.min =
            decorator.min && typeof decorator.min === 'number'
              ? decorator.min
              : 1;
          meta.max = Math.max(
            decorator.max && typeof decorator.max === 'number'
              ? decorator.max
              : 3,
            meta.min
          );
        }
        meta.dependsOn = decorator.dependsOn;
        meta.precision = decorator.precision;
        meta.maxDepthLevel = decorator.maxDepthLevel;
        meta.reuseCircularRelationships = decorator.reuseCircularRelationships;
        meta.doNotReuseDirectFriendship = decorator.doNotReuseDirectFriendship;
        meta.maxOccurrencesPerPath = decorator.maxOccurrencesPerPath;
        meta.unique = decorator.unique;
        meta.uniqueCacheKey = decorator.uniqueCacheKey;
        let inputType: any = decorator.type?.();
        if (inputType) {
          if (Array.isArray(inputType)) {
            inputType = inputType[0];
            meta.array = true;
          }
          if (!inputType.prototype) {
            throw new Error(
              `Only pass class names to "type" in @Fixture({ type: () => Foo}) for "${meta.name}"`
            );
          }
          const { name } = inputType;
          if (!['string', 'number', 'boolean'].includes(name.toLowerCase())) {
            meta.type = name;
          } else {
            meta.type = name.toLowerCase();
            meta.scalar = !meta.array;
          }
        }
        if (decorator.enum) {
          meta.enum = true;
          meta.items = getEnumValues(decorator.enum);
        }
      }
    }
    if (!meta.type) {
      if (!prop.type) {
        if (this.acceptPartialResult) {
          return meta as PropertyMetadata;
        }
      } else if (Array.isArray(prop.type)) {
        return meta as any;
      } else if (prop.type instanceof Function) {
        const { name } = prop.type as Function;
        if (!['string', 'number', 'boolean'].includes(name.toLowerCase())) {
          meta.type = name;
        } else {
          meta.type = name.toLowerCase();
        }
      }
    }
    return meta as PropertyMetadata;
  }

  private getFixtureDecorator(prop: PropertyReflection): FixtureOptions {
    return prop.decorators.find((v) => v.type === 'Fixture')?.value || null;
  }

  private resolveDependencies(reflectMetadata: ClassReflection) {
    const dependencyGraph: Record<string, string[]> = {};
    reflectMetadata.properties.forEach((prop) => {
      const decorator = this.getFixtureDecorator(prop);
      if (
        decorator &&
        typeof decorator === 'object' &&
        decorator.dependsOn &&
        decorator.dependsOn.length > 0
      )
        dependencyGraph[prop.name] = decorator.dependsOn;
    });

    const sortedProperties: string[] = [];

    function visit(prop: string, ancestors: string[] = []) {
      ancestors.push(prop);
      const dependencies = dependencyGraph[prop] || [];
      dependencies.forEach((dep: string) => {
        if (ancestors.indexOf(dep) !== -1) {
          throw new Error(
            `Circular dependency detected: ${dep} depends on ${prop}`
          );
        }
        if (sortedProperties.indexOf(dep) === -1) {
          visit(dep, ancestors.slice());
        }
      });
      if (sortedProperties.indexOf(prop) === -1) {
        sortedProperties.push(prop);
      }
    }

    Object.keys(dependencyGraph).forEach((prop: string) => {
      if (sortedProperties.indexOf(prop) === -1) {
        visit(prop);
      }
    });

    const resolvedProperties = sortedProperties.map(
      (sortedProp) =>
        reflectMetadata.properties.find((prop) => prop.name === sortedProp)!
    );

    return resolvedProperties.concat(
      reflectMetadata.properties.filter(
        (prop) =>
          !resolvedProperties.find((sorted) => sorted.name === prop.name)
      )
    );
  }
}
