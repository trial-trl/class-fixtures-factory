import { FixtureFactory } from '../src/FixtureFactory';
import { Fixture } from '../src/decorators/Fixture';
import {
  IsIn,
  Equals,
  IsPositive,
  Min,
  Max,
  MinDate,
  MaxDate,
  Contains,
  IsAlpha,
  IsAlphanumeric,
  IsEmail,
  IsFQDN,
  IsHexColor,
  IsLowercase,
  IsUppercase,
  Length,
  MinLength,
  MaxLength,
  ArrayContains,
  ArrayMinSize,
  ArrayMaxSize,
  IsNegative,
  IsString,
  IsNumber,
  IsNumberString,
  IsDate,
  IsOptional,
  IsLatitude,
  isLatitude,
  IsLongitude,
  isLongitude,
  IsUrl,
  isURL,
  IsPhoneNumber,
  IsMobilePhone,
  IsDateString,
  isDateString,
  IsUUID,
  isUUID,
  IsCurrency,
  isCurrency,
  IsCreditCard,
  IsStrongPassword,
  isStrongPassword,
  IsPostalCode,
  isPostalCode,
  IsMongoId,
  isMongoId,
} from 'class-validator';
import '../src/plugins/class-validator';

describe(`FixtureFactory`, () => {
  const factory = new FixtureFactory();

  describe(`with class-validator`, () => {
    it(`throws if type can't be resolved`, () => {
      class Dummy {
        @IsOptional()
        val!: string;
      }
      expect(() => factory.register([Dummy])).toThrow(
        `Couldn't extract the type of "val". Use @Fixture({ type: () => Foo })`
      );
    });

    it(`@Fixture({ ignore: true }) takes precedence`, () => {
      class Dummy {
        @IsString()
        @Fixture({ ignore: true })
        val!: string;
      }
      factory.register([Dummy]);

      const dummy = factory.make(Dummy).one();
      expect(dummy.val).toBeUndefined();
    });

    it(`@Fixture(() => any) takes precedence`, () => {
      class Dummy {
        @IsString()
        @Fixture(() => 'foo')
        val!: string;
      }
      factory.register([Dummy]);

      const dummy = factory.make(Dummy).one();
      expect(dummy.val).toBe('foo');
    });

    it(`@IsIn()`, () => {
      class Dummy {
        @IsIn(['a', 'b', 'c'])
        @Fixture({ type: () => String })
        val!: string;
      }
      factory.register([Dummy]);

      const dummy = factory.make(Dummy).one();
      expect(['a', 'b', 'c'].includes(dummy.val)).toBe(true);
    });

    it(`@Equals()`, () => {
      class Dummy {
        @Equals('foo')
        @Fixture({ type: () => String })
        val!: string;
      }
      factory.register([Dummy]);

      const dummy = factory.make(Dummy).one();
      expect(dummy.val).toBe('foo');
    });

    it(`@IsPositive()`, () => {
      class Dummy {
        @IsPositive()
        val!: number;
      }
      factory.register([Dummy]);

      const dummy = factory.make(Dummy).one();
      expect(dummy.val > 0).toBe(true);
    });

    it(`@IsNegative()`, () => {
      class Dummy {
        @IsNegative()
        val!: number;
      }
      factory.register([Dummy]);

      const dummy = factory.make(Dummy).one();
      expect(dummy.val < 0).toBe(true);
    });

    it(`@Min() `, () => {
      class Dummy {
        @Min(500)
        val!: number;
      }
      factory.register([Dummy]);

      const dummy = factory.make(Dummy).one();
      expect(dummy.val >= 500).toBe(true);
    });

    it(`@Max() `, () => {
      class Dummy {
        @Max(500)
        val!: number;
      }
      factory.register([Dummy]);

      const dummy = factory.make(Dummy).one();
      expect(dummy.val <= 500).toBe(true);
    });

    it(`@MinDate() `, () => {
      const date = new Date();
      class Dummy {
        @MinDate(date)
        val!: Date;
      }
      factory.register([Dummy]);

      const dummy = factory.make(Dummy).one();
      expect(+dummy.val > +date).toBe(true);
    });

    it(`@MaxDate() `, () => {
      const date = new Date();
      class Dummy {
        @MaxDate(date)
        val!: Date;
      }
      factory.register([Dummy]);

      const dummy = factory.make(Dummy).one();
      expect(+dummy.val < +date).toBe(true);
    });

    it(`@Contains() `, () => {
      class Dummy {
        @Contains('foo')
        val!: string;
      }
      factory.register([Dummy]);

      const dummy = factory.make(Dummy).one();
      expect(dummy.val.includes('foo')).toBe(true);
    });

    it(`@IsAlpha() `, () => {
      class Dummy {
        @IsAlpha()
        val!: string;
      }
      factory.register([Dummy]);

      const dummy = factory.make(Dummy).one();
      expect(dummy.val).not.toMatch(/\d/);
    });

    it(`@IsAlphanumeric() `, () => {
      class Dummy {
        @IsAlphanumeric()
        val!: string;
      }
      factory.register([Dummy]);

      const dummy = factory.make(Dummy).one();
      expect(typeof dummy.val).toBe('string');
    });

    it(`@IsEmail() `, () => {
      class Dummy {
        @IsEmail()
        val!: string;
      }
      factory.register([Dummy]);

      const dummy = factory.make(Dummy).one();
      expect(dummy.val).toMatch(/@.+\..+/);
    });

    it(`@IsFQDN() `, () => {
      class Dummy {
        @IsFQDN()
        val!: string;
      }
      factory.register([Dummy]);

      const dummy = factory.make(Dummy).one();
      expect(dummy.val).toMatch(/.+\..+/);
    });

    it(`@IsHexColor() `, () => {
      class Dummy {
        @IsHexColor()
        val!: string;
      }
      factory.register([Dummy]);

      const dummy = factory.make(Dummy).one();
      expect(dummy.val).toMatch(/^#/);
    });

    it(`@IsLowercase() `, () => {
      class Dummy {
        @IsLowercase()
        val!: string;
      }
      factory.register([Dummy]);

      const dummy = factory.make(Dummy).one();
      expect(dummy.val.toLowerCase()).toBe(dummy.val);
    });

    it(`@IsUppercase() `, () => {
      class Dummy {
        @IsUppercase()
        val!: string;
      }
      factory.register([Dummy]);

      const dummy = factory.make(Dummy).one();
      expect(dummy.val.toUpperCase()).toBe(dummy.val);
    });

    it(`@Length() `, () => {
      class Dummy {
        @Length(20, 30)
        val!: string;
      }
      factory.register([Dummy]);

      const dummy = factory.make(Dummy).one();
      expect(dummy.val.length >= 20 && dummy.val.length <= 30).toBe(true);
    });

    it(`@MinLength() `, () => {
      class Dummy {
        @MinLength(20)
        val!: string;
      }
      factory.register([Dummy]);

      const dummy = factory.make(Dummy).one();
      expect(dummy.val.length >= 20).toBe(true);
    });

    it(`@MaxLength() `, () => {
      class Dummy {
        @MaxLength(5)
        val!: string;
      }
      factory.register([Dummy]);

      const dummy = factory.make(Dummy).one();
      expect(dummy.val.length <= 5).toBe(true);
    });

    it(`@ArrayContains() `, () => {
      class Dummy {
        @ArrayContains([1, 2])
        @Fixture({ type: () => [Number] })
        val!: number[];
      }
      factory.register([Dummy]);

      const dummy = factory.make(Dummy).one();
      expect(dummy.val).toEqual([1, 2]);
    });

    it(`@ArrayMinSize() `, () => {
      class Dummy {
        @ArrayMinSize(2)
        @Fixture({ type: () => [String] })
        val!: string[];
      }
      factory.register([Dummy]);

      const dummy = factory.make(Dummy).one();
      expect(dummy.val.length >= 2).toBe(true);
    });

    it(`@ArrayMaxSize() `, () => {
      class Dummy {
        @ArrayMaxSize(2)
        @Fixture({ type: () => [String] })
        val!: string[];
      }
      factory.register([Dummy]);

      const dummy = factory.make(Dummy).one();
      expect(dummy.val.length <= 2).toBe(true);
    });

    it(`@IsString()`, () => {
      class Dummy {
        @IsString()
        val!: string;
      }
      factory.register([Dummy]);

      const dummy = factory.make(Dummy).one();
      expect(typeof dummy.val).toBe('string');
    });

    it(`@IsNumber()`, () => {
      class Dummy {
        @IsNumber()
        val!: number;
      }
      factory.register([Dummy]);

      const dummy = factory.make(Dummy).one();
      expect(typeof dummy.val).toBe('number');
    });

    it(`@IsNumberString()`, () => {
      class Dummy {
        @IsNumberString()
        val!: number;
      }
      factory.register([Dummy]);

      const dummy = factory.make(Dummy).one();
      expect(typeof dummy.val).toBe('number');
    });

    it(`@IsDate()`, () => {
      class Dummy {
        @IsDate()
        val!: Date;
      }
      factory.register([Dummy]);

      const dummy = factory.make(Dummy).one();
      expect(dummy.val).toBeInstanceOf(Date);
    });

    it(`@IsLatitude()`, () => {
      class Dummy {
        @IsLatitude()
        val!: number;
      }
      factory.register([Dummy]);

      const dummy = factory.make(Dummy).one();
      expect(isLatitude(String(dummy.val))).toBe(true);
    });

    it(`@IsLongitude()`, () => {
      class Dummy {
        @IsLongitude()
        val!: number;
      }
      factory.register([Dummy]);

      const dummy = factory.make(Dummy).one();
      expect(isLongitude(String(dummy.val))).toBe(true);
    });

    it(`@IsUrl()`, () => {
      class Dummy {
        @IsUrl()
        val!: string;
      }
      factory.register([Dummy]);

      const dummy = factory.make(Dummy).one();
      expect(isURL(dummy.val)).toBe(true);
    });

    it(`@IsPhoneNumber()`, () => {
      class Dummy {
        @IsPhoneNumber()
        val!: string;
      }
      factory.register([Dummy]);

      const dummy = factory.make(Dummy).one();
      expect(/^[\d-\sx+().]+$/.test(dummy.val)).toBe(true);
    });

    it(`@IsMobilePhone()`, () => {
      class Dummy {
        @IsMobilePhone()
        val!: string;
      }
      factory.register([Dummy]);

      const dummy = factory.make(Dummy).one();
      expect(/^[\d-\sx+().]+$/.test(dummy.val)).toBe(true);
    });

    it(`@IsDateString()`, () => {
      class Dummy {
        @IsDateString()
        val!: string;
      }
      factory.register([Dummy]);

      const dummy = factory.make(Dummy).one();
      expect(isDateString(dummy.val)).toBe(true);
    });

    it(`@IsUUID()`, () => {
      class Dummy {
        @IsUUID()
        val!: string;
      }
      factory.register([Dummy]);

      const dummy = factory.make(Dummy).one();
      expect(isUUID(dummy.val)).toBe(true);
    });

    it(`@IsCurrency()`, () => {
      class Dummy {
        @IsCurrency()
        val!: string;
      }
      factory.register([Dummy]);

      const dummy = factory.make(Dummy).one();
      expect(isCurrency(dummy.val)).toBe(true);
    });

    it(`@IsCreditCard()`, () => {
      class Dummy {
        @IsCreditCard()
        val!: string;
      }
      factory.register([Dummy]);

      const dummy = factory.make(Dummy).one();
      expect(/^[\d-]+$/.test(dummy.val)).toBe(true);
    });

    it(`@IsStrongPassword()`, () => {
      class Dummy {
        @IsStrongPassword()
        val!: string;
      }
      factory.register([Dummy]);

      const dummy = factory.make(Dummy).one();
      expect(isStrongPassword(dummy.val)).toBe(true);
    });

    it(`@IsPostalCode()`, () => {
      class Dummy {
        @IsPostalCode('any')
        val!: string;
      }
      factory.register([Dummy]);

      const dummy = factory.make(Dummy).one();
      expect(isPostalCode(dummy.val, 'any')).toBe(true);
    });

    it(`@IsMongoId()`, () => {
      class Dummy {
        @IsMongoId()
        val!: string;
      }
      factory.register([Dummy]);

      const dummy = factory.make(Dummy).one();
      expect(isMongoId(dummy.val)).toBe(true);
    });

    describe(`Multiple decorators`, () => {
      it(`@IsOptional() with resolved type`, () => {
        class Dummy {
          @IsString()
          @IsOptional()
          val!: string;
        }
        factory.register([Dummy]);

        const dummy = factory.make(Dummy).one();
        expect(typeof dummy.val).toBe('string');
      });

      it(`@Minlength and @MaxLength with @IsString`, () => {
        class Dummy {
          @IsString()
          @MinLength(50)
          @MaxLength(50)
          val!: string;
        }
        factory.register([Dummy]);

        const dummy = factory.make(Dummy).one();
        expect(typeof dummy.val).toBe('string');
        expect(dummy.val.length).toBe(50);
      });
    });
  });
});
