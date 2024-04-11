# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.0.2](https://github.com/trial-trl/class-fixtures-factory/compare/v2.0.1...v2.0.2) (2024-04-11)

### [2.0.1](https://github.com/trial-trl/class-fixtures-factory/compare/v2.0.0...v2.0.1) (2024-04-11)

## [2.0.0](https://github.com/trial-trl/class-fixtures-factory/compare/v1.6.1...v2.0.0) (2024-04-11)


### ⚠ BREAKING CHANGES

* adapt plugin adapters to mixed metadata feature
* Extending class-fixtures-factory requires extending BaseMetadataAdapter instead of BaseMetadataStore

### Features

* **class-validator:** support more validators ([6977d6f](https://github.com/trial-trl/class-fixtures-factory/commit/6977d6f42591bb890ebd2a267a6b879083f0c349))
* **factory:** support property dependency ([4a94d51](https://github.com/trial-trl/class-fixtures-factory/commit/4a94d51c04036255283560d2d0b6ee8ddfe5cd78))
* add mikro-orm plugin ([dfa64b8](https://github.com/trial-trl/class-fixtures-factory/commit/dfa64b800efee34112ffdf8dc8e4be82b1d0182d))
* add TypeORM plugin ([3fe6999](https://github.com/trial-trl/class-fixtures-factory/commit/3fe6999d7ecc1df0a3bc4c82da61a7800e1de2d4))
* allow a context to be passed to metadata adapters ([d3d20f7](https://github.com/trial-trl/class-fixtures-factory/commit/d3d20f7c0b7a1faca04d1b43ee5e47d1dd745a48))
* **factory:** add better support for friendship relations ([144e9f5](https://github.com/trial-trl/class-fixtures-factory/commit/144e9f5491a190aea59268940baa36df5e614eaf))
* **factory:** add lazy option ([13e1ce1](https://github.com/trial-trl/class-fixtures-factory/commit/13e1ce1fb3fcaf5a6a4241f2cbf9f5563756b1d5))
* **factory:** add precision handling ([990c884](https://github.com/trial-trl/class-fixtures-factory/commit/990c884dd1533991952be93fd38a2a3b1b30296f))
* **factory:** add relationship parameters to Fixture decorator ([73b795c](https://github.com/trial-trl/class-fixtures-factory/commit/73b795c71252914520ee4860a1b56f650a6cb0d9))
* **factory:** add support for unique non-scalar values ([d7ea1fd](https://github.com/trial-trl/class-fixtures-factory/commit/d7ea1fd8a45e48bcd62aee011acd4fabab3610d4))
* **factory:** add support for unique values ([6fe6715](https://github.com/trial-trl/class-fixtures-factory/commit/6fe67159839ddee6038eefe57c8bbea70c6f5498))
* **factory:** add withStats method ([c784c20](https://github.com/trial-trl/class-fixtures-factory/commit/c784c20de5662bd9ed9eef2ef827fa7964ced555))
* add better support of circular relationships ([4e93ad5](https://github.com/trial-trl/class-fixtures-factory/commit/4e93ad5ed6286b238a164eac44ac966f0a9974f4))
* add type-graphql plugin ([1d8ce7a](https://github.com/trial-trl/class-fixtures-factory/commit/1d8ce7a7a85787f4a9cc6e19f17461d3baebe07d))
* improve .with and .ignore methods ([8fe75c6](https://github.com/trial-trl/class-fixtures-factory/commit/8fe75c6fc7d4cc471548eace3607738e9d97ab44))
* improve error handling ([98c6275](https://github.com/trial-trl/class-fixtures-factory/commit/98c6275aea94855a04cc052e10720efcfbc072e7))
* improve relationships handling ([1295fdb](https://github.com/trial-trl/class-fixtures-factory/commit/1295fdb3b44ac3cd14613d47aa88475abea881f8))
* simplify options and make them accessible to adapters ([34bbe1c](https://github.com/trial-trl/class-fixtures-factory/commit/34bbe1c15c11c3614313da947f57b7ab2c515e82))
* **logger:** add logs for circular references ([29fdc38](https://github.com/trial-trl/class-fixtures-factory/commit/29fdc38d103e3d7136563d35017f3bea41ca0434))
* **metadata:** allow metadata from plugins to stack ([5d9bf22](https://github.com/trial-trl/class-fixtures-factory/commit/5d9bf22ab85f81d7cf2891a0594f31eeb69443a6))


### Bug Fixes

* cast error type to any ([ac6de3d](https://github.com/trial-trl/class-fixtures-factory/commit/ac6de3db8c531c3e6036e9fee8c42793d969ea4e))
* fix typings after mikro-orm update ([46df078](https://github.com/trial-trl/class-fixtures-factory/commit/46df0786e3ca7f0fd66b5e188a7ff4d9b8bdff9c))
* migrate faker to @faker-js/faker ([5884502](https://github.com/trial-trl/class-fixtures-factory/commit/5884502b391dc990ec2cab5c8054c9ffacd06b40))
* update class-validator ([1f93d97](https://github.com/trial-trl/class-fixtures-factory/commit/1f93d9780fd7141db865514f82d3372d39686da3))
* **factory:** fix final result not being correctly capture inside stats ([ea6b265](https://github.com/trial-trl/class-fixtures-factory/commit/ea6b265cd5e9be6c9d4af9d48f33bb46be931a5b))
* **factory:** make pathReferences isolated from other paths ([69b5873](https://github.com/trial-trl/class-fixtures-factory/commit/69b587380426bcdb23b2030d460ba3e4a1532989))
* **metadata:** correct MetadataStore constructor ([0803c9b](https://github.com/trial-trl/class-fixtures-factory/commit/0803c9bcd0a6a68751da7823303fc3498badd989))
* **mikro-orm:** support embeddables, parse more types, fix generation ([f0f2dfe](https://github.com/trial-trl/class-fixtures-factory/commit/f0f2dfe270bd2ad0cbe81a0717f04f2a7d5c4983))
* correct metadata properties being incorrectly populated ([0e31538](https://github.com/trial-trl/class-fixtures-factory/commit/0e315384dc657708b0b019c45722891088cb876d))


* adapt plugin adapters to mixed metadata feature ([3e3914d](https://github.com/trial-trl/class-fixtures-factory/commit/3e3914d53e8fcb1ccb69d7829ffc59879b48dacb))
* add plugin system ([16ba224](https://github.com/trial-trl/class-fixtures-factory/commit/16ba22488b0658440a591547014324ad9163729d))

### [1.6.1](https://github.com/CyriacBr/class-fixtures-factory/compare/v1.6.0...v1.6.1) (2021-02-21)


### Bug Fixes

* correct fromDecorator flag ([0e7da1a](https://github.com/CyriacBr/class-fixtures-factory/commit/0e7da1ae631ba21c9e9d7b5f3e0f0c89947a6b5d))

## [1.6.0](https://github.com/CyriacBr/class-fixtures-factory/compare/v1.5.1...v1.6.0) (2021-02-21)


### Features

* **internal:** flag prop metadata when a decorator is used ([e825278](https://github.com/CyriacBr/class-fixtures-factory/commit/e825278e6a78c30ce3ba7070f74ef3f361758087))


### Bug Fixes

* improve error message when scalar can't be generated ([3d07618](https://github.com/CyriacBr/class-fixtures-factory/commit/3d0761815a9978c7926ddc5309c7eb63c2864254))
* mark prop metadata as scalar when user provides scalar type ([7eb1c83](https://github.com/CyriacBr/class-fixtures-factory/commit/7eb1c8359d42d01055a56e4b67b0ccf49e7c7c60))

### [1.5.1](https://github.com/CyriacBr/class-fixtures-factory/compare/v1.5.0...v1.5.1) (2021-01-11)


### Bug Fixes

* correct faker type inside @Fixture. Closes [#10](https://github.com/CyriacBr/class-fixtures-factory/issues/10) ([12f0911](https://github.com/CyriacBr/class-fixtures-factory/commit/12f0911e1d4709f88755551f405b304926e4b476))
* solve incompatibility between babel and tinspector. Closes [#12](https://github.com/CyriacBr/class-fixtures-factory/issues/12) ([bccb357](https://github.com/CyriacBr/class-fixtures-factory/commit/bccb357a96e14b142ce762cf9adfc160ad6640f6))
* using @Fixture takes precedence over class-validator ([f938f4b](https://github.com/CyriacBr/class-fixtures-factory/commit/f938f4bbb7002c2b14af0b0a7a85ba80aeedd307))

## [1.5.0](https://github.com/CyriacBr/class-fixtures-factory/compare/v1.4.2...v1.5.0) (2021-01-11)


### Features

* **class-validator-adapter:** support multiple decorators. Closes [#12](https://github.com/CyriacBr/class-fixtures-factory/issues/12) ([3ed9dea](https://github.com/CyriacBr/class-fixtures-factory/commit/3ed9dea733b86a45d515b201c1f0323273ffe430))

### [1.4.2](https://github.com/CyriacBr/class-fixtures-factory/compare/v1.4.1...v1.4.2) (2020-06-15)


### Bug Fixes

* remove unnecessary logging ([d9510df](https://github.com/CyriacBr/class-fixtures-factory/commit/d9510df3e7f044ec1e44e83a9727551987c13644))

### [1.4.1](https://github.com/CyriacBr/class-fixtures-factory/compare/v1.4.0...v1.4.1) (2020-05-30)

## [1.4.0](https://github.com/CyriacBr/class-fixtures-factory/compare/v1.3.0...v1.4.0) (2020-05-29)


### Features

* **class-validator:** support type validator decorators ([ca97eae](https://github.com/CyriacBr/class-fixtures-factory/commit/ca97eae1533dd64e36e6cb4db8fe7a73647dbf92))

## [1.3.0](https://github.com/CyriacBr/class-fixtures-factory/compare/v1.2.1...v1.3.0) (2020-03-23)


### Features

* **metadata:** supports class-validator decorators ([41ac81c](https://github.com/CyriacBr/class-fixtures-factory/commit/41ac81cf8cca472c6f506f89f83c6a67da6f68fb))

### [1.2.1](https://github.com/CyriacBr/class-fixtures-factory/compare/v1.2.0...v1.2.1) (2020-03-20)


### Bug Fixes

* **metadata:** can return partial results ([8a7c555](https://github.com/CyriacBr/class-fixtures-factory/commit/8a7c55504b323a7394b9ac721dcd3eee764487e7))

## [1.2.0](https://github.com/CyriacBr/class-fixtures-factory/compare/v1.1.0...v1.2.0) (2020-03-20)


### Features

* **factory:** added assigner ([3c9c3c1](https://github.com/CyriacBr/class-fixtures-factory/commit/3c9c3c1768b55a7f3bd8a674daab5d8fb04ecdbb))

## [1.1.0](https://github.com/CyriacBr/class-fixtures-factory/compare/v1.0.2...v1.1.0) (2020-03-19)


### Features

* **factory:** improved logger ([753c286](https://github.com/CyriacBr/class-fixtures-factory/commit/753c28650c3bc7bebd35b86a8c45a5b2925f5a8a))

### [1.0.2](https://github.com/CyriacBr/class-fixtures-factory/compare/v1.0.1...v1.0.2) (2020-03-19)


### Bug Fixes

* moved treeify to deps ([778f644](https://github.com/CyriacBr/class-fixtures-factory/commit/778f644c9eff642114fde2a329b880d27b18cfa0))

### [1.0.1](https://github.com/CyriacBr/class-fixtures-factory/compare/v1.0.0...v1.0.1) (2020-03-19)


### Bug Fixes

* **factory:** logger prints primitive arrays ([541b132](https://github.com/CyriacBr/class-fixtures-factory/commit/541b1329739c6253523a76ce3395d00ae4769748))

## 1.0.0 (2020-03-19)


### Features

* **factory:** added factory ([0bcde38](https://github.com/CyriacBr/class-fixtures-factory/commit/0bcde383ca75f22383283f8b326b34d00dfbf104))
* **factory:** added logger ([af8bb5f](https://github.com/CyriacBr/class-fixtures-factory/commit/af8bb5f983a31580f689d10987ef3e3524219ad1))
* **metadata:** added metadata store ([70c20f0](https://github.com/CyriacBr/class-fixtures-factory/commit/70c20f051505c34c495056185fa6026b1dd29ed3))
* **metadata:** added missing types extraction ([2a088ae](https://github.com/CyriacBr/class-fixtures-factory/commit/2a088aedb69a99d95486ee7cb6dcbe9ec56e87ec))


### Bug Fixes

* **metadata:** improved metadata extraction ([d1ca88e](https://github.com/CyriacBr/class-fixtures-factory/commit/d1ca88e70c4358735054a31b426f89cac9d9407d))
