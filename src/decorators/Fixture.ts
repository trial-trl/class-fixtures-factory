import { Faker } from '@faker-js/faker';
import { decorate } from 'tinspector';

export type FixtureOptions =
  | string
  // eslint-disable-next-line no-undef
  | ((faker: Faker, ...resolvedDependencies: any[]) => any)
  | (() => any)
  | {
      type?: () => object;
      ignore?: boolean;
      enum?: object;
      min?: number | Date;
      max?: number | Date;
      precision?: number;
      // eslint-disable-next-line no-undef
      get?:
        | ((faker: Faker, ...resolvedDependencies: any[]) => any)
        | (() => any);
      maxDepthLevel?: number;
      reuseCircularRelationships?: boolean;
      doNotReuseDirectFriendship?: boolean;
      maxOccurrencesPerPath?: number | ((value: number) => number);
      unique?: boolean;
      uniqueCacheKey?: string;
      dependsOn?: string[];
    };

/**
 * Decorator for providing metadata about a property
 * or for customizing the generate fixture
 * @param options
 */
export function Fixture(options?: FixtureOptions) {
  return decorate({
    type: 'Fixture',
    value: options,
  });
}
