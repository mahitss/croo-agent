
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Agent
 * 
 */
export type Agent = $Result.DefaultSelection<Prisma.$AgentPayload>
/**
 * Model AgentVersion
 * 
 */
export type AgentVersion = $Result.DefaultSelection<Prisma.$AgentVersionPayload>
/**
 * Model Capability
 * 
 */
export type Capability = $Result.DefaultSelection<Prisma.$CapabilityPayload>
/**
 * Model AgentCapability
 * 
 */
export type AgentCapability = $Result.DefaultSelection<Prisma.$AgentCapabilityPayload>
/**
 * Model PricingModel
 * 
 */
export type PricingModel = $Result.DefaultSelection<Prisma.$PricingModelPayload>
/**
 * Model Review
 * 
 */
export type Review = $Result.DefaultSelection<Prisma.$ReviewPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const VerificationStatus: {
  pending: 'pending',
  verified: 'verified',
  rejected: 'rejected'
};

export type VerificationStatus = (typeof VerificationStatus)[keyof typeof VerificationStatus]


export const PricingType: {
  per_request: 'per_request',
  subscription: 'subscription',
  enterprise: 'enterprise',
  free_tier: 'free_tier'
};

export type PricingType = (typeof PricingType)[keyof typeof PricingType]

}

export type VerificationStatus = $Enums.VerificationStatus

export const VerificationStatus: typeof $Enums.VerificationStatus

export type PricingType = $Enums.PricingType

export const PricingType: typeof $Enums.PricingType

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Agents
 * const agents = await prisma.agent.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Agents
   * const agents = await prisma.agent.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.agent`: Exposes CRUD operations for the **Agent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Agents
    * const agents = await prisma.agent.findMany()
    * ```
    */
  get agent(): Prisma.AgentDelegate<ExtArgs>;

  /**
   * `prisma.agentVersion`: Exposes CRUD operations for the **AgentVersion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AgentVersions
    * const agentVersions = await prisma.agentVersion.findMany()
    * ```
    */
  get agentVersion(): Prisma.AgentVersionDelegate<ExtArgs>;

  /**
   * `prisma.capability`: Exposes CRUD operations for the **Capability** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Capabilities
    * const capabilities = await prisma.capability.findMany()
    * ```
    */
  get capability(): Prisma.CapabilityDelegate<ExtArgs>;

  /**
   * `prisma.agentCapability`: Exposes CRUD operations for the **AgentCapability** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AgentCapabilities
    * const agentCapabilities = await prisma.agentCapability.findMany()
    * ```
    */
  get agentCapability(): Prisma.AgentCapabilityDelegate<ExtArgs>;

  /**
   * `prisma.pricingModel`: Exposes CRUD operations for the **PricingModel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PricingModels
    * const pricingModels = await prisma.pricingModel.findMany()
    * ```
    */
  get pricingModel(): Prisma.PricingModelDelegate<ExtArgs>;

  /**
   * `prisma.review`: Exposes CRUD operations for the **Review** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reviews
    * const reviews = await prisma.review.findMany()
    * ```
    */
  get review(): Prisma.ReviewDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Agent: 'Agent',
    AgentVersion: 'AgentVersion',
    Capability: 'Capability',
    AgentCapability: 'AgentCapability',
    PricingModel: 'PricingModel',
    Review: 'Review'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "agent" | "agentVersion" | "capability" | "agentCapability" | "pricingModel" | "review"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Agent: {
        payload: Prisma.$AgentPayload<ExtArgs>
        fields: Prisma.AgentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          findFirst: {
            args: Prisma.AgentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          findMany: {
            args: Prisma.AgentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>[]
          }
          create: {
            args: Prisma.AgentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          createMany: {
            args: Prisma.AgentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AgentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>[]
          }
          delete: {
            args: Prisma.AgentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          update: {
            args: Prisma.AgentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          deleteMany: {
            args: Prisma.AgentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AgentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          aggregate: {
            args: Prisma.AgentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgent>
          }
          groupBy: {
            args: Prisma.AgentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AgentCountArgs<ExtArgs>
            result: $Utils.Optional<AgentCountAggregateOutputType> | number
          }
        }
      }
      AgentVersion: {
        payload: Prisma.$AgentVersionPayload<ExtArgs>
        fields: Prisma.AgentVersionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgentVersionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentVersionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgentVersionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentVersionPayload>
          }
          findFirst: {
            args: Prisma.AgentVersionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentVersionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgentVersionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentVersionPayload>
          }
          findMany: {
            args: Prisma.AgentVersionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentVersionPayload>[]
          }
          create: {
            args: Prisma.AgentVersionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentVersionPayload>
          }
          createMany: {
            args: Prisma.AgentVersionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AgentVersionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentVersionPayload>[]
          }
          delete: {
            args: Prisma.AgentVersionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentVersionPayload>
          }
          update: {
            args: Prisma.AgentVersionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentVersionPayload>
          }
          deleteMany: {
            args: Prisma.AgentVersionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgentVersionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AgentVersionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentVersionPayload>
          }
          aggregate: {
            args: Prisma.AgentVersionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgentVersion>
          }
          groupBy: {
            args: Prisma.AgentVersionGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgentVersionGroupByOutputType>[]
          }
          count: {
            args: Prisma.AgentVersionCountArgs<ExtArgs>
            result: $Utils.Optional<AgentVersionCountAggregateOutputType> | number
          }
        }
      }
      Capability: {
        payload: Prisma.$CapabilityPayload<ExtArgs>
        fields: Prisma.CapabilityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CapabilityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CapabilityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CapabilityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CapabilityPayload>
          }
          findFirst: {
            args: Prisma.CapabilityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CapabilityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CapabilityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CapabilityPayload>
          }
          findMany: {
            args: Prisma.CapabilityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CapabilityPayload>[]
          }
          create: {
            args: Prisma.CapabilityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CapabilityPayload>
          }
          createMany: {
            args: Prisma.CapabilityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CapabilityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CapabilityPayload>[]
          }
          delete: {
            args: Prisma.CapabilityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CapabilityPayload>
          }
          update: {
            args: Prisma.CapabilityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CapabilityPayload>
          }
          deleteMany: {
            args: Prisma.CapabilityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CapabilityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CapabilityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CapabilityPayload>
          }
          aggregate: {
            args: Prisma.CapabilityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCapability>
          }
          groupBy: {
            args: Prisma.CapabilityGroupByArgs<ExtArgs>
            result: $Utils.Optional<CapabilityGroupByOutputType>[]
          }
          count: {
            args: Prisma.CapabilityCountArgs<ExtArgs>
            result: $Utils.Optional<CapabilityCountAggregateOutputType> | number
          }
        }
      }
      AgentCapability: {
        payload: Prisma.$AgentCapabilityPayload<ExtArgs>
        fields: Prisma.AgentCapabilityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgentCapabilityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentCapabilityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgentCapabilityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentCapabilityPayload>
          }
          findFirst: {
            args: Prisma.AgentCapabilityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentCapabilityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgentCapabilityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentCapabilityPayload>
          }
          findMany: {
            args: Prisma.AgentCapabilityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentCapabilityPayload>[]
          }
          create: {
            args: Prisma.AgentCapabilityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentCapabilityPayload>
          }
          createMany: {
            args: Prisma.AgentCapabilityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AgentCapabilityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentCapabilityPayload>[]
          }
          delete: {
            args: Prisma.AgentCapabilityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentCapabilityPayload>
          }
          update: {
            args: Prisma.AgentCapabilityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentCapabilityPayload>
          }
          deleteMany: {
            args: Prisma.AgentCapabilityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgentCapabilityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AgentCapabilityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentCapabilityPayload>
          }
          aggregate: {
            args: Prisma.AgentCapabilityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgentCapability>
          }
          groupBy: {
            args: Prisma.AgentCapabilityGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgentCapabilityGroupByOutputType>[]
          }
          count: {
            args: Prisma.AgentCapabilityCountArgs<ExtArgs>
            result: $Utils.Optional<AgentCapabilityCountAggregateOutputType> | number
          }
        }
      }
      PricingModel: {
        payload: Prisma.$PricingModelPayload<ExtArgs>
        fields: Prisma.PricingModelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PricingModelFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingModelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PricingModelFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingModelPayload>
          }
          findFirst: {
            args: Prisma.PricingModelFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingModelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PricingModelFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingModelPayload>
          }
          findMany: {
            args: Prisma.PricingModelFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingModelPayload>[]
          }
          create: {
            args: Prisma.PricingModelCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingModelPayload>
          }
          createMany: {
            args: Prisma.PricingModelCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PricingModelCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingModelPayload>[]
          }
          delete: {
            args: Prisma.PricingModelDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingModelPayload>
          }
          update: {
            args: Prisma.PricingModelUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingModelPayload>
          }
          deleteMany: {
            args: Prisma.PricingModelDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PricingModelUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PricingModelUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingModelPayload>
          }
          aggregate: {
            args: Prisma.PricingModelAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePricingModel>
          }
          groupBy: {
            args: Prisma.PricingModelGroupByArgs<ExtArgs>
            result: $Utils.Optional<PricingModelGroupByOutputType>[]
          }
          count: {
            args: Prisma.PricingModelCountArgs<ExtArgs>
            result: $Utils.Optional<PricingModelCountAggregateOutputType> | number
          }
        }
      }
      Review: {
        payload: Prisma.$ReviewPayload<ExtArgs>
        fields: Prisma.ReviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findFirst: {
            args: Prisma.ReviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findMany: {
            args: Prisma.ReviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          create: {
            args: Prisma.ReviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          createMany: {
            args: Prisma.ReviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReviewCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          delete: {
            args: Prisma.ReviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          update: {
            args: Prisma.ReviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          deleteMany: {
            args: Prisma.ReviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ReviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          aggregate: {
            args: Prisma.ReviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReview>
          }
          groupBy: {
            args: Prisma.ReviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReviewGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReviewCountArgs<ExtArgs>
            result: $Utils.Optional<ReviewCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AgentCountOutputType
   */

  export type AgentCountOutputType = {
    versions: number
    capabilities: number
    pricingModels: number
    reviews: number
  }

  export type AgentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    versions?: boolean | AgentCountOutputTypeCountVersionsArgs
    capabilities?: boolean | AgentCountOutputTypeCountCapabilitiesArgs
    pricingModels?: boolean | AgentCountOutputTypeCountPricingModelsArgs
    reviews?: boolean | AgentCountOutputTypeCountReviewsArgs
  }

  // Custom InputTypes
  /**
   * AgentCountOutputType without action
   */
  export type AgentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentCountOutputType
     */
    select?: AgentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AgentCountOutputType without action
   */
  export type AgentCountOutputTypeCountVersionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentVersionWhereInput
  }

  /**
   * AgentCountOutputType without action
   */
  export type AgentCountOutputTypeCountCapabilitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentCapabilityWhereInput
  }

  /**
   * AgentCountOutputType without action
   */
  export type AgentCountOutputTypeCountPricingModelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PricingModelWhereInput
  }

  /**
   * AgentCountOutputType without action
   */
  export type AgentCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }


  /**
   * Count Type CapabilityCountOutputType
   */

  export type CapabilityCountOutputType = {
    agents: number
  }

  export type CapabilityCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agents?: boolean | CapabilityCountOutputTypeCountAgentsArgs
  }

  // Custom InputTypes
  /**
   * CapabilityCountOutputType without action
   */
  export type CapabilityCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CapabilityCountOutputType
     */
    select?: CapabilityCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CapabilityCountOutputType without action
   */
  export type CapabilityCountOutputTypeCountAgentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentCapabilityWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Agent
   */

  export type AggregateAgent = {
    _count: AgentCountAggregateOutputType | null
    _avg: AgentAvgAggregateOutputType | null
    _sum: AgentSumAggregateOutputType | null
    _min: AgentMinAggregateOutputType | null
    _max: AgentMaxAggregateOutputType | null
  }

  export type AgentAvgAggregateOutputType = {
    averageRating: Decimal | null
    trustScore: Decimal | null
    capReputationScore: Decimal | null
    price: number | null
    latency: number | null
    accuracy: number | null
    verificationCount: number | null
    failureRate: number | null
  }

  export type AgentSumAggregateOutputType = {
    averageRating: Decimal | null
    trustScore: Decimal | null
    capReputationScore: Decimal | null
    price: number | null
    latency: number | null
    accuracy: number | null
    verificationCount: number | null
    failureRate: number | null
  }

  export type AgentMinAggregateOutputType = {
    id: string | null
    ownerId: string | null
    slug: string | null
    name: string | null
    description: string | null
    logoUrl: string | null
    verificationStatus: $Enums.VerificationStatus | null
    averageRating: Decimal | null
    trustScore: Decimal | null
    capDid: string | null
    capRegisteredAt: Date | null
    capReputationScore: Decimal | null
    capEndpoint: string | null
    capStoreId: string | null
    category: string | null
    price: number | null
    latency: number | null
    accuracy: number | null
    verificationCount: number | null
    failureRate: number | null
    status: string | null
    walletAddress: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type AgentMaxAggregateOutputType = {
    id: string | null
    ownerId: string | null
    slug: string | null
    name: string | null
    description: string | null
    logoUrl: string | null
    verificationStatus: $Enums.VerificationStatus | null
    averageRating: Decimal | null
    trustScore: Decimal | null
    capDid: string | null
    capRegisteredAt: Date | null
    capReputationScore: Decimal | null
    capEndpoint: string | null
    capStoreId: string | null
    category: string | null
    price: number | null
    latency: number | null
    accuracy: number | null
    verificationCount: number | null
    failureRate: number | null
    status: string | null
    walletAddress: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type AgentCountAggregateOutputType = {
    id: number
    ownerId: number
    slug: number
    name: number
    description: number
    logoUrl: number
    verificationStatus: number
    averageRating: number
    trustScore: number
    capDid: number
    capRegisteredAt: number
    capReputationScore: number
    capEndpoint: number
    capStoreId: number
    category: number
    skills: number
    tags: number
    price: number
    latency: number
    accuracy: number
    verificationCount: number
    failureRate: number
    status: number
    walletAddress: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type AgentAvgAggregateInputType = {
    averageRating?: true
    trustScore?: true
    capReputationScore?: true
    price?: true
    latency?: true
    accuracy?: true
    verificationCount?: true
    failureRate?: true
  }

  export type AgentSumAggregateInputType = {
    averageRating?: true
    trustScore?: true
    capReputationScore?: true
    price?: true
    latency?: true
    accuracy?: true
    verificationCount?: true
    failureRate?: true
  }

  export type AgentMinAggregateInputType = {
    id?: true
    ownerId?: true
    slug?: true
    name?: true
    description?: true
    logoUrl?: true
    verificationStatus?: true
    averageRating?: true
    trustScore?: true
    capDid?: true
    capRegisteredAt?: true
    capReputationScore?: true
    capEndpoint?: true
    capStoreId?: true
    category?: true
    price?: true
    latency?: true
    accuracy?: true
    verificationCount?: true
    failureRate?: true
    status?: true
    walletAddress?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type AgentMaxAggregateInputType = {
    id?: true
    ownerId?: true
    slug?: true
    name?: true
    description?: true
    logoUrl?: true
    verificationStatus?: true
    averageRating?: true
    trustScore?: true
    capDid?: true
    capRegisteredAt?: true
    capReputationScore?: true
    capEndpoint?: true
    capStoreId?: true
    category?: true
    price?: true
    latency?: true
    accuracy?: true
    verificationCount?: true
    failureRate?: true
    status?: true
    walletAddress?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type AgentCountAggregateInputType = {
    id?: true
    ownerId?: true
    slug?: true
    name?: true
    description?: true
    logoUrl?: true
    verificationStatus?: true
    averageRating?: true
    trustScore?: true
    capDid?: true
    capRegisteredAt?: true
    capReputationScore?: true
    capEndpoint?: true
    capStoreId?: true
    category?: true
    skills?: true
    tags?: true
    price?: true
    latency?: true
    accuracy?: true
    verificationCount?: true
    failureRate?: true
    status?: true
    walletAddress?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type AgentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Agent to aggregate.
     */
    where?: AgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Agents
    **/
    _count?: true | AgentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AgentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AgentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgentMaxAggregateInputType
  }

  export type GetAgentAggregateType<T extends AgentAggregateArgs> = {
        [P in keyof T & keyof AggregateAgent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgent[P]>
      : GetScalarType<T[P], AggregateAgent[P]>
  }




  export type AgentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentWhereInput
    orderBy?: AgentOrderByWithAggregationInput | AgentOrderByWithAggregationInput[]
    by: AgentScalarFieldEnum[] | AgentScalarFieldEnum
    having?: AgentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgentCountAggregateInputType | true
    _avg?: AgentAvgAggregateInputType
    _sum?: AgentSumAggregateInputType
    _min?: AgentMinAggregateInputType
    _max?: AgentMaxAggregateInputType
  }

  export type AgentGroupByOutputType = {
    id: string
    ownerId: string
    slug: string
    name: string
    description: string
    logoUrl: string | null
    verificationStatus: $Enums.VerificationStatus
    averageRating: Decimal
    trustScore: Decimal
    capDid: string | null
    capRegisteredAt: Date | null
    capReputationScore: Decimal | null
    capEndpoint: string | null
    capStoreId: string | null
    category: string
    skills: string[]
    tags: string[]
    price: number
    latency: number
    accuracy: number
    verificationCount: number
    failureRate: number
    status: string
    walletAddress: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: AgentCountAggregateOutputType | null
    _avg: AgentAvgAggregateOutputType | null
    _sum: AgentSumAggregateOutputType | null
    _min: AgentMinAggregateOutputType | null
    _max: AgentMaxAggregateOutputType | null
  }

  type GetAgentGroupByPayload<T extends AgentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgentGroupByOutputType[P]>
            : GetScalarType<T[P], AgentGroupByOutputType[P]>
        }
      >
    >


  export type AgentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerId?: boolean
    slug?: boolean
    name?: boolean
    description?: boolean
    logoUrl?: boolean
    verificationStatus?: boolean
    averageRating?: boolean
    trustScore?: boolean
    capDid?: boolean
    capRegisteredAt?: boolean
    capReputationScore?: boolean
    capEndpoint?: boolean
    capStoreId?: boolean
    category?: boolean
    skills?: boolean
    tags?: boolean
    price?: boolean
    latency?: boolean
    accuracy?: boolean
    verificationCount?: boolean
    failureRate?: boolean
    status?: boolean
    walletAddress?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    versions?: boolean | Agent$versionsArgs<ExtArgs>
    capabilities?: boolean | Agent$capabilitiesArgs<ExtArgs>
    pricingModels?: boolean | Agent$pricingModelsArgs<ExtArgs>
    reviews?: boolean | Agent$reviewsArgs<ExtArgs>
    _count?: boolean | AgentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agent"]>

  export type AgentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerId?: boolean
    slug?: boolean
    name?: boolean
    description?: boolean
    logoUrl?: boolean
    verificationStatus?: boolean
    averageRating?: boolean
    trustScore?: boolean
    capDid?: boolean
    capRegisteredAt?: boolean
    capReputationScore?: boolean
    capEndpoint?: boolean
    capStoreId?: boolean
    category?: boolean
    skills?: boolean
    tags?: boolean
    price?: boolean
    latency?: boolean
    accuracy?: boolean
    verificationCount?: boolean
    failureRate?: boolean
    status?: boolean
    walletAddress?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["agent"]>

  export type AgentSelectScalar = {
    id?: boolean
    ownerId?: boolean
    slug?: boolean
    name?: boolean
    description?: boolean
    logoUrl?: boolean
    verificationStatus?: boolean
    averageRating?: boolean
    trustScore?: boolean
    capDid?: boolean
    capRegisteredAt?: boolean
    capReputationScore?: boolean
    capEndpoint?: boolean
    capStoreId?: boolean
    category?: boolean
    skills?: boolean
    tags?: boolean
    price?: boolean
    latency?: boolean
    accuracy?: boolean
    verificationCount?: boolean
    failureRate?: boolean
    status?: boolean
    walletAddress?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type AgentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    versions?: boolean | Agent$versionsArgs<ExtArgs>
    capabilities?: boolean | Agent$capabilitiesArgs<ExtArgs>
    pricingModels?: boolean | Agent$pricingModelsArgs<ExtArgs>
    reviews?: boolean | Agent$reviewsArgs<ExtArgs>
    _count?: boolean | AgentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AgentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AgentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Agent"
    objects: {
      versions: Prisma.$AgentVersionPayload<ExtArgs>[]
      capabilities: Prisma.$AgentCapabilityPayload<ExtArgs>[]
      pricingModels: Prisma.$PricingModelPayload<ExtArgs>[]
      reviews: Prisma.$ReviewPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ownerId: string
      slug: string
      name: string
      description: string
      logoUrl: string | null
      verificationStatus: $Enums.VerificationStatus
      averageRating: Prisma.Decimal
      trustScore: Prisma.Decimal
      capDid: string | null
      capRegisteredAt: Date | null
      capReputationScore: Prisma.Decimal | null
      capEndpoint: string | null
      capStoreId: string | null
      category: string
      skills: string[]
      tags: string[]
      price: number
      latency: number
      accuracy: number
      verificationCount: number
      failureRate: number
      status: string
      walletAddress: string
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["agent"]>
    composites: {}
  }

  type AgentGetPayload<S extends boolean | null | undefined | AgentDefaultArgs> = $Result.GetResult<Prisma.$AgentPayload, S>

  type AgentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AgentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AgentCountAggregateInputType | true
    }

  export interface AgentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Agent'], meta: { name: 'Agent' } }
    /**
     * Find zero or one Agent that matches the filter.
     * @param {AgentFindUniqueArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgentFindUniqueArgs>(args: SelectSubset<T, AgentFindUniqueArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Agent that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AgentFindUniqueOrThrowArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgentFindUniqueOrThrowArgs>(args: SelectSubset<T, AgentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Agent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentFindFirstArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgentFindFirstArgs>(args?: SelectSubset<T, AgentFindFirstArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Agent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentFindFirstOrThrowArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgentFindFirstOrThrowArgs>(args?: SelectSubset<T, AgentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Agents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Agents
     * const agents = await prisma.agent.findMany()
     * 
     * // Get first 10 Agents
     * const agents = await prisma.agent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agentWithIdOnly = await prisma.agent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AgentFindManyArgs>(args?: SelectSubset<T, AgentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Agent.
     * @param {AgentCreateArgs} args - Arguments to create a Agent.
     * @example
     * // Create one Agent
     * const Agent = await prisma.agent.create({
     *   data: {
     *     // ... data to create a Agent
     *   }
     * })
     * 
     */
    create<T extends AgentCreateArgs>(args: SelectSubset<T, AgentCreateArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Agents.
     * @param {AgentCreateManyArgs} args - Arguments to create many Agents.
     * @example
     * // Create many Agents
     * const agent = await prisma.agent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgentCreateManyArgs>(args?: SelectSubset<T, AgentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Agents and returns the data saved in the database.
     * @param {AgentCreateManyAndReturnArgs} args - Arguments to create many Agents.
     * @example
     * // Create many Agents
     * const agent = await prisma.agent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Agents and only return the `id`
     * const agentWithIdOnly = await prisma.agent.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AgentCreateManyAndReturnArgs>(args?: SelectSubset<T, AgentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Agent.
     * @param {AgentDeleteArgs} args - Arguments to delete one Agent.
     * @example
     * // Delete one Agent
     * const Agent = await prisma.agent.delete({
     *   where: {
     *     // ... filter to delete one Agent
     *   }
     * })
     * 
     */
    delete<T extends AgentDeleteArgs>(args: SelectSubset<T, AgentDeleteArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Agent.
     * @param {AgentUpdateArgs} args - Arguments to update one Agent.
     * @example
     * // Update one Agent
     * const agent = await prisma.agent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgentUpdateArgs>(args: SelectSubset<T, AgentUpdateArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Agents.
     * @param {AgentDeleteManyArgs} args - Arguments to filter Agents to delete.
     * @example
     * // Delete a few Agents
     * const { count } = await prisma.agent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgentDeleteManyArgs>(args?: SelectSubset<T, AgentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Agents
     * const agent = await prisma.agent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgentUpdateManyArgs>(args: SelectSubset<T, AgentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Agent.
     * @param {AgentUpsertArgs} args - Arguments to update or create a Agent.
     * @example
     * // Update or create a Agent
     * const agent = await prisma.agent.upsert({
     *   create: {
     *     // ... data to create a Agent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Agent we want to update
     *   }
     * })
     */
    upsert<T extends AgentUpsertArgs>(args: SelectSubset<T, AgentUpsertArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Agents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentCountArgs} args - Arguments to filter Agents to count.
     * @example
     * // Count the number of Agents
     * const count = await prisma.agent.count({
     *   where: {
     *     // ... the filter for the Agents we want to count
     *   }
     * })
    **/
    count<T extends AgentCountArgs>(
      args?: Subset<T, AgentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Agent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AgentAggregateArgs>(args: Subset<T, AgentAggregateArgs>): Prisma.PrismaPromise<GetAgentAggregateType<T>>

    /**
     * Group by Agent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AgentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgentGroupByArgs['orderBy'] }
        : { orderBy?: AgentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AgentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Agent model
   */
  readonly fields: AgentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Agent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    versions<T extends Agent$versionsArgs<ExtArgs> = {}>(args?: Subset<T, Agent$versionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentVersionPayload<ExtArgs>, T, "findMany"> | Null>
    capabilities<T extends Agent$capabilitiesArgs<ExtArgs> = {}>(args?: Subset<T, Agent$capabilitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentCapabilityPayload<ExtArgs>, T, "findMany"> | Null>
    pricingModels<T extends Agent$pricingModelsArgs<ExtArgs> = {}>(args?: Subset<T, Agent$pricingModelsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PricingModelPayload<ExtArgs>, T, "findMany"> | Null>
    reviews<T extends Agent$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, Agent$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Agent model
   */ 
  interface AgentFieldRefs {
    readonly id: FieldRef<"Agent", 'String'>
    readonly ownerId: FieldRef<"Agent", 'String'>
    readonly slug: FieldRef<"Agent", 'String'>
    readonly name: FieldRef<"Agent", 'String'>
    readonly description: FieldRef<"Agent", 'String'>
    readonly logoUrl: FieldRef<"Agent", 'String'>
    readonly verificationStatus: FieldRef<"Agent", 'VerificationStatus'>
    readonly averageRating: FieldRef<"Agent", 'Decimal'>
    readonly trustScore: FieldRef<"Agent", 'Decimal'>
    readonly capDid: FieldRef<"Agent", 'String'>
    readonly capRegisteredAt: FieldRef<"Agent", 'DateTime'>
    readonly capReputationScore: FieldRef<"Agent", 'Decimal'>
    readonly capEndpoint: FieldRef<"Agent", 'String'>
    readonly capStoreId: FieldRef<"Agent", 'String'>
    readonly category: FieldRef<"Agent", 'String'>
    readonly skills: FieldRef<"Agent", 'String[]'>
    readonly tags: FieldRef<"Agent", 'String[]'>
    readonly price: FieldRef<"Agent", 'Float'>
    readonly latency: FieldRef<"Agent", 'Int'>
    readonly accuracy: FieldRef<"Agent", 'Float'>
    readonly verificationCount: FieldRef<"Agent", 'Int'>
    readonly failureRate: FieldRef<"Agent", 'Float'>
    readonly status: FieldRef<"Agent", 'String'>
    readonly walletAddress: FieldRef<"Agent", 'String'>
    readonly createdAt: FieldRef<"Agent", 'DateTime'>
    readonly updatedAt: FieldRef<"Agent", 'DateTime'>
    readonly deletedAt: FieldRef<"Agent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Agent findUnique
   */
  export type AgentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agent to fetch.
     */
    where: AgentWhereUniqueInput
  }

  /**
   * Agent findUniqueOrThrow
   */
  export type AgentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agent to fetch.
     */
    where: AgentWhereUniqueInput
  }

  /**
   * Agent findFirst
   */
  export type AgentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agent to fetch.
     */
    where?: AgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Agents.
     */
    cursor?: AgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Agents.
     */
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[]
  }

  /**
   * Agent findFirstOrThrow
   */
  export type AgentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agent to fetch.
     */
    where?: AgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Agents.
     */
    cursor?: AgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Agents.
     */
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[]
  }

  /**
   * Agent findMany
   */
  export type AgentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agents to fetch.
     */
    where?: AgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Agents.
     */
    cursor?: AgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agents.
     */
    skip?: number
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[]
  }

  /**
   * Agent create
   */
  export type AgentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * The data needed to create a Agent.
     */
    data: XOR<AgentCreateInput, AgentUncheckedCreateInput>
  }

  /**
   * Agent createMany
   */
  export type AgentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Agents.
     */
    data: AgentCreateManyInput | AgentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Agent createManyAndReturn
   */
  export type AgentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Agents.
     */
    data: AgentCreateManyInput | AgentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Agent update
   */
  export type AgentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * The data needed to update a Agent.
     */
    data: XOR<AgentUpdateInput, AgentUncheckedUpdateInput>
    /**
     * Choose, which Agent to update.
     */
    where: AgentWhereUniqueInput
  }

  /**
   * Agent updateMany
   */
  export type AgentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Agents.
     */
    data: XOR<AgentUpdateManyMutationInput, AgentUncheckedUpdateManyInput>
    /**
     * Filter which Agents to update
     */
    where?: AgentWhereInput
  }

  /**
   * Agent upsert
   */
  export type AgentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * The filter to search for the Agent to update in case it exists.
     */
    where: AgentWhereUniqueInput
    /**
     * In case the Agent found by the `where` argument doesn't exist, create a new Agent with this data.
     */
    create: XOR<AgentCreateInput, AgentUncheckedCreateInput>
    /**
     * In case the Agent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgentUpdateInput, AgentUncheckedUpdateInput>
  }

  /**
   * Agent delete
   */
  export type AgentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter which Agent to delete.
     */
    where: AgentWhereUniqueInput
  }

  /**
   * Agent deleteMany
   */
  export type AgentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Agents to delete
     */
    where?: AgentWhereInput
  }

  /**
   * Agent.versions
   */
  export type Agent$versionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentVersion
     */
    select?: AgentVersionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentVersionInclude<ExtArgs> | null
    where?: AgentVersionWhereInput
    orderBy?: AgentVersionOrderByWithRelationInput | AgentVersionOrderByWithRelationInput[]
    cursor?: AgentVersionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AgentVersionScalarFieldEnum | AgentVersionScalarFieldEnum[]
  }

  /**
   * Agent.capabilities
   */
  export type Agent$capabilitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentCapability
     */
    select?: AgentCapabilitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentCapabilityInclude<ExtArgs> | null
    where?: AgentCapabilityWhereInput
    orderBy?: AgentCapabilityOrderByWithRelationInput | AgentCapabilityOrderByWithRelationInput[]
    cursor?: AgentCapabilityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AgentCapabilityScalarFieldEnum | AgentCapabilityScalarFieldEnum[]
  }

  /**
   * Agent.pricingModels
   */
  export type Agent$pricingModelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingModel
     */
    select?: PricingModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingModelInclude<ExtArgs> | null
    where?: PricingModelWhereInput
    orderBy?: PricingModelOrderByWithRelationInput | PricingModelOrderByWithRelationInput[]
    cursor?: PricingModelWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PricingModelScalarFieldEnum | PricingModelScalarFieldEnum[]
  }

  /**
   * Agent.reviews
   */
  export type Agent$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Agent without action
   */
  export type AgentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
  }


  /**
   * Model AgentVersion
   */

  export type AggregateAgentVersion = {
    _count: AgentVersionCountAggregateOutputType | null
    _min: AgentVersionMinAggregateOutputType | null
    _max: AgentVersionMaxAggregateOutputType | null
  }

  export type AgentVersionMinAggregateOutputType = {
    id: string | null
    agentId: string | null
    version: string | null
    endpoint: string | null
    publishedAt: Date | null
  }

  export type AgentVersionMaxAggregateOutputType = {
    id: string | null
    agentId: string | null
    version: string | null
    endpoint: string | null
    publishedAt: Date | null
  }

  export type AgentVersionCountAggregateOutputType = {
    id: number
    agentId: number
    version: number
    endpoint: number
    inputSchema: number
    outputSchema: number
    publishedAt: number
    _all: number
  }


  export type AgentVersionMinAggregateInputType = {
    id?: true
    agentId?: true
    version?: true
    endpoint?: true
    publishedAt?: true
  }

  export type AgentVersionMaxAggregateInputType = {
    id?: true
    agentId?: true
    version?: true
    endpoint?: true
    publishedAt?: true
  }

  export type AgentVersionCountAggregateInputType = {
    id?: true
    agentId?: true
    version?: true
    endpoint?: true
    inputSchema?: true
    outputSchema?: true
    publishedAt?: true
    _all?: true
  }

  export type AgentVersionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentVersion to aggregate.
     */
    where?: AgentVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentVersions to fetch.
     */
    orderBy?: AgentVersionOrderByWithRelationInput | AgentVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgentVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AgentVersions
    **/
    _count?: true | AgentVersionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgentVersionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgentVersionMaxAggregateInputType
  }

  export type GetAgentVersionAggregateType<T extends AgentVersionAggregateArgs> = {
        [P in keyof T & keyof AggregateAgentVersion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgentVersion[P]>
      : GetScalarType<T[P], AggregateAgentVersion[P]>
  }




  export type AgentVersionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentVersionWhereInput
    orderBy?: AgentVersionOrderByWithAggregationInput | AgentVersionOrderByWithAggregationInput[]
    by: AgentVersionScalarFieldEnum[] | AgentVersionScalarFieldEnum
    having?: AgentVersionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgentVersionCountAggregateInputType | true
    _min?: AgentVersionMinAggregateInputType
    _max?: AgentVersionMaxAggregateInputType
  }

  export type AgentVersionGroupByOutputType = {
    id: string
    agentId: string
    version: string
    endpoint: string
    inputSchema: JsonValue
    outputSchema: JsonValue
    publishedAt: Date
    _count: AgentVersionCountAggregateOutputType | null
    _min: AgentVersionMinAggregateOutputType | null
    _max: AgentVersionMaxAggregateOutputType | null
  }

  type GetAgentVersionGroupByPayload<T extends AgentVersionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgentVersionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgentVersionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgentVersionGroupByOutputType[P]>
            : GetScalarType<T[P], AgentVersionGroupByOutputType[P]>
        }
      >
    >


  export type AgentVersionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    version?: boolean
    endpoint?: boolean
    inputSchema?: boolean
    outputSchema?: boolean
    publishedAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agentVersion"]>

  export type AgentVersionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    version?: boolean
    endpoint?: boolean
    inputSchema?: boolean
    outputSchema?: boolean
    publishedAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agentVersion"]>

  export type AgentVersionSelectScalar = {
    id?: boolean
    agentId?: boolean
    version?: boolean
    endpoint?: boolean
    inputSchema?: boolean
    outputSchema?: boolean
    publishedAt?: boolean
  }

  export type AgentVersionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }
  export type AgentVersionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }

  export type $AgentVersionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AgentVersion"
    objects: {
      agent: Prisma.$AgentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      agentId: string
      version: string
      endpoint: string
      inputSchema: Prisma.JsonValue
      outputSchema: Prisma.JsonValue
      publishedAt: Date
    }, ExtArgs["result"]["agentVersion"]>
    composites: {}
  }

  type AgentVersionGetPayload<S extends boolean | null | undefined | AgentVersionDefaultArgs> = $Result.GetResult<Prisma.$AgentVersionPayload, S>

  type AgentVersionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AgentVersionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AgentVersionCountAggregateInputType | true
    }

  export interface AgentVersionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AgentVersion'], meta: { name: 'AgentVersion' } }
    /**
     * Find zero or one AgentVersion that matches the filter.
     * @param {AgentVersionFindUniqueArgs} args - Arguments to find a AgentVersion
     * @example
     * // Get one AgentVersion
     * const agentVersion = await prisma.agentVersion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgentVersionFindUniqueArgs>(args: SelectSubset<T, AgentVersionFindUniqueArgs<ExtArgs>>): Prisma__AgentVersionClient<$Result.GetResult<Prisma.$AgentVersionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AgentVersion that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AgentVersionFindUniqueOrThrowArgs} args - Arguments to find a AgentVersion
     * @example
     * // Get one AgentVersion
     * const agentVersion = await prisma.agentVersion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgentVersionFindUniqueOrThrowArgs>(args: SelectSubset<T, AgentVersionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgentVersionClient<$Result.GetResult<Prisma.$AgentVersionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AgentVersion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentVersionFindFirstArgs} args - Arguments to find a AgentVersion
     * @example
     * // Get one AgentVersion
     * const agentVersion = await prisma.agentVersion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgentVersionFindFirstArgs>(args?: SelectSubset<T, AgentVersionFindFirstArgs<ExtArgs>>): Prisma__AgentVersionClient<$Result.GetResult<Prisma.$AgentVersionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AgentVersion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentVersionFindFirstOrThrowArgs} args - Arguments to find a AgentVersion
     * @example
     * // Get one AgentVersion
     * const agentVersion = await prisma.agentVersion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgentVersionFindFirstOrThrowArgs>(args?: SelectSubset<T, AgentVersionFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgentVersionClient<$Result.GetResult<Prisma.$AgentVersionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AgentVersions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentVersionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AgentVersions
     * const agentVersions = await prisma.agentVersion.findMany()
     * 
     * // Get first 10 AgentVersions
     * const agentVersions = await prisma.agentVersion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agentVersionWithIdOnly = await prisma.agentVersion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AgentVersionFindManyArgs>(args?: SelectSubset<T, AgentVersionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentVersionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AgentVersion.
     * @param {AgentVersionCreateArgs} args - Arguments to create a AgentVersion.
     * @example
     * // Create one AgentVersion
     * const AgentVersion = await prisma.agentVersion.create({
     *   data: {
     *     // ... data to create a AgentVersion
     *   }
     * })
     * 
     */
    create<T extends AgentVersionCreateArgs>(args: SelectSubset<T, AgentVersionCreateArgs<ExtArgs>>): Prisma__AgentVersionClient<$Result.GetResult<Prisma.$AgentVersionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AgentVersions.
     * @param {AgentVersionCreateManyArgs} args - Arguments to create many AgentVersions.
     * @example
     * // Create many AgentVersions
     * const agentVersion = await prisma.agentVersion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgentVersionCreateManyArgs>(args?: SelectSubset<T, AgentVersionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AgentVersions and returns the data saved in the database.
     * @param {AgentVersionCreateManyAndReturnArgs} args - Arguments to create many AgentVersions.
     * @example
     * // Create many AgentVersions
     * const agentVersion = await prisma.agentVersion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AgentVersions and only return the `id`
     * const agentVersionWithIdOnly = await prisma.agentVersion.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AgentVersionCreateManyAndReturnArgs>(args?: SelectSubset<T, AgentVersionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentVersionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AgentVersion.
     * @param {AgentVersionDeleteArgs} args - Arguments to delete one AgentVersion.
     * @example
     * // Delete one AgentVersion
     * const AgentVersion = await prisma.agentVersion.delete({
     *   where: {
     *     // ... filter to delete one AgentVersion
     *   }
     * })
     * 
     */
    delete<T extends AgentVersionDeleteArgs>(args: SelectSubset<T, AgentVersionDeleteArgs<ExtArgs>>): Prisma__AgentVersionClient<$Result.GetResult<Prisma.$AgentVersionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AgentVersion.
     * @param {AgentVersionUpdateArgs} args - Arguments to update one AgentVersion.
     * @example
     * // Update one AgentVersion
     * const agentVersion = await prisma.agentVersion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgentVersionUpdateArgs>(args: SelectSubset<T, AgentVersionUpdateArgs<ExtArgs>>): Prisma__AgentVersionClient<$Result.GetResult<Prisma.$AgentVersionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AgentVersions.
     * @param {AgentVersionDeleteManyArgs} args - Arguments to filter AgentVersions to delete.
     * @example
     * // Delete a few AgentVersions
     * const { count } = await prisma.agentVersion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgentVersionDeleteManyArgs>(args?: SelectSubset<T, AgentVersionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AgentVersions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentVersionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AgentVersions
     * const agentVersion = await prisma.agentVersion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgentVersionUpdateManyArgs>(args: SelectSubset<T, AgentVersionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AgentVersion.
     * @param {AgentVersionUpsertArgs} args - Arguments to update or create a AgentVersion.
     * @example
     * // Update or create a AgentVersion
     * const agentVersion = await prisma.agentVersion.upsert({
     *   create: {
     *     // ... data to create a AgentVersion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AgentVersion we want to update
     *   }
     * })
     */
    upsert<T extends AgentVersionUpsertArgs>(args: SelectSubset<T, AgentVersionUpsertArgs<ExtArgs>>): Prisma__AgentVersionClient<$Result.GetResult<Prisma.$AgentVersionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AgentVersions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentVersionCountArgs} args - Arguments to filter AgentVersions to count.
     * @example
     * // Count the number of AgentVersions
     * const count = await prisma.agentVersion.count({
     *   where: {
     *     // ... the filter for the AgentVersions we want to count
     *   }
     * })
    **/
    count<T extends AgentVersionCountArgs>(
      args?: Subset<T, AgentVersionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgentVersionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AgentVersion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentVersionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AgentVersionAggregateArgs>(args: Subset<T, AgentVersionAggregateArgs>): Prisma.PrismaPromise<GetAgentVersionAggregateType<T>>

    /**
     * Group by AgentVersion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentVersionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AgentVersionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgentVersionGroupByArgs['orderBy'] }
        : { orderBy?: AgentVersionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AgentVersionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgentVersionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AgentVersion model
   */
  readonly fields: AgentVersionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AgentVersion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgentVersionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agent<T extends AgentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AgentDefaultArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AgentVersion model
   */ 
  interface AgentVersionFieldRefs {
    readonly id: FieldRef<"AgentVersion", 'String'>
    readonly agentId: FieldRef<"AgentVersion", 'String'>
    readonly version: FieldRef<"AgentVersion", 'String'>
    readonly endpoint: FieldRef<"AgentVersion", 'String'>
    readonly inputSchema: FieldRef<"AgentVersion", 'Json'>
    readonly outputSchema: FieldRef<"AgentVersion", 'Json'>
    readonly publishedAt: FieldRef<"AgentVersion", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AgentVersion findUnique
   */
  export type AgentVersionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentVersion
     */
    select?: AgentVersionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentVersionInclude<ExtArgs> | null
    /**
     * Filter, which AgentVersion to fetch.
     */
    where: AgentVersionWhereUniqueInput
  }

  /**
   * AgentVersion findUniqueOrThrow
   */
  export type AgentVersionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentVersion
     */
    select?: AgentVersionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentVersionInclude<ExtArgs> | null
    /**
     * Filter, which AgentVersion to fetch.
     */
    where: AgentVersionWhereUniqueInput
  }

  /**
   * AgentVersion findFirst
   */
  export type AgentVersionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentVersion
     */
    select?: AgentVersionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentVersionInclude<ExtArgs> | null
    /**
     * Filter, which AgentVersion to fetch.
     */
    where?: AgentVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentVersions to fetch.
     */
    orderBy?: AgentVersionOrderByWithRelationInput | AgentVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentVersions.
     */
    cursor?: AgentVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentVersions.
     */
    distinct?: AgentVersionScalarFieldEnum | AgentVersionScalarFieldEnum[]
  }

  /**
   * AgentVersion findFirstOrThrow
   */
  export type AgentVersionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentVersion
     */
    select?: AgentVersionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentVersionInclude<ExtArgs> | null
    /**
     * Filter, which AgentVersion to fetch.
     */
    where?: AgentVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentVersions to fetch.
     */
    orderBy?: AgentVersionOrderByWithRelationInput | AgentVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentVersions.
     */
    cursor?: AgentVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentVersions.
     */
    distinct?: AgentVersionScalarFieldEnum | AgentVersionScalarFieldEnum[]
  }

  /**
   * AgentVersion findMany
   */
  export type AgentVersionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentVersion
     */
    select?: AgentVersionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentVersionInclude<ExtArgs> | null
    /**
     * Filter, which AgentVersions to fetch.
     */
    where?: AgentVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentVersions to fetch.
     */
    orderBy?: AgentVersionOrderByWithRelationInput | AgentVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AgentVersions.
     */
    cursor?: AgentVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentVersions.
     */
    skip?: number
    distinct?: AgentVersionScalarFieldEnum | AgentVersionScalarFieldEnum[]
  }

  /**
   * AgentVersion create
   */
  export type AgentVersionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentVersion
     */
    select?: AgentVersionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentVersionInclude<ExtArgs> | null
    /**
     * The data needed to create a AgentVersion.
     */
    data: XOR<AgentVersionCreateInput, AgentVersionUncheckedCreateInput>
  }

  /**
   * AgentVersion createMany
   */
  export type AgentVersionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AgentVersions.
     */
    data: AgentVersionCreateManyInput | AgentVersionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AgentVersion createManyAndReturn
   */
  export type AgentVersionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentVersion
     */
    select?: AgentVersionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AgentVersions.
     */
    data: AgentVersionCreateManyInput | AgentVersionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentVersionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AgentVersion update
   */
  export type AgentVersionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentVersion
     */
    select?: AgentVersionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentVersionInclude<ExtArgs> | null
    /**
     * The data needed to update a AgentVersion.
     */
    data: XOR<AgentVersionUpdateInput, AgentVersionUncheckedUpdateInput>
    /**
     * Choose, which AgentVersion to update.
     */
    where: AgentVersionWhereUniqueInput
  }

  /**
   * AgentVersion updateMany
   */
  export type AgentVersionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AgentVersions.
     */
    data: XOR<AgentVersionUpdateManyMutationInput, AgentVersionUncheckedUpdateManyInput>
    /**
     * Filter which AgentVersions to update
     */
    where?: AgentVersionWhereInput
  }

  /**
   * AgentVersion upsert
   */
  export type AgentVersionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentVersion
     */
    select?: AgentVersionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentVersionInclude<ExtArgs> | null
    /**
     * The filter to search for the AgentVersion to update in case it exists.
     */
    where: AgentVersionWhereUniqueInput
    /**
     * In case the AgentVersion found by the `where` argument doesn't exist, create a new AgentVersion with this data.
     */
    create: XOR<AgentVersionCreateInput, AgentVersionUncheckedCreateInput>
    /**
     * In case the AgentVersion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgentVersionUpdateInput, AgentVersionUncheckedUpdateInput>
  }

  /**
   * AgentVersion delete
   */
  export type AgentVersionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentVersion
     */
    select?: AgentVersionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentVersionInclude<ExtArgs> | null
    /**
     * Filter which AgentVersion to delete.
     */
    where: AgentVersionWhereUniqueInput
  }

  /**
   * AgentVersion deleteMany
   */
  export type AgentVersionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentVersions to delete
     */
    where?: AgentVersionWhereInput
  }

  /**
   * AgentVersion without action
   */
  export type AgentVersionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentVersion
     */
    select?: AgentVersionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentVersionInclude<ExtArgs> | null
  }


  /**
   * Model Capability
   */

  export type AggregateCapability = {
    _count: CapabilityCountAggregateOutputType | null
    _min: CapabilityMinAggregateOutputType | null
    _max: CapabilityMaxAggregateOutputType | null
  }

  export type CapabilityMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
  }

  export type CapabilityMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
  }

  export type CapabilityCountAggregateOutputType = {
    id: number
    name: number
    description: number
    _all: number
  }


  export type CapabilityMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
  }

  export type CapabilityMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
  }

  export type CapabilityCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    _all?: true
  }

  export type CapabilityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Capability to aggregate.
     */
    where?: CapabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Capabilities to fetch.
     */
    orderBy?: CapabilityOrderByWithRelationInput | CapabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CapabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Capabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Capabilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Capabilities
    **/
    _count?: true | CapabilityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CapabilityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CapabilityMaxAggregateInputType
  }

  export type GetCapabilityAggregateType<T extends CapabilityAggregateArgs> = {
        [P in keyof T & keyof AggregateCapability]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCapability[P]>
      : GetScalarType<T[P], AggregateCapability[P]>
  }




  export type CapabilityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CapabilityWhereInput
    orderBy?: CapabilityOrderByWithAggregationInput | CapabilityOrderByWithAggregationInput[]
    by: CapabilityScalarFieldEnum[] | CapabilityScalarFieldEnum
    having?: CapabilityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CapabilityCountAggregateInputType | true
    _min?: CapabilityMinAggregateInputType
    _max?: CapabilityMaxAggregateInputType
  }

  export type CapabilityGroupByOutputType = {
    id: string
    name: string
    description: string | null
    _count: CapabilityCountAggregateOutputType | null
    _min: CapabilityMinAggregateOutputType | null
    _max: CapabilityMaxAggregateOutputType | null
  }

  type GetCapabilityGroupByPayload<T extends CapabilityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CapabilityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CapabilityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CapabilityGroupByOutputType[P]>
            : GetScalarType<T[P], CapabilityGroupByOutputType[P]>
        }
      >
    >


  export type CapabilitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    agents?: boolean | Capability$agentsArgs<ExtArgs>
    _count?: boolean | CapabilityCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["capability"]>

  export type CapabilitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
  }, ExtArgs["result"]["capability"]>

  export type CapabilitySelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
  }

  export type CapabilityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agents?: boolean | Capability$agentsArgs<ExtArgs>
    _count?: boolean | CapabilityCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CapabilityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CapabilityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Capability"
    objects: {
      agents: Prisma.$AgentCapabilityPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
    }, ExtArgs["result"]["capability"]>
    composites: {}
  }

  type CapabilityGetPayload<S extends boolean | null | undefined | CapabilityDefaultArgs> = $Result.GetResult<Prisma.$CapabilityPayload, S>

  type CapabilityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CapabilityFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CapabilityCountAggregateInputType | true
    }

  export interface CapabilityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Capability'], meta: { name: 'Capability' } }
    /**
     * Find zero or one Capability that matches the filter.
     * @param {CapabilityFindUniqueArgs} args - Arguments to find a Capability
     * @example
     * // Get one Capability
     * const capability = await prisma.capability.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CapabilityFindUniqueArgs>(args: SelectSubset<T, CapabilityFindUniqueArgs<ExtArgs>>): Prisma__CapabilityClient<$Result.GetResult<Prisma.$CapabilityPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Capability that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CapabilityFindUniqueOrThrowArgs} args - Arguments to find a Capability
     * @example
     * // Get one Capability
     * const capability = await prisma.capability.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CapabilityFindUniqueOrThrowArgs>(args: SelectSubset<T, CapabilityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CapabilityClient<$Result.GetResult<Prisma.$CapabilityPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Capability that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CapabilityFindFirstArgs} args - Arguments to find a Capability
     * @example
     * // Get one Capability
     * const capability = await prisma.capability.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CapabilityFindFirstArgs>(args?: SelectSubset<T, CapabilityFindFirstArgs<ExtArgs>>): Prisma__CapabilityClient<$Result.GetResult<Prisma.$CapabilityPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Capability that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CapabilityFindFirstOrThrowArgs} args - Arguments to find a Capability
     * @example
     * // Get one Capability
     * const capability = await prisma.capability.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CapabilityFindFirstOrThrowArgs>(args?: SelectSubset<T, CapabilityFindFirstOrThrowArgs<ExtArgs>>): Prisma__CapabilityClient<$Result.GetResult<Prisma.$CapabilityPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Capabilities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CapabilityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Capabilities
     * const capabilities = await prisma.capability.findMany()
     * 
     * // Get first 10 Capabilities
     * const capabilities = await prisma.capability.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const capabilityWithIdOnly = await prisma.capability.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CapabilityFindManyArgs>(args?: SelectSubset<T, CapabilityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CapabilityPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Capability.
     * @param {CapabilityCreateArgs} args - Arguments to create a Capability.
     * @example
     * // Create one Capability
     * const Capability = await prisma.capability.create({
     *   data: {
     *     // ... data to create a Capability
     *   }
     * })
     * 
     */
    create<T extends CapabilityCreateArgs>(args: SelectSubset<T, CapabilityCreateArgs<ExtArgs>>): Prisma__CapabilityClient<$Result.GetResult<Prisma.$CapabilityPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Capabilities.
     * @param {CapabilityCreateManyArgs} args - Arguments to create many Capabilities.
     * @example
     * // Create many Capabilities
     * const capability = await prisma.capability.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CapabilityCreateManyArgs>(args?: SelectSubset<T, CapabilityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Capabilities and returns the data saved in the database.
     * @param {CapabilityCreateManyAndReturnArgs} args - Arguments to create many Capabilities.
     * @example
     * // Create many Capabilities
     * const capability = await prisma.capability.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Capabilities and only return the `id`
     * const capabilityWithIdOnly = await prisma.capability.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CapabilityCreateManyAndReturnArgs>(args?: SelectSubset<T, CapabilityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CapabilityPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Capability.
     * @param {CapabilityDeleteArgs} args - Arguments to delete one Capability.
     * @example
     * // Delete one Capability
     * const Capability = await prisma.capability.delete({
     *   where: {
     *     // ... filter to delete one Capability
     *   }
     * })
     * 
     */
    delete<T extends CapabilityDeleteArgs>(args: SelectSubset<T, CapabilityDeleteArgs<ExtArgs>>): Prisma__CapabilityClient<$Result.GetResult<Prisma.$CapabilityPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Capability.
     * @param {CapabilityUpdateArgs} args - Arguments to update one Capability.
     * @example
     * // Update one Capability
     * const capability = await prisma.capability.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CapabilityUpdateArgs>(args: SelectSubset<T, CapabilityUpdateArgs<ExtArgs>>): Prisma__CapabilityClient<$Result.GetResult<Prisma.$CapabilityPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Capabilities.
     * @param {CapabilityDeleteManyArgs} args - Arguments to filter Capabilities to delete.
     * @example
     * // Delete a few Capabilities
     * const { count } = await prisma.capability.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CapabilityDeleteManyArgs>(args?: SelectSubset<T, CapabilityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Capabilities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CapabilityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Capabilities
     * const capability = await prisma.capability.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CapabilityUpdateManyArgs>(args: SelectSubset<T, CapabilityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Capability.
     * @param {CapabilityUpsertArgs} args - Arguments to update or create a Capability.
     * @example
     * // Update or create a Capability
     * const capability = await prisma.capability.upsert({
     *   create: {
     *     // ... data to create a Capability
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Capability we want to update
     *   }
     * })
     */
    upsert<T extends CapabilityUpsertArgs>(args: SelectSubset<T, CapabilityUpsertArgs<ExtArgs>>): Prisma__CapabilityClient<$Result.GetResult<Prisma.$CapabilityPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Capabilities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CapabilityCountArgs} args - Arguments to filter Capabilities to count.
     * @example
     * // Count the number of Capabilities
     * const count = await prisma.capability.count({
     *   where: {
     *     // ... the filter for the Capabilities we want to count
     *   }
     * })
    **/
    count<T extends CapabilityCountArgs>(
      args?: Subset<T, CapabilityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CapabilityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Capability.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CapabilityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CapabilityAggregateArgs>(args: Subset<T, CapabilityAggregateArgs>): Prisma.PrismaPromise<GetCapabilityAggregateType<T>>

    /**
     * Group by Capability.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CapabilityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CapabilityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CapabilityGroupByArgs['orderBy'] }
        : { orderBy?: CapabilityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CapabilityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCapabilityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Capability model
   */
  readonly fields: CapabilityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Capability.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CapabilityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agents<T extends Capability$agentsArgs<ExtArgs> = {}>(args?: Subset<T, Capability$agentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentCapabilityPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Capability model
   */ 
  interface CapabilityFieldRefs {
    readonly id: FieldRef<"Capability", 'String'>
    readonly name: FieldRef<"Capability", 'String'>
    readonly description: FieldRef<"Capability", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Capability findUnique
   */
  export type CapabilityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Capability
     */
    select?: CapabilitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CapabilityInclude<ExtArgs> | null
    /**
     * Filter, which Capability to fetch.
     */
    where: CapabilityWhereUniqueInput
  }

  /**
   * Capability findUniqueOrThrow
   */
  export type CapabilityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Capability
     */
    select?: CapabilitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CapabilityInclude<ExtArgs> | null
    /**
     * Filter, which Capability to fetch.
     */
    where: CapabilityWhereUniqueInput
  }

  /**
   * Capability findFirst
   */
  export type CapabilityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Capability
     */
    select?: CapabilitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CapabilityInclude<ExtArgs> | null
    /**
     * Filter, which Capability to fetch.
     */
    where?: CapabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Capabilities to fetch.
     */
    orderBy?: CapabilityOrderByWithRelationInput | CapabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Capabilities.
     */
    cursor?: CapabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Capabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Capabilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Capabilities.
     */
    distinct?: CapabilityScalarFieldEnum | CapabilityScalarFieldEnum[]
  }

  /**
   * Capability findFirstOrThrow
   */
  export type CapabilityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Capability
     */
    select?: CapabilitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CapabilityInclude<ExtArgs> | null
    /**
     * Filter, which Capability to fetch.
     */
    where?: CapabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Capabilities to fetch.
     */
    orderBy?: CapabilityOrderByWithRelationInput | CapabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Capabilities.
     */
    cursor?: CapabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Capabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Capabilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Capabilities.
     */
    distinct?: CapabilityScalarFieldEnum | CapabilityScalarFieldEnum[]
  }

  /**
   * Capability findMany
   */
  export type CapabilityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Capability
     */
    select?: CapabilitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CapabilityInclude<ExtArgs> | null
    /**
     * Filter, which Capabilities to fetch.
     */
    where?: CapabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Capabilities to fetch.
     */
    orderBy?: CapabilityOrderByWithRelationInput | CapabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Capabilities.
     */
    cursor?: CapabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Capabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Capabilities.
     */
    skip?: number
    distinct?: CapabilityScalarFieldEnum | CapabilityScalarFieldEnum[]
  }

  /**
   * Capability create
   */
  export type CapabilityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Capability
     */
    select?: CapabilitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CapabilityInclude<ExtArgs> | null
    /**
     * The data needed to create a Capability.
     */
    data: XOR<CapabilityCreateInput, CapabilityUncheckedCreateInput>
  }

  /**
   * Capability createMany
   */
  export type CapabilityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Capabilities.
     */
    data: CapabilityCreateManyInput | CapabilityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Capability createManyAndReturn
   */
  export type CapabilityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Capability
     */
    select?: CapabilitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Capabilities.
     */
    data: CapabilityCreateManyInput | CapabilityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Capability update
   */
  export type CapabilityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Capability
     */
    select?: CapabilitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CapabilityInclude<ExtArgs> | null
    /**
     * The data needed to update a Capability.
     */
    data: XOR<CapabilityUpdateInput, CapabilityUncheckedUpdateInput>
    /**
     * Choose, which Capability to update.
     */
    where: CapabilityWhereUniqueInput
  }

  /**
   * Capability updateMany
   */
  export type CapabilityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Capabilities.
     */
    data: XOR<CapabilityUpdateManyMutationInput, CapabilityUncheckedUpdateManyInput>
    /**
     * Filter which Capabilities to update
     */
    where?: CapabilityWhereInput
  }

  /**
   * Capability upsert
   */
  export type CapabilityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Capability
     */
    select?: CapabilitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CapabilityInclude<ExtArgs> | null
    /**
     * The filter to search for the Capability to update in case it exists.
     */
    where: CapabilityWhereUniqueInput
    /**
     * In case the Capability found by the `where` argument doesn't exist, create a new Capability with this data.
     */
    create: XOR<CapabilityCreateInput, CapabilityUncheckedCreateInput>
    /**
     * In case the Capability was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CapabilityUpdateInput, CapabilityUncheckedUpdateInput>
  }

  /**
   * Capability delete
   */
  export type CapabilityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Capability
     */
    select?: CapabilitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CapabilityInclude<ExtArgs> | null
    /**
     * Filter which Capability to delete.
     */
    where: CapabilityWhereUniqueInput
  }

  /**
   * Capability deleteMany
   */
  export type CapabilityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Capabilities to delete
     */
    where?: CapabilityWhereInput
  }

  /**
   * Capability.agents
   */
  export type Capability$agentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentCapability
     */
    select?: AgentCapabilitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentCapabilityInclude<ExtArgs> | null
    where?: AgentCapabilityWhereInput
    orderBy?: AgentCapabilityOrderByWithRelationInput | AgentCapabilityOrderByWithRelationInput[]
    cursor?: AgentCapabilityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AgentCapabilityScalarFieldEnum | AgentCapabilityScalarFieldEnum[]
  }

  /**
   * Capability without action
   */
  export type CapabilityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Capability
     */
    select?: CapabilitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CapabilityInclude<ExtArgs> | null
  }


  /**
   * Model AgentCapability
   */

  export type AggregateAgentCapability = {
    _count: AgentCapabilityCountAggregateOutputType | null
    _min: AgentCapabilityMinAggregateOutputType | null
    _max: AgentCapabilityMaxAggregateOutputType | null
  }

  export type AgentCapabilityMinAggregateOutputType = {
    agentId: string | null
    capabilityId: string | null
  }

  export type AgentCapabilityMaxAggregateOutputType = {
    agentId: string | null
    capabilityId: string | null
  }

  export type AgentCapabilityCountAggregateOutputType = {
    agentId: number
    capabilityId: number
    _all: number
  }


  export type AgentCapabilityMinAggregateInputType = {
    agentId?: true
    capabilityId?: true
  }

  export type AgentCapabilityMaxAggregateInputType = {
    agentId?: true
    capabilityId?: true
  }

  export type AgentCapabilityCountAggregateInputType = {
    agentId?: true
    capabilityId?: true
    _all?: true
  }

  export type AgentCapabilityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentCapability to aggregate.
     */
    where?: AgentCapabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentCapabilities to fetch.
     */
    orderBy?: AgentCapabilityOrderByWithRelationInput | AgentCapabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgentCapabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentCapabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentCapabilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AgentCapabilities
    **/
    _count?: true | AgentCapabilityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgentCapabilityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgentCapabilityMaxAggregateInputType
  }

  export type GetAgentCapabilityAggregateType<T extends AgentCapabilityAggregateArgs> = {
        [P in keyof T & keyof AggregateAgentCapability]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgentCapability[P]>
      : GetScalarType<T[P], AggregateAgentCapability[P]>
  }




  export type AgentCapabilityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentCapabilityWhereInput
    orderBy?: AgentCapabilityOrderByWithAggregationInput | AgentCapabilityOrderByWithAggregationInput[]
    by: AgentCapabilityScalarFieldEnum[] | AgentCapabilityScalarFieldEnum
    having?: AgentCapabilityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgentCapabilityCountAggregateInputType | true
    _min?: AgentCapabilityMinAggregateInputType
    _max?: AgentCapabilityMaxAggregateInputType
  }

  export type AgentCapabilityGroupByOutputType = {
    agentId: string
    capabilityId: string
    _count: AgentCapabilityCountAggregateOutputType | null
    _min: AgentCapabilityMinAggregateOutputType | null
    _max: AgentCapabilityMaxAggregateOutputType | null
  }

  type GetAgentCapabilityGroupByPayload<T extends AgentCapabilityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgentCapabilityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgentCapabilityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgentCapabilityGroupByOutputType[P]>
            : GetScalarType<T[P], AgentCapabilityGroupByOutputType[P]>
        }
      >
    >


  export type AgentCapabilitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    agentId?: boolean
    capabilityId?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    capability?: boolean | CapabilityDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agentCapability"]>

  export type AgentCapabilitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    agentId?: boolean
    capabilityId?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    capability?: boolean | CapabilityDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agentCapability"]>

  export type AgentCapabilitySelectScalar = {
    agentId?: boolean
    capabilityId?: boolean
  }

  export type AgentCapabilityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    capability?: boolean | CapabilityDefaultArgs<ExtArgs>
  }
  export type AgentCapabilityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    capability?: boolean | CapabilityDefaultArgs<ExtArgs>
  }

  export type $AgentCapabilityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AgentCapability"
    objects: {
      agent: Prisma.$AgentPayload<ExtArgs>
      capability: Prisma.$CapabilityPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      agentId: string
      capabilityId: string
    }, ExtArgs["result"]["agentCapability"]>
    composites: {}
  }

  type AgentCapabilityGetPayload<S extends boolean | null | undefined | AgentCapabilityDefaultArgs> = $Result.GetResult<Prisma.$AgentCapabilityPayload, S>

  type AgentCapabilityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AgentCapabilityFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AgentCapabilityCountAggregateInputType | true
    }

  export interface AgentCapabilityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AgentCapability'], meta: { name: 'AgentCapability' } }
    /**
     * Find zero or one AgentCapability that matches the filter.
     * @param {AgentCapabilityFindUniqueArgs} args - Arguments to find a AgentCapability
     * @example
     * // Get one AgentCapability
     * const agentCapability = await prisma.agentCapability.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgentCapabilityFindUniqueArgs>(args: SelectSubset<T, AgentCapabilityFindUniqueArgs<ExtArgs>>): Prisma__AgentCapabilityClient<$Result.GetResult<Prisma.$AgentCapabilityPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AgentCapability that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AgentCapabilityFindUniqueOrThrowArgs} args - Arguments to find a AgentCapability
     * @example
     * // Get one AgentCapability
     * const agentCapability = await prisma.agentCapability.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgentCapabilityFindUniqueOrThrowArgs>(args: SelectSubset<T, AgentCapabilityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgentCapabilityClient<$Result.GetResult<Prisma.$AgentCapabilityPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AgentCapability that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentCapabilityFindFirstArgs} args - Arguments to find a AgentCapability
     * @example
     * // Get one AgentCapability
     * const agentCapability = await prisma.agentCapability.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgentCapabilityFindFirstArgs>(args?: SelectSubset<T, AgentCapabilityFindFirstArgs<ExtArgs>>): Prisma__AgentCapabilityClient<$Result.GetResult<Prisma.$AgentCapabilityPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AgentCapability that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentCapabilityFindFirstOrThrowArgs} args - Arguments to find a AgentCapability
     * @example
     * // Get one AgentCapability
     * const agentCapability = await prisma.agentCapability.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgentCapabilityFindFirstOrThrowArgs>(args?: SelectSubset<T, AgentCapabilityFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgentCapabilityClient<$Result.GetResult<Prisma.$AgentCapabilityPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AgentCapabilities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentCapabilityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AgentCapabilities
     * const agentCapabilities = await prisma.agentCapability.findMany()
     * 
     * // Get first 10 AgentCapabilities
     * const agentCapabilities = await prisma.agentCapability.findMany({ take: 10 })
     * 
     * // Only select the `agentId`
     * const agentCapabilityWithAgentIdOnly = await prisma.agentCapability.findMany({ select: { agentId: true } })
     * 
     */
    findMany<T extends AgentCapabilityFindManyArgs>(args?: SelectSubset<T, AgentCapabilityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentCapabilityPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AgentCapability.
     * @param {AgentCapabilityCreateArgs} args - Arguments to create a AgentCapability.
     * @example
     * // Create one AgentCapability
     * const AgentCapability = await prisma.agentCapability.create({
     *   data: {
     *     // ... data to create a AgentCapability
     *   }
     * })
     * 
     */
    create<T extends AgentCapabilityCreateArgs>(args: SelectSubset<T, AgentCapabilityCreateArgs<ExtArgs>>): Prisma__AgentCapabilityClient<$Result.GetResult<Prisma.$AgentCapabilityPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AgentCapabilities.
     * @param {AgentCapabilityCreateManyArgs} args - Arguments to create many AgentCapabilities.
     * @example
     * // Create many AgentCapabilities
     * const agentCapability = await prisma.agentCapability.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgentCapabilityCreateManyArgs>(args?: SelectSubset<T, AgentCapabilityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AgentCapabilities and returns the data saved in the database.
     * @param {AgentCapabilityCreateManyAndReturnArgs} args - Arguments to create many AgentCapabilities.
     * @example
     * // Create many AgentCapabilities
     * const agentCapability = await prisma.agentCapability.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AgentCapabilities and only return the `agentId`
     * const agentCapabilityWithAgentIdOnly = await prisma.agentCapability.createManyAndReturn({ 
     *   select: { agentId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AgentCapabilityCreateManyAndReturnArgs>(args?: SelectSubset<T, AgentCapabilityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentCapabilityPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AgentCapability.
     * @param {AgentCapabilityDeleteArgs} args - Arguments to delete one AgentCapability.
     * @example
     * // Delete one AgentCapability
     * const AgentCapability = await prisma.agentCapability.delete({
     *   where: {
     *     // ... filter to delete one AgentCapability
     *   }
     * })
     * 
     */
    delete<T extends AgentCapabilityDeleteArgs>(args: SelectSubset<T, AgentCapabilityDeleteArgs<ExtArgs>>): Prisma__AgentCapabilityClient<$Result.GetResult<Prisma.$AgentCapabilityPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AgentCapability.
     * @param {AgentCapabilityUpdateArgs} args - Arguments to update one AgentCapability.
     * @example
     * // Update one AgentCapability
     * const agentCapability = await prisma.agentCapability.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgentCapabilityUpdateArgs>(args: SelectSubset<T, AgentCapabilityUpdateArgs<ExtArgs>>): Prisma__AgentCapabilityClient<$Result.GetResult<Prisma.$AgentCapabilityPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AgentCapabilities.
     * @param {AgentCapabilityDeleteManyArgs} args - Arguments to filter AgentCapabilities to delete.
     * @example
     * // Delete a few AgentCapabilities
     * const { count } = await prisma.agentCapability.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgentCapabilityDeleteManyArgs>(args?: SelectSubset<T, AgentCapabilityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AgentCapabilities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentCapabilityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AgentCapabilities
     * const agentCapability = await prisma.agentCapability.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgentCapabilityUpdateManyArgs>(args: SelectSubset<T, AgentCapabilityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AgentCapability.
     * @param {AgentCapabilityUpsertArgs} args - Arguments to update or create a AgentCapability.
     * @example
     * // Update or create a AgentCapability
     * const agentCapability = await prisma.agentCapability.upsert({
     *   create: {
     *     // ... data to create a AgentCapability
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AgentCapability we want to update
     *   }
     * })
     */
    upsert<T extends AgentCapabilityUpsertArgs>(args: SelectSubset<T, AgentCapabilityUpsertArgs<ExtArgs>>): Prisma__AgentCapabilityClient<$Result.GetResult<Prisma.$AgentCapabilityPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AgentCapabilities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentCapabilityCountArgs} args - Arguments to filter AgentCapabilities to count.
     * @example
     * // Count the number of AgentCapabilities
     * const count = await prisma.agentCapability.count({
     *   where: {
     *     // ... the filter for the AgentCapabilities we want to count
     *   }
     * })
    **/
    count<T extends AgentCapabilityCountArgs>(
      args?: Subset<T, AgentCapabilityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgentCapabilityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AgentCapability.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentCapabilityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AgentCapabilityAggregateArgs>(args: Subset<T, AgentCapabilityAggregateArgs>): Prisma.PrismaPromise<GetAgentCapabilityAggregateType<T>>

    /**
     * Group by AgentCapability.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentCapabilityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AgentCapabilityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgentCapabilityGroupByArgs['orderBy'] }
        : { orderBy?: AgentCapabilityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AgentCapabilityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgentCapabilityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AgentCapability model
   */
  readonly fields: AgentCapabilityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AgentCapability.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgentCapabilityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agent<T extends AgentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AgentDefaultArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    capability<T extends CapabilityDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CapabilityDefaultArgs<ExtArgs>>): Prisma__CapabilityClient<$Result.GetResult<Prisma.$CapabilityPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AgentCapability model
   */ 
  interface AgentCapabilityFieldRefs {
    readonly agentId: FieldRef<"AgentCapability", 'String'>
    readonly capabilityId: FieldRef<"AgentCapability", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AgentCapability findUnique
   */
  export type AgentCapabilityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentCapability
     */
    select?: AgentCapabilitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentCapabilityInclude<ExtArgs> | null
    /**
     * Filter, which AgentCapability to fetch.
     */
    where: AgentCapabilityWhereUniqueInput
  }

  /**
   * AgentCapability findUniqueOrThrow
   */
  export type AgentCapabilityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentCapability
     */
    select?: AgentCapabilitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentCapabilityInclude<ExtArgs> | null
    /**
     * Filter, which AgentCapability to fetch.
     */
    where: AgentCapabilityWhereUniqueInput
  }

  /**
   * AgentCapability findFirst
   */
  export type AgentCapabilityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentCapability
     */
    select?: AgentCapabilitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentCapabilityInclude<ExtArgs> | null
    /**
     * Filter, which AgentCapability to fetch.
     */
    where?: AgentCapabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentCapabilities to fetch.
     */
    orderBy?: AgentCapabilityOrderByWithRelationInput | AgentCapabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentCapabilities.
     */
    cursor?: AgentCapabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentCapabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentCapabilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentCapabilities.
     */
    distinct?: AgentCapabilityScalarFieldEnum | AgentCapabilityScalarFieldEnum[]
  }

  /**
   * AgentCapability findFirstOrThrow
   */
  export type AgentCapabilityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentCapability
     */
    select?: AgentCapabilitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentCapabilityInclude<ExtArgs> | null
    /**
     * Filter, which AgentCapability to fetch.
     */
    where?: AgentCapabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentCapabilities to fetch.
     */
    orderBy?: AgentCapabilityOrderByWithRelationInput | AgentCapabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentCapabilities.
     */
    cursor?: AgentCapabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentCapabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentCapabilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentCapabilities.
     */
    distinct?: AgentCapabilityScalarFieldEnum | AgentCapabilityScalarFieldEnum[]
  }

  /**
   * AgentCapability findMany
   */
  export type AgentCapabilityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentCapability
     */
    select?: AgentCapabilitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentCapabilityInclude<ExtArgs> | null
    /**
     * Filter, which AgentCapabilities to fetch.
     */
    where?: AgentCapabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentCapabilities to fetch.
     */
    orderBy?: AgentCapabilityOrderByWithRelationInput | AgentCapabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AgentCapabilities.
     */
    cursor?: AgentCapabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentCapabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentCapabilities.
     */
    skip?: number
    distinct?: AgentCapabilityScalarFieldEnum | AgentCapabilityScalarFieldEnum[]
  }

  /**
   * AgentCapability create
   */
  export type AgentCapabilityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentCapability
     */
    select?: AgentCapabilitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentCapabilityInclude<ExtArgs> | null
    /**
     * The data needed to create a AgentCapability.
     */
    data: XOR<AgentCapabilityCreateInput, AgentCapabilityUncheckedCreateInput>
  }

  /**
   * AgentCapability createMany
   */
  export type AgentCapabilityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AgentCapabilities.
     */
    data: AgentCapabilityCreateManyInput | AgentCapabilityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AgentCapability createManyAndReturn
   */
  export type AgentCapabilityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentCapability
     */
    select?: AgentCapabilitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AgentCapabilities.
     */
    data: AgentCapabilityCreateManyInput | AgentCapabilityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentCapabilityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AgentCapability update
   */
  export type AgentCapabilityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentCapability
     */
    select?: AgentCapabilitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentCapabilityInclude<ExtArgs> | null
    /**
     * The data needed to update a AgentCapability.
     */
    data: XOR<AgentCapabilityUpdateInput, AgentCapabilityUncheckedUpdateInput>
    /**
     * Choose, which AgentCapability to update.
     */
    where: AgentCapabilityWhereUniqueInput
  }

  /**
   * AgentCapability updateMany
   */
  export type AgentCapabilityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AgentCapabilities.
     */
    data: XOR<AgentCapabilityUpdateManyMutationInput, AgentCapabilityUncheckedUpdateManyInput>
    /**
     * Filter which AgentCapabilities to update
     */
    where?: AgentCapabilityWhereInput
  }

  /**
   * AgentCapability upsert
   */
  export type AgentCapabilityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentCapability
     */
    select?: AgentCapabilitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentCapabilityInclude<ExtArgs> | null
    /**
     * The filter to search for the AgentCapability to update in case it exists.
     */
    where: AgentCapabilityWhereUniqueInput
    /**
     * In case the AgentCapability found by the `where` argument doesn't exist, create a new AgentCapability with this data.
     */
    create: XOR<AgentCapabilityCreateInput, AgentCapabilityUncheckedCreateInput>
    /**
     * In case the AgentCapability was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgentCapabilityUpdateInput, AgentCapabilityUncheckedUpdateInput>
  }

  /**
   * AgentCapability delete
   */
  export type AgentCapabilityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentCapability
     */
    select?: AgentCapabilitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentCapabilityInclude<ExtArgs> | null
    /**
     * Filter which AgentCapability to delete.
     */
    where: AgentCapabilityWhereUniqueInput
  }

  /**
   * AgentCapability deleteMany
   */
  export type AgentCapabilityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentCapabilities to delete
     */
    where?: AgentCapabilityWhereInput
  }

  /**
   * AgentCapability without action
   */
  export type AgentCapabilityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentCapability
     */
    select?: AgentCapabilitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentCapabilityInclude<ExtArgs> | null
  }


  /**
   * Model PricingModel
   */

  export type AggregatePricingModel = {
    _count: PricingModelCountAggregateOutputType | null
    _avg: PricingModelAvgAggregateOutputType | null
    _sum: PricingModelSumAggregateOutputType | null
    _min: PricingModelMinAggregateOutputType | null
    _max: PricingModelMaxAggregateOutputType | null
  }

  export type PricingModelAvgAggregateOutputType = {
    price: Decimal | null
  }

  export type PricingModelSumAggregateOutputType = {
    price: Decimal | null
  }

  export type PricingModelMinAggregateOutputType = {
    id: string | null
    agentId: string | null
    pricingType: $Enums.PricingType | null
    price: Decimal | null
    currency: string | null
    billingUnit: string | null
    updatedAt: Date | null
  }

  export type PricingModelMaxAggregateOutputType = {
    id: string | null
    agentId: string | null
    pricingType: $Enums.PricingType | null
    price: Decimal | null
    currency: string | null
    billingUnit: string | null
    updatedAt: Date | null
  }

  export type PricingModelCountAggregateOutputType = {
    id: number
    agentId: number
    pricingType: number
    price: number
    currency: number
    billingUnit: number
    updatedAt: number
    _all: number
  }


  export type PricingModelAvgAggregateInputType = {
    price?: true
  }

  export type PricingModelSumAggregateInputType = {
    price?: true
  }

  export type PricingModelMinAggregateInputType = {
    id?: true
    agentId?: true
    pricingType?: true
    price?: true
    currency?: true
    billingUnit?: true
    updatedAt?: true
  }

  export type PricingModelMaxAggregateInputType = {
    id?: true
    agentId?: true
    pricingType?: true
    price?: true
    currency?: true
    billingUnit?: true
    updatedAt?: true
  }

  export type PricingModelCountAggregateInputType = {
    id?: true
    agentId?: true
    pricingType?: true
    price?: true
    currency?: true
    billingUnit?: true
    updatedAt?: true
    _all?: true
  }

  export type PricingModelAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PricingModel to aggregate.
     */
    where?: PricingModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PricingModels to fetch.
     */
    orderBy?: PricingModelOrderByWithRelationInput | PricingModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PricingModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PricingModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PricingModels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PricingModels
    **/
    _count?: true | PricingModelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PricingModelAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PricingModelSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PricingModelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PricingModelMaxAggregateInputType
  }

  export type GetPricingModelAggregateType<T extends PricingModelAggregateArgs> = {
        [P in keyof T & keyof AggregatePricingModel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePricingModel[P]>
      : GetScalarType<T[P], AggregatePricingModel[P]>
  }




  export type PricingModelGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PricingModelWhereInput
    orderBy?: PricingModelOrderByWithAggregationInput | PricingModelOrderByWithAggregationInput[]
    by: PricingModelScalarFieldEnum[] | PricingModelScalarFieldEnum
    having?: PricingModelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PricingModelCountAggregateInputType | true
    _avg?: PricingModelAvgAggregateInputType
    _sum?: PricingModelSumAggregateInputType
    _min?: PricingModelMinAggregateInputType
    _max?: PricingModelMaxAggregateInputType
  }

  export type PricingModelGroupByOutputType = {
    id: string
    agentId: string
    pricingType: $Enums.PricingType
    price: Decimal
    currency: string
    billingUnit: string
    updatedAt: Date
    _count: PricingModelCountAggregateOutputType | null
    _avg: PricingModelAvgAggregateOutputType | null
    _sum: PricingModelSumAggregateOutputType | null
    _min: PricingModelMinAggregateOutputType | null
    _max: PricingModelMaxAggregateOutputType | null
  }

  type GetPricingModelGroupByPayload<T extends PricingModelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PricingModelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PricingModelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PricingModelGroupByOutputType[P]>
            : GetScalarType<T[P], PricingModelGroupByOutputType[P]>
        }
      >
    >


  export type PricingModelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    pricingType?: boolean
    price?: boolean
    currency?: boolean
    billingUnit?: boolean
    updatedAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pricingModel"]>

  export type PricingModelSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    pricingType?: boolean
    price?: boolean
    currency?: boolean
    billingUnit?: boolean
    updatedAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pricingModel"]>

  export type PricingModelSelectScalar = {
    id?: boolean
    agentId?: boolean
    pricingType?: boolean
    price?: boolean
    currency?: boolean
    billingUnit?: boolean
    updatedAt?: boolean
  }

  export type PricingModelInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }
  export type PricingModelIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }

  export type $PricingModelPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PricingModel"
    objects: {
      agent: Prisma.$AgentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      agentId: string
      pricingType: $Enums.PricingType
      price: Prisma.Decimal
      currency: string
      billingUnit: string
      updatedAt: Date
    }, ExtArgs["result"]["pricingModel"]>
    composites: {}
  }

  type PricingModelGetPayload<S extends boolean | null | undefined | PricingModelDefaultArgs> = $Result.GetResult<Prisma.$PricingModelPayload, S>

  type PricingModelCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PricingModelFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PricingModelCountAggregateInputType | true
    }

  export interface PricingModelDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PricingModel'], meta: { name: 'PricingModel' } }
    /**
     * Find zero or one PricingModel that matches the filter.
     * @param {PricingModelFindUniqueArgs} args - Arguments to find a PricingModel
     * @example
     * // Get one PricingModel
     * const pricingModel = await prisma.pricingModel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PricingModelFindUniqueArgs>(args: SelectSubset<T, PricingModelFindUniqueArgs<ExtArgs>>): Prisma__PricingModelClient<$Result.GetResult<Prisma.$PricingModelPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PricingModel that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PricingModelFindUniqueOrThrowArgs} args - Arguments to find a PricingModel
     * @example
     * // Get one PricingModel
     * const pricingModel = await prisma.pricingModel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PricingModelFindUniqueOrThrowArgs>(args: SelectSubset<T, PricingModelFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PricingModelClient<$Result.GetResult<Prisma.$PricingModelPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PricingModel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingModelFindFirstArgs} args - Arguments to find a PricingModel
     * @example
     * // Get one PricingModel
     * const pricingModel = await prisma.pricingModel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PricingModelFindFirstArgs>(args?: SelectSubset<T, PricingModelFindFirstArgs<ExtArgs>>): Prisma__PricingModelClient<$Result.GetResult<Prisma.$PricingModelPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PricingModel that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingModelFindFirstOrThrowArgs} args - Arguments to find a PricingModel
     * @example
     * // Get one PricingModel
     * const pricingModel = await prisma.pricingModel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PricingModelFindFirstOrThrowArgs>(args?: SelectSubset<T, PricingModelFindFirstOrThrowArgs<ExtArgs>>): Prisma__PricingModelClient<$Result.GetResult<Prisma.$PricingModelPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PricingModels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingModelFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PricingModels
     * const pricingModels = await prisma.pricingModel.findMany()
     * 
     * // Get first 10 PricingModels
     * const pricingModels = await prisma.pricingModel.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pricingModelWithIdOnly = await prisma.pricingModel.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PricingModelFindManyArgs>(args?: SelectSubset<T, PricingModelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PricingModelPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PricingModel.
     * @param {PricingModelCreateArgs} args - Arguments to create a PricingModel.
     * @example
     * // Create one PricingModel
     * const PricingModel = await prisma.pricingModel.create({
     *   data: {
     *     // ... data to create a PricingModel
     *   }
     * })
     * 
     */
    create<T extends PricingModelCreateArgs>(args: SelectSubset<T, PricingModelCreateArgs<ExtArgs>>): Prisma__PricingModelClient<$Result.GetResult<Prisma.$PricingModelPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PricingModels.
     * @param {PricingModelCreateManyArgs} args - Arguments to create many PricingModels.
     * @example
     * // Create many PricingModels
     * const pricingModel = await prisma.pricingModel.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PricingModelCreateManyArgs>(args?: SelectSubset<T, PricingModelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PricingModels and returns the data saved in the database.
     * @param {PricingModelCreateManyAndReturnArgs} args - Arguments to create many PricingModels.
     * @example
     * // Create many PricingModels
     * const pricingModel = await prisma.pricingModel.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PricingModels and only return the `id`
     * const pricingModelWithIdOnly = await prisma.pricingModel.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PricingModelCreateManyAndReturnArgs>(args?: SelectSubset<T, PricingModelCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PricingModelPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PricingModel.
     * @param {PricingModelDeleteArgs} args - Arguments to delete one PricingModel.
     * @example
     * // Delete one PricingModel
     * const PricingModel = await prisma.pricingModel.delete({
     *   where: {
     *     // ... filter to delete one PricingModel
     *   }
     * })
     * 
     */
    delete<T extends PricingModelDeleteArgs>(args: SelectSubset<T, PricingModelDeleteArgs<ExtArgs>>): Prisma__PricingModelClient<$Result.GetResult<Prisma.$PricingModelPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PricingModel.
     * @param {PricingModelUpdateArgs} args - Arguments to update one PricingModel.
     * @example
     * // Update one PricingModel
     * const pricingModel = await prisma.pricingModel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PricingModelUpdateArgs>(args: SelectSubset<T, PricingModelUpdateArgs<ExtArgs>>): Prisma__PricingModelClient<$Result.GetResult<Prisma.$PricingModelPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PricingModels.
     * @param {PricingModelDeleteManyArgs} args - Arguments to filter PricingModels to delete.
     * @example
     * // Delete a few PricingModels
     * const { count } = await prisma.pricingModel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PricingModelDeleteManyArgs>(args?: SelectSubset<T, PricingModelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PricingModels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingModelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PricingModels
     * const pricingModel = await prisma.pricingModel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PricingModelUpdateManyArgs>(args: SelectSubset<T, PricingModelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PricingModel.
     * @param {PricingModelUpsertArgs} args - Arguments to update or create a PricingModel.
     * @example
     * // Update or create a PricingModel
     * const pricingModel = await prisma.pricingModel.upsert({
     *   create: {
     *     // ... data to create a PricingModel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PricingModel we want to update
     *   }
     * })
     */
    upsert<T extends PricingModelUpsertArgs>(args: SelectSubset<T, PricingModelUpsertArgs<ExtArgs>>): Prisma__PricingModelClient<$Result.GetResult<Prisma.$PricingModelPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PricingModels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingModelCountArgs} args - Arguments to filter PricingModels to count.
     * @example
     * // Count the number of PricingModels
     * const count = await prisma.pricingModel.count({
     *   where: {
     *     // ... the filter for the PricingModels we want to count
     *   }
     * })
    **/
    count<T extends PricingModelCountArgs>(
      args?: Subset<T, PricingModelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PricingModelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PricingModel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingModelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PricingModelAggregateArgs>(args: Subset<T, PricingModelAggregateArgs>): Prisma.PrismaPromise<GetPricingModelAggregateType<T>>

    /**
     * Group by PricingModel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingModelGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PricingModelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PricingModelGroupByArgs['orderBy'] }
        : { orderBy?: PricingModelGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PricingModelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPricingModelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PricingModel model
   */
  readonly fields: PricingModelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PricingModel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PricingModelClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agent<T extends AgentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AgentDefaultArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PricingModel model
   */ 
  interface PricingModelFieldRefs {
    readonly id: FieldRef<"PricingModel", 'String'>
    readonly agentId: FieldRef<"PricingModel", 'String'>
    readonly pricingType: FieldRef<"PricingModel", 'PricingType'>
    readonly price: FieldRef<"PricingModel", 'Decimal'>
    readonly currency: FieldRef<"PricingModel", 'String'>
    readonly billingUnit: FieldRef<"PricingModel", 'String'>
    readonly updatedAt: FieldRef<"PricingModel", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PricingModel findUnique
   */
  export type PricingModelFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingModel
     */
    select?: PricingModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingModelInclude<ExtArgs> | null
    /**
     * Filter, which PricingModel to fetch.
     */
    where: PricingModelWhereUniqueInput
  }

  /**
   * PricingModel findUniqueOrThrow
   */
  export type PricingModelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingModel
     */
    select?: PricingModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingModelInclude<ExtArgs> | null
    /**
     * Filter, which PricingModel to fetch.
     */
    where: PricingModelWhereUniqueInput
  }

  /**
   * PricingModel findFirst
   */
  export type PricingModelFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingModel
     */
    select?: PricingModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingModelInclude<ExtArgs> | null
    /**
     * Filter, which PricingModel to fetch.
     */
    where?: PricingModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PricingModels to fetch.
     */
    orderBy?: PricingModelOrderByWithRelationInput | PricingModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PricingModels.
     */
    cursor?: PricingModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PricingModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PricingModels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PricingModels.
     */
    distinct?: PricingModelScalarFieldEnum | PricingModelScalarFieldEnum[]
  }

  /**
   * PricingModel findFirstOrThrow
   */
  export type PricingModelFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingModel
     */
    select?: PricingModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingModelInclude<ExtArgs> | null
    /**
     * Filter, which PricingModel to fetch.
     */
    where?: PricingModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PricingModels to fetch.
     */
    orderBy?: PricingModelOrderByWithRelationInput | PricingModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PricingModels.
     */
    cursor?: PricingModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PricingModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PricingModels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PricingModels.
     */
    distinct?: PricingModelScalarFieldEnum | PricingModelScalarFieldEnum[]
  }

  /**
   * PricingModel findMany
   */
  export type PricingModelFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingModel
     */
    select?: PricingModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingModelInclude<ExtArgs> | null
    /**
     * Filter, which PricingModels to fetch.
     */
    where?: PricingModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PricingModels to fetch.
     */
    orderBy?: PricingModelOrderByWithRelationInput | PricingModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PricingModels.
     */
    cursor?: PricingModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PricingModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PricingModels.
     */
    skip?: number
    distinct?: PricingModelScalarFieldEnum | PricingModelScalarFieldEnum[]
  }

  /**
   * PricingModel create
   */
  export type PricingModelCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingModel
     */
    select?: PricingModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingModelInclude<ExtArgs> | null
    /**
     * The data needed to create a PricingModel.
     */
    data: XOR<PricingModelCreateInput, PricingModelUncheckedCreateInput>
  }

  /**
   * PricingModel createMany
   */
  export type PricingModelCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PricingModels.
     */
    data: PricingModelCreateManyInput | PricingModelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PricingModel createManyAndReturn
   */
  export type PricingModelCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingModel
     */
    select?: PricingModelSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PricingModels.
     */
    data: PricingModelCreateManyInput | PricingModelCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingModelIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PricingModel update
   */
  export type PricingModelUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingModel
     */
    select?: PricingModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingModelInclude<ExtArgs> | null
    /**
     * The data needed to update a PricingModel.
     */
    data: XOR<PricingModelUpdateInput, PricingModelUncheckedUpdateInput>
    /**
     * Choose, which PricingModel to update.
     */
    where: PricingModelWhereUniqueInput
  }

  /**
   * PricingModel updateMany
   */
  export type PricingModelUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PricingModels.
     */
    data: XOR<PricingModelUpdateManyMutationInput, PricingModelUncheckedUpdateManyInput>
    /**
     * Filter which PricingModels to update
     */
    where?: PricingModelWhereInput
  }

  /**
   * PricingModel upsert
   */
  export type PricingModelUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingModel
     */
    select?: PricingModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingModelInclude<ExtArgs> | null
    /**
     * The filter to search for the PricingModel to update in case it exists.
     */
    where: PricingModelWhereUniqueInput
    /**
     * In case the PricingModel found by the `where` argument doesn't exist, create a new PricingModel with this data.
     */
    create: XOR<PricingModelCreateInput, PricingModelUncheckedCreateInput>
    /**
     * In case the PricingModel was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PricingModelUpdateInput, PricingModelUncheckedUpdateInput>
  }

  /**
   * PricingModel delete
   */
  export type PricingModelDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingModel
     */
    select?: PricingModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingModelInclude<ExtArgs> | null
    /**
     * Filter which PricingModel to delete.
     */
    where: PricingModelWhereUniqueInput
  }

  /**
   * PricingModel deleteMany
   */
  export type PricingModelDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PricingModels to delete
     */
    where?: PricingModelWhereInput
  }

  /**
   * PricingModel without action
   */
  export type PricingModelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingModel
     */
    select?: PricingModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingModelInclude<ExtArgs> | null
  }


  /**
   * Model Review
   */

  export type AggregateReview = {
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  export type ReviewAvgAggregateOutputType = {
    rating: number | null
  }

  export type ReviewSumAggregateOutputType = {
    rating: number | null
  }

  export type ReviewMinAggregateOutputType = {
    id: string | null
    agentId: string | null
    userId: string | null
    rating: number | null
    comment: string | null
    verifiedPurchase: boolean | null
    createdAt: Date | null
  }

  export type ReviewMaxAggregateOutputType = {
    id: string | null
    agentId: string | null
    userId: string | null
    rating: number | null
    comment: string | null
    verifiedPurchase: boolean | null
    createdAt: Date | null
  }

  export type ReviewCountAggregateOutputType = {
    id: number
    agentId: number
    userId: number
    rating: number
    comment: number
    verifiedPurchase: number
    createdAt: number
    _all: number
  }


  export type ReviewAvgAggregateInputType = {
    rating?: true
  }

  export type ReviewSumAggregateInputType = {
    rating?: true
  }

  export type ReviewMinAggregateInputType = {
    id?: true
    agentId?: true
    userId?: true
    rating?: true
    comment?: true
    verifiedPurchase?: true
    createdAt?: true
  }

  export type ReviewMaxAggregateInputType = {
    id?: true
    agentId?: true
    userId?: true
    rating?: true
    comment?: true
    verifiedPurchase?: true
    createdAt?: true
  }

  export type ReviewCountAggregateInputType = {
    id?: true
    agentId?: true
    userId?: true
    rating?: true
    comment?: true
    verifiedPurchase?: true
    createdAt?: true
    _all?: true
  }

  export type ReviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Review to aggregate.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reviews
    **/
    _count?: true | ReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReviewMaxAggregateInputType
  }

  export type GetReviewAggregateType<T extends ReviewAggregateArgs> = {
        [P in keyof T & keyof AggregateReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReview[P]>
      : GetScalarType<T[P], AggregateReview[P]>
  }




  export type ReviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithAggregationInput | ReviewOrderByWithAggregationInput[]
    by: ReviewScalarFieldEnum[] | ReviewScalarFieldEnum
    having?: ReviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReviewCountAggregateInputType | true
    _avg?: ReviewAvgAggregateInputType
    _sum?: ReviewSumAggregateInputType
    _min?: ReviewMinAggregateInputType
    _max?: ReviewMaxAggregateInputType
  }

  export type ReviewGroupByOutputType = {
    id: string
    agentId: string
    userId: string
    rating: number
    comment: string | null
    verifiedPurchase: boolean
    createdAt: Date
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  type GetReviewGroupByPayload<T extends ReviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReviewGroupByOutputType[P]>
            : GetScalarType<T[P], ReviewGroupByOutputType[P]>
        }
      >
    >


  export type ReviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    userId?: boolean
    rating?: boolean
    comment?: boolean
    verifiedPurchase?: boolean
    createdAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    userId?: boolean
    rating?: boolean
    comment?: boolean
    verifiedPurchase?: boolean
    createdAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectScalar = {
    id?: boolean
    agentId?: boolean
    userId?: boolean
    rating?: boolean
    comment?: boolean
    verifiedPurchase?: boolean
    createdAt?: boolean
  }

  export type ReviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }
  export type ReviewIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }

  export type $ReviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Review"
    objects: {
      agent: Prisma.$AgentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      agentId: string
      userId: string
      rating: number
      comment: string | null
      verifiedPurchase: boolean
      createdAt: Date
    }, ExtArgs["result"]["review"]>
    composites: {}
  }

  type ReviewGetPayload<S extends boolean | null | undefined | ReviewDefaultArgs> = $Result.GetResult<Prisma.$ReviewPayload, S>

  type ReviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ReviewFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ReviewCountAggregateInputType | true
    }

  export interface ReviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Review'], meta: { name: 'Review' } }
    /**
     * Find zero or one Review that matches the filter.
     * @param {ReviewFindUniqueArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReviewFindUniqueArgs>(args: SelectSubset<T, ReviewFindUniqueArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Review that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ReviewFindUniqueOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReviewFindUniqueOrThrowArgs>(args: SelectSubset<T, ReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Review that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReviewFindFirstArgs>(args?: SelectSubset<T, ReviewFindFirstArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Review that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReviewFindFirstOrThrowArgs>(args?: SelectSubset<T, ReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Reviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reviews
     * const reviews = await prisma.review.findMany()
     * 
     * // Get first 10 Reviews
     * const reviews = await prisma.review.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reviewWithIdOnly = await prisma.review.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReviewFindManyArgs>(args?: SelectSubset<T, ReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Review.
     * @param {ReviewCreateArgs} args - Arguments to create a Review.
     * @example
     * // Create one Review
     * const Review = await prisma.review.create({
     *   data: {
     *     // ... data to create a Review
     *   }
     * })
     * 
     */
    create<T extends ReviewCreateArgs>(args: SelectSubset<T, ReviewCreateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Reviews.
     * @param {ReviewCreateManyArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReviewCreateManyArgs>(args?: SelectSubset<T, ReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reviews and returns the data saved in the database.
     * @param {ReviewCreateManyAndReturnArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reviews and only return the `id`
     * const reviewWithIdOnly = await prisma.review.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReviewCreateManyAndReturnArgs>(args?: SelectSubset<T, ReviewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Review.
     * @param {ReviewDeleteArgs} args - Arguments to delete one Review.
     * @example
     * // Delete one Review
     * const Review = await prisma.review.delete({
     *   where: {
     *     // ... filter to delete one Review
     *   }
     * })
     * 
     */
    delete<T extends ReviewDeleteArgs>(args: SelectSubset<T, ReviewDeleteArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Review.
     * @param {ReviewUpdateArgs} args - Arguments to update one Review.
     * @example
     * // Update one Review
     * const review = await prisma.review.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReviewUpdateArgs>(args: SelectSubset<T, ReviewUpdateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Reviews.
     * @param {ReviewDeleteManyArgs} args - Arguments to filter Reviews to delete.
     * @example
     * // Delete a few Reviews
     * const { count } = await prisma.review.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReviewDeleteManyArgs>(args?: SelectSubset<T, ReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReviewUpdateManyArgs>(args: SelectSubset<T, ReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Review.
     * @param {ReviewUpsertArgs} args - Arguments to update or create a Review.
     * @example
     * // Update or create a Review
     * const review = await prisma.review.upsert({
     *   create: {
     *     // ... data to create a Review
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Review we want to update
     *   }
     * })
     */
    upsert<T extends ReviewUpsertArgs>(args: SelectSubset<T, ReviewUpsertArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewCountArgs} args - Arguments to filter Reviews to count.
     * @example
     * // Count the number of Reviews
     * const count = await prisma.review.count({
     *   where: {
     *     // ... the filter for the Reviews we want to count
     *   }
     * })
    **/
    count<T extends ReviewCountArgs>(
      args?: Subset<T, ReviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReviewAggregateArgs>(args: Subset<T, ReviewAggregateArgs>): Prisma.PrismaPromise<GetReviewAggregateType<T>>

    /**
     * Group by Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReviewGroupByArgs['orderBy'] }
        : { orderBy?: ReviewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Review model
   */
  readonly fields: ReviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Review.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agent<T extends AgentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AgentDefaultArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Review model
   */ 
  interface ReviewFieldRefs {
    readonly id: FieldRef<"Review", 'String'>
    readonly agentId: FieldRef<"Review", 'String'>
    readonly userId: FieldRef<"Review", 'String'>
    readonly rating: FieldRef<"Review", 'Int'>
    readonly comment: FieldRef<"Review", 'String'>
    readonly verifiedPurchase: FieldRef<"Review", 'Boolean'>
    readonly createdAt: FieldRef<"Review", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Review findUnique
   */
  export type ReviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findUniqueOrThrow
   */
  export type ReviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findFirst
   */
  export type ReviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findFirstOrThrow
   */
  export type ReviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findMany
   */
  export type ReviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Reviews to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review create
   */
  export type ReviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to create a Review.
     */
    data: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
  }

  /**
   * Review createMany
   */
  export type ReviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Review createManyAndReturn
   */
  export type ReviewCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Review update
   */
  export type ReviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to update a Review.
     */
    data: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
    /**
     * Choose, which Review to update.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review updateMany
   */
  export type ReviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reviews.
     */
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyInput>
    /**
     * Filter which Reviews to update
     */
    where?: ReviewWhereInput
  }

  /**
   * Review upsert
   */
  export type ReviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The filter to search for the Review to update in case it exists.
     */
    where: ReviewWhereUniqueInput
    /**
     * In case the Review found by the `where` argument doesn't exist, create a new Review with this data.
     */
    create: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
    /**
     * In case the Review was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
  }

  /**
   * Review delete
   */
  export type ReviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter which Review to delete.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review deleteMany
   */
  export type ReviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reviews to delete
     */
    where?: ReviewWhereInput
  }

  /**
   * Review without action
   */
  export type ReviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AgentScalarFieldEnum: {
    id: 'id',
    ownerId: 'ownerId',
    slug: 'slug',
    name: 'name',
    description: 'description',
    logoUrl: 'logoUrl',
    verificationStatus: 'verificationStatus',
    averageRating: 'averageRating',
    trustScore: 'trustScore',
    capDid: 'capDid',
    capRegisteredAt: 'capRegisteredAt',
    capReputationScore: 'capReputationScore',
    capEndpoint: 'capEndpoint',
    capStoreId: 'capStoreId',
    category: 'category',
    skills: 'skills',
    tags: 'tags',
    price: 'price',
    latency: 'latency',
    accuracy: 'accuracy',
    verificationCount: 'verificationCount',
    failureRate: 'failureRate',
    status: 'status',
    walletAddress: 'walletAddress',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type AgentScalarFieldEnum = (typeof AgentScalarFieldEnum)[keyof typeof AgentScalarFieldEnum]


  export const AgentVersionScalarFieldEnum: {
    id: 'id',
    agentId: 'agentId',
    version: 'version',
    endpoint: 'endpoint',
    inputSchema: 'inputSchema',
    outputSchema: 'outputSchema',
    publishedAt: 'publishedAt'
  };

  export type AgentVersionScalarFieldEnum = (typeof AgentVersionScalarFieldEnum)[keyof typeof AgentVersionScalarFieldEnum]


  export const CapabilityScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description'
  };

  export type CapabilityScalarFieldEnum = (typeof CapabilityScalarFieldEnum)[keyof typeof CapabilityScalarFieldEnum]


  export const AgentCapabilityScalarFieldEnum: {
    agentId: 'agentId',
    capabilityId: 'capabilityId'
  };

  export type AgentCapabilityScalarFieldEnum = (typeof AgentCapabilityScalarFieldEnum)[keyof typeof AgentCapabilityScalarFieldEnum]


  export const PricingModelScalarFieldEnum: {
    id: 'id',
    agentId: 'agentId',
    pricingType: 'pricingType',
    price: 'price',
    currency: 'currency',
    billingUnit: 'billingUnit',
    updatedAt: 'updatedAt'
  };

  export type PricingModelScalarFieldEnum = (typeof PricingModelScalarFieldEnum)[keyof typeof PricingModelScalarFieldEnum]


  export const ReviewScalarFieldEnum: {
    id: 'id',
    agentId: 'agentId',
    userId: 'userId',
    rating: 'rating',
    comment: 'comment',
    verifiedPurchase: 'verifiedPurchase',
    createdAt: 'createdAt'
  };

  export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'VerificationStatus'
   */
  export type EnumVerificationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VerificationStatus'>
    


  /**
   * Reference to a field of type 'VerificationStatus[]'
   */
  export type ListEnumVerificationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VerificationStatus[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'PricingType'
   */
  export type EnumPricingTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PricingType'>
    


  /**
   * Reference to a field of type 'PricingType[]'
   */
  export type ListEnumPricingTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PricingType[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type AgentWhereInput = {
    AND?: AgentWhereInput | AgentWhereInput[]
    OR?: AgentWhereInput[]
    NOT?: AgentWhereInput | AgentWhereInput[]
    id?: StringFilter<"Agent"> | string
    ownerId?: StringFilter<"Agent"> | string
    slug?: StringFilter<"Agent"> | string
    name?: StringFilter<"Agent"> | string
    description?: StringFilter<"Agent"> | string
    logoUrl?: StringNullableFilter<"Agent"> | string | null
    verificationStatus?: EnumVerificationStatusFilter<"Agent"> | $Enums.VerificationStatus
    averageRating?: DecimalFilter<"Agent"> | Decimal | DecimalJsLike | number | string
    trustScore?: DecimalFilter<"Agent"> | Decimal | DecimalJsLike | number | string
    capDid?: StringNullableFilter<"Agent"> | string | null
    capRegisteredAt?: DateTimeNullableFilter<"Agent"> | Date | string | null
    capReputationScore?: DecimalNullableFilter<"Agent"> | Decimal | DecimalJsLike | number | string | null
    capEndpoint?: StringNullableFilter<"Agent"> | string | null
    capStoreId?: StringNullableFilter<"Agent"> | string | null
    category?: StringFilter<"Agent"> | string
    skills?: StringNullableListFilter<"Agent">
    tags?: StringNullableListFilter<"Agent">
    price?: FloatFilter<"Agent"> | number
    latency?: IntFilter<"Agent"> | number
    accuracy?: FloatFilter<"Agent"> | number
    verificationCount?: IntFilter<"Agent"> | number
    failureRate?: FloatFilter<"Agent"> | number
    status?: StringFilter<"Agent"> | string
    walletAddress?: StringFilter<"Agent"> | string
    createdAt?: DateTimeFilter<"Agent"> | Date | string
    updatedAt?: DateTimeFilter<"Agent"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Agent"> | Date | string | null
    versions?: AgentVersionListRelationFilter
    capabilities?: AgentCapabilityListRelationFilter
    pricingModels?: PricingModelListRelationFilter
    reviews?: ReviewListRelationFilter
  }

  export type AgentOrderByWithRelationInput = {
    id?: SortOrder
    ownerId?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    description?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    verificationStatus?: SortOrder
    averageRating?: SortOrder
    trustScore?: SortOrder
    capDid?: SortOrderInput | SortOrder
    capRegisteredAt?: SortOrderInput | SortOrder
    capReputationScore?: SortOrderInput | SortOrder
    capEndpoint?: SortOrderInput | SortOrder
    capStoreId?: SortOrderInput | SortOrder
    category?: SortOrder
    skills?: SortOrder
    tags?: SortOrder
    price?: SortOrder
    latency?: SortOrder
    accuracy?: SortOrder
    verificationCount?: SortOrder
    failureRate?: SortOrder
    status?: SortOrder
    walletAddress?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    versions?: AgentVersionOrderByRelationAggregateInput
    capabilities?: AgentCapabilityOrderByRelationAggregateInput
    pricingModels?: PricingModelOrderByRelationAggregateInput
    reviews?: ReviewOrderByRelationAggregateInput
  }

  export type AgentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    capDid?: string
    capStoreId?: string
    AND?: AgentWhereInput | AgentWhereInput[]
    OR?: AgentWhereInput[]
    NOT?: AgentWhereInput | AgentWhereInput[]
    ownerId?: StringFilter<"Agent"> | string
    name?: StringFilter<"Agent"> | string
    description?: StringFilter<"Agent"> | string
    logoUrl?: StringNullableFilter<"Agent"> | string | null
    verificationStatus?: EnumVerificationStatusFilter<"Agent"> | $Enums.VerificationStatus
    averageRating?: DecimalFilter<"Agent"> | Decimal | DecimalJsLike | number | string
    trustScore?: DecimalFilter<"Agent"> | Decimal | DecimalJsLike | number | string
    capRegisteredAt?: DateTimeNullableFilter<"Agent"> | Date | string | null
    capReputationScore?: DecimalNullableFilter<"Agent"> | Decimal | DecimalJsLike | number | string | null
    capEndpoint?: StringNullableFilter<"Agent"> | string | null
    category?: StringFilter<"Agent"> | string
    skills?: StringNullableListFilter<"Agent">
    tags?: StringNullableListFilter<"Agent">
    price?: FloatFilter<"Agent"> | number
    latency?: IntFilter<"Agent"> | number
    accuracy?: FloatFilter<"Agent"> | number
    verificationCount?: IntFilter<"Agent"> | number
    failureRate?: FloatFilter<"Agent"> | number
    status?: StringFilter<"Agent"> | string
    walletAddress?: StringFilter<"Agent"> | string
    createdAt?: DateTimeFilter<"Agent"> | Date | string
    updatedAt?: DateTimeFilter<"Agent"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Agent"> | Date | string | null
    versions?: AgentVersionListRelationFilter
    capabilities?: AgentCapabilityListRelationFilter
    pricingModels?: PricingModelListRelationFilter
    reviews?: ReviewListRelationFilter
  }, "id" | "slug" | "capDid" | "capStoreId">

  export type AgentOrderByWithAggregationInput = {
    id?: SortOrder
    ownerId?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    description?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    verificationStatus?: SortOrder
    averageRating?: SortOrder
    trustScore?: SortOrder
    capDid?: SortOrderInput | SortOrder
    capRegisteredAt?: SortOrderInput | SortOrder
    capReputationScore?: SortOrderInput | SortOrder
    capEndpoint?: SortOrderInput | SortOrder
    capStoreId?: SortOrderInput | SortOrder
    category?: SortOrder
    skills?: SortOrder
    tags?: SortOrder
    price?: SortOrder
    latency?: SortOrder
    accuracy?: SortOrder
    verificationCount?: SortOrder
    failureRate?: SortOrder
    status?: SortOrder
    walletAddress?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: AgentCountOrderByAggregateInput
    _avg?: AgentAvgOrderByAggregateInput
    _max?: AgentMaxOrderByAggregateInput
    _min?: AgentMinOrderByAggregateInput
    _sum?: AgentSumOrderByAggregateInput
  }

  export type AgentScalarWhereWithAggregatesInput = {
    AND?: AgentScalarWhereWithAggregatesInput | AgentScalarWhereWithAggregatesInput[]
    OR?: AgentScalarWhereWithAggregatesInput[]
    NOT?: AgentScalarWhereWithAggregatesInput | AgentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Agent"> | string
    ownerId?: StringWithAggregatesFilter<"Agent"> | string
    slug?: StringWithAggregatesFilter<"Agent"> | string
    name?: StringWithAggregatesFilter<"Agent"> | string
    description?: StringWithAggregatesFilter<"Agent"> | string
    logoUrl?: StringNullableWithAggregatesFilter<"Agent"> | string | null
    verificationStatus?: EnumVerificationStatusWithAggregatesFilter<"Agent"> | $Enums.VerificationStatus
    averageRating?: DecimalWithAggregatesFilter<"Agent"> | Decimal | DecimalJsLike | number | string
    trustScore?: DecimalWithAggregatesFilter<"Agent"> | Decimal | DecimalJsLike | number | string
    capDid?: StringNullableWithAggregatesFilter<"Agent"> | string | null
    capRegisteredAt?: DateTimeNullableWithAggregatesFilter<"Agent"> | Date | string | null
    capReputationScore?: DecimalNullableWithAggregatesFilter<"Agent"> | Decimal | DecimalJsLike | number | string | null
    capEndpoint?: StringNullableWithAggregatesFilter<"Agent"> | string | null
    capStoreId?: StringNullableWithAggregatesFilter<"Agent"> | string | null
    category?: StringWithAggregatesFilter<"Agent"> | string
    skills?: StringNullableListFilter<"Agent">
    tags?: StringNullableListFilter<"Agent">
    price?: FloatWithAggregatesFilter<"Agent"> | number
    latency?: IntWithAggregatesFilter<"Agent"> | number
    accuracy?: FloatWithAggregatesFilter<"Agent"> | number
    verificationCount?: IntWithAggregatesFilter<"Agent"> | number
    failureRate?: FloatWithAggregatesFilter<"Agent"> | number
    status?: StringWithAggregatesFilter<"Agent"> | string
    walletAddress?: StringWithAggregatesFilter<"Agent"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Agent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Agent"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Agent"> | Date | string | null
  }

  export type AgentVersionWhereInput = {
    AND?: AgentVersionWhereInput | AgentVersionWhereInput[]
    OR?: AgentVersionWhereInput[]
    NOT?: AgentVersionWhereInput | AgentVersionWhereInput[]
    id?: StringFilter<"AgentVersion"> | string
    agentId?: StringFilter<"AgentVersion"> | string
    version?: StringFilter<"AgentVersion"> | string
    endpoint?: StringFilter<"AgentVersion"> | string
    inputSchema?: JsonFilter<"AgentVersion">
    outputSchema?: JsonFilter<"AgentVersion">
    publishedAt?: DateTimeFilter<"AgentVersion"> | Date | string
    agent?: XOR<AgentRelationFilter, AgentWhereInput>
  }

  export type AgentVersionOrderByWithRelationInput = {
    id?: SortOrder
    agentId?: SortOrder
    version?: SortOrder
    endpoint?: SortOrder
    inputSchema?: SortOrder
    outputSchema?: SortOrder
    publishedAt?: SortOrder
    agent?: AgentOrderByWithRelationInput
  }

  export type AgentVersionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AgentVersionWhereInput | AgentVersionWhereInput[]
    OR?: AgentVersionWhereInput[]
    NOT?: AgentVersionWhereInput | AgentVersionWhereInput[]
    agentId?: StringFilter<"AgentVersion"> | string
    version?: StringFilter<"AgentVersion"> | string
    endpoint?: StringFilter<"AgentVersion"> | string
    inputSchema?: JsonFilter<"AgentVersion">
    outputSchema?: JsonFilter<"AgentVersion">
    publishedAt?: DateTimeFilter<"AgentVersion"> | Date | string
    agent?: XOR<AgentRelationFilter, AgentWhereInput>
  }, "id">

  export type AgentVersionOrderByWithAggregationInput = {
    id?: SortOrder
    agentId?: SortOrder
    version?: SortOrder
    endpoint?: SortOrder
    inputSchema?: SortOrder
    outputSchema?: SortOrder
    publishedAt?: SortOrder
    _count?: AgentVersionCountOrderByAggregateInput
    _max?: AgentVersionMaxOrderByAggregateInput
    _min?: AgentVersionMinOrderByAggregateInput
  }

  export type AgentVersionScalarWhereWithAggregatesInput = {
    AND?: AgentVersionScalarWhereWithAggregatesInput | AgentVersionScalarWhereWithAggregatesInput[]
    OR?: AgentVersionScalarWhereWithAggregatesInput[]
    NOT?: AgentVersionScalarWhereWithAggregatesInput | AgentVersionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AgentVersion"> | string
    agentId?: StringWithAggregatesFilter<"AgentVersion"> | string
    version?: StringWithAggregatesFilter<"AgentVersion"> | string
    endpoint?: StringWithAggregatesFilter<"AgentVersion"> | string
    inputSchema?: JsonWithAggregatesFilter<"AgentVersion">
    outputSchema?: JsonWithAggregatesFilter<"AgentVersion">
    publishedAt?: DateTimeWithAggregatesFilter<"AgentVersion"> | Date | string
  }

  export type CapabilityWhereInput = {
    AND?: CapabilityWhereInput | CapabilityWhereInput[]
    OR?: CapabilityWhereInput[]
    NOT?: CapabilityWhereInput | CapabilityWhereInput[]
    id?: StringFilter<"Capability"> | string
    name?: StringFilter<"Capability"> | string
    description?: StringNullableFilter<"Capability"> | string | null
    agents?: AgentCapabilityListRelationFilter
  }

  export type CapabilityOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    agents?: AgentCapabilityOrderByRelationAggregateInput
  }

  export type CapabilityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: CapabilityWhereInput | CapabilityWhereInput[]
    OR?: CapabilityWhereInput[]
    NOT?: CapabilityWhereInput | CapabilityWhereInput[]
    description?: StringNullableFilter<"Capability"> | string | null
    agents?: AgentCapabilityListRelationFilter
  }, "id" | "name">

  export type CapabilityOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    _count?: CapabilityCountOrderByAggregateInput
    _max?: CapabilityMaxOrderByAggregateInput
    _min?: CapabilityMinOrderByAggregateInput
  }

  export type CapabilityScalarWhereWithAggregatesInput = {
    AND?: CapabilityScalarWhereWithAggregatesInput | CapabilityScalarWhereWithAggregatesInput[]
    OR?: CapabilityScalarWhereWithAggregatesInput[]
    NOT?: CapabilityScalarWhereWithAggregatesInput | CapabilityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Capability"> | string
    name?: StringWithAggregatesFilter<"Capability"> | string
    description?: StringNullableWithAggregatesFilter<"Capability"> | string | null
  }

  export type AgentCapabilityWhereInput = {
    AND?: AgentCapabilityWhereInput | AgentCapabilityWhereInput[]
    OR?: AgentCapabilityWhereInput[]
    NOT?: AgentCapabilityWhereInput | AgentCapabilityWhereInput[]
    agentId?: StringFilter<"AgentCapability"> | string
    capabilityId?: StringFilter<"AgentCapability"> | string
    agent?: XOR<AgentRelationFilter, AgentWhereInput>
    capability?: XOR<CapabilityRelationFilter, CapabilityWhereInput>
  }

  export type AgentCapabilityOrderByWithRelationInput = {
    agentId?: SortOrder
    capabilityId?: SortOrder
    agent?: AgentOrderByWithRelationInput
    capability?: CapabilityOrderByWithRelationInput
  }

  export type AgentCapabilityWhereUniqueInput = Prisma.AtLeast<{
    agentId_capabilityId?: AgentCapabilityAgentIdCapabilityIdCompoundUniqueInput
    AND?: AgentCapabilityWhereInput | AgentCapabilityWhereInput[]
    OR?: AgentCapabilityWhereInput[]
    NOT?: AgentCapabilityWhereInput | AgentCapabilityWhereInput[]
    agentId?: StringFilter<"AgentCapability"> | string
    capabilityId?: StringFilter<"AgentCapability"> | string
    agent?: XOR<AgentRelationFilter, AgentWhereInput>
    capability?: XOR<CapabilityRelationFilter, CapabilityWhereInput>
  }, "agentId_capabilityId">

  export type AgentCapabilityOrderByWithAggregationInput = {
    agentId?: SortOrder
    capabilityId?: SortOrder
    _count?: AgentCapabilityCountOrderByAggregateInput
    _max?: AgentCapabilityMaxOrderByAggregateInput
    _min?: AgentCapabilityMinOrderByAggregateInput
  }

  export type AgentCapabilityScalarWhereWithAggregatesInput = {
    AND?: AgentCapabilityScalarWhereWithAggregatesInput | AgentCapabilityScalarWhereWithAggregatesInput[]
    OR?: AgentCapabilityScalarWhereWithAggregatesInput[]
    NOT?: AgentCapabilityScalarWhereWithAggregatesInput | AgentCapabilityScalarWhereWithAggregatesInput[]
    agentId?: StringWithAggregatesFilter<"AgentCapability"> | string
    capabilityId?: StringWithAggregatesFilter<"AgentCapability"> | string
  }

  export type PricingModelWhereInput = {
    AND?: PricingModelWhereInput | PricingModelWhereInput[]
    OR?: PricingModelWhereInput[]
    NOT?: PricingModelWhereInput | PricingModelWhereInput[]
    id?: StringFilter<"PricingModel"> | string
    agentId?: StringFilter<"PricingModel"> | string
    pricingType?: EnumPricingTypeFilter<"PricingModel"> | $Enums.PricingType
    price?: DecimalFilter<"PricingModel"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"PricingModel"> | string
    billingUnit?: StringFilter<"PricingModel"> | string
    updatedAt?: DateTimeFilter<"PricingModel"> | Date | string
    agent?: XOR<AgentRelationFilter, AgentWhereInput>
  }

  export type PricingModelOrderByWithRelationInput = {
    id?: SortOrder
    agentId?: SortOrder
    pricingType?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    billingUnit?: SortOrder
    updatedAt?: SortOrder
    agent?: AgentOrderByWithRelationInput
  }

  export type PricingModelWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PricingModelWhereInput | PricingModelWhereInput[]
    OR?: PricingModelWhereInput[]
    NOT?: PricingModelWhereInput | PricingModelWhereInput[]
    agentId?: StringFilter<"PricingModel"> | string
    pricingType?: EnumPricingTypeFilter<"PricingModel"> | $Enums.PricingType
    price?: DecimalFilter<"PricingModel"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"PricingModel"> | string
    billingUnit?: StringFilter<"PricingModel"> | string
    updatedAt?: DateTimeFilter<"PricingModel"> | Date | string
    agent?: XOR<AgentRelationFilter, AgentWhereInput>
  }, "id">

  export type PricingModelOrderByWithAggregationInput = {
    id?: SortOrder
    agentId?: SortOrder
    pricingType?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    billingUnit?: SortOrder
    updatedAt?: SortOrder
    _count?: PricingModelCountOrderByAggregateInput
    _avg?: PricingModelAvgOrderByAggregateInput
    _max?: PricingModelMaxOrderByAggregateInput
    _min?: PricingModelMinOrderByAggregateInput
    _sum?: PricingModelSumOrderByAggregateInput
  }

  export type PricingModelScalarWhereWithAggregatesInput = {
    AND?: PricingModelScalarWhereWithAggregatesInput | PricingModelScalarWhereWithAggregatesInput[]
    OR?: PricingModelScalarWhereWithAggregatesInput[]
    NOT?: PricingModelScalarWhereWithAggregatesInput | PricingModelScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PricingModel"> | string
    agentId?: StringWithAggregatesFilter<"PricingModel"> | string
    pricingType?: EnumPricingTypeWithAggregatesFilter<"PricingModel"> | $Enums.PricingType
    price?: DecimalWithAggregatesFilter<"PricingModel"> | Decimal | DecimalJsLike | number | string
    currency?: StringWithAggregatesFilter<"PricingModel"> | string
    billingUnit?: StringWithAggregatesFilter<"PricingModel"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"PricingModel"> | Date | string
  }

  export type ReviewWhereInput = {
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    id?: StringFilter<"Review"> | string
    agentId?: StringFilter<"Review"> | string
    userId?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    comment?: StringNullableFilter<"Review"> | string | null
    verifiedPurchase?: BoolFilter<"Review"> | boolean
    createdAt?: DateTimeFilter<"Review"> | Date | string
    agent?: XOR<AgentRelationFilter, AgentWhereInput>
  }

  export type ReviewOrderByWithRelationInput = {
    id?: SortOrder
    agentId?: SortOrder
    userId?: SortOrder
    rating?: SortOrder
    comment?: SortOrderInput | SortOrder
    verifiedPurchase?: SortOrder
    createdAt?: SortOrder
    agent?: AgentOrderByWithRelationInput
  }

  export type ReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    agentId?: StringFilter<"Review"> | string
    userId?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    comment?: StringNullableFilter<"Review"> | string | null
    verifiedPurchase?: BoolFilter<"Review"> | boolean
    createdAt?: DateTimeFilter<"Review"> | Date | string
    agent?: XOR<AgentRelationFilter, AgentWhereInput>
  }, "id">

  export type ReviewOrderByWithAggregationInput = {
    id?: SortOrder
    agentId?: SortOrder
    userId?: SortOrder
    rating?: SortOrder
    comment?: SortOrderInput | SortOrder
    verifiedPurchase?: SortOrder
    createdAt?: SortOrder
    _count?: ReviewCountOrderByAggregateInput
    _avg?: ReviewAvgOrderByAggregateInput
    _max?: ReviewMaxOrderByAggregateInput
    _min?: ReviewMinOrderByAggregateInput
    _sum?: ReviewSumOrderByAggregateInput
  }

  export type ReviewScalarWhereWithAggregatesInput = {
    AND?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    OR?: ReviewScalarWhereWithAggregatesInput[]
    NOT?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Review"> | string
    agentId?: StringWithAggregatesFilter<"Review"> | string
    userId?: StringWithAggregatesFilter<"Review"> | string
    rating?: IntWithAggregatesFilter<"Review"> | number
    comment?: StringNullableWithAggregatesFilter<"Review"> | string | null
    verifiedPurchase?: BoolWithAggregatesFilter<"Review"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Review"> | Date | string
  }

  export type AgentCreateInput = {
    id?: string
    ownerId: string
    slug: string
    name: string
    description: string
    logoUrl?: string | null
    verificationStatus?: $Enums.VerificationStatus
    averageRating?: Decimal | DecimalJsLike | number | string
    trustScore?: Decimal | DecimalJsLike | number | string
    capDid?: string | null
    capRegisteredAt?: Date | string | null
    capReputationScore?: Decimal | DecimalJsLike | number | string | null
    capEndpoint?: string | null
    capStoreId?: string | null
    category?: string
    skills?: AgentCreateskillsInput | string[]
    tags?: AgentCreatetagsInput | string[]
    price?: number
    latency?: number
    accuracy?: number
    verificationCount?: number
    failureRate?: number
    status?: string
    walletAddress?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    versions?: AgentVersionCreateNestedManyWithoutAgentInput
    capabilities?: AgentCapabilityCreateNestedManyWithoutAgentInput
    pricingModels?: PricingModelCreateNestedManyWithoutAgentInput
    reviews?: ReviewCreateNestedManyWithoutAgentInput
  }

  export type AgentUncheckedCreateInput = {
    id?: string
    ownerId: string
    slug: string
    name: string
    description: string
    logoUrl?: string | null
    verificationStatus?: $Enums.VerificationStatus
    averageRating?: Decimal | DecimalJsLike | number | string
    trustScore?: Decimal | DecimalJsLike | number | string
    capDid?: string | null
    capRegisteredAt?: Date | string | null
    capReputationScore?: Decimal | DecimalJsLike | number | string | null
    capEndpoint?: string | null
    capStoreId?: string | null
    category?: string
    skills?: AgentCreateskillsInput | string[]
    tags?: AgentCreatetagsInput | string[]
    price?: number
    latency?: number
    accuracy?: number
    verificationCount?: number
    failureRate?: number
    status?: string
    walletAddress?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    versions?: AgentVersionUncheckedCreateNestedManyWithoutAgentInput
    capabilities?: AgentCapabilityUncheckedCreateNestedManyWithoutAgentInput
    pricingModels?: PricingModelUncheckedCreateNestedManyWithoutAgentInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutAgentInput
  }

  export type AgentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    averageRating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    trustScore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    capDid?: NullableStringFieldUpdateOperationsInput | string | null
    capRegisteredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    capReputationScore?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    capEndpoint?: NullableStringFieldUpdateOperationsInput | string | null
    capStoreId?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    skills?: AgentUpdateskillsInput | string[]
    tags?: AgentUpdatetagsInput | string[]
    price?: FloatFieldUpdateOperationsInput | number
    latency?: IntFieldUpdateOperationsInput | number
    accuracy?: FloatFieldUpdateOperationsInput | number
    verificationCount?: IntFieldUpdateOperationsInput | number
    failureRate?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    versions?: AgentVersionUpdateManyWithoutAgentNestedInput
    capabilities?: AgentCapabilityUpdateManyWithoutAgentNestedInput
    pricingModels?: PricingModelUpdateManyWithoutAgentNestedInput
    reviews?: ReviewUpdateManyWithoutAgentNestedInput
  }

  export type AgentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    averageRating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    trustScore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    capDid?: NullableStringFieldUpdateOperationsInput | string | null
    capRegisteredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    capReputationScore?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    capEndpoint?: NullableStringFieldUpdateOperationsInput | string | null
    capStoreId?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    skills?: AgentUpdateskillsInput | string[]
    tags?: AgentUpdatetagsInput | string[]
    price?: FloatFieldUpdateOperationsInput | number
    latency?: IntFieldUpdateOperationsInput | number
    accuracy?: FloatFieldUpdateOperationsInput | number
    verificationCount?: IntFieldUpdateOperationsInput | number
    failureRate?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    versions?: AgentVersionUncheckedUpdateManyWithoutAgentNestedInput
    capabilities?: AgentCapabilityUncheckedUpdateManyWithoutAgentNestedInput
    pricingModels?: PricingModelUncheckedUpdateManyWithoutAgentNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutAgentNestedInput
  }

  export type AgentCreateManyInput = {
    id?: string
    ownerId: string
    slug: string
    name: string
    description: string
    logoUrl?: string | null
    verificationStatus?: $Enums.VerificationStatus
    averageRating?: Decimal | DecimalJsLike | number | string
    trustScore?: Decimal | DecimalJsLike | number | string
    capDid?: string | null
    capRegisteredAt?: Date | string | null
    capReputationScore?: Decimal | DecimalJsLike | number | string | null
    capEndpoint?: string | null
    capStoreId?: string | null
    category?: string
    skills?: AgentCreateskillsInput | string[]
    tags?: AgentCreatetagsInput | string[]
    price?: number
    latency?: number
    accuracy?: number
    verificationCount?: number
    failureRate?: number
    status?: string
    walletAddress?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type AgentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    averageRating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    trustScore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    capDid?: NullableStringFieldUpdateOperationsInput | string | null
    capRegisteredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    capReputationScore?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    capEndpoint?: NullableStringFieldUpdateOperationsInput | string | null
    capStoreId?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    skills?: AgentUpdateskillsInput | string[]
    tags?: AgentUpdatetagsInput | string[]
    price?: FloatFieldUpdateOperationsInput | number
    latency?: IntFieldUpdateOperationsInput | number
    accuracy?: FloatFieldUpdateOperationsInput | number
    verificationCount?: IntFieldUpdateOperationsInput | number
    failureRate?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AgentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    averageRating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    trustScore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    capDid?: NullableStringFieldUpdateOperationsInput | string | null
    capRegisteredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    capReputationScore?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    capEndpoint?: NullableStringFieldUpdateOperationsInput | string | null
    capStoreId?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    skills?: AgentUpdateskillsInput | string[]
    tags?: AgentUpdatetagsInput | string[]
    price?: FloatFieldUpdateOperationsInput | number
    latency?: IntFieldUpdateOperationsInput | number
    accuracy?: FloatFieldUpdateOperationsInput | number
    verificationCount?: IntFieldUpdateOperationsInput | number
    failureRate?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AgentVersionCreateInput = {
    id?: string
    version: string
    endpoint: string
    inputSchema: JsonNullValueInput | InputJsonValue
    outputSchema: JsonNullValueInput | InputJsonValue
    publishedAt?: Date | string
    agent: AgentCreateNestedOneWithoutVersionsInput
  }

  export type AgentVersionUncheckedCreateInput = {
    id?: string
    agentId: string
    version: string
    endpoint: string
    inputSchema: JsonNullValueInput | InputJsonValue
    outputSchema: JsonNullValueInput | InputJsonValue
    publishedAt?: Date | string
  }

  export type AgentVersionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    endpoint?: StringFieldUpdateOperationsInput | string
    inputSchema?: JsonNullValueInput | InputJsonValue
    outputSchema?: JsonNullValueInput | InputJsonValue
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: AgentUpdateOneRequiredWithoutVersionsNestedInput
  }

  export type AgentVersionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    endpoint?: StringFieldUpdateOperationsInput | string
    inputSchema?: JsonNullValueInput | InputJsonValue
    outputSchema?: JsonNullValueInput | InputJsonValue
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentVersionCreateManyInput = {
    id?: string
    agentId: string
    version: string
    endpoint: string
    inputSchema: JsonNullValueInput | InputJsonValue
    outputSchema: JsonNullValueInput | InputJsonValue
    publishedAt?: Date | string
  }

  export type AgentVersionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    endpoint?: StringFieldUpdateOperationsInput | string
    inputSchema?: JsonNullValueInput | InputJsonValue
    outputSchema?: JsonNullValueInput | InputJsonValue
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentVersionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    endpoint?: StringFieldUpdateOperationsInput | string
    inputSchema?: JsonNullValueInput | InputJsonValue
    outputSchema?: JsonNullValueInput | InputJsonValue
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CapabilityCreateInput = {
    id?: string
    name: string
    description?: string | null
    agents?: AgentCapabilityCreateNestedManyWithoutCapabilityInput
  }

  export type CapabilityUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    agents?: AgentCapabilityUncheckedCreateNestedManyWithoutCapabilityInput
  }

  export type CapabilityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    agents?: AgentCapabilityUpdateManyWithoutCapabilityNestedInput
  }

  export type CapabilityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    agents?: AgentCapabilityUncheckedUpdateManyWithoutCapabilityNestedInput
  }

  export type CapabilityCreateManyInput = {
    id?: string
    name: string
    description?: string | null
  }

  export type CapabilityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CapabilityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AgentCapabilityCreateInput = {
    agent: AgentCreateNestedOneWithoutCapabilitiesInput
    capability: CapabilityCreateNestedOneWithoutAgentsInput
  }

  export type AgentCapabilityUncheckedCreateInput = {
    agentId: string
    capabilityId: string
  }

  export type AgentCapabilityUpdateInput = {
    agent?: AgentUpdateOneRequiredWithoutCapabilitiesNestedInput
    capability?: CapabilityUpdateOneRequiredWithoutAgentsNestedInput
  }

  export type AgentCapabilityUncheckedUpdateInput = {
    agentId?: StringFieldUpdateOperationsInput | string
    capabilityId?: StringFieldUpdateOperationsInput | string
  }

  export type AgentCapabilityCreateManyInput = {
    agentId: string
    capabilityId: string
  }

  export type AgentCapabilityUpdateManyMutationInput = {

  }

  export type AgentCapabilityUncheckedUpdateManyInput = {
    agentId?: StringFieldUpdateOperationsInput | string
    capabilityId?: StringFieldUpdateOperationsInput | string
  }

  export type PricingModelCreateInput = {
    id?: string
    pricingType: $Enums.PricingType
    price: Decimal | DecimalJsLike | number | string
    currency?: string
    billingUnit?: string
    updatedAt?: Date | string
    agent: AgentCreateNestedOneWithoutPricingModelsInput
  }

  export type PricingModelUncheckedCreateInput = {
    id?: string
    agentId: string
    pricingType: $Enums.PricingType
    price: Decimal | DecimalJsLike | number | string
    currency?: string
    billingUnit?: string
    updatedAt?: Date | string
  }

  export type PricingModelUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    pricingType?: EnumPricingTypeFieldUpdateOperationsInput | $Enums.PricingType
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    billingUnit?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: AgentUpdateOneRequiredWithoutPricingModelsNestedInput
  }

  export type PricingModelUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    pricingType?: EnumPricingTypeFieldUpdateOperationsInput | $Enums.PricingType
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    billingUnit?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PricingModelCreateManyInput = {
    id?: string
    agentId: string
    pricingType: $Enums.PricingType
    price: Decimal | DecimalJsLike | number | string
    currency?: string
    billingUnit?: string
    updatedAt?: Date | string
  }

  export type PricingModelUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    pricingType?: EnumPricingTypeFieldUpdateOperationsInput | $Enums.PricingType
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    billingUnit?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PricingModelUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    pricingType?: EnumPricingTypeFieldUpdateOperationsInput | $Enums.PricingType
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    billingUnit?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewCreateInput = {
    id?: string
    userId: string
    rating: number
    comment?: string | null
    verifiedPurchase?: boolean
    createdAt?: Date | string
    agent: AgentCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateInput = {
    id?: string
    agentId: string
    userId: string
    rating: number
    comment?: string | null
    verifiedPurchase?: boolean
    createdAt?: Date | string
  }

  export type ReviewUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedPurchase?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: AgentUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedPurchase?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewCreateManyInput = {
    id?: string
    agentId: string
    userId: string
    rating: number
    comment?: string | null
    verifiedPurchase?: boolean
    createdAt?: Date | string
  }

  export type ReviewUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedPurchase?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedPurchase?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumVerificationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationStatus | EnumVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationStatusFilter<$PrismaModel> | $Enums.VerificationStatus
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AgentVersionListRelationFilter = {
    every?: AgentVersionWhereInput
    some?: AgentVersionWhereInput
    none?: AgentVersionWhereInput
  }

  export type AgentCapabilityListRelationFilter = {
    every?: AgentCapabilityWhereInput
    some?: AgentCapabilityWhereInput
    none?: AgentCapabilityWhereInput
  }

  export type PricingModelListRelationFilter = {
    every?: PricingModelWhereInput
    some?: PricingModelWhereInput
    none?: PricingModelWhereInput
  }

  export type ReviewListRelationFilter = {
    every?: ReviewWhereInput
    some?: ReviewWhereInput
    none?: ReviewWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AgentVersionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AgentCapabilityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PricingModelOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AgentCountOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    description?: SortOrder
    logoUrl?: SortOrder
    verificationStatus?: SortOrder
    averageRating?: SortOrder
    trustScore?: SortOrder
    capDid?: SortOrder
    capRegisteredAt?: SortOrder
    capReputationScore?: SortOrder
    capEndpoint?: SortOrder
    capStoreId?: SortOrder
    category?: SortOrder
    skills?: SortOrder
    tags?: SortOrder
    price?: SortOrder
    latency?: SortOrder
    accuracy?: SortOrder
    verificationCount?: SortOrder
    failureRate?: SortOrder
    status?: SortOrder
    walletAddress?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type AgentAvgOrderByAggregateInput = {
    averageRating?: SortOrder
    trustScore?: SortOrder
    capReputationScore?: SortOrder
    price?: SortOrder
    latency?: SortOrder
    accuracy?: SortOrder
    verificationCount?: SortOrder
    failureRate?: SortOrder
  }

  export type AgentMaxOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    description?: SortOrder
    logoUrl?: SortOrder
    verificationStatus?: SortOrder
    averageRating?: SortOrder
    trustScore?: SortOrder
    capDid?: SortOrder
    capRegisteredAt?: SortOrder
    capReputationScore?: SortOrder
    capEndpoint?: SortOrder
    capStoreId?: SortOrder
    category?: SortOrder
    price?: SortOrder
    latency?: SortOrder
    accuracy?: SortOrder
    verificationCount?: SortOrder
    failureRate?: SortOrder
    status?: SortOrder
    walletAddress?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type AgentMinOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    description?: SortOrder
    logoUrl?: SortOrder
    verificationStatus?: SortOrder
    averageRating?: SortOrder
    trustScore?: SortOrder
    capDid?: SortOrder
    capRegisteredAt?: SortOrder
    capReputationScore?: SortOrder
    capEndpoint?: SortOrder
    capStoreId?: SortOrder
    category?: SortOrder
    price?: SortOrder
    latency?: SortOrder
    accuracy?: SortOrder
    verificationCount?: SortOrder
    failureRate?: SortOrder
    status?: SortOrder
    walletAddress?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type AgentSumOrderByAggregateInput = {
    averageRating?: SortOrder
    trustScore?: SortOrder
    capReputationScore?: SortOrder
    price?: SortOrder
    latency?: SortOrder
    accuracy?: SortOrder
    verificationCount?: SortOrder
    failureRate?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumVerificationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationStatus | EnumVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationStatusWithAggregatesFilter<$PrismaModel> | $Enums.VerificationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVerificationStatusFilter<$PrismaModel>
    _max?: NestedEnumVerificationStatusFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AgentRelationFilter = {
    is?: AgentWhereInput
    isNot?: AgentWhereInput
  }

  export type AgentVersionCountOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    version?: SortOrder
    endpoint?: SortOrder
    inputSchema?: SortOrder
    outputSchema?: SortOrder
    publishedAt?: SortOrder
  }

  export type AgentVersionMaxOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    version?: SortOrder
    endpoint?: SortOrder
    publishedAt?: SortOrder
  }

  export type AgentVersionMinOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    version?: SortOrder
    endpoint?: SortOrder
    publishedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type CapabilityCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type CapabilityMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type CapabilityMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type CapabilityRelationFilter = {
    is?: CapabilityWhereInput
    isNot?: CapabilityWhereInput
  }

  export type AgentCapabilityAgentIdCapabilityIdCompoundUniqueInput = {
    agentId: string
    capabilityId: string
  }

  export type AgentCapabilityCountOrderByAggregateInput = {
    agentId?: SortOrder
    capabilityId?: SortOrder
  }

  export type AgentCapabilityMaxOrderByAggregateInput = {
    agentId?: SortOrder
    capabilityId?: SortOrder
  }

  export type AgentCapabilityMinOrderByAggregateInput = {
    agentId?: SortOrder
    capabilityId?: SortOrder
  }

  export type EnumPricingTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PricingType | EnumPricingTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PricingType[] | ListEnumPricingTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PricingType[] | ListEnumPricingTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPricingTypeFilter<$PrismaModel> | $Enums.PricingType
  }

  export type PricingModelCountOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    pricingType?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    billingUnit?: SortOrder
    updatedAt?: SortOrder
  }

  export type PricingModelAvgOrderByAggregateInput = {
    price?: SortOrder
  }

  export type PricingModelMaxOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    pricingType?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    billingUnit?: SortOrder
    updatedAt?: SortOrder
  }

  export type PricingModelMinOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    pricingType?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    billingUnit?: SortOrder
    updatedAt?: SortOrder
  }

  export type PricingModelSumOrderByAggregateInput = {
    price?: SortOrder
  }

  export type EnumPricingTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PricingType | EnumPricingTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PricingType[] | ListEnumPricingTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PricingType[] | ListEnumPricingTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPricingTypeWithAggregatesFilter<$PrismaModel> | $Enums.PricingType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPricingTypeFilter<$PrismaModel>
    _max?: NestedEnumPricingTypeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ReviewCountOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    userId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    verifiedPurchase?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewAvgOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type ReviewMaxOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    userId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    verifiedPurchase?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewMinOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    userId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    verifiedPurchase?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewSumOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type AgentCreateskillsInput = {
    set: string[]
  }

  export type AgentCreatetagsInput = {
    set: string[]
  }

  export type AgentVersionCreateNestedManyWithoutAgentInput = {
    create?: XOR<AgentVersionCreateWithoutAgentInput, AgentVersionUncheckedCreateWithoutAgentInput> | AgentVersionCreateWithoutAgentInput[] | AgentVersionUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: AgentVersionCreateOrConnectWithoutAgentInput | AgentVersionCreateOrConnectWithoutAgentInput[]
    createMany?: AgentVersionCreateManyAgentInputEnvelope
    connect?: AgentVersionWhereUniqueInput | AgentVersionWhereUniqueInput[]
  }

  export type AgentCapabilityCreateNestedManyWithoutAgentInput = {
    create?: XOR<AgentCapabilityCreateWithoutAgentInput, AgentCapabilityUncheckedCreateWithoutAgentInput> | AgentCapabilityCreateWithoutAgentInput[] | AgentCapabilityUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: AgentCapabilityCreateOrConnectWithoutAgentInput | AgentCapabilityCreateOrConnectWithoutAgentInput[]
    createMany?: AgentCapabilityCreateManyAgentInputEnvelope
    connect?: AgentCapabilityWhereUniqueInput | AgentCapabilityWhereUniqueInput[]
  }

  export type PricingModelCreateNestedManyWithoutAgentInput = {
    create?: XOR<PricingModelCreateWithoutAgentInput, PricingModelUncheckedCreateWithoutAgentInput> | PricingModelCreateWithoutAgentInput[] | PricingModelUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: PricingModelCreateOrConnectWithoutAgentInput | PricingModelCreateOrConnectWithoutAgentInput[]
    createMany?: PricingModelCreateManyAgentInputEnvelope
    connect?: PricingModelWhereUniqueInput | PricingModelWhereUniqueInput[]
  }

  export type ReviewCreateNestedManyWithoutAgentInput = {
    create?: XOR<ReviewCreateWithoutAgentInput, ReviewUncheckedCreateWithoutAgentInput> | ReviewCreateWithoutAgentInput[] | ReviewUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutAgentInput | ReviewCreateOrConnectWithoutAgentInput[]
    createMany?: ReviewCreateManyAgentInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type AgentVersionUncheckedCreateNestedManyWithoutAgentInput = {
    create?: XOR<AgentVersionCreateWithoutAgentInput, AgentVersionUncheckedCreateWithoutAgentInput> | AgentVersionCreateWithoutAgentInput[] | AgentVersionUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: AgentVersionCreateOrConnectWithoutAgentInput | AgentVersionCreateOrConnectWithoutAgentInput[]
    createMany?: AgentVersionCreateManyAgentInputEnvelope
    connect?: AgentVersionWhereUniqueInput | AgentVersionWhereUniqueInput[]
  }

  export type AgentCapabilityUncheckedCreateNestedManyWithoutAgentInput = {
    create?: XOR<AgentCapabilityCreateWithoutAgentInput, AgentCapabilityUncheckedCreateWithoutAgentInput> | AgentCapabilityCreateWithoutAgentInput[] | AgentCapabilityUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: AgentCapabilityCreateOrConnectWithoutAgentInput | AgentCapabilityCreateOrConnectWithoutAgentInput[]
    createMany?: AgentCapabilityCreateManyAgentInputEnvelope
    connect?: AgentCapabilityWhereUniqueInput | AgentCapabilityWhereUniqueInput[]
  }

  export type PricingModelUncheckedCreateNestedManyWithoutAgentInput = {
    create?: XOR<PricingModelCreateWithoutAgentInput, PricingModelUncheckedCreateWithoutAgentInput> | PricingModelCreateWithoutAgentInput[] | PricingModelUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: PricingModelCreateOrConnectWithoutAgentInput | PricingModelCreateOrConnectWithoutAgentInput[]
    createMany?: PricingModelCreateManyAgentInputEnvelope
    connect?: PricingModelWhereUniqueInput | PricingModelWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutAgentInput = {
    create?: XOR<ReviewCreateWithoutAgentInput, ReviewUncheckedCreateWithoutAgentInput> | ReviewCreateWithoutAgentInput[] | ReviewUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutAgentInput | ReviewCreateOrConnectWithoutAgentInput[]
    createMany?: ReviewCreateManyAgentInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumVerificationStatusFieldUpdateOperationsInput = {
    set?: $Enums.VerificationStatus
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type AgentUpdateskillsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type AgentUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AgentVersionUpdateManyWithoutAgentNestedInput = {
    create?: XOR<AgentVersionCreateWithoutAgentInput, AgentVersionUncheckedCreateWithoutAgentInput> | AgentVersionCreateWithoutAgentInput[] | AgentVersionUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: AgentVersionCreateOrConnectWithoutAgentInput | AgentVersionCreateOrConnectWithoutAgentInput[]
    upsert?: AgentVersionUpsertWithWhereUniqueWithoutAgentInput | AgentVersionUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: AgentVersionCreateManyAgentInputEnvelope
    set?: AgentVersionWhereUniqueInput | AgentVersionWhereUniqueInput[]
    disconnect?: AgentVersionWhereUniqueInput | AgentVersionWhereUniqueInput[]
    delete?: AgentVersionWhereUniqueInput | AgentVersionWhereUniqueInput[]
    connect?: AgentVersionWhereUniqueInput | AgentVersionWhereUniqueInput[]
    update?: AgentVersionUpdateWithWhereUniqueWithoutAgentInput | AgentVersionUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: AgentVersionUpdateManyWithWhereWithoutAgentInput | AgentVersionUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: AgentVersionScalarWhereInput | AgentVersionScalarWhereInput[]
  }

  export type AgentCapabilityUpdateManyWithoutAgentNestedInput = {
    create?: XOR<AgentCapabilityCreateWithoutAgentInput, AgentCapabilityUncheckedCreateWithoutAgentInput> | AgentCapabilityCreateWithoutAgentInput[] | AgentCapabilityUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: AgentCapabilityCreateOrConnectWithoutAgentInput | AgentCapabilityCreateOrConnectWithoutAgentInput[]
    upsert?: AgentCapabilityUpsertWithWhereUniqueWithoutAgentInput | AgentCapabilityUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: AgentCapabilityCreateManyAgentInputEnvelope
    set?: AgentCapabilityWhereUniqueInput | AgentCapabilityWhereUniqueInput[]
    disconnect?: AgentCapabilityWhereUniqueInput | AgentCapabilityWhereUniqueInput[]
    delete?: AgentCapabilityWhereUniqueInput | AgentCapabilityWhereUniqueInput[]
    connect?: AgentCapabilityWhereUniqueInput | AgentCapabilityWhereUniqueInput[]
    update?: AgentCapabilityUpdateWithWhereUniqueWithoutAgentInput | AgentCapabilityUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: AgentCapabilityUpdateManyWithWhereWithoutAgentInput | AgentCapabilityUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: AgentCapabilityScalarWhereInput | AgentCapabilityScalarWhereInput[]
  }

  export type PricingModelUpdateManyWithoutAgentNestedInput = {
    create?: XOR<PricingModelCreateWithoutAgentInput, PricingModelUncheckedCreateWithoutAgentInput> | PricingModelCreateWithoutAgentInput[] | PricingModelUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: PricingModelCreateOrConnectWithoutAgentInput | PricingModelCreateOrConnectWithoutAgentInput[]
    upsert?: PricingModelUpsertWithWhereUniqueWithoutAgentInput | PricingModelUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: PricingModelCreateManyAgentInputEnvelope
    set?: PricingModelWhereUniqueInput | PricingModelWhereUniqueInput[]
    disconnect?: PricingModelWhereUniqueInput | PricingModelWhereUniqueInput[]
    delete?: PricingModelWhereUniqueInput | PricingModelWhereUniqueInput[]
    connect?: PricingModelWhereUniqueInput | PricingModelWhereUniqueInput[]
    update?: PricingModelUpdateWithWhereUniqueWithoutAgentInput | PricingModelUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: PricingModelUpdateManyWithWhereWithoutAgentInput | PricingModelUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: PricingModelScalarWhereInput | PricingModelScalarWhereInput[]
  }

  export type ReviewUpdateManyWithoutAgentNestedInput = {
    create?: XOR<ReviewCreateWithoutAgentInput, ReviewUncheckedCreateWithoutAgentInput> | ReviewCreateWithoutAgentInput[] | ReviewUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutAgentInput | ReviewCreateOrConnectWithoutAgentInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutAgentInput | ReviewUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: ReviewCreateManyAgentInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutAgentInput | ReviewUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutAgentInput | ReviewUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type AgentVersionUncheckedUpdateManyWithoutAgentNestedInput = {
    create?: XOR<AgentVersionCreateWithoutAgentInput, AgentVersionUncheckedCreateWithoutAgentInput> | AgentVersionCreateWithoutAgentInput[] | AgentVersionUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: AgentVersionCreateOrConnectWithoutAgentInput | AgentVersionCreateOrConnectWithoutAgentInput[]
    upsert?: AgentVersionUpsertWithWhereUniqueWithoutAgentInput | AgentVersionUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: AgentVersionCreateManyAgentInputEnvelope
    set?: AgentVersionWhereUniqueInput | AgentVersionWhereUniqueInput[]
    disconnect?: AgentVersionWhereUniqueInput | AgentVersionWhereUniqueInput[]
    delete?: AgentVersionWhereUniqueInput | AgentVersionWhereUniqueInput[]
    connect?: AgentVersionWhereUniqueInput | AgentVersionWhereUniqueInput[]
    update?: AgentVersionUpdateWithWhereUniqueWithoutAgentInput | AgentVersionUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: AgentVersionUpdateManyWithWhereWithoutAgentInput | AgentVersionUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: AgentVersionScalarWhereInput | AgentVersionScalarWhereInput[]
  }

  export type AgentCapabilityUncheckedUpdateManyWithoutAgentNestedInput = {
    create?: XOR<AgentCapabilityCreateWithoutAgentInput, AgentCapabilityUncheckedCreateWithoutAgentInput> | AgentCapabilityCreateWithoutAgentInput[] | AgentCapabilityUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: AgentCapabilityCreateOrConnectWithoutAgentInput | AgentCapabilityCreateOrConnectWithoutAgentInput[]
    upsert?: AgentCapabilityUpsertWithWhereUniqueWithoutAgentInput | AgentCapabilityUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: AgentCapabilityCreateManyAgentInputEnvelope
    set?: AgentCapabilityWhereUniqueInput | AgentCapabilityWhereUniqueInput[]
    disconnect?: AgentCapabilityWhereUniqueInput | AgentCapabilityWhereUniqueInput[]
    delete?: AgentCapabilityWhereUniqueInput | AgentCapabilityWhereUniqueInput[]
    connect?: AgentCapabilityWhereUniqueInput | AgentCapabilityWhereUniqueInput[]
    update?: AgentCapabilityUpdateWithWhereUniqueWithoutAgentInput | AgentCapabilityUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: AgentCapabilityUpdateManyWithWhereWithoutAgentInput | AgentCapabilityUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: AgentCapabilityScalarWhereInput | AgentCapabilityScalarWhereInput[]
  }

  export type PricingModelUncheckedUpdateManyWithoutAgentNestedInput = {
    create?: XOR<PricingModelCreateWithoutAgentInput, PricingModelUncheckedCreateWithoutAgentInput> | PricingModelCreateWithoutAgentInput[] | PricingModelUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: PricingModelCreateOrConnectWithoutAgentInput | PricingModelCreateOrConnectWithoutAgentInput[]
    upsert?: PricingModelUpsertWithWhereUniqueWithoutAgentInput | PricingModelUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: PricingModelCreateManyAgentInputEnvelope
    set?: PricingModelWhereUniqueInput | PricingModelWhereUniqueInput[]
    disconnect?: PricingModelWhereUniqueInput | PricingModelWhereUniqueInput[]
    delete?: PricingModelWhereUniqueInput | PricingModelWhereUniqueInput[]
    connect?: PricingModelWhereUniqueInput | PricingModelWhereUniqueInput[]
    update?: PricingModelUpdateWithWhereUniqueWithoutAgentInput | PricingModelUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: PricingModelUpdateManyWithWhereWithoutAgentInput | PricingModelUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: PricingModelScalarWhereInput | PricingModelScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutAgentNestedInput = {
    create?: XOR<ReviewCreateWithoutAgentInput, ReviewUncheckedCreateWithoutAgentInput> | ReviewCreateWithoutAgentInput[] | ReviewUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutAgentInput | ReviewCreateOrConnectWithoutAgentInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutAgentInput | ReviewUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: ReviewCreateManyAgentInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutAgentInput | ReviewUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutAgentInput | ReviewUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type AgentCreateNestedOneWithoutVersionsInput = {
    create?: XOR<AgentCreateWithoutVersionsInput, AgentUncheckedCreateWithoutVersionsInput>
    connectOrCreate?: AgentCreateOrConnectWithoutVersionsInput
    connect?: AgentWhereUniqueInput
  }

  export type AgentUpdateOneRequiredWithoutVersionsNestedInput = {
    create?: XOR<AgentCreateWithoutVersionsInput, AgentUncheckedCreateWithoutVersionsInput>
    connectOrCreate?: AgentCreateOrConnectWithoutVersionsInput
    upsert?: AgentUpsertWithoutVersionsInput
    connect?: AgentWhereUniqueInput
    update?: XOR<XOR<AgentUpdateToOneWithWhereWithoutVersionsInput, AgentUpdateWithoutVersionsInput>, AgentUncheckedUpdateWithoutVersionsInput>
  }

  export type AgentCapabilityCreateNestedManyWithoutCapabilityInput = {
    create?: XOR<AgentCapabilityCreateWithoutCapabilityInput, AgentCapabilityUncheckedCreateWithoutCapabilityInput> | AgentCapabilityCreateWithoutCapabilityInput[] | AgentCapabilityUncheckedCreateWithoutCapabilityInput[]
    connectOrCreate?: AgentCapabilityCreateOrConnectWithoutCapabilityInput | AgentCapabilityCreateOrConnectWithoutCapabilityInput[]
    createMany?: AgentCapabilityCreateManyCapabilityInputEnvelope
    connect?: AgentCapabilityWhereUniqueInput | AgentCapabilityWhereUniqueInput[]
  }

  export type AgentCapabilityUncheckedCreateNestedManyWithoutCapabilityInput = {
    create?: XOR<AgentCapabilityCreateWithoutCapabilityInput, AgentCapabilityUncheckedCreateWithoutCapabilityInput> | AgentCapabilityCreateWithoutCapabilityInput[] | AgentCapabilityUncheckedCreateWithoutCapabilityInput[]
    connectOrCreate?: AgentCapabilityCreateOrConnectWithoutCapabilityInput | AgentCapabilityCreateOrConnectWithoutCapabilityInput[]
    createMany?: AgentCapabilityCreateManyCapabilityInputEnvelope
    connect?: AgentCapabilityWhereUniqueInput | AgentCapabilityWhereUniqueInput[]
  }

  export type AgentCapabilityUpdateManyWithoutCapabilityNestedInput = {
    create?: XOR<AgentCapabilityCreateWithoutCapabilityInput, AgentCapabilityUncheckedCreateWithoutCapabilityInput> | AgentCapabilityCreateWithoutCapabilityInput[] | AgentCapabilityUncheckedCreateWithoutCapabilityInput[]
    connectOrCreate?: AgentCapabilityCreateOrConnectWithoutCapabilityInput | AgentCapabilityCreateOrConnectWithoutCapabilityInput[]
    upsert?: AgentCapabilityUpsertWithWhereUniqueWithoutCapabilityInput | AgentCapabilityUpsertWithWhereUniqueWithoutCapabilityInput[]
    createMany?: AgentCapabilityCreateManyCapabilityInputEnvelope
    set?: AgentCapabilityWhereUniqueInput | AgentCapabilityWhereUniqueInput[]
    disconnect?: AgentCapabilityWhereUniqueInput | AgentCapabilityWhereUniqueInput[]
    delete?: AgentCapabilityWhereUniqueInput | AgentCapabilityWhereUniqueInput[]
    connect?: AgentCapabilityWhereUniqueInput | AgentCapabilityWhereUniqueInput[]
    update?: AgentCapabilityUpdateWithWhereUniqueWithoutCapabilityInput | AgentCapabilityUpdateWithWhereUniqueWithoutCapabilityInput[]
    updateMany?: AgentCapabilityUpdateManyWithWhereWithoutCapabilityInput | AgentCapabilityUpdateManyWithWhereWithoutCapabilityInput[]
    deleteMany?: AgentCapabilityScalarWhereInput | AgentCapabilityScalarWhereInput[]
  }

  export type AgentCapabilityUncheckedUpdateManyWithoutCapabilityNestedInput = {
    create?: XOR<AgentCapabilityCreateWithoutCapabilityInput, AgentCapabilityUncheckedCreateWithoutCapabilityInput> | AgentCapabilityCreateWithoutCapabilityInput[] | AgentCapabilityUncheckedCreateWithoutCapabilityInput[]
    connectOrCreate?: AgentCapabilityCreateOrConnectWithoutCapabilityInput | AgentCapabilityCreateOrConnectWithoutCapabilityInput[]
    upsert?: AgentCapabilityUpsertWithWhereUniqueWithoutCapabilityInput | AgentCapabilityUpsertWithWhereUniqueWithoutCapabilityInput[]
    createMany?: AgentCapabilityCreateManyCapabilityInputEnvelope
    set?: AgentCapabilityWhereUniqueInput | AgentCapabilityWhereUniqueInput[]
    disconnect?: AgentCapabilityWhereUniqueInput | AgentCapabilityWhereUniqueInput[]
    delete?: AgentCapabilityWhereUniqueInput | AgentCapabilityWhereUniqueInput[]
    connect?: AgentCapabilityWhereUniqueInput | AgentCapabilityWhereUniqueInput[]
    update?: AgentCapabilityUpdateWithWhereUniqueWithoutCapabilityInput | AgentCapabilityUpdateWithWhereUniqueWithoutCapabilityInput[]
    updateMany?: AgentCapabilityUpdateManyWithWhereWithoutCapabilityInput | AgentCapabilityUpdateManyWithWhereWithoutCapabilityInput[]
    deleteMany?: AgentCapabilityScalarWhereInput | AgentCapabilityScalarWhereInput[]
  }

  export type AgentCreateNestedOneWithoutCapabilitiesInput = {
    create?: XOR<AgentCreateWithoutCapabilitiesInput, AgentUncheckedCreateWithoutCapabilitiesInput>
    connectOrCreate?: AgentCreateOrConnectWithoutCapabilitiesInput
    connect?: AgentWhereUniqueInput
  }

  export type CapabilityCreateNestedOneWithoutAgentsInput = {
    create?: XOR<CapabilityCreateWithoutAgentsInput, CapabilityUncheckedCreateWithoutAgentsInput>
    connectOrCreate?: CapabilityCreateOrConnectWithoutAgentsInput
    connect?: CapabilityWhereUniqueInput
  }

  export type AgentUpdateOneRequiredWithoutCapabilitiesNestedInput = {
    create?: XOR<AgentCreateWithoutCapabilitiesInput, AgentUncheckedCreateWithoutCapabilitiesInput>
    connectOrCreate?: AgentCreateOrConnectWithoutCapabilitiesInput
    upsert?: AgentUpsertWithoutCapabilitiesInput
    connect?: AgentWhereUniqueInput
    update?: XOR<XOR<AgentUpdateToOneWithWhereWithoutCapabilitiesInput, AgentUpdateWithoutCapabilitiesInput>, AgentUncheckedUpdateWithoutCapabilitiesInput>
  }

  export type CapabilityUpdateOneRequiredWithoutAgentsNestedInput = {
    create?: XOR<CapabilityCreateWithoutAgentsInput, CapabilityUncheckedCreateWithoutAgentsInput>
    connectOrCreate?: CapabilityCreateOrConnectWithoutAgentsInput
    upsert?: CapabilityUpsertWithoutAgentsInput
    connect?: CapabilityWhereUniqueInput
    update?: XOR<XOR<CapabilityUpdateToOneWithWhereWithoutAgentsInput, CapabilityUpdateWithoutAgentsInput>, CapabilityUncheckedUpdateWithoutAgentsInput>
  }

  export type AgentCreateNestedOneWithoutPricingModelsInput = {
    create?: XOR<AgentCreateWithoutPricingModelsInput, AgentUncheckedCreateWithoutPricingModelsInput>
    connectOrCreate?: AgentCreateOrConnectWithoutPricingModelsInput
    connect?: AgentWhereUniqueInput
  }

  export type EnumPricingTypeFieldUpdateOperationsInput = {
    set?: $Enums.PricingType
  }

  export type AgentUpdateOneRequiredWithoutPricingModelsNestedInput = {
    create?: XOR<AgentCreateWithoutPricingModelsInput, AgentUncheckedCreateWithoutPricingModelsInput>
    connectOrCreate?: AgentCreateOrConnectWithoutPricingModelsInput
    upsert?: AgentUpsertWithoutPricingModelsInput
    connect?: AgentWhereUniqueInput
    update?: XOR<XOR<AgentUpdateToOneWithWhereWithoutPricingModelsInput, AgentUpdateWithoutPricingModelsInput>, AgentUncheckedUpdateWithoutPricingModelsInput>
  }

  export type AgentCreateNestedOneWithoutReviewsInput = {
    create?: XOR<AgentCreateWithoutReviewsInput, AgentUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: AgentCreateOrConnectWithoutReviewsInput
    connect?: AgentWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type AgentUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<AgentCreateWithoutReviewsInput, AgentUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: AgentCreateOrConnectWithoutReviewsInput
    upsert?: AgentUpsertWithoutReviewsInput
    connect?: AgentWhereUniqueInput
    update?: XOR<XOR<AgentUpdateToOneWithWhereWithoutReviewsInput, AgentUpdateWithoutReviewsInput>, AgentUncheckedUpdateWithoutReviewsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumVerificationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationStatus | EnumVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationStatusFilter<$PrismaModel> | $Enums.VerificationStatus
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumVerificationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationStatus | EnumVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationStatusWithAggregatesFilter<$PrismaModel> | $Enums.VerificationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVerificationStatusFilter<$PrismaModel>
    _max?: NestedEnumVerificationStatusFilter<$PrismaModel>
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumPricingTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PricingType | EnumPricingTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PricingType[] | ListEnumPricingTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PricingType[] | ListEnumPricingTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPricingTypeFilter<$PrismaModel> | $Enums.PricingType
  }

  export type NestedEnumPricingTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PricingType | EnumPricingTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PricingType[] | ListEnumPricingTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PricingType[] | ListEnumPricingTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPricingTypeWithAggregatesFilter<$PrismaModel> | $Enums.PricingType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPricingTypeFilter<$PrismaModel>
    _max?: NestedEnumPricingTypeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type AgentVersionCreateWithoutAgentInput = {
    id?: string
    version: string
    endpoint: string
    inputSchema: JsonNullValueInput | InputJsonValue
    outputSchema: JsonNullValueInput | InputJsonValue
    publishedAt?: Date | string
  }

  export type AgentVersionUncheckedCreateWithoutAgentInput = {
    id?: string
    version: string
    endpoint: string
    inputSchema: JsonNullValueInput | InputJsonValue
    outputSchema: JsonNullValueInput | InputJsonValue
    publishedAt?: Date | string
  }

  export type AgentVersionCreateOrConnectWithoutAgentInput = {
    where: AgentVersionWhereUniqueInput
    create: XOR<AgentVersionCreateWithoutAgentInput, AgentVersionUncheckedCreateWithoutAgentInput>
  }

  export type AgentVersionCreateManyAgentInputEnvelope = {
    data: AgentVersionCreateManyAgentInput | AgentVersionCreateManyAgentInput[]
    skipDuplicates?: boolean
  }

  export type AgentCapabilityCreateWithoutAgentInput = {
    capability: CapabilityCreateNestedOneWithoutAgentsInput
  }

  export type AgentCapabilityUncheckedCreateWithoutAgentInput = {
    capabilityId: string
  }

  export type AgentCapabilityCreateOrConnectWithoutAgentInput = {
    where: AgentCapabilityWhereUniqueInput
    create: XOR<AgentCapabilityCreateWithoutAgentInput, AgentCapabilityUncheckedCreateWithoutAgentInput>
  }

  export type AgentCapabilityCreateManyAgentInputEnvelope = {
    data: AgentCapabilityCreateManyAgentInput | AgentCapabilityCreateManyAgentInput[]
    skipDuplicates?: boolean
  }

  export type PricingModelCreateWithoutAgentInput = {
    id?: string
    pricingType: $Enums.PricingType
    price: Decimal | DecimalJsLike | number | string
    currency?: string
    billingUnit?: string
    updatedAt?: Date | string
  }

  export type PricingModelUncheckedCreateWithoutAgentInput = {
    id?: string
    pricingType: $Enums.PricingType
    price: Decimal | DecimalJsLike | number | string
    currency?: string
    billingUnit?: string
    updatedAt?: Date | string
  }

  export type PricingModelCreateOrConnectWithoutAgentInput = {
    where: PricingModelWhereUniqueInput
    create: XOR<PricingModelCreateWithoutAgentInput, PricingModelUncheckedCreateWithoutAgentInput>
  }

  export type PricingModelCreateManyAgentInputEnvelope = {
    data: PricingModelCreateManyAgentInput | PricingModelCreateManyAgentInput[]
    skipDuplicates?: boolean
  }

  export type ReviewCreateWithoutAgentInput = {
    id?: string
    userId: string
    rating: number
    comment?: string | null
    verifiedPurchase?: boolean
    createdAt?: Date | string
  }

  export type ReviewUncheckedCreateWithoutAgentInput = {
    id?: string
    userId: string
    rating: number
    comment?: string | null
    verifiedPurchase?: boolean
    createdAt?: Date | string
  }

  export type ReviewCreateOrConnectWithoutAgentInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutAgentInput, ReviewUncheckedCreateWithoutAgentInput>
  }

  export type ReviewCreateManyAgentInputEnvelope = {
    data: ReviewCreateManyAgentInput | ReviewCreateManyAgentInput[]
    skipDuplicates?: boolean
  }

  export type AgentVersionUpsertWithWhereUniqueWithoutAgentInput = {
    where: AgentVersionWhereUniqueInput
    update: XOR<AgentVersionUpdateWithoutAgentInput, AgentVersionUncheckedUpdateWithoutAgentInput>
    create: XOR<AgentVersionCreateWithoutAgentInput, AgentVersionUncheckedCreateWithoutAgentInput>
  }

  export type AgentVersionUpdateWithWhereUniqueWithoutAgentInput = {
    where: AgentVersionWhereUniqueInput
    data: XOR<AgentVersionUpdateWithoutAgentInput, AgentVersionUncheckedUpdateWithoutAgentInput>
  }

  export type AgentVersionUpdateManyWithWhereWithoutAgentInput = {
    where: AgentVersionScalarWhereInput
    data: XOR<AgentVersionUpdateManyMutationInput, AgentVersionUncheckedUpdateManyWithoutAgentInput>
  }

  export type AgentVersionScalarWhereInput = {
    AND?: AgentVersionScalarWhereInput | AgentVersionScalarWhereInput[]
    OR?: AgentVersionScalarWhereInput[]
    NOT?: AgentVersionScalarWhereInput | AgentVersionScalarWhereInput[]
    id?: StringFilter<"AgentVersion"> | string
    agentId?: StringFilter<"AgentVersion"> | string
    version?: StringFilter<"AgentVersion"> | string
    endpoint?: StringFilter<"AgentVersion"> | string
    inputSchema?: JsonFilter<"AgentVersion">
    outputSchema?: JsonFilter<"AgentVersion">
    publishedAt?: DateTimeFilter<"AgentVersion"> | Date | string
  }

  export type AgentCapabilityUpsertWithWhereUniqueWithoutAgentInput = {
    where: AgentCapabilityWhereUniqueInput
    update: XOR<AgentCapabilityUpdateWithoutAgentInput, AgentCapabilityUncheckedUpdateWithoutAgentInput>
    create: XOR<AgentCapabilityCreateWithoutAgentInput, AgentCapabilityUncheckedCreateWithoutAgentInput>
  }

  export type AgentCapabilityUpdateWithWhereUniqueWithoutAgentInput = {
    where: AgentCapabilityWhereUniqueInput
    data: XOR<AgentCapabilityUpdateWithoutAgentInput, AgentCapabilityUncheckedUpdateWithoutAgentInput>
  }

  export type AgentCapabilityUpdateManyWithWhereWithoutAgentInput = {
    where: AgentCapabilityScalarWhereInput
    data: XOR<AgentCapabilityUpdateManyMutationInput, AgentCapabilityUncheckedUpdateManyWithoutAgentInput>
  }

  export type AgentCapabilityScalarWhereInput = {
    AND?: AgentCapabilityScalarWhereInput | AgentCapabilityScalarWhereInput[]
    OR?: AgentCapabilityScalarWhereInput[]
    NOT?: AgentCapabilityScalarWhereInput | AgentCapabilityScalarWhereInput[]
    agentId?: StringFilter<"AgentCapability"> | string
    capabilityId?: StringFilter<"AgentCapability"> | string
  }

  export type PricingModelUpsertWithWhereUniqueWithoutAgentInput = {
    where: PricingModelWhereUniqueInput
    update: XOR<PricingModelUpdateWithoutAgentInput, PricingModelUncheckedUpdateWithoutAgentInput>
    create: XOR<PricingModelCreateWithoutAgentInput, PricingModelUncheckedCreateWithoutAgentInput>
  }

  export type PricingModelUpdateWithWhereUniqueWithoutAgentInput = {
    where: PricingModelWhereUniqueInput
    data: XOR<PricingModelUpdateWithoutAgentInput, PricingModelUncheckedUpdateWithoutAgentInput>
  }

  export type PricingModelUpdateManyWithWhereWithoutAgentInput = {
    where: PricingModelScalarWhereInput
    data: XOR<PricingModelUpdateManyMutationInput, PricingModelUncheckedUpdateManyWithoutAgentInput>
  }

  export type PricingModelScalarWhereInput = {
    AND?: PricingModelScalarWhereInput | PricingModelScalarWhereInput[]
    OR?: PricingModelScalarWhereInput[]
    NOT?: PricingModelScalarWhereInput | PricingModelScalarWhereInput[]
    id?: StringFilter<"PricingModel"> | string
    agentId?: StringFilter<"PricingModel"> | string
    pricingType?: EnumPricingTypeFilter<"PricingModel"> | $Enums.PricingType
    price?: DecimalFilter<"PricingModel"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"PricingModel"> | string
    billingUnit?: StringFilter<"PricingModel"> | string
    updatedAt?: DateTimeFilter<"PricingModel"> | Date | string
  }

  export type ReviewUpsertWithWhereUniqueWithoutAgentInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutAgentInput, ReviewUncheckedUpdateWithoutAgentInput>
    create: XOR<ReviewCreateWithoutAgentInput, ReviewUncheckedCreateWithoutAgentInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutAgentInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutAgentInput, ReviewUncheckedUpdateWithoutAgentInput>
  }

  export type ReviewUpdateManyWithWhereWithoutAgentInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutAgentInput>
  }

  export type ReviewScalarWhereInput = {
    AND?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    OR?: ReviewScalarWhereInput[]
    NOT?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    id?: StringFilter<"Review"> | string
    agentId?: StringFilter<"Review"> | string
    userId?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    comment?: StringNullableFilter<"Review"> | string | null
    verifiedPurchase?: BoolFilter<"Review"> | boolean
    createdAt?: DateTimeFilter<"Review"> | Date | string
  }

  export type AgentCreateWithoutVersionsInput = {
    id?: string
    ownerId: string
    slug: string
    name: string
    description: string
    logoUrl?: string | null
    verificationStatus?: $Enums.VerificationStatus
    averageRating?: Decimal | DecimalJsLike | number | string
    trustScore?: Decimal | DecimalJsLike | number | string
    capDid?: string | null
    capRegisteredAt?: Date | string | null
    capReputationScore?: Decimal | DecimalJsLike | number | string | null
    capEndpoint?: string | null
    capStoreId?: string | null
    category?: string
    skills?: AgentCreateskillsInput | string[]
    tags?: AgentCreatetagsInput | string[]
    price?: number
    latency?: number
    accuracy?: number
    verificationCount?: number
    failureRate?: number
    status?: string
    walletAddress?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    capabilities?: AgentCapabilityCreateNestedManyWithoutAgentInput
    pricingModels?: PricingModelCreateNestedManyWithoutAgentInput
    reviews?: ReviewCreateNestedManyWithoutAgentInput
  }

  export type AgentUncheckedCreateWithoutVersionsInput = {
    id?: string
    ownerId: string
    slug: string
    name: string
    description: string
    logoUrl?: string | null
    verificationStatus?: $Enums.VerificationStatus
    averageRating?: Decimal | DecimalJsLike | number | string
    trustScore?: Decimal | DecimalJsLike | number | string
    capDid?: string | null
    capRegisteredAt?: Date | string | null
    capReputationScore?: Decimal | DecimalJsLike | number | string | null
    capEndpoint?: string | null
    capStoreId?: string | null
    category?: string
    skills?: AgentCreateskillsInput | string[]
    tags?: AgentCreatetagsInput | string[]
    price?: number
    latency?: number
    accuracy?: number
    verificationCount?: number
    failureRate?: number
    status?: string
    walletAddress?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    capabilities?: AgentCapabilityUncheckedCreateNestedManyWithoutAgentInput
    pricingModels?: PricingModelUncheckedCreateNestedManyWithoutAgentInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutAgentInput
  }

  export type AgentCreateOrConnectWithoutVersionsInput = {
    where: AgentWhereUniqueInput
    create: XOR<AgentCreateWithoutVersionsInput, AgentUncheckedCreateWithoutVersionsInput>
  }

  export type AgentUpsertWithoutVersionsInput = {
    update: XOR<AgentUpdateWithoutVersionsInput, AgentUncheckedUpdateWithoutVersionsInput>
    create: XOR<AgentCreateWithoutVersionsInput, AgentUncheckedCreateWithoutVersionsInput>
    where?: AgentWhereInput
  }

  export type AgentUpdateToOneWithWhereWithoutVersionsInput = {
    where?: AgentWhereInput
    data: XOR<AgentUpdateWithoutVersionsInput, AgentUncheckedUpdateWithoutVersionsInput>
  }

  export type AgentUpdateWithoutVersionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    averageRating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    trustScore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    capDid?: NullableStringFieldUpdateOperationsInput | string | null
    capRegisteredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    capReputationScore?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    capEndpoint?: NullableStringFieldUpdateOperationsInput | string | null
    capStoreId?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    skills?: AgentUpdateskillsInput | string[]
    tags?: AgentUpdatetagsInput | string[]
    price?: FloatFieldUpdateOperationsInput | number
    latency?: IntFieldUpdateOperationsInput | number
    accuracy?: FloatFieldUpdateOperationsInput | number
    verificationCount?: IntFieldUpdateOperationsInput | number
    failureRate?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    capabilities?: AgentCapabilityUpdateManyWithoutAgentNestedInput
    pricingModels?: PricingModelUpdateManyWithoutAgentNestedInput
    reviews?: ReviewUpdateManyWithoutAgentNestedInput
  }

  export type AgentUncheckedUpdateWithoutVersionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    averageRating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    trustScore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    capDid?: NullableStringFieldUpdateOperationsInput | string | null
    capRegisteredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    capReputationScore?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    capEndpoint?: NullableStringFieldUpdateOperationsInput | string | null
    capStoreId?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    skills?: AgentUpdateskillsInput | string[]
    tags?: AgentUpdatetagsInput | string[]
    price?: FloatFieldUpdateOperationsInput | number
    latency?: IntFieldUpdateOperationsInput | number
    accuracy?: FloatFieldUpdateOperationsInput | number
    verificationCount?: IntFieldUpdateOperationsInput | number
    failureRate?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    capabilities?: AgentCapabilityUncheckedUpdateManyWithoutAgentNestedInput
    pricingModels?: PricingModelUncheckedUpdateManyWithoutAgentNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutAgentNestedInput
  }

  export type AgentCapabilityCreateWithoutCapabilityInput = {
    agent: AgentCreateNestedOneWithoutCapabilitiesInput
  }

  export type AgentCapabilityUncheckedCreateWithoutCapabilityInput = {
    agentId: string
  }

  export type AgentCapabilityCreateOrConnectWithoutCapabilityInput = {
    where: AgentCapabilityWhereUniqueInput
    create: XOR<AgentCapabilityCreateWithoutCapabilityInput, AgentCapabilityUncheckedCreateWithoutCapabilityInput>
  }

  export type AgentCapabilityCreateManyCapabilityInputEnvelope = {
    data: AgentCapabilityCreateManyCapabilityInput | AgentCapabilityCreateManyCapabilityInput[]
    skipDuplicates?: boolean
  }

  export type AgentCapabilityUpsertWithWhereUniqueWithoutCapabilityInput = {
    where: AgentCapabilityWhereUniqueInput
    update: XOR<AgentCapabilityUpdateWithoutCapabilityInput, AgentCapabilityUncheckedUpdateWithoutCapabilityInput>
    create: XOR<AgentCapabilityCreateWithoutCapabilityInput, AgentCapabilityUncheckedCreateWithoutCapabilityInput>
  }

  export type AgentCapabilityUpdateWithWhereUniqueWithoutCapabilityInput = {
    where: AgentCapabilityWhereUniqueInput
    data: XOR<AgentCapabilityUpdateWithoutCapabilityInput, AgentCapabilityUncheckedUpdateWithoutCapabilityInput>
  }

  export type AgentCapabilityUpdateManyWithWhereWithoutCapabilityInput = {
    where: AgentCapabilityScalarWhereInput
    data: XOR<AgentCapabilityUpdateManyMutationInput, AgentCapabilityUncheckedUpdateManyWithoutCapabilityInput>
  }

  export type AgentCreateWithoutCapabilitiesInput = {
    id?: string
    ownerId: string
    slug: string
    name: string
    description: string
    logoUrl?: string | null
    verificationStatus?: $Enums.VerificationStatus
    averageRating?: Decimal | DecimalJsLike | number | string
    trustScore?: Decimal | DecimalJsLike | number | string
    capDid?: string | null
    capRegisteredAt?: Date | string | null
    capReputationScore?: Decimal | DecimalJsLike | number | string | null
    capEndpoint?: string | null
    capStoreId?: string | null
    category?: string
    skills?: AgentCreateskillsInput | string[]
    tags?: AgentCreatetagsInput | string[]
    price?: number
    latency?: number
    accuracy?: number
    verificationCount?: number
    failureRate?: number
    status?: string
    walletAddress?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    versions?: AgentVersionCreateNestedManyWithoutAgentInput
    pricingModels?: PricingModelCreateNestedManyWithoutAgentInput
    reviews?: ReviewCreateNestedManyWithoutAgentInput
  }

  export type AgentUncheckedCreateWithoutCapabilitiesInput = {
    id?: string
    ownerId: string
    slug: string
    name: string
    description: string
    logoUrl?: string | null
    verificationStatus?: $Enums.VerificationStatus
    averageRating?: Decimal | DecimalJsLike | number | string
    trustScore?: Decimal | DecimalJsLike | number | string
    capDid?: string | null
    capRegisteredAt?: Date | string | null
    capReputationScore?: Decimal | DecimalJsLike | number | string | null
    capEndpoint?: string | null
    capStoreId?: string | null
    category?: string
    skills?: AgentCreateskillsInput | string[]
    tags?: AgentCreatetagsInput | string[]
    price?: number
    latency?: number
    accuracy?: number
    verificationCount?: number
    failureRate?: number
    status?: string
    walletAddress?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    versions?: AgentVersionUncheckedCreateNestedManyWithoutAgentInput
    pricingModels?: PricingModelUncheckedCreateNestedManyWithoutAgentInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutAgentInput
  }

  export type AgentCreateOrConnectWithoutCapabilitiesInput = {
    where: AgentWhereUniqueInput
    create: XOR<AgentCreateWithoutCapabilitiesInput, AgentUncheckedCreateWithoutCapabilitiesInput>
  }

  export type CapabilityCreateWithoutAgentsInput = {
    id?: string
    name: string
    description?: string | null
  }

  export type CapabilityUncheckedCreateWithoutAgentsInput = {
    id?: string
    name: string
    description?: string | null
  }

  export type CapabilityCreateOrConnectWithoutAgentsInput = {
    where: CapabilityWhereUniqueInput
    create: XOR<CapabilityCreateWithoutAgentsInput, CapabilityUncheckedCreateWithoutAgentsInput>
  }

  export type AgentUpsertWithoutCapabilitiesInput = {
    update: XOR<AgentUpdateWithoutCapabilitiesInput, AgentUncheckedUpdateWithoutCapabilitiesInput>
    create: XOR<AgentCreateWithoutCapabilitiesInput, AgentUncheckedCreateWithoutCapabilitiesInput>
    where?: AgentWhereInput
  }

  export type AgentUpdateToOneWithWhereWithoutCapabilitiesInput = {
    where?: AgentWhereInput
    data: XOR<AgentUpdateWithoutCapabilitiesInput, AgentUncheckedUpdateWithoutCapabilitiesInput>
  }

  export type AgentUpdateWithoutCapabilitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    averageRating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    trustScore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    capDid?: NullableStringFieldUpdateOperationsInput | string | null
    capRegisteredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    capReputationScore?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    capEndpoint?: NullableStringFieldUpdateOperationsInput | string | null
    capStoreId?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    skills?: AgentUpdateskillsInput | string[]
    tags?: AgentUpdatetagsInput | string[]
    price?: FloatFieldUpdateOperationsInput | number
    latency?: IntFieldUpdateOperationsInput | number
    accuracy?: FloatFieldUpdateOperationsInput | number
    verificationCount?: IntFieldUpdateOperationsInput | number
    failureRate?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    versions?: AgentVersionUpdateManyWithoutAgentNestedInput
    pricingModels?: PricingModelUpdateManyWithoutAgentNestedInput
    reviews?: ReviewUpdateManyWithoutAgentNestedInput
  }

  export type AgentUncheckedUpdateWithoutCapabilitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    averageRating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    trustScore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    capDid?: NullableStringFieldUpdateOperationsInput | string | null
    capRegisteredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    capReputationScore?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    capEndpoint?: NullableStringFieldUpdateOperationsInput | string | null
    capStoreId?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    skills?: AgentUpdateskillsInput | string[]
    tags?: AgentUpdatetagsInput | string[]
    price?: FloatFieldUpdateOperationsInput | number
    latency?: IntFieldUpdateOperationsInput | number
    accuracy?: FloatFieldUpdateOperationsInput | number
    verificationCount?: IntFieldUpdateOperationsInput | number
    failureRate?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    versions?: AgentVersionUncheckedUpdateManyWithoutAgentNestedInput
    pricingModels?: PricingModelUncheckedUpdateManyWithoutAgentNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutAgentNestedInput
  }

  export type CapabilityUpsertWithoutAgentsInput = {
    update: XOR<CapabilityUpdateWithoutAgentsInput, CapabilityUncheckedUpdateWithoutAgentsInput>
    create: XOR<CapabilityCreateWithoutAgentsInput, CapabilityUncheckedCreateWithoutAgentsInput>
    where?: CapabilityWhereInput
  }

  export type CapabilityUpdateToOneWithWhereWithoutAgentsInput = {
    where?: CapabilityWhereInput
    data: XOR<CapabilityUpdateWithoutAgentsInput, CapabilityUncheckedUpdateWithoutAgentsInput>
  }

  export type CapabilityUpdateWithoutAgentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CapabilityUncheckedUpdateWithoutAgentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AgentCreateWithoutPricingModelsInput = {
    id?: string
    ownerId: string
    slug: string
    name: string
    description: string
    logoUrl?: string | null
    verificationStatus?: $Enums.VerificationStatus
    averageRating?: Decimal | DecimalJsLike | number | string
    trustScore?: Decimal | DecimalJsLike | number | string
    capDid?: string | null
    capRegisteredAt?: Date | string | null
    capReputationScore?: Decimal | DecimalJsLike | number | string | null
    capEndpoint?: string | null
    capStoreId?: string | null
    category?: string
    skills?: AgentCreateskillsInput | string[]
    tags?: AgentCreatetagsInput | string[]
    price?: number
    latency?: number
    accuracy?: number
    verificationCount?: number
    failureRate?: number
    status?: string
    walletAddress?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    versions?: AgentVersionCreateNestedManyWithoutAgentInput
    capabilities?: AgentCapabilityCreateNestedManyWithoutAgentInput
    reviews?: ReviewCreateNestedManyWithoutAgentInput
  }

  export type AgentUncheckedCreateWithoutPricingModelsInput = {
    id?: string
    ownerId: string
    slug: string
    name: string
    description: string
    logoUrl?: string | null
    verificationStatus?: $Enums.VerificationStatus
    averageRating?: Decimal | DecimalJsLike | number | string
    trustScore?: Decimal | DecimalJsLike | number | string
    capDid?: string | null
    capRegisteredAt?: Date | string | null
    capReputationScore?: Decimal | DecimalJsLike | number | string | null
    capEndpoint?: string | null
    capStoreId?: string | null
    category?: string
    skills?: AgentCreateskillsInput | string[]
    tags?: AgentCreatetagsInput | string[]
    price?: number
    latency?: number
    accuracy?: number
    verificationCount?: number
    failureRate?: number
    status?: string
    walletAddress?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    versions?: AgentVersionUncheckedCreateNestedManyWithoutAgentInput
    capabilities?: AgentCapabilityUncheckedCreateNestedManyWithoutAgentInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutAgentInput
  }

  export type AgentCreateOrConnectWithoutPricingModelsInput = {
    where: AgentWhereUniqueInput
    create: XOR<AgentCreateWithoutPricingModelsInput, AgentUncheckedCreateWithoutPricingModelsInput>
  }

  export type AgentUpsertWithoutPricingModelsInput = {
    update: XOR<AgentUpdateWithoutPricingModelsInput, AgentUncheckedUpdateWithoutPricingModelsInput>
    create: XOR<AgentCreateWithoutPricingModelsInput, AgentUncheckedCreateWithoutPricingModelsInput>
    where?: AgentWhereInput
  }

  export type AgentUpdateToOneWithWhereWithoutPricingModelsInput = {
    where?: AgentWhereInput
    data: XOR<AgentUpdateWithoutPricingModelsInput, AgentUncheckedUpdateWithoutPricingModelsInput>
  }

  export type AgentUpdateWithoutPricingModelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    averageRating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    trustScore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    capDid?: NullableStringFieldUpdateOperationsInput | string | null
    capRegisteredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    capReputationScore?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    capEndpoint?: NullableStringFieldUpdateOperationsInput | string | null
    capStoreId?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    skills?: AgentUpdateskillsInput | string[]
    tags?: AgentUpdatetagsInput | string[]
    price?: FloatFieldUpdateOperationsInput | number
    latency?: IntFieldUpdateOperationsInput | number
    accuracy?: FloatFieldUpdateOperationsInput | number
    verificationCount?: IntFieldUpdateOperationsInput | number
    failureRate?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    versions?: AgentVersionUpdateManyWithoutAgentNestedInput
    capabilities?: AgentCapabilityUpdateManyWithoutAgentNestedInput
    reviews?: ReviewUpdateManyWithoutAgentNestedInput
  }

  export type AgentUncheckedUpdateWithoutPricingModelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    averageRating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    trustScore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    capDid?: NullableStringFieldUpdateOperationsInput | string | null
    capRegisteredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    capReputationScore?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    capEndpoint?: NullableStringFieldUpdateOperationsInput | string | null
    capStoreId?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    skills?: AgentUpdateskillsInput | string[]
    tags?: AgentUpdatetagsInput | string[]
    price?: FloatFieldUpdateOperationsInput | number
    latency?: IntFieldUpdateOperationsInput | number
    accuracy?: FloatFieldUpdateOperationsInput | number
    verificationCount?: IntFieldUpdateOperationsInput | number
    failureRate?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    versions?: AgentVersionUncheckedUpdateManyWithoutAgentNestedInput
    capabilities?: AgentCapabilityUncheckedUpdateManyWithoutAgentNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutAgentNestedInput
  }

  export type AgentCreateWithoutReviewsInput = {
    id?: string
    ownerId: string
    slug: string
    name: string
    description: string
    logoUrl?: string | null
    verificationStatus?: $Enums.VerificationStatus
    averageRating?: Decimal | DecimalJsLike | number | string
    trustScore?: Decimal | DecimalJsLike | number | string
    capDid?: string | null
    capRegisteredAt?: Date | string | null
    capReputationScore?: Decimal | DecimalJsLike | number | string | null
    capEndpoint?: string | null
    capStoreId?: string | null
    category?: string
    skills?: AgentCreateskillsInput | string[]
    tags?: AgentCreatetagsInput | string[]
    price?: number
    latency?: number
    accuracy?: number
    verificationCount?: number
    failureRate?: number
    status?: string
    walletAddress?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    versions?: AgentVersionCreateNestedManyWithoutAgentInput
    capabilities?: AgentCapabilityCreateNestedManyWithoutAgentInput
    pricingModels?: PricingModelCreateNestedManyWithoutAgentInput
  }

  export type AgentUncheckedCreateWithoutReviewsInput = {
    id?: string
    ownerId: string
    slug: string
    name: string
    description: string
    logoUrl?: string | null
    verificationStatus?: $Enums.VerificationStatus
    averageRating?: Decimal | DecimalJsLike | number | string
    trustScore?: Decimal | DecimalJsLike | number | string
    capDid?: string | null
    capRegisteredAt?: Date | string | null
    capReputationScore?: Decimal | DecimalJsLike | number | string | null
    capEndpoint?: string | null
    capStoreId?: string | null
    category?: string
    skills?: AgentCreateskillsInput | string[]
    tags?: AgentCreatetagsInput | string[]
    price?: number
    latency?: number
    accuracy?: number
    verificationCount?: number
    failureRate?: number
    status?: string
    walletAddress?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    versions?: AgentVersionUncheckedCreateNestedManyWithoutAgentInput
    capabilities?: AgentCapabilityUncheckedCreateNestedManyWithoutAgentInput
    pricingModels?: PricingModelUncheckedCreateNestedManyWithoutAgentInput
  }

  export type AgentCreateOrConnectWithoutReviewsInput = {
    where: AgentWhereUniqueInput
    create: XOR<AgentCreateWithoutReviewsInput, AgentUncheckedCreateWithoutReviewsInput>
  }

  export type AgentUpsertWithoutReviewsInput = {
    update: XOR<AgentUpdateWithoutReviewsInput, AgentUncheckedUpdateWithoutReviewsInput>
    create: XOR<AgentCreateWithoutReviewsInput, AgentUncheckedCreateWithoutReviewsInput>
    where?: AgentWhereInput
  }

  export type AgentUpdateToOneWithWhereWithoutReviewsInput = {
    where?: AgentWhereInput
    data: XOR<AgentUpdateWithoutReviewsInput, AgentUncheckedUpdateWithoutReviewsInput>
  }

  export type AgentUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    averageRating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    trustScore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    capDid?: NullableStringFieldUpdateOperationsInput | string | null
    capRegisteredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    capReputationScore?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    capEndpoint?: NullableStringFieldUpdateOperationsInput | string | null
    capStoreId?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    skills?: AgentUpdateskillsInput | string[]
    tags?: AgentUpdatetagsInput | string[]
    price?: FloatFieldUpdateOperationsInput | number
    latency?: IntFieldUpdateOperationsInput | number
    accuracy?: FloatFieldUpdateOperationsInput | number
    verificationCount?: IntFieldUpdateOperationsInput | number
    failureRate?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    versions?: AgentVersionUpdateManyWithoutAgentNestedInput
    capabilities?: AgentCapabilityUpdateManyWithoutAgentNestedInput
    pricingModels?: PricingModelUpdateManyWithoutAgentNestedInput
  }

  export type AgentUncheckedUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    averageRating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    trustScore?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    capDid?: NullableStringFieldUpdateOperationsInput | string | null
    capRegisteredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    capReputationScore?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    capEndpoint?: NullableStringFieldUpdateOperationsInput | string | null
    capStoreId?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    skills?: AgentUpdateskillsInput | string[]
    tags?: AgentUpdatetagsInput | string[]
    price?: FloatFieldUpdateOperationsInput | number
    latency?: IntFieldUpdateOperationsInput | number
    accuracy?: FloatFieldUpdateOperationsInput | number
    verificationCount?: IntFieldUpdateOperationsInput | number
    failureRate?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    versions?: AgentVersionUncheckedUpdateManyWithoutAgentNestedInput
    capabilities?: AgentCapabilityUncheckedUpdateManyWithoutAgentNestedInput
    pricingModels?: PricingModelUncheckedUpdateManyWithoutAgentNestedInput
  }

  export type AgentVersionCreateManyAgentInput = {
    id?: string
    version: string
    endpoint: string
    inputSchema: JsonNullValueInput | InputJsonValue
    outputSchema: JsonNullValueInput | InputJsonValue
    publishedAt?: Date | string
  }

  export type AgentCapabilityCreateManyAgentInput = {
    capabilityId: string
  }

  export type PricingModelCreateManyAgentInput = {
    id?: string
    pricingType: $Enums.PricingType
    price: Decimal | DecimalJsLike | number | string
    currency?: string
    billingUnit?: string
    updatedAt?: Date | string
  }

  export type ReviewCreateManyAgentInput = {
    id?: string
    userId: string
    rating: number
    comment?: string | null
    verifiedPurchase?: boolean
    createdAt?: Date | string
  }

  export type AgentVersionUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    endpoint?: StringFieldUpdateOperationsInput | string
    inputSchema?: JsonNullValueInput | InputJsonValue
    outputSchema?: JsonNullValueInput | InputJsonValue
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentVersionUncheckedUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    endpoint?: StringFieldUpdateOperationsInput | string
    inputSchema?: JsonNullValueInput | InputJsonValue
    outputSchema?: JsonNullValueInput | InputJsonValue
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentVersionUncheckedUpdateManyWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    endpoint?: StringFieldUpdateOperationsInput | string
    inputSchema?: JsonNullValueInput | InputJsonValue
    outputSchema?: JsonNullValueInput | InputJsonValue
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentCapabilityUpdateWithoutAgentInput = {
    capability?: CapabilityUpdateOneRequiredWithoutAgentsNestedInput
  }

  export type AgentCapabilityUncheckedUpdateWithoutAgentInput = {
    capabilityId?: StringFieldUpdateOperationsInput | string
  }

  export type AgentCapabilityUncheckedUpdateManyWithoutAgentInput = {
    capabilityId?: StringFieldUpdateOperationsInput | string
  }

  export type PricingModelUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    pricingType?: EnumPricingTypeFieldUpdateOperationsInput | $Enums.PricingType
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    billingUnit?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PricingModelUncheckedUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    pricingType?: EnumPricingTypeFieldUpdateOperationsInput | $Enums.PricingType
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    billingUnit?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PricingModelUncheckedUpdateManyWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    pricingType?: EnumPricingTypeFieldUpdateOperationsInput | $Enums.PricingType
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    billingUnit?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedPurchase?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedPurchase?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedPurchase?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentCapabilityCreateManyCapabilityInput = {
    agentId: string
  }

  export type AgentCapabilityUpdateWithoutCapabilityInput = {
    agent?: AgentUpdateOneRequiredWithoutCapabilitiesNestedInput
  }

  export type AgentCapabilityUncheckedUpdateWithoutCapabilityInput = {
    agentId?: StringFieldUpdateOperationsInput | string
  }

  export type AgentCapabilityUncheckedUpdateManyWithoutCapabilityInput = {
    agentId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use AgentCountOutputTypeDefaultArgs instead
     */
    export type AgentCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AgentCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CapabilityCountOutputTypeDefaultArgs instead
     */
    export type CapabilityCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CapabilityCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AgentDefaultArgs instead
     */
    export type AgentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AgentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AgentVersionDefaultArgs instead
     */
    export type AgentVersionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AgentVersionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CapabilityDefaultArgs instead
     */
    export type CapabilityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CapabilityDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AgentCapabilityDefaultArgs instead
     */
    export type AgentCapabilityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AgentCapabilityDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PricingModelDefaultArgs instead
     */
    export type PricingModelArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PricingModelDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ReviewDefaultArgs instead
     */
    export type ReviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ReviewDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}