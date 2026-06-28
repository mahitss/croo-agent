
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
 * Model DailyRevenue
 * 
 */
export type DailyRevenue = $Result.DefaultSelection<Prisma.$DailyRevenuePayload>
/**
 * Model DailyWorkflow
 * 
 */
export type DailyWorkflow = $Result.DefaultSelection<Prisma.$DailyWorkflowPayload>
/**
 * Model DailyAgentUsage
 * 
 */
export type DailyAgentUsage = $Result.DefaultSelection<Prisma.$DailyAgentUsagePayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more DailyRevenues
 * const dailyRevenues = await prisma.dailyRevenue.findMany()
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
   * // Fetch zero or more DailyRevenues
   * const dailyRevenues = await prisma.dailyRevenue.findMany()
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
   * `prisma.dailyRevenue`: Exposes CRUD operations for the **DailyRevenue** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DailyRevenues
    * const dailyRevenues = await prisma.dailyRevenue.findMany()
    * ```
    */
  get dailyRevenue(): Prisma.DailyRevenueDelegate<ExtArgs>;

  /**
   * `prisma.dailyWorkflow`: Exposes CRUD operations for the **DailyWorkflow** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DailyWorkflows
    * const dailyWorkflows = await prisma.dailyWorkflow.findMany()
    * ```
    */
  get dailyWorkflow(): Prisma.DailyWorkflowDelegate<ExtArgs>;

  /**
   * `prisma.dailyAgentUsage`: Exposes CRUD operations for the **DailyAgentUsage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DailyAgentUsages
    * const dailyAgentUsages = await prisma.dailyAgentUsage.findMany()
    * ```
    */
  get dailyAgentUsage(): Prisma.DailyAgentUsageDelegate<ExtArgs>;
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
    DailyRevenue: 'DailyRevenue',
    DailyWorkflow: 'DailyWorkflow',
    DailyAgentUsage: 'DailyAgentUsage'
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
      modelProps: "dailyRevenue" | "dailyWorkflow" | "dailyAgentUsage"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      DailyRevenue: {
        payload: Prisma.$DailyRevenuePayload<ExtArgs>
        fields: Prisma.DailyRevenueFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DailyRevenueFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyRevenuePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DailyRevenueFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyRevenuePayload>
          }
          findFirst: {
            args: Prisma.DailyRevenueFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyRevenuePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DailyRevenueFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyRevenuePayload>
          }
          findMany: {
            args: Prisma.DailyRevenueFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyRevenuePayload>[]
          }
          create: {
            args: Prisma.DailyRevenueCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyRevenuePayload>
          }
          createMany: {
            args: Prisma.DailyRevenueCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DailyRevenueCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyRevenuePayload>[]
          }
          delete: {
            args: Prisma.DailyRevenueDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyRevenuePayload>
          }
          update: {
            args: Prisma.DailyRevenueUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyRevenuePayload>
          }
          deleteMany: {
            args: Prisma.DailyRevenueDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DailyRevenueUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DailyRevenueUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyRevenuePayload>
          }
          aggregate: {
            args: Prisma.DailyRevenueAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDailyRevenue>
          }
          groupBy: {
            args: Prisma.DailyRevenueGroupByArgs<ExtArgs>
            result: $Utils.Optional<DailyRevenueGroupByOutputType>[]
          }
          count: {
            args: Prisma.DailyRevenueCountArgs<ExtArgs>
            result: $Utils.Optional<DailyRevenueCountAggregateOutputType> | number
          }
        }
      }
      DailyWorkflow: {
        payload: Prisma.$DailyWorkflowPayload<ExtArgs>
        fields: Prisma.DailyWorkflowFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DailyWorkflowFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyWorkflowPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DailyWorkflowFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyWorkflowPayload>
          }
          findFirst: {
            args: Prisma.DailyWorkflowFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyWorkflowPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DailyWorkflowFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyWorkflowPayload>
          }
          findMany: {
            args: Prisma.DailyWorkflowFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyWorkflowPayload>[]
          }
          create: {
            args: Prisma.DailyWorkflowCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyWorkflowPayload>
          }
          createMany: {
            args: Prisma.DailyWorkflowCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DailyWorkflowCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyWorkflowPayload>[]
          }
          delete: {
            args: Prisma.DailyWorkflowDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyWorkflowPayload>
          }
          update: {
            args: Prisma.DailyWorkflowUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyWorkflowPayload>
          }
          deleteMany: {
            args: Prisma.DailyWorkflowDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DailyWorkflowUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DailyWorkflowUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyWorkflowPayload>
          }
          aggregate: {
            args: Prisma.DailyWorkflowAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDailyWorkflow>
          }
          groupBy: {
            args: Prisma.DailyWorkflowGroupByArgs<ExtArgs>
            result: $Utils.Optional<DailyWorkflowGroupByOutputType>[]
          }
          count: {
            args: Prisma.DailyWorkflowCountArgs<ExtArgs>
            result: $Utils.Optional<DailyWorkflowCountAggregateOutputType> | number
          }
        }
      }
      DailyAgentUsage: {
        payload: Prisma.$DailyAgentUsagePayload<ExtArgs>
        fields: Prisma.DailyAgentUsageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DailyAgentUsageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyAgentUsagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DailyAgentUsageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyAgentUsagePayload>
          }
          findFirst: {
            args: Prisma.DailyAgentUsageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyAgentUsagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DailyAgentUsageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyAgentUsagePayload>
          }
          findMany: {
            args: Prisma.DailyAgentUsageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyAgentUsagePayload>[]
          }
          create: {
            args: Prisma.DailyAgentUsageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyAgentUsagePayload>
          }
          createMany: {
            args: Prisma.DailyAgentUsageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DailyAgentUsageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyAgentUsagePayload>[]
          }
          delete: {
            args: Prisma.DailyAgentUsageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyAgentUsagePayload>
          }
          update: {
            args: Prisma.DailyAgentUsageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyAgentUsagePayload>
          }
          deleteMany: {
            args: Prisma.DailyAgentUsageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DailyAgentUsageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DailyAgentUsageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyAgentUsagePayload>
          }
          aggregate: {
            args: Prisma.DailyAgentUsageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDailyAgentUsage>
          }
          groupBy: {
            args: Prisma.DailyAgentUsageGroupByArgs<ExtArgs>
            result: $Utils.Optional<DailyAgentUsageGroupByOutputType>[]
          }
          count: {
            args: Prisma.DailyAgentUsageCountArgs<ExtArgs>
            result: $Utils.Optional<DailyAgentUsageCountAggregateOutputType> | number
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
   * Models
   */

  /**
   * Model DailyRevenue
   */

  export type AggregateDailyRevenue = {
    _count: DailyRevenueCountAggregateOutputType | null
    _avg: DailyRevenueAvgAggregateOutputType | null
    _sum: DailyRevenueSumAggregateOutputType | null
    _min: DailyRevenueMinAggregateOutputType | null
    _max: DailyRevenueMaxAggregateOutputType | null
  }

  export type DailyRevenueAvgAggregateOutputType = {
    revenue: Decimal | null
    expenses: Decimal | null
    platformFee: Decimal | null
  }

  export type DailyRevenueSumAggregateOutputType = {
    revenue: Decimal | null
    expenses: Decimal | null
    platformFee: Decimal | null
  }

  export type DailyRevenueMinAggregateOutputType = {
    date: Date | null
    revenue: Decimal | null
    expenses: Decimal | null
    platformFee: Decimal | null
  }

  export type DailyRevenueMaxAggregateOutputType = {
    date: Date | null
    revenue: Decimal | null
    expenses: Decimal | null
    platformFee: Decimal | null
  }

  export type DailyRevenueCountAggregateOutputType = {
    date: number
    revenue: number
    expenses: number
    platformFee: number
    _all: number
  }


  export type DailyRevenueAvgAggregateInputType = {
    revenue?: true
    expenses?: true
    platformFee?: true
  }

  export type DailyRevenueSumAggregateInputType = {
    revenue?: true
    expenses?: true
    platformFee?: true
  }

  export type DailyRevenueMinAggregateInputType = {
    date?: true
    revenue?: true
    expenses?: true
    platformFee?: true
  }

  export type DailyRevenueMaxAggregateInputType = {
    date?: true
    revenue?: true
    expenses?: true
    platformFee?: true
  }

  export type DailyRevenueCountAggregateInputType = {
    date?: true
    revenue?: true
    expenses?: true
    platformFee?: true
    _all?: true
  }

  export type DailyRevenueAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyRevenue to aggregate.
     */
    where?: DailyRevenueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyRevenues to fetch.
     */
    orderBy?: DailyRevenueOrderByWithRelationInput | DailyRevenueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DailyRevenueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyRevenues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyRevenues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DailyRevenues
    **/
    _count?: true | DailyRevenueCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DailyRevenueAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DailyRevenueSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DailyRevenueMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DailyRevenueMaxAggregateInputType
  }

  export type GetDailyRevenueAggregateType<T extends DailyRevenueAggregateArgs> = {
        [P in keyof T & keyof AggregateDailyRevenue]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDailyRevenue[P]>
      : GetScalarType<T[P], AggregateDailyRevenue[P]>
  }




  export type DailyRevenueGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyRevenueWhereInput
    orderBy?: DailyRevenueOrderByWithAggregationInput | DailyRevenueOrderByWithAggregationInput[]
    by: DailyRevenueScalarFieldEnum[] | DailyRevenueScalarFieldEnum
    having?: DailyRevenueScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DailyRevenueCountAggregateInputType | true
    _avg?: DailyRevenueAvgAggregateInputType
    _sum?: DailyRevenueSumAggregateInputType
    _min?: DailyRevenueMinAggregateInputType
    _max?: DailyRevenueMaxAggregateInputType
  }

  export type DailyRevenueGroupByOutputType = {
    date: Date
    revenue: Decimal
    expenses: Decimal
    platformFee: Decimal
    _count: DailyRevenueCountAggregateOutputType | null
    _avg: DailyRevenueAvgAggregateOutputType | null
    _sum: DailyRevenueSumAggregateOutputType | null
    _min: DailyRevenueMinAggregateOutputType | null
    _max: DailyRevenueMaxAggregateOutputType | null
  }

  type GetDailyRevenueGroupByPayload<T extends DailyRevenueGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DailyRevenueGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DailyRevenueGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DailyRevenueGroupByOutputType[P]>
            : GetScalarType<T[P], DailyRevenueGroupByOutputType[P]>
        }
      >
    >


  export type DailyRevenueSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    date?: boolean
    revenue?: boolean
    expenses?: boolean
    platformFee?: boolean
  }, ExtArgs["result"]["dailyRevenue"]>

  export type DailyRevenueSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    date?: boolean
    revenue?: boolean
    expenses?: boolean
    platformFee?: boolean
  }, ExtArgs["result"]["dailyRevenue"]>

  export type DailyRevenueSelectScalar = {
    date?: boolean
    revenue?: boolean
    expenses?: boolean
    platformFee?: boolean
  }


  export type $DailyRevenuePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DailyRevenue"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      date: Date
      revenue: Prisma.Decimal
      expenses: Prisma.Decimal
      platformFee: Prisma.Decimal
    }, ExtArgs["result"]["dailyRevenue"]>
    composites: {}
  }

  type DailyRevenueGetPayload<S extends boolean | null | undefined | DailyRevenueDefaultArgs> = $Result.GetResult<Prisma.$DailyRevenuePayload, S>

  type DailyRevenueCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DailyRevenueFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DailyRevenueCountAggregateInputType | true
    }

  export interface DailyRevenueDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DailyRevenue'], meta: { name: 'DailyRevenue' } }
    /**
     * Find zero or one DailyRevenue that matches the filter.
     * @param {DailyRevenueFindUniqueArgs} args - Arguments to find a DailyRevenue
     * @example
     * // Get one DailyRevenue
     * const dailyRevenue = await prisma.dailyRevenue.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DailyRevenueFindUniqueArgs>(args: SelectSubset<T, DailyRevenueFindUniqueArgs<ExtArgs>>): Prisma__DailyRevenueClient<$Result.GetResult<Prisma.$DailyRevenuePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one DailyRevenue that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DailyRevenueFindUniqueOrThrowArgs} args - Arguments to find a DailyRevenue
     * @example
     * // Get one DailyRevenue
     * const dailyRevenue = await prisma.dailyRevenue.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DailyRevenueFindUniqueOrThrowArgs>(args: SelectSubset<T, DailyRevenueFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DailyRevenueClient<$Result.GetResult<Prisma.$DailyRevenuePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first DailyRevenue that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyRevenueFindFirstArgs} args - Arguments to find a DailyRevenue
     * @example
     * // Get one DailyRevenue
     * const dailyRevenue = await prisma.dailyRevenue.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DailyRevenueFindFirstArgs>(args?: SelectSubset<T, DailyRevenueFindFirstArgs<ExtArgs>>): Prisma__DailyRevenueClient<$Result.GetResult<Prisma.$DailyRevenuePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first DailyRevenue that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyRevenueFindFirstOrThrowArgs} args - Arguments to find a DailyRevenue
     * @example
     * // Get one DailyRevenue
     * const dailyRevenue = await prisma.dailyRevenue.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DailyRevenueFindFirstOrThrowArgs>(args?: SelectSubset<T, DailyRevenueFindFirstOrThrowArgs<ExtArgs>>): Prisma__DailyRevenueClient<$Result.GetResult<Prisma.$DailyRevenuePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more DailyRevenues that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyRevenueFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DailyRevenues
     * const dailyRevenues = await prisma.dailyRevenue.findMany()
     * 
     * // Get first 10 DailyRevenues
     * const dailyRevenues = await prisma.dailyRevenue.findMany({ take: 10 })
     * 
     * // Only select the `date`
     * const dailyRevenueWithDateOnly = await prisma.dailyRevenue.findMany({ select: { date: true } })
     * 
     */
    findMany<T extends DailyRevenueFindManyArgs>(args?: SelectSubset<T, DailyRevenueFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyRevenuePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a DailyRevenue.
     * @param {DailyRevenueCreateArgs} args - Arguments to create a DailyRevenue.
     * @example
     * // Create one DailyRevenue
     * const DailyRevenue = await prisma.dailyRevenue.create({
     *   data: {
     *     // ... data to create a DailyRevenue
     *   }
     * })
     * 
     */
    create<T extends DailyRevenueCreateArgs>(args: SelectSubset<T, DailyRevenueCreateArgs<ExtArgs>>): Prisma__DailyRevenueClient<$Result.GetResult<Prisma.$DailyRevenuePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many DailyRevenues.
     * @param {DailyRevenueCreateManyArgs} args - Arguments to create many DailyRevenues.
     * @example
     * // Create many DailyRevenues
     * const dailyRevenue = await prisma.dailyRevenue.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DailyRevenueCreateManyArgs>(args?: SelectSubset<T, DailyRevenueCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DailyRevenues and returns the data saved in the database.
     * @param {DailyRevenueCreateManyAndReturnArgs} args - Arguments to create many DailyRevenues.
     * @example
     * // Create many DailyRevenues
     * const dailyRevenue = await prisma.dailyRevenue.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DailyRevenues and only return the `date`
     * const dailyRevenueWithDateOnly = await prisma.dailyRevenue.createManyAndReturn({ 
     *   select: { date: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DailyRevenueCreateManyAndReturnArgs>(args?: SelectSubset<T, DailyRevenueCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyRevenuePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a DailyRevenue.
     * @param {DailyRevenueDeleteArgs} args - Arguments to delete one DailyRevenue.
     * @example
     * // Delete one DailyRevenue
     * const DailyRevenue = await prisma.dailyRevenue.delete({
     *   where: {
     *     // ... filter to delete one DailyRevenue
     *   }
     * })
     * 
     */
    delete<T extends DailyRevenueDeleteArgs>(args: SelectSubset<T, DailyRevenueDeleteArgs<ExtArgs>>): Prisma__DailyRevenueClient<$Result.GetResult<Prisma.$DailyRevenuePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one DailyRevenue.
     * @param {DailyRevenueUpdateArgs} args - Arguments to update one DailyRevenue.
     * @example
     * // Update one DailyRevenue
     * const dailyRevenue = await prisma.dailyRevenue.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DailyRevenueUpdateArgs>(args: SelectSubset<T, DailyRevenueUpdateArgs<ExtArgs>>): Prisma__DailyRevenueClient<$Result.GetResult<Prisma.$DailyRevenuePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more DailyRevenues.
     * @param {DailyRevenueDeleteManyArgs} args - Arguments to filter DailyRevenues to delete.
     * @example
     * // Delete a few DailyRevenues
     * const { count } = await prisma.dailyRevenue.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DailyRevenueDeleteManyArgs>(args?: SelectSubset<T, DailyRevenueDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DailyRevenues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyRevenueUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DailyRevenues
     * const dailyRevenue = await prisma.dailyRevenue.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DailyRevenueUpdateManyArgs>(args: SelectSubset<T, DailyRevenueUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DailyRevenue.
     * @param {DailyRevenueUpsertArgs} args - Arguments to update or create a DailyRevenue.
     * @example
     * // Update or create a DailyRevenue
     * const dailyRevenue = await prisma.dailyRevenue.upsert({
     *   create: {
     *     // ... data to create a DailyRevenue
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DailyRevenue we want to update
     *   }
     * })
     */
    upsert<T extends DailyRevenueUpsertArgs>(args: SelectSubset<T, DailyRevenueUpsertArgs<ExtArgs>>): Prisma__DailyRevenueClient<$Result.GetResult<Prisma.$DailyRevenuePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of DailyRevenues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyRevenueCountArgs} args - Arguments to filter DailyRevenues to count.
     * @example
     * // Count the number of DailyRevenues
     * const count = await prisma.dailyRevenue.count({
     *   where: {
     *     // ... the filter for the DailyRevenues we want to count
     *   }
     * })
    **/
    count<T extends DailyRevenueCountArgs>(
      args?: Subset<T, DailyRevenueCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DailyRevenueCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DailyRevenue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyRevenueAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DailyRevenueAggregateArgs>(args: Subset<T, DailyRevenueAggregateArgs>): Prisma.PrismaPromise<GetDailyRevenueAggregateType<T>>

    /**
     * Group by DailyRevenue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyRevenueGroupByArgs} args - Group by arguments.
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
      T extends DailyRevenueGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DailyRevenueGroupByArgs['orderBy'] }
        : { orderBy?: DailyRevenueGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DailyRevenueGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDailyRevenueGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DailyRevenue model
   */
  readonly fields: DailyRevenueFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DailyRevenue.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DailyRevenueClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the DailyRevenue model
   */ 
  interface DailyRevenueFieldRefs {
    readonly date: FieldRef<"DailyRevenue", 'DateTime'>
    readonly revenue: FieldRef<"DailyRevenue", 'Decimal'>
    readonly expenses: FieldRef<"DailyRevenue", 'Decimal'>
    readonly platformFee: FieldRef<"DailyRevenue", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * DailyRevenue findUnique
   */
  export type DailyRevenueFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyRevenue
     */
    select?: DailyRevenueSelect<ExtArgs> | null
    /**
     * Filter, which DailyRevenue to fetch.
     */
    where: DailyRevenueWhereUniqueInput
  }

  /**
   * DailyRevenue findUniqueOrThrow
   */
  export type DailyRevenueFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyRevenue
     */
    select?: DailyRevenueSelect<ExtArgs> | null
    /**
     * Filter, which DailyRevenue to fetch.
     */
    where: DailyRevenueWhereUniqueInput
  }

  /**
   * DailyRevenue findFirst
   */
  export type DailyRevenueFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyRevenue
     */
    select?: DailyRevenueSelect<ExtArgs> | null
    /**
     * Filter, which DailyRevenue to fetch.
     */
    where?: DailyRevenueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyRevenues to fetch.
     */
    orderBy?: DailyRevenueOrderByWithRelationInput | DailyRevenueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyRevenues.
     */
    cursor?: DailyRevenueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyRevenues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyRevenues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyRevenues.
     */
    distinct?: DailyRevenueScalarFieldEnum | DailyRevenueScalarFieldEnum[]
  }

  /**
   * DailyRevenue findFirstOrThrow
   */
  export type DailyRevenueFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyRevenue
     */
    select?: DailyRevenueSelect<ExtArgs> | null
    /**
     * Filter, which DailyRevenue to fetch.
     */
    where?: DailyRevenueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyRevenues to fetch.
     */
    orderBy?: DailyRevenueOrderByWithRelationInput | DailyRevenueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyRevenues.
     */
    cursor?: DailyRevenueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyRevenues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyRevenues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyRevenues.
     */
    distinct?: DailyRevenueScalarFieldEnum | DailyRevenueScalarFieldEnum[]
  }

  /**
   * DailyRevenue findMany
   */
  export type DailyRevenueFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyRevenue
     */
    select?: DailyRevenueSelect<ExtArgs> | null
    /**
     * Filter, which DailyRevenues to fetch.
     */
    where?: DailyRevenueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyRevenues to fetch.
     */
    orderBy?: DailyRevenueOrderByWithRelationInput | DailyRevenueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DailyRevenues.
     */
    cursor?: DailyRevenueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyRevenues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyRevenues.
     */
    skip?: number
    distinct?: DailyRevenueScalarFieldEnum | DailyRevenueScalarFieldEnum[]
  }

  /**
   * DailyRevenue create
   */
  export type DailyRevenueCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyRevenue
     */
    select?: DailyRevenueSelect<ExtArgs> | null
    /**
     * The data needed to create a DailyRevenue.
     */
    data: XOR<DailyRevenueCreateInput, DailyRevenueUncheckedCreateInput>
  }

  /**
   * DailyRevenue createMany
   */
  export type DailyRevenueCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DailyRevenues.
     */
    data: DailyRevenueCreateManyInput | DailyRevenueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DailyRevenue createManyAndReturn
   */
  export type DailyRevenueCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyRevenue
     */
    select?: DailyRevenueSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many DailyRevenues.
     */
    data: DailyRevenueCreateManyInput | DailyRevenueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DailyRevenue update
   */
  export type DailyRevenueUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyRevenue
     */
    select?: DailyRevenueSelect<ExtArgs> | null
    /**
     * The data needed to update a DailyRevenue.
     */
    data: XOR<DailyRevenueUpdateInput, DailyRevenueUncheckedUpdateInput>
    /**
     * Choose, which DailyRevenue to update.
     */
    where: DailyRevenueWhereUniqueInput
  }

  /**
   * DailyRevenue updateMany
   */
  export type DailyRevenueUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DailyRevenues.
     */
    data: XOR<DailyRevenueUpdateManyMutationInput, DailyRevenueUncheckedUpdateManyInput>
    /**
     * Filter which DailyRevenues to update
     */
    where?: DailyRevenueWhereInput
  }

  /**
   * DailyRevenue upsert
   */
  export type DailyRevenueUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyRevenue
     */
    select?: DailyRevenueSelect<ExtArgs> | null
    /**
     * The filter to search for the DailyRevenue to update in case it exists.
     */
    where: DailyRevenueWhereUniqueInput
    /**
     * In case the DailyRevenue found by the `where` argument doesn't exist, create a new DailyRevenue with this data.
     */
    create: XOR<DailyRevenueCreateInput, DailyRevenueUncheckedCreateInput>
    /**
     * In case the DailyRevenue was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DailyRevenueUpdateInput, DailyRevenueUncheckedUpdateInput>
  }

  /**
   * DailyRevenue delete
   */
  export type DailyRevenueDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyRevenue
     */
    select?: DailyRevenueSelect<ExtArgs> | null
    /**
     * Filter which DailyRevenue to delete.
     */
    where: DailyRevenueWhereUniqueInput
  }

  /**
   * DailyRevenue deleteMany
   */
  export type DailyRevenueDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyRevenues to delete
     */
    where?: DailyRevenueWhereInput
  }

  /**
   * DailyRevenue without action
   */
  export type DailyRevenueDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyRevenue
     */
    select?: DailyRevenueSelect<ExtArgs> | null
  }


  /**
   * Model DailyWorkflow
   */

  export type AggregateDailyWorkflow = {
    _count: DailyWorkflowCountAggregateOutputType | null
    _avg: DailyWorkflowAvgAggregateOutputType | null
    _sum: DailyWorkflowSumAggregateOutputType | null
    _min: DailyWorkflowMinAggregateOutputType | null
    _max: DailyWorkflowMaxAggregateOutputType | null
  }

  export type DailyWorkflowAvgAggregateOutputType = {
    completed: number | null
    failed: number | null
    totalCost: Decimal | null
  }

  export type DailyWorkflowSumAggregateOutputType = {
    completed: number | null
    failed: number | null
    totalCost: Decimal | null
  }

  export type DailyWorkflowMinAggregateOutputType = {
    date: Date | null
    completed: number | null
    failed: number | null
    totalCost: Decimal | null
  }

  export type DailyWorkflowMaxAggregateOutputType = {
    date: Date | null
    completed: number | null
    failed: number | null
    totalCost: Decimal | null
  }

  export type DailyWorkflowCountAggregateOutputType = {
    date: number
    completed: number
    failed: number
    totalCost: number
    _all: number
  }


  export type DailyWorkflowAvgAggregateInputType = {
    completed?: true
    failed?: true
    totalCost?: true
  }

  export type DailyWorkflowSumAggregateInputType = {
    completed?: true
    failed?: true
    totalCost?: true
  }

  export type DailyWorkflowMinAggregateInputType = {
    date?: true
    completed?: true
    failed?: true
    totalCost?: true
  }

  export type DailyWorkflowMaxAggregateInputType = {
    date?: true
    completed?: true
    failed?: true
    totalCost?: true
  }

  export type DailyWorkflowCountAggregateInputType = {
    date?: true
    completed?: true
    failed?: true
    totalCost?: true
    _all?: true
  }

  export type DailyWorkflowAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyWorkflow to aggregate.
     */
    where?: DailyWorkflowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyWorkflows to fetch.
     */
    orderBy?: DailyWorkflowOrderByWithRelationInput | DailyWorkflowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DailyWorkflowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyWorkflows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyWorkflows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DailyWorkflows
    **/
    _count?: true | DailyWorkflowCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DailyWorkflowAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DailyWorkflowSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DailyWorkflowMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DailyWorkflowMaxAggregateInputType
  }

  export type GetDailyWorkflowAggregateType<T extends DailyWorkflowAggregateArgs> = {
        [P in keyof T & keyof AggregateDailyWorkflow]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDailyWorkflow[P]>
      : GetScalarType<T[P], AggregateDailyWorkflow[P]>
  }




  export type DailyWorkflowGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyWorkflowWhereInput
    orderBy?: DailyWorkflowOrderByWithAggregationInput | DailyWorkflowOrderByWithAggregationInput[]
    by: DailyWorkflowScalarFieldEnum[] | DailyWorkflowScalarFieldEnum
    having?: DailyWorkflowScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DailyWorkflowCountAggregateInputType | true
    _avg?: DailyWorkflowAvgAggregateInputType
    _sum?: DailyWorkflowSumAggregateInputType
    _min?: DailyWorkflowMinAggregateInputType
    _max?: DailyWorkflowMaxAggregateInputType
  }

  export type DailyWorkflowGroupByOutputType = {
    date: Date
    completed: number
    failed: number
    totalCost: Decimal
    _count: DailyWorkflowCountAggregateOutputType | null
    _avg: DailyWorkflowAvgAggregateOutputType | null
    _sum: DailyWorkflowSumAggregateOutputType | null
    _min: DailyWorkflowMinAggregateOutputType | null
    _max: DailyWorkflowMaxAggregateOutputType | null
  }

  type GetDailyWorkflowGroupByPayload<T extends DailyWorkflowGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DailyWorkflowGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DailyWorkflowGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DailyWorkflowGroupByOutputType[P]>
            : GetScalarType<T[P], DailyWorkflowGroupByOutputType[P]>
        }
      >
    >


  export type DailyWorkflowSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    date?: boolean
    completed?: boolean
    failed?: boolean
    totalCost?: boolean
  }, ExtArgs["result"]["dailyWorkflow"]>

  export type DailyWorkflowSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    date?: boolean
    completed?: boolean
    failed?: boolean
    totalCost?: boolean
  }, ExtArgs["result"]["dailyWorkflow"]>

  export type DailyWorkflowSelectScalar = {
    date?: boolean
    completed?: boolean
    failed?: boolean
    totalCost?: boolean
  }


  export type $DailyWorkflowPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DailyWorkflow"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      date: Date
      completed: number
      failed: number
      totalCost: Prisma.Decimal
    }, ExtArgs["result"]["dailyWorkflow"]>
    composites: {}
  }

  type DailyWorkflowGetPayload<S extends boolean | null | undefined | DailyWorkflowDefaultArgs> = $Result.GetResult<Prisma.$DailyWorkflowPayload, S>

  type DailyWorkflowCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DailyWorkflowFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DailyWorkflowCountAggregateInputType | true
    }

  export interface DailyWorkflowDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DailyWorkflow'], meta: { name: 'DailyWorkflow' } }
    /**
     * Find zero or one DailyWorkflow that matches the filter.
     * @param {DailyWorkflowFindUniqueArgs} args - Arguments to find a DailyWorkflow
     * @example
     * // Get one DailyWorkflow
     * const dailyWorkflow = await prisma.dailyWorkflow.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DailyWorkflowFindUniqueArgs>(args: SelectSubset<T, DailyWorkflowFindUniqueArgs<ExtArgs>>): Prisma__DailyWorkflowClient<$Result.GetResult<Prisma.$DailyWorkflowPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one DailyWorkflow that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DailyWorkflowFindUniqueOrThrowArgs} args - Arguments to find a DailyWorkflow
     * @example
     * // Get one DailyWorkflow
     * const dailyWorkflow = await prisma.dailyWorkflow.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DailyWorkflowFindUniqueOrThrowArgs>(args: SelectSubset<T, DailyWorkflowFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DailyWorkflowClient<$Result.GetResult<Prisma.$DailyWorkflowPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first DailyWorkflow that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyWorkflowFindFirstArgs} args - Arguments to find a DailyWorkflow
     * @example
     * // Get one DailyWorkflow
     * const dailyWorkflow = await prisma.dailyWorkflow.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DailyWorkflowFindFirstArgs>(args?: SelectSubset<T, DailyWorkflowFindFirstArgs<ExtArgs>>): Prisma__DailyWorkflowClient<$Result.GetResult<Prisma.$DailyWorkflowPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first DailyWorkflow that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyWorkflowFindFirstOrThrowArgs} args - Arguments to find a DailyWorkflow
     * @example
     * // Get one DailyWorkflow
     * const dailyWorkflow = await prisma.dailyWorkflow.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DailyWorkflowFindFirstOrThrowArgs>(args?: SelectSubset<T, DailyWorkflowFindFirstOrThrowArgs<ExtArgs>>): Prisma__DailyWorkflowClient<$Result.GetResult<Prisma.$DailyWorkflowPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more DailyWorkflows that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyWorkflowFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DailyWorkflows
     * const dailyWorkflows = await prisma.dailyWorkflow.findMany()
     * 
     * // Get first 10 DailyWorkflows
     * const dailyWorkflows = await prisma.dailyWorkflow.findMany({ take: 10 })
     * 
     * // Only select the `date`
     * const dailyWorkflowWithDateOnly = await prisma.dailyWorkflow.findMany({ select: { date: true } })
     * 
     */
    findMany<T extends DailyWorkflowFindManyArgs>(args?: SelectSubset<T, DailyWorkflowFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyWorkflowPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a DailyWorkflow.
     * @param {DailyWorkflowCreateArgs} args - Arguments to create a DailyWorkflow.
     * @example
     * // Create one DailyWorkflow
     * const DailyWorkflow = await prisma.dailyWorkflow.create({
     *   data: {
     *     // ... data to create a DailyWorkflow
     *   }
     * })
     * 
     */
    create<T extends DailyWorkflowCreateArgs>(args: SelectSubset<T, DailyWorkflowCreateArgs<ExtArgs>>): Prisma__DailyWorkflowClient<$Result.GetResult<Prisma.$DailyWorkflowPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many DailyWorkflows.
     * @param {DailyWorkflowCreateManyArgs} args - Arguments to create many DailyWorkflows.
     * @example
     * // Create many DailyWorkflows
     * const dailyWorkflow = await prisma.dailyWorkflow.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DailyWorkflowCreateManyArgs>(args?: SelectSubset<T, DailyWorkflowCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DailyWorkflows and returns the data saved in the database.
     * @param {DailyWorkflowCreateManyAndReturnArgs} args - Arguments to create many DailyWorkflows.
     * @example
     * // Create many DailyWorkflows
     * const dailyWorkflow = await prisma.dailyWorkflow.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DailyWorkflows and only return the `date`
     * const dailyWorkflowWithDateOnly = await prisma.dailyWorkflow.createManyAndReturn({ 
     *   select: { date: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DailyWorkflowCreateManyAndReturnArgs>(args?: SelectSubset<T, DailyWorkflowCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyWorkflowPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a DailyWorkflow.
     * @param {DailyWorkflowDeleteArgs} args - Arguments to delete one DailyWorkflow.
     * @example
     * // Delete one DailyWorkflow
     * const DailyWorkflow = await prisma.dailyWorkflow.delete({
     *   where: {
     *     // ... filter to delete one DailyWorkflow
     *   }
     * })
     * 
     */
    delete<T extends DailyWorkflowDeleteArgs>(args: SelectSubset<T, DailyWorkflowDeleteArgs<ExtArgs>>): Prisma__DailyWorkflowClient<$Result.GetResult<Prisma.$DailyWorkflowPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one DailyWorkflow.
     * @param {DailyWorkflowUpdateArgs} args - Arguments to update one DailyWorkflow.
     * @example
     * // Update one DailyWorkflow
     * const dailyWorkflow = await prisma.dailyWorkflow.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DailyWorkflowUpdateArgs>(args: SelectSubset<T, DailyWorkflowUpdateArgs<ExtArgs>>): Prisma__DailyWorkflowClient<$Result.GetResult<Prisma.$DailyWorkflowPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more DailyWorkflows.
     * @param {DailyWorkflowDeleteManyArgs} args - Arguments to filter DailyWorkflows to delete.
     * @example
     * // Delete a few DailyWorkflows
     * const { count } = await prisma.dailyWorkflow.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DailyWorkflowDeleteManyArgs>(args?: SelectSubset<T, DailyWorkflowDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DailyWorkflows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyWorkflowUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DailyWorkflows
     * const dailyWorkflow = await prisma.dailyWorkflow.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DailyWorkflowUpdateManyArgs>(args: SelectSubset<T, DailyWorkflowUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DailyWorkflow.
     * @param {DailyWorkflowUpsertArgs} args - Arguments to update or create a DailyWorkflow.
     * @example
     * // Update or create a DailyWorkflow
     * const dailyWorkflow = await prisma.dailyWorkflow.upsert({
     *   create: {
     *     // ... data to create a DailyWorkflow
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DailyWorkflow we want to update
     *   }
     * })
     */
    upsert<T extends DailyWorkflowUpsertArgs>(args: SelectSubset<T, DailyWorkflowUpsertArgs<ExtArgs>>): Prisma__DailyWorkflowClient<$Result.GetResult<Prisma.$DailyWorkflowPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of DailyWorkflows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyWorkflowCountArgs} args - Arguments to filter DailyWorkflows to count.
     * @example
     * // Count the number of DailyWorkflows
     * const count = await prisma.dailyWorkflow.count({
     *   where: {
     *     // ... the filter for the DailyWorkflows we want to count
     *   }
     * })
    **/
    count<T extends DailyWorkflowCountArgs>(
      args?: Subset<T, DailyWorkflowCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DailyWorkflowCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DailyWorkflow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyWorkflowAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DailyWorkflowAggregateArgs>(args: Subset<T, DailyWorkflowAggregateArgs>): Prisma.PrismaPromise<GetDailyWorkflowAggregateType<T>>

    /**
     * Group by DailyWorkflow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyWorkflowGroupByArgs} args - Group by arguments.
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
      T extends DailyWorkflowGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DailyWorkflowGroupByArgs['orderBy'] }
        : { orderBy?: DailyWorkflowGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DailyWorkflowGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDailyWorkflowGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DailyWorkflow model
   */
  readonly fields: DailyWorkflowFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DailyWorkflow.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DailyWorkflowClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the DailyWorkflow model
   */ 
  interface DailyWorkflowFieldRefs {
    readonly date: FieldRef<"DailyWorkflow", 'DateTime'>
    readonly completed: FieldRef<"DailyWorkflow", 'Int'>
    readonly failed: FieldRef<"DailyWorkflow", 'Int'>
    readonly totalCost: FieldRef<"DailyWorkflow", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * DailyWorkflow findUnique
   */
  export type DailyWorkflowFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyWorkflow
     */
    select?: DailyWorkflowSelect<ExtArgs> | null
    /**
     * Filter, which DailyWorkflow to fetch.
     */
    where: DailyWorkflowWhereUniqueInput
  }

  /**
   * DailyWorkflow findUniqueOrThrow
   */
  export type DailyWorkflowFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyWorkflow
     */
    select?: DailyWorkflowSelect<ExtArgs> | null
    /**
     * Filter, which DailyWorkflow to fetch.
     */
    where: DailyWorkflowWhereUniqueInput
  }

  /**
   * DailyWorkflow findFirst
   */
  export type DailyWorkflowFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyWorkflow
     */
    select?: DailyWorkflowSelect<ExtArgs> | null
    /**
     * Filter, which DailyWorkflow to fetch.
     */
    where?: DailyWorkflowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyWorkflows to fetch.
     */
    orderBy?: DailyWorkflowOrderByWithRelationInput | DailyWorkflowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyWorkflows.
     */
    cursor?: DailyWorkflowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyWorkflows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyWorkflows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyWorkflows.
     */
    distinct?: DailyWorkflowScalarFieldEnum | DailyWorkflowScalarFieldEnum[]
  }

  /**
   * DailyWorkflow findFirstOrThrow
   */
  export type DailyWorkflowFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyWorkflow
     */
    select?: DailyWorkflowSelect<ExtArgs> | null
    /**
     * Filter, which DailyWorkflow to fetch.
     */
    where?: DailyWorkflowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyWorkflows to fetch.
     */
    orderBy?: DailyWorkflowOrderByWithRelationInput | DailyWorkflowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyWorkflows.
     */
    cursor?: DailyWorkflowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyWorkflows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyWorkflows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyWorkflows.
     */
    distinct?: DailyWorkflowScalarFieldEnum | DailyWorkflowScalarFieldEnum[]
  }

  /**
   * DailyWorkflow findMany
   */
  export type DailyWorkflowFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyWorkflow
     */
    select?: DailyWorkflowSelect<ExtArgs> | null
    /**
     * Filter, which DailyWorkflows to fetch.
     */
    where?: DailyWorkflowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyWorkflows to fetch.
     */
    orderBy?: DailyWorkflowOrderByWithRelationInput | DailyWorkflowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DailyWorkflows.
     */
    cursor?: DailyWorkflowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyWorkflows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyWorkflows.
     */
    skip?: number
    distinct?: DailyWorkflowScalarFieldEnum | DailyWorkflowScalarFieldEnum[]
  }

  /**
   * DailyWorkflow create
   */
  export type DailyWorkflowCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyWorkflow
     */
    select?: DailyWorkflowSelect<ExtArgs> | null
    /**
     * The data needed to create a DailyWorkflow.
     */
    data: XOR<DailyWorkflowCreateInput, DailyWorkflowUncheckedCreateInput>
  }

  /**
   * DailyWorkflow createMany
   */
  export type DailyWorkflowCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DailyWorkflows.
     */
    data: DailyWorkflowCreateManyInput | DailyWorkflowCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DailyWorkflow createManyAndReturn
   */
  export type DailyWorkflowCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyWorkflow
     */
    select?: DailyWorkflowSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many DailyWorkflows.
     */
    data: DailyWorkflowCreateManyInput | DailyWorkflowCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DailyWorkflow update
   */
  export type DailyWorkflowUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyWorkflow
     */
    select?: DailyWorkflowSelect<ExtArgs> | null
    /**
     * The data needed to update a DailyWorkflow.
     */
    data: XOR<DailyWorkflowUpdateInput, DailyWorkflowUncheckedUpdateInput>
    /**
     * Choose, which DailyWorkflow to update.
     */
    where: DailyWorkflowWhereUniqueInput
  }

  /**
   * DailyWorkflow updateMany
   */
  export type DailyWorkflowUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DailyWorkflows.
     */
    data: XOR<DailyWorkflowUpdateManyMutationInput, DailyWorkflowUncheckedUpdateManyInput>
    /**
     * Filter which DailyWorkflows to update
     */
    where?: DailyWorkflowWhereInput
  }

  /**
   * DailyWorkflow upsert
   */
  export type DailyWorkflowUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyWorkflow
     */
    select?: DailyWorkflowSelect<ExtArgs> | null
    /**
     * The filter to search for the DailyWorkflow to update in case it exists.
     */
    where: DailyWorkflowWhereUniqueInput
    /**
     * In case the DailyWorkflow found by the `where` argument doesn't exist, create a new DailyWorkflow with this data.
     */
    create: XOR<DailyWorkflowCreateInput, DailyWorkflowUncheckedCreateInput>
    /**
     * In case the DailyWorkflow was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DailyWorkflowUpdateInput, DailyWorkflowUncheckedUpdateInput>
  }

  /**
   * DailyWorkflow delete
   */
  export type DailyWorkflowDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyWorkflow
     */
    select?: DailyWorkflowSelect<ExtArgs> | null
    /**
     * Filter which DailyWorkflow to delete.
     */
    where: DailyWorkflowWhereUniqueInput
  }

  /**
   * DailyWorkflow deleteMany
   */
  export type DailyWorkflowDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyWorkflows to delete
     */
    where?: DailyWorkflowWhereInput
  }

  /**
   * DailyWorkflow without action
   */
  export type DailyWorkflowDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyWorkflow
     */
    select?: DailyWorkflowSelect<ExtArgs> | null
  }


  /**
   * Model DailyAgentUsage
   */

  export type AggregateDailyAgentUsage = {
    _count: DailyAgentUsageCountAggregateOutputType | null
    _avg: DailyAgentUsageAvgAggregateOutputType | null
    _sum: DailyAgentUsageSumAggregateOutputType | null
    _min: DailyAgentUsageMinAggregateOutputType | null
    _max: DailyAgentUsageMaxAggregateOutputType | null
  }

  export type DailyAgentUsageAvgAggregateOutputType = {
    invocations: number | null
    totalRevenue: Decimal | null
  }

  export type DailyAgentUsageSumAggregateOutputType = {
    invocations: number | null
    totalRevenue: Decimal | null
  }

  export type DailyAgentUsageMinAggregateOutputType = {
    id: string | null
    date: Date | null
    agentId: string | null
    invocations: number | null
    totalRevenue: Decimal | null
  }

  export type DailyAgentUsageMaxAggregateOutputType = {
    id: string | null
    date: Date | null
    agentId: string | null
    invocations: number | null
    totalRevenue: Decimal | null
  }

  export type DailyAgentUsageCountAggregateOutputType = {
    id: number
    date: number
    agentId: number
    invocations: number
    totalRevenue: number
    _all: number
  }


  export type DailyAgentUsageAvgAggregateInputType = {
    invocations?: true
    totalRevenue?: true
  }

  export type DailyAgentUsageSumAggregateInputType = {
    invocations?: true
    totalRevenue?: true
  }

  export type DailyAgentUsageMinAggregateInputType = {
    id?: true
    date?: true
    agentId?: true
    invocations?: true
    totalRevenue?: true
  }

  export type DailyAgentUsageMaxAggregateInputType = {
    id?: true
    date?: true
    agentId?: true
    invocations?: true
    totalRevenue?: true
  }

  export type DailyAgentUsageCountAggregateInputType = {
    id?: true
    date?: true
    agentId?: true
    invocations?: true
    totalRevenue?: true
    _all?: true
  }

  export type DailyAgentUsageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyAgentUsage to aggregate.
     */
    where?: DailyAgentUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyAgentUsages to fetch.
     */
    orderBy?: DailyAgentUsageOrderByWithRelationInput | DailyAgentUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DailyAgentUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyAgentUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyAgentUsages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DailyAgentUsages
    **/
    _count?: true | DailyAgentUsageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DailyAgentUsageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DailyAgentUsageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DailyAgentUsageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DailyAgentUsageMaxAggregateInputType
  }

  export type GetDailyAgentUsageAggregateType<T extends DailyAgentUsageAggregateArgs> = {
        [P in keyof T & keyof AggregateDailyAgentUsage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDailyAgentUsage[P]>
      : GetScalarType<T[P], AggregateDailyAgentUsage[P]>
  }




  export type DailyAgentUsageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyAgentUsageWhereInput
    orderBy?: DailyAgentUsageOrderByWithAggregationInput | DailyAgentUsageOrderByWithAggregationInput[]
    by: DailyAgentUsageScalarFieldEnum[] | DailyAgentUsageScalarFieldEnum
    having?: DailyAgentUsageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DailyAgentUsageCountAggregateInputType | true
    _avg?: DailyAgentUsageAvgAggregateInputType
    _sum?: DailyAgentUsageSumAggregateInputType
    _min?: DailyAgentUsageMinAggregateInputType
    _max?: DailyAgentUsageMaxAggregateInputType
  }

  export type DailyAgentUsageGroupByOutputType = {
    id: string
    date: Date
    agentId: string
    invocations: number
    totalRevenue: Decimal
    _count: DailyAgentUsageCountAggregateOutputType | null
    _avg: DailyAgentUsageAvgAggregateOutputType | null
    _sum: DailyAgentUsageSumAggregateOutputType | null
    _min: DailyAgentUsageMinAggregateOutputType | null
    _max: DailyAgentUsageMaxAggregateOutputType | null
  }

  type GetDailyAgentUsageGroupByPayload<T extends DailyAgentUsageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DailyAgentUsageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DailyAgentUsageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DailyAgentUsageGroupByOutputType[P]>
            : GetScalarType<T[P], DailyAgentUsageGroupByOutputType[P]>
        }
      >
    >


  export type DailyAgentUsageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    agentId?: boolean
    invocations?: boolean
    totalRevenue?: boolean
  }, ExtArgs["result"]["dailyAgentUsage"]>

  export type DailyAgentUsageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    agentId?: boolean
    invocations?: boolean
    totalRevenue?: boolean
  }, ExtArgs["result"]["dailyAgentUsage"]>

  export type DailyAgentUsageSelectScalar = {
    id?: boolean
    date?: boolean
    agentId?: boolean
    invocations?: boolean
    totalRevenue?: boolean
  }


  export type $DailyAgentUsagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DailyAgentUsage"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      date: Date
      agentId: string
      invocations: number
      totalRevenue: Prisma.Decimal
    }, ExtArgs["result"]["dailyAgentUsage"]>
    composites: {}
  }

  type DailyAgentUsageGetPayload<S extends boolean | null | undefined | DailyAgentUsageDefaultArgs> = $Result.GetResult<Prisma.$DailyAgentUsagePayload, S>

  type DailyAgentUsageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DailyAgentUsageFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DailyAgentUsageCountAggregateInputType | true
    }

  export interface DailyAgentUsageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DailyAgentUsage'], meta: { name: 'DailyAgentUsage' } }
    /**
     * Find zero or one DailyAgentUsage that matches the filter.
     * @param {DailyAgentUsageFindUniqueArgs} args - Arguments to find a DailyAgentUsage
     * @example
     * // Get one DailyAgentUsage
     * const dailyAgentUsage = await prisma.dailyAgentUsage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DailyAgentUsageFindUniqueArgs>(args: SelectSubset<T, DailyAgentUsageFindUniqueArgs<ExtArgs>>): Prisma__DailyAgentUsageClient<$Result.GetResult<Prisma.$DailyAgentUsagePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one DailyAgentUsage that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DailyAgentUsageFindUniqueOrThrowArgs} args - Arguments to find a DailyAgentUsage
     * @example
     * // Get one DailyAgentUsage
     * const dailyAgentUsage = await prisma.dailyAgentUsage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DailyAgentUsageFindUniqueOrThrowArgs>(args: SelectSubset<T, DailyAgentUsageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DailyAgentUsageClient<$Result.GetResult<Prisma.$DailyAgentUsagePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first DailyAgentUsage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyAgentUsageFindFirstArgs} args - Arguments to find a DailyAgentUsage
     * @example
     * // Get one DailyAgentUsage
     * const dailyAgentUsage = await prisma.dailyAgentUsage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DailyAgentUsageFindFirstArgs>(args?: SelectSubset<T, DailyAgentUsageFindFirstArgs<ExtArgs>>): Prisma__DailyAgentUsageClient<$Result.GetResult<Prisma.$DailyAgentUsagePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first DailyAgentUsage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyAgentUsageFindFirstOrThrowArgs} args - Arguments to find a DailyAgentUsage
     * @example
     * // Get one DailyAgentUsage
     * const dailyAgentUsage = await prisma.dailyAgentUsage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DailyAgentUsageFindFirstOrThrowArgs>(args?: SelectSubset<T, DailyAgentUsageFindFirstOrThrowArgs<ExtArgs>>): Prisma__DailyAgentUsageClient<$Result.GetResult<Prisma.$DailyAgentUsagePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more DailyAgentUsages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyAgentUsageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DailyAgentUsages
     * const dailyAgentUsages = await prisma.dailyAgentUsage.findMany()
     * 
     * // Get first 10 DailyAgentUsages
     * const dailyAgentUsages = await prisma.dailyAgentUsage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dailyAgentUsageWithIdOnly = await prisma.dailyAgentUsage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DailyAgentUsageFindManyArgs>(args?: SelectSubset<T, DailyAgentUsageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyAgentUsagePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a DailyAgentUsage.
     * @param {DailyAgentUsageCreateArgs} args - Arguments to create a DailyAgentUsage.
     * @example
     * // Create one DailyAgentUsage
     * const DailyAgentUsage = await prisma.dailyAgentUsage.create({
     *   data: {
     *     // ... data to create a DailyAgentUsage
     *   }
     * })
     * 
     */
    create<T extends DailyAgentUsageCreateArgs>(args: SelectSubset<T, DailyAgentUsageCreateArgs<ExtArgs>>): Prisma__DailyAgentUsageClient<$Result.GetResult<Prisma.$DailyAgentUsagePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many DailyAgentUsages.
     * @param {DailyAgentUsageCreateManyArgs} args - Arguments to create many DailyAgentUsages.
     * @example
     * // Create many DailyAgentUsages
     * const dailyAgentUsage = await prisma.dailyAgentUsage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DailyAgentUsageCreateManyArgs>(args?: SelectSubset<T, DailyAgentUsageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DailyAgentUsages and returns the data saved in the database.
     * @param {DailyAgentUsageCreateManyAndReturnArgs} args - Arguments to create many DailyAgentUsages.
     * @example
     * // Create many DailyAgentUsages
     * const dailyAgentUsage = await prisma.dailyAgentUsage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DailyAgentUsages and only return the `id`
     * const dailyAgentUsageWithIdOnly = await prisma.dailyAgentUsage.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DailyAgentUsageCreateManyAndReturnArgs>(args?: SelectSubset<T, DailyAgentUsageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyAgentUsagePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a DailyAgentUsage.
     * @param {DailyAgentUsageDeleteArgs} args - Arguments to delete one DailyAgentUsage.
     * @example
     * // Delete one DailyAgentUsage
     * const DailyAgentUsage = await prisma.dailyAgentUsage.delete({
     *   where: {
     *     // ... filter to delete one DailyAgentUsage
     *   }
     * })
     * 
     */
    delete<T extends DailyAgentUsageDeleteArgs>(args: SelectSubset<T, DailyAgentUsageDeleteArgs<ExtArgs>>): Prisma__DailyAgentUsageClient<$Result.GetResult<Prisma.$DailyAgentUsagePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one DailyAgentUsage.
     * @param {DailyAgentUsageUpdateArgs} args - Arguments to update one DailyAgentUsage.
     * @example
     * // Update one DailyAgentUsage
     * const dailyAgentUsage = await prisma.dailyAgentUsage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DailyAgentUsageUpdateArgs>(args: SelectSubset<T, DailyAgentUsageUpdateArgs<ExtArgs>>): Prisma__DailyAgentUsageClient<$Result.GetResult<Prisma.$DailyAgentUsagePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more DailyAgentUsages.
     * @param {DailyAgentUsageDeleteManyArgs} args - Arguments to filter DailyAgentUsages to delete.
     * @example
     * // Delete a few DailyAgentUsages
     * const { count } = await prisma.dailyAgentUsage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DailyAgentUsageDeleteManyArgs>(args?: SelectSubset<T, DailyAgentUsageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DailyAgentUsages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyAgentUsageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DailyAgentUsages
     * const dailyAgentUsage = await prisma.dailyAgentUsage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DailyAgentUsageUpdateManyArgs>(args: SelectSubset<T, DailyAgentUsageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DailyAgentUsage.
     * @param {DailyAgentUsageUpsertArgs} args - Arguments to update or create a DailyAgentUsage.
     * @example
     * // Update or create a DailyAgentUsage
     * const dailyAgentUsage = await prisma.dailyAgentUsage.upsert({
     *   create: {
     *     // ... data to create a DailyAgentUsage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DailyAgentUsage we want to update
     *   }
     * })
     */
    upsert<T extends DailyAgentUsageUpsertArgs>(args: SelectSubset<T, DailyAgentUsageUpsertArgs<ExtArgs>>): Prisma__DailyAgentUsageClient<$Result.GetResult<Prisma.$DailyAgentUsagePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of DailyAgentUsages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyAgentUsageCountArgs} args - Arguments to filter DailyAgentUsages to count.
     * @example
     * // Count the number of DailyAgentUsages
     * const count = await prisma.dailyAgentUsage.count({
     *   where: {
     *     // ... the filter for the DailyAgentUsages we want to count
     *   }
     * })
    **/
    count<T extends DailyAgentUsageCountArgs>(
      args?: Subset<T, DailyAgentUsageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DailyAgentUsageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DailyAgentUsage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyAgentUsageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DailyAgentUsageAggregateArgs>(args: Subset<T, DailyAgentUsageAggregateArgs>): Prisma.PrismaPromise<GetDailyAgentUsageAggregateType<T>>

    /**
     * Group by DailyAgentUsage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyAgentUsageGroupByArgs} args - Group by arguments.
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
      T extends DailyAgentUsageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DailyAgentUsageGroupByArgs['orderBy'] }
        : { orderBy?: DailyAgentUsageGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DailyAgentUsageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDailyAgentUsageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DailyAgentUsage model
   */
  readonly fields: DailyAgentUsageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DailyAgentUsage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DailyAgentUsageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the DailyAgentUsage model
   */ 
  interface DailyAgentUsageFieldRefs {
    readonly id: FieldRef<"DailyAgentUsage", 'String'>
    readonly date: FieldRef<"DailyAgentUsage", 'DateTime'>
    readonly agentId: FieldRef<"DailyAgentUsage", 'String'>
    readonly invocations: FieldRef<"DailyAgentUsage", 'Int'>
    readonly totalRevenue: FieldRef<"DailyAgentUsage", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * DailyAgentUsage findUnique
   */
  export type DailyAgentUsageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyAgentUsage
     */
    select?: DailyAgentUsageSelect<ExtArgs> | null
    /**
     * Filter, which DailyAgentUsage to fetch.
     */
    where: DailyAgentUsageWhereUniqueInput
  }

  /**
   * DailyAgentUsage findUniqueOrThrow
   */
  export type DailyAgentUsageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyAgentUsage
     */
    select?: DailyAgentUsageSelect<ExtArgs> | null
    /**
     * Filter, which DailyAgentUsage to fetch.
     */
    where: DailyAgentUsageWhereUniqueInput
  }

  /**
   * DailyAgentUsage findFirst
   */
  export type DailyAgentUsageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyAgentUsage
     */
    select?: DailyAgentUsageSelect<ExtArgs> | null
    /**
     * Filter, which DailyAgentUsage to fetch.
     */
    where?: DailyAgentUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyAgentUsages to fetch.
     */
    orderBy?: DailyAgentUsageOrderByWithRelationInput | DailyAgentUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyAgentUsages.
     */
    cursor?: DailyAgentUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyAgentUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyAgentUsages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyAgentUsages.
     */
    distinct?: DailyAgentUsageScalarFieldEnum | DailyAgentUsageScalarFieldEnum[]
  }

  /**
   * DailyAgentUsage findFirstOrThrow
   */
  export type DailyAgentUsageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyAgentUsage
     */
    select?: DailyAgentUsageSelect<ExtArgs> | null
    /**
     * Filter, which DailyAgentUsage to fetch.
     */
    where?: DailyAgentUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyAgentUsages to fetch.
     */
    orderBy?: DailyAgentUsageOrderByWithRelationInput | DailyAgentUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyAgentUsages.
     */
    cursor?: DailyAgentUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyAgentUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyAgentUsages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyAgentUsages.
     */
    distinct?: DailyAgentUsageScalarFieldEnum | DailyAgentUsageScalarFieldEnum[]
  }

  /**
   * DailyAgentUsage findMany
   */
  export type DailyAgentUsageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyAgentUsage
     */
    select?: DailyAgentUsageSelect<ExtArgs> | null
    /**
     * Filter, which DailyAgentUsages to fetch.
     */
    where?: DailyAgentUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyAgentUsages to fetch.
     */
    orderBy?: DailyAgentUsageOrderByWithRelationInput | DailyAgentUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DailyAgentUsages.
     */
    cursor?: DailyAgentUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyAgentUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyAgentUsages.
     */
    skip?: number
    distinct?: DailyAgentUsageScalarFieldEnum | DailyAgentUsageScalarFieldEnum[]
  }

  /**
   * DailyAgentUsage create
   */
  export type DailyAgentUsageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyAgentUsage
     */
    select?: DailyAgentUsageSelect<ExtArgs> | null
    /**
     * The data needed to create a DailyAgentUsage.
     */
    data: XOR<DailyAgentUsageCreateInput, DailyAgentUsageUncheckedCreateInput>
  }

  /**
   * DailyAgentUsage createMany
   */
  export type DailyAgentUsageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DailyAgentUsages.
     */
    data: DailyAgentUsageCreateManyInput | DailyAgentUsageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DailyAgentUsage createManyAndReturn
   */
  export type DailyAgentUsageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyAgentUsage
     */
    select?: DailyAgentUsageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many DailyAgentUsages.
     */
    data: DailyAgentUsageCreateManyInput | DailyAgentUsageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DailyAgentUsage update
   */
  export type DailyAgentUsageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyAgentUsage
     */
    select?: DailyAgentUsageSelect<ExtArgs> | null
    /**
     * The data needed to update a DailyAgentUsage.
     */
    data: XOR<DailyAgentUsageUpdateInput, DailyAgentUsageUncheckedUpdateInput>
    /**
     * Choose, which DailyAgentUsage to update.
     */
    where: DailyAgentUsageWhereUniqueInput
  }

  /**
   * DailyAgentUsage updateMany
   */
  export type DailyAgentUsageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DailyAgentUsages.
     */
    data: XOR<DailyAgentUsageUpdateManyMutationInput, DailyAgentUsageUncheckedUpdateManyInput>
    /**
     * Filter which DailyAgentUsages to update
     */
    where?: DailyAgentUsageWhereInput
  }

  /**
   * DailyAgentUsage upsert
   */
  export type DailyAgentUsageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyAgentUsage
     */
    select?: DailyAgentUsageSelect<ExtArgs> | null
    /**
     * The filter to search for the DailyAgentUsage to update in case it exists.
     */
    where: DailyAgentUsageWhereUniqueInput
    /**
     * In case the DailyAgentUsage found by the `where` argument doesn't exist, create a new DailyAgentUsage with this data.
     */
    create: XOR<DailyAgentUsageCreateInput, DailyAgentUsageUncheckedCreateInput>
    /**
     * In case the DailyAgentUsage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DailyAgentUsageUpdateInput, DailyAgentUsageUncheckedUpdateInput>
  }

  /**
   * DailyAgentUsage delete
   */
  export type DailyAgentUsageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyAgentUsage
     */
    select?: DailyAgentUsageSelect<ExtArgs> | null
    /**
     * Filter which DailyAgentUsage to delete.
     */
    where: DailyAgentUsageWhereUniqueInput
  }

  /**
   * DailyAgentUsage deleteMany
   */
  export type DailyAgentUsageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyAgentUsages to delete
     */
    where?: DailyAgentUsageWhereInput
  }

  /**
   * DailyAgentUsage without action
   */
  export type DailyAgentUsageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyAgentUsage
     */
    select?: DailyAgentUsageSelect<ExtArgs> | null
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


  export const DailyRevenueScalarFieldEnum: {
    date: 'date',
    revenue: 'revenue',
    expenses: 'expenses',
    platformFee: 'platformFee'
  };

  export type DailyRevenueScalarFieldEnum = (typeof DailyRevenueScalarFieldEnum)[keyof typeof DailyRevenueScalarFieldEnum]


  export const DailyWorkflowScalarFieldEnum: {
    date: 'date',
    completed: 'completed',
    failed: 'failed',
    totalCost: 'totalCost'
  };

  export type DailyWorkflowScalarFieldEnum = (typeof DailyWorkflowScalarFieldEnum)[keyof typeof DailyWorkflowScalarFieldEnum]


  export const DailyAgentUsageScalarFieldEnum: {
    id: 'id',
    date: 'date',
    agentId: 'agentId',
    invocations: 'invocations',
    totalRevenue: 'totalRevenue'
  };

  export type DailyAgentUsageScalarFieldEnum = (typeof DailyAgentUsageScalarFieldEnum)[keyof typeof DailyAgentUsageScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type DailyRevenueWhereInput = {
    AND?: DailyRevenueWhereInput | DailyRevenueWhereInput[]
    OR?: DailyRevenueWhereInput[]
    NOT?: DailyRevenueWhereInput | DailyRevenueWhereInput[]
    date?: DateTimeFilter<"DailyRevenue"> | Date | string
    revenue?: DecimalFilter<"DailyRevenue"> | Decimal | DecimalJsLike | number | string
    expenses?: DecimalFilter<"DailyRevenue"> | Decimal | DecimalJsLike | number | string
    platformFee?: DecimalFilter<"DailyRevenue"> | Decimal | DecimalJsLike | number | string
  }

  export type DailyRevenueOrderByWithRelationInput = {
    date?: SortOrder
    revenue?: SortOrder
    expenses?: SortOrder
    platformFee?: SortOrder
  }

  export type DailyRevenueWhereUniqueInput = Prisma.AtLeast<{
    date?: Date | string
    AND?: DailyRevenueWhereInput | DailyRevenueWhereInput[]
    OR?: DailyRevenueWhereInput[]
    NOT?: DailyRevenueWhereInput | DailyRevenueWhereInput[]
    revenue?: DecimalFilter<"DailyRevenue"> | Decimal | DecimalJsLike | number | string
    expenses?: DecimalFilter<"DailyRevenue"> | Decimal | DecimalJsLike | number | string
    platformFee?: DecimalFilter<"DailyRevenue"> | Decimal | DecimalJsLike | number | string
  }, "date">

  export type DailyRevenueOrderByWithAggregationInput = {
    date?: SortOrder
    revenue?: SortOrder
    expenses?: SortOrder
    platformFee?: SortOrder
    _count?: DailyRevenueCountOrderByAggregateInput
    _avg?: DailyRevenueAvgOrderByAggregateInput
    _max?: DailyRevenueMaxOrderByAggregateInput
    _min?: DailyRevenueMinOrderByAggregateInput
    _sum?: DailyRevenueSumOrderByAggregateInput
  }

  export type DailyRevenueScalarWhereWithAggregatesInput = {
    AND?: DailyRevenueScalarWhereWithAggregatesInput | DailyRevenueScalarWhereWithAggregatesInput[]
    OR?: DailyRevenueScalarWhereWithAggregatesInput[]
    NOT?: DailyRevenueScalarWhereWithAggregatesInput | DailyRevenueScalarWhereWithAggregatesInput[]
    date?: DateTimeWithAggregatesFilter<"DailyRevenue"> | Date | string
    revenue?: DecimalWithAggregatesFilter<"DailyRevenue"> | Decimal | DecimalJsLike | number | string
    expenses?: DecimalWithAggregatesFilter<"DailyRevenue"> | Decimal | DecimalJsLike | number | string
    platformFee?: DecimalWithAggregatesFilter<"DailyRevenue"> | Decimal | DecimalJsLike | number | string
  }

  export type DailyWorkflowWhereInput = {
    AND?: DailyWorkflowWhereInput | DailyWorkflowWhereInput[]
    OR?: DailyWorkflowWhereInput[]
    NOT?: DailyWorkflowWhereInput | DailyWorkflowWhereInput[]
    date?: DateTimeFilter<"DailyWorkflow"> | Date | string
    completed?: IntFilter<"DailyWorkflow"> | number
    failed?: IntFilter<"DailyWorkflow"> | number
    totalCost?: DecimalFilter<"DailyWorkflow"> | Decimal | DecimalJsLike | number | string
  }

  export type DailyWorkflowOrderByWithRelationInput = {
    date?: SortOrder
    completed?: SortOrder
    failed?: SortOrder
    totalCost?: SortOrder
  }

  export type DailyWorkflowWhereUniqueInput = Prisma.AtLeast<{
    date?: Date | string
    AND?: DailyWorkflowWhereInput | DailyWorkflowWhereInput[]
    OR?: DailyWorkflowWhereInput[]
    NOT?: DailyWorkflowWhereInput | DailyWorkflowWhereInput[]
    completed?: IntFilter<"DailyWorkflow"> | number
    failed?: IntFilter<"DailyWorkflow"> | number
    totalCost?: DecimalFilter<"DailyWorkflow"> | Decimal | DecimalJsLike | number | string
  }, "date">

  export type DailyWorkflowOrderByWithAggregationInput = {
    date?: SortOrder
    completed?: SortOrder
    failed?: SortOrder
    totalCost?: SortOrder
    _count?: DailyWorkflowCountOrderByAggregateInput
    _avg?: DailyWorkflowAvgOrderByAggregateInput
    _max?: DailyWorkflowMaxOrderByAggregateInput
    _min?: DailyWorkflowMinOrderByAggregateInput
    _sum?: DailyWorkflowSumOrderByAggregateInput
  }

  export type DailyWorkflowScalarWhereWithAggregatesInput = {
    AND?: DailyWorkflowScalarWhereWithAggregatesInput | DailyWorkflowScalarWhereWithAggregatesInput[]
    OR?: DailyWorkflowScalarWhereWithAggregatesInput[]
    NOT?: DailyWorkflowScalarWhereWithAggregatesInput | DailyWorkflowScalarWhereWithAggregatesInput[]
    date?: DateTimeWithAggregatesFilter<"DailyWorkflow"> | Date | string
    completed?: IntWithAggregatesFilter<"DailyWorkflow"> | number
    failed?: IntWithAggregatesFilter<"DailyWorkflow"> | number
    totalCost?: DecimalWithAggregatesFilter<"DailyWorkflow"> | Decimal | DecimalJsLike | number | string
  }

  export type DailyAgentUsageWhereInput = {
    AND?: DailyAgentUsageWhereInput | DailyAgentUsageWhereInput[]
    OR?: DailyAgentUsageWhereInput[]
    NOT?: DailyAgentUsageWhereInput | DailyAgentUsageWhereInput[]
    id?: StringFilter<"DailyAgentUsage"> | string
    date?: DateTimeFilter<"DailyAgentUsage"> | Date | string
    agentId?: StringFilter<"DailyAgentUsage"> | string
    invocations?: IntFilter<"DailyAgentUsage"> | number
    totalRevenue?: DecimalFilter<"DailyAgentUsage"> | Decimal | DecimalJsLike | number | string
  }

  export type DailyAgentUsageOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    agentId?: SortOrder
    invocations?: SortOrder
    totalRevenue?: SortOrder
  }

  export type DailyAgentUsageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    date_agentId?: DailyAgentUsageDateAgentIdCompoundUniqueInput
    AND?: DailyAgentUsageWhereInput | DailyAgentUsageWhereInput[]
    OR?: DailyAgentUsageWhereInput[]
    NOT?: DailyAgentUsageWhereInput | DailyAgentUsageWhereInput[]
    date?: DateTimeFilter<"DailyAgentUsage"> | Date | string
    agentId?: StringFilter<"DailyAgentUsage"> | string
    invocations?: IntFilter<"DailyAgentUsage"> | number
    totalRevenue?: DecimalFilter<"DailyAgentUsage"> | Decimal | DecimalJsLike | number | string
  }, "id" | "date_agentId">

  export type DailyAgentUsageOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    agentId?: SortOrder
    invocations?: SortOrder
    totalRevenue?: SortOrder
    _count?: DailyAgentUsageCountOrderByAggregateInput
    _avg?: DailyAgentUsageAvgOrderByAggregateInput
    _max?: DailyAgentUsageMaxOrderByAggregateInput
    _min?: DailyAgentUsageMinOrderByAggregateInput
    _sum?: DailyAgentUsageSumOrderByAggregateInput
  }

  export type DailyAgentUsageScalarWhereWithAggregatesInput = {
    AND?: DailyAgentUsageScalarWhereWithAggregatesInput | DailyAgentUsageScalarWhereWithAggregatesInput[]
    OR?: DailyAgentUsageScalarWhereWithAggregatesInput[]
    NOT?: DailyAgentUsageScalarWhereWithAggregatesInput | DailyAgentUsageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DailyAgentUsage"> | string
    date?: DateTimeWithAggregatesFilter<"DailyAgentUsage"> | Date | string
    agentId?: StringWithAggregatesFilter<"DailyAgentUsage"> | string
    invocations?: IntWithAggregatesFilter<"DailyAgentUsage"> | number
    totalRevenue?: DecimalWithAggregatesFilter<"DailyAgentUsage"> | Decimal | DecimalJsLike | number | string
  }

  export type DailyRevenueCreateInput = {
    date: Date | string
    revenue: Decimal | DecimalJsLike | number | string
    expenses: Decimal | DecimalJsLike | number | string
    platformFee: Decimal | DecimalJsLike | number | string
  }

  export type DailyRevenueUncheckedCreateInput = {
    date: Date | string
    revenue: Decimal | DecimalJsLike | number | string
    expenses: Decimal | DecimalJsLike | number | string
    platformFee: Decimal | DecimalJsLike | number | string
  }

  export type DailyRevenueUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    revenue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    expenses?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    platformFee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type DailyRevenueUncheckedUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    revenue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    expenses?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    platformFee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type DailyRevenueCreateManyInput = {
    date: Date | string
    revenue: Decimal | DecimalJsLike | number | string
    expenses: Decimal | DecimalJsLike | number | string
    platformFee: Decimal | DecimalJsLike | number | string
  }

  export type DailyRevenueUpdateManyMutationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    revenue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    expenses?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    platformFee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type DailyRevenueUncheckedUpdateManyInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    revenue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    expenses?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    platformFee?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type DailyWorkflowCreateInput = {
    date: Date | string
    completed?: number
    failed?: number
    totalCost: Decimal | DecimalJsLike | number | string
  }

  export type DailyWorkflowUncheckedCreateInput = {
    date: Date | string
    completed?: number
    failed?: number
    totalCost: Decimal | DecimalJsLike | number | string
  }

  export type DailyWorkflowUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: IntFieldUpdateOperationsInput | number
    failed?: IntFieldUpdateOperationsInput | number
    totalCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type DailyWorkflowUncheckedUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: IntFieldUpdateOperationsInput | number
    failed?: IntFieldUpdateOperationsInput | number
    totalCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type DailyWorkflowCreateManyInput = {
    date: Date | string
    completed?: number
    failed?: number
    totalCost: Decimal | DecimalJsLike | number | string
  }

  export type DailyWorkflowUpdateManyMutationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: IntFieldUpdateOperationsInput | number
    failed?: IntFieldUpdateOperationsInput | number
    totalCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type DailyWorkflowUncheckedUpdateManyInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: IntFieldUpdateOperationsInput | number
    failed?: IntFieldUpdateOperationsInput | number
    totalCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type DailyAgentUsageCreateInput = {
    id?: string
    date: Date | string
    agentId: string
    invocations?: number
    totalRevenue: Decimal | DecimalJsLike | number | string
  }

  export type DailyAgentUsageUncheckedCreateInput = {
    id?: string
    date: Date | string
    agentId: string
    invocations?: number
    totalRevenue: Decimal | DecimalJsLike | number | string
  }

  export type DailyAgentUsageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    agentId?: StringFieldUpdateOperationsInput | string
    invocations?: IntFieldUpdateOperationsInput | number
    totalRevenue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type DailyAgentUsageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    agentId?: StringFieldUpdateOperationsInput | string
    invocations?: IntFieldUpdateOperationsInput | number
    totalRevenue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type DailyAgentUsageCreateManyInput = {
    id?: string
    date: Date | string
    agentId: string
    invocations?: number
    totalRevenue: Decimal | DecimalJsLike | number | string
  }

  export type DailyAgentUsageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    agentId?: StringFieldUpdateOperationsInput | string
    invocations?: IntFieldUpdateOperationsInput | number
    totalRevenue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type DailyAgentUsageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    agentId?: StringFieldUpdateOperationsInput | string
    invocations?: IntFieldUpdateOperationsInput | number
    totalRevenue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
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

  export type DailyRevenueCountOrderByAggregateInput = {
    date?: SortOrder
    revenue?: SortOrder
    expenses?: SortOrder
    platformFee?: SortOrder
  }

  export type DailyRevenueAvgOrderByAggregateInput = {
    revenue?: SortOrder
    expenses?: SortOrder
    platformFee?: SortOrder
  }

  export type DailyRevenueMaxOrderByAggregateInput = {
    date?: SortOrder
    revenue?: SortOrder
    expenses?: SortOrder
    platformFee?: SortOrder
  }

  export type DailyRevenueMinOrderByAggregateInput = {
    date?: SortOrder
    revenue?: SortOrder
    expenses?: SortOrder
    platformFee?: SortOrder
  }

  export type DailyRevenueSumOrderByAggregateInput = {
    revenue?: SortOrder
    expenses?: SortOrder
    platformFee?: SortOrder
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

  export type DailyWorkflowCountOrderByAggregateInput = {
    date?: SortOrder
    completed?: SortOrder
    failed?: SortOrder
    totalCost?: SortOrder
  }

  export type DailyWorkflowAvgOrderByAggregateInput = {
    completed?: SortOrder
    failed?: SortOrder
    totalCost?: SortOrder
  }

  export type DailyWorkflowMaxOrderByAggregateInput = {
    date?: SortOrder
    completed?: SortOrder
    failed?: SortOrder
    totalCost?: SortOrder
  }

  export type DailyWorkflowMinOrderByAggregateInput = {
    date?: SortOrder
    completed?: SortOrder
    failed?: SortOrder
    totalCost?: SortOrder
  }

  export type DailyWorkflowSumOrderByAggregateInput = {
    completed?: SortOrder
    failed?: SortOrder
    totalCost?: SortOrder
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

  export type DailyAgentUsageDateAgentIdCompoundUniqueInput = {
    date: Date | string
    agentId: string
  }

  export type DailyAgentUsageCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    agentId?: SortOrder
    invocations?: SortOrder
    totalRevenue?: SortOrder
  }

  export type DailyAgentUsageAvgOrderByAggregateInput = {
    invocations?: SortOrder
    totalRevenue?: SortOrder
  }

  export type DailyAgentUsageMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    agentId?: SortOrder
    invocations?: SortOrder
    totalRevenue?: SortOrder
  }

  export type DailyAgentUsageMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    agentId?: SortOrder
    invocations?: SortOrder
    totalRevenue?: SortOrder
  }

  export type DailyAgentUsageSumOrderByAggregateInput = {
    invocations?: SortOrder
    totalRevenue?: SortOrder
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

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
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



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use DailyRevenueDefaultArgs instead
     */
    export type DailyRevenueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DailyRevenueDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DailyWorkflowDefaultArgs instead
     */
    export type DailyWorkflowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DailyWorkflowDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DailyAgentUsageDefaultArgs instead
     */
    export type DailyAgentUsageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DailyAgentUsageDefaultArgs<ExtArgs>

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