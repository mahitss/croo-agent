
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
 * Model Workflow
 * 
 */
export type Workflow = $Result.DefaultSelection<Prisma.$WorkflowPayload>
/**
 * Model WorkflowNode
 * 
 */
export type WorkflowNode = $Result.DefaultSelection<Prisma.$WorkflowNodePayload>
/**
 * Model WorkflowEdge
 * 
 */
export type WorkflowEdge = $Result.DefaultSelection<Prisma.$WorkflowEdgePayload>
/**
 * Model WorkflowExecution
 * 
 */
export type WorkflowExecution = $Result.DefaultSelection<Prisma.$WorkflowExecutionPayload>
/**
 * Model Task
 * 
 */
export type Task = $Result.DefaultSelection<Prisma.$TaskPayload>
/**
 * Model TaskLog
 * 
 */
export type TaskLog = $Result.DefaultSelection<Prisma.$TaskLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ExecutionStatus: {
  pending: 'pending',
  running: 'running',
  completed: 'completed',
  failed: 'failed'
};

export type ExecutionStatus = (typeof ExecutionStatus)[keyof typeof ExecutionStatus]


export const TaskStatus: {
  pending: 'pending',
  running: 'running',
  completed: 'completed',
  failed: 'failed'
};

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus]


export const LogLevel: {
  info: 'info',
  warn: 'warn',
  error: 'error',
  debug: 'debug'
};

export type LogLevel = (typeof LogLevel)[keyof typeof LogLevel]

}

export type ExecutionStatus = $Enums.ExecutionStatus

export const ExecutionStatus: typeof $Enums.ExecutionStatus

export type TaskStatus = $Enums.TaskStatus

export const TaskStatus: typeof $Enums.TaskStatus

export type LogLevel = $Enums.LogLevel

export const LogLevel: typeof $Enums.LogLevel

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Workflows
 * const workflows = await prisma.workflow.findMany()
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
   * // Fetch zero or more Workflows
   * const workflows = await prisma.workflow.findMany()
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
   * `prisma.workflow`: Exposes CRUD operations for the **Workflow** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Workflows
    * const workflows = await prisma.workflow.findMany()
    * ```
    */
  get workflow(): Prisma.WorkflowDelegate<ExtArgs>;

  /**
   * `prisma.workflowNode`: Exposes CRUD operations for the **WorkflowNode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkflowNodes
    * const workflowNodes = await prisma.workflowNode.findMany()
    * ```
    */
  get workflowNode(): Prisma.WorkflowNodeDelegate<ExtArgs>;

  /**
   * `prisma.workflowEdge`: Exposes CRUD operations for the **WorkflowEdge** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkflowEdges
    * const workflowEdges = await prisma.workflowEdge.findMany()
    * ```
    */
  get workflowEdge(): Prisma.WorkflowEdgeDelegate<ExtArgs>;

  /**
   * `prisma.workflowExecution`: Exposes CRUD operations for the **WorkflowExecution** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkflowExecutions
    * const workflowExecutions = await prisma.workflowExecution.findMany()
    * ```
    */
  get workflowExecution(): Prisma.WorkflowExecutionDelegate<ExtArgs>;

  /**
   * `prisma.task`: Exposes CRUD operations for the **Task** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.task.findMany()
    * ```
    */
  get task(): Prisma.TaskDelegate<ExtArgs>;

  /**
   * `prisma.taskLog`: Exposes CRUD operations for the **TaskLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TaskLogs
    * const taskLogs = await prisma.taskLog.findMany()
    * ```
    */
  get taskLog(): Prisma.TaskLogDelegate<ExtArgs>;
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
    Workflow: 'Workflow',
    WorkflowNode: 'WorkflowNode',
    WorkflowEdge: 'WorkflowEdge',
    WorkflowExecution: 'WorkflowExecution',
    Task: 'Task',
    TaskLog: 'TaskLog'
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
      modelProps: "workflow" | "workflowNode" | "workflowEdge" | "workflowExecution" | "task" | "taskLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Workflow: {
        payload: Prisma.$WorkflowPayload<ExtArgs>
        fields: Prisma.WorkflowFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkflowFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkflowFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload>
          }
          findFirst: {
            args: Prisma.WorkflowFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkflowFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload>
          }
          findMany: {
            args: Prisma.WorkflowFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload>[]
          }
          create: {
            args: Prisma.WorkflowCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload>
          }
          createMany: {
            args: Prisma.WorkflowCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkflowCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload>[]
          }
          delete: {
            args: Prisma.WorkflowDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload>
          }
          update: {
            args: Prisma.WorkflowUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload>
          }
          deleteMany: {
            args: Prisma.WorkflowDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkflowUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WorkflowUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload>
          }
          aggregate: {
            args: Prisma.WorkflowAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkflow>
          }
          groupBy: {
            args: Prisma.WorkflowGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkflowGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkflowCountArgs<ExtArgs>
            result: $Utils.Optional<WorkflowCountAggregateOutputType> | number
          }
        }
      }
      WorkflowNode: {
        payload: Prisma.$WorkflowNodePayload<ExtArgs>
        fields: Prisma.WorkflowNodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkflowNodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowNodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkflowNodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowNodePayload>
          }
          findFirst: {
            args: Prisma.WorkflowNodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowNodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkflowNodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowNodePayload>
          }
          findMany: {
            args: Prisma.WorkflowNodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowNodePayload>[]
          }
          create: {
            args: Prisma.WorkflowNodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowNodePayload>
          }
          createMany: {
            args: Prisma.WorkflowNodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkflowNodeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowNodePayload>[]
          }
          delete: {
            args: Prisma.WorkflowNodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowNodePayload>
          }
          update: {
            args: Prisma.WorkflowNodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowNodePayload>
          }
          deleteMany: {
            args: Prisma.WorkflowNodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkflowNodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WorkflowNodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowNodePayload>
          }
          aggregate: {
            args: Prisma.WorkflowNodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkflowNode>
          }
          groupBy: {
            args: Prisma.WorkflowNodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkflowNodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkflowNodeCountArgs<ExtArgs>
            result: $Utils.Optional<WorkflowNodeCountAggregateOutputType> | number
          }
        }
      }
      WorkflowEdge: {
        payload: Prisma.$WorkflowEdgePayload<ExtArgs>
        fields: Prisma.WorkflowEdgeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkflowEdgeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowEdgePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkflowEdgeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowEdgePayload>
          }
          findFirst: {
            args: Prisma.WorkflowEdgeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowEdgePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkflowEdgeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowEdgePayload>
          }
          findMany: {
            args: Prisma.WorkflowEdgeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowEdgePayload>[]
          }
          create: {
            args: Prisma.WorkflowEdgeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowEdgePayload>
          }
          createMany: {
            args: Prisma.WorkflowEdgeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkflowEdgeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowEdgePayload>[]
          }
          delete: {
            args: Prisma.WorkflowEdgeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowEdgePayload>
          }
          update: {
            args: Prisma.WorkflowEdgeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowEdgePayload>
          }
          deleteMany: {
            args: Prisma.WorkflowEdgeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkflowEdgeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WorkflowEdgeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowEdgePayload>
          }
          aggregate: {
            args: Prisma.WorkflowEdgeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkflowEdge>
          }
          groupBy: {
            args: Prisma.WorkflowEdgeGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkflowEdgeGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkflowEdgeCountArgs<ExtArgs>
            result: $Utils.Optional<WorkflowEdgeCountAggregateOutputType> | number
          }
        }
      }
      WorkflowExecution: {
        payload: Prisma.$WorkflowExecutionPayload<ExtArgs>
        fields: Prisma.WorkflowExecutionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkflowExecutionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowExecutionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkflowExecutionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowExecutionPayload>
          }
          findFirst: {
            args: Prisma.WorkflowExecutionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowExecutionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkflowExecutionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowExecutionPayload>
          }
          findMany: {
            args: Prisma.WorkflowExecutionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowExecutionPayload>[]
          }
          create: {
            args: Prisma.WorkflowExecutionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowExecutionPayload>
          }
          createMany: {
            args: Prisma.WorkflowExecutionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkflowExecutionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowExecutionPayload>[]
          }
          delete: {
            args: Prisma.WorkflowExecutionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowExecutionPayload>
          }
          update: {
            args: Prisma.WorkflowExecutionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowExecutionPayload>
          }
          deleteMany: {
            args: Prisma.WorkflowExecutionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkflowExecutionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WorkflowExecutionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowExecutionPayload>
          }
          aggregate: {
            args: Prisma.WorkflowExecutionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkflowExecution>
          }
          groupBy: {
            args: Prisma.WorkflowExecutionGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkflowExecutionGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkflowExecutionCountArgs<ExtArgs>
            result: $Utils.Optional<WorkflowExecutionCountAggregateOutputType> | number
          }
        }
      }
      Task: {
        payload: Prisma.$TaskPayload<ExtArgs>
        fields: Prisma.TaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findFirst: {
            args: Prisma.TaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findMany: {
            args: Prisma.TaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          create: {
            args: Prisma.TaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          createMany: {
            args: Prisma.TaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          delete: {
            args: Prisma.TaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          update: {
            args: Prisma.TaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          deleteMany: {
            args: Prisma.TaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          aggregate: {
            args: Prisma.TaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTask>
          }
          groupBy: {
            args: Prisma.TaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskCountArgs<ExtArgs>
            result: $Utils.Optional<TaskCountAggregateOutputType> | number
          }
        }
      }
      TaskLog: {
        payload: Prisma.$TaskLogPayload<ExtArgs>
        fields: Prisma.TaskLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload>
          }
          findFirst: {
            args: Prisma.TaskLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload>
          }
          findMany: {
            args: Prisma.TaskLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload>[]
          }
          create: {
            args: Prisma.TaskLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload>
          }
          createMany: {
            args: Prisma.TaskLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload>[]
          }
          delete: {
            args: Prisma.TaskLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload>
          }
          update: {
            args: Prisma.TaskLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload>
          }
          deleteMany: {
            args: Prisma.TaskLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TaskLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload>
          }
          aggregate: {
            args: Prisma.TaskLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTaskLog>
          }
          groupBy: {
            args: Prisma.TaskLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskLogCountArgs<ExtArgs>
            result: $Utils.Optional<TaskLogCountAggregateOutputType> | number
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
   * Count Type WorkflowCountOutputType
   */

  export type WorkflowCountOutputType = {
    nodes: number
    edges: number
    executions: number
  }

  export type WorkflowCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    nodes?: boolean | WorkflowCountOutputTypeCountNodesArgs
    edges?: boolean | WorkflowCountOutputTypeCountEdgesArgs
    executions?: boolean | WorkflowCountOutputTypeCountExecutionsArgs
  }

  // Custom InputTypes
  /**
   * WorkflowCountOutputType without action
   */
  export type WorkflowCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowCountOutputType
     */
    select?: WorkflowCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WorkflowCountOutputType without action
   */
  export type WorkflowCountOutputTypeCountNodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkflowNodeWhereInput
  }

  /**
   * WorkflowCountOutputType without action
   */
  export type WorkflowCountOutputTypeCountEdgesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkflowEdgeWhereInput
  }

  /**
   * WorkflowCountOutputType without action
   */
  export type WorkflowCountOutputTypeCountExecutionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkflowExecutionWhereInput
  }


  /**
   * Count Type WorkflowExecutionCountOutputType
   */

  export type WorkflowExecutionCountOutputType = {
    tasks: number
  }

  export type WorkflowExecutionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | WorkflowExecutionCountOutputTypeCountTasksArgs
  }

  // Custom InputTypes
  /**
   * WorkflowExecutionCountOutputType without action
   */
  export type WorkflowExecutionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowExecutionCountOutputType
     */
    select?: WorkflowExecutionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WorkflowExecutionCountOutputType without action
   */
  export type WorkflowExecutionCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }


  /**
   * Count Type TaskCountOutputType
   */

  export type TaskCountOutputType = {
    logs: number
  }

  export type TaskCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    logs?: boolean | TaskCountOutputTypeCountLogsArgs
  }

  // Custom InputTypes
  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCountOutputType
     */
    select?: TaskCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Workflow
   */

  export type AggregateWorkflow = {
    _count: WorkflowCountAggregateOutputType | null
    _avg: WorkflowAvgAggregateOutputType | null
    _sum: WorkflowSumAggregateOutputType | null
    _min: WorkflowMinAggregateOutputType | null
    _max: WorkflowMaxAggregateOutputType | null
  }

  export type WorkflowAvgAggregateOutputType = {
    estimatedCost: Decimal | null
    actualCost: Decimal | null
  }

  export type WorkflowSumAggregateOutputType = {
    estimatedCost: Decimal | null
    actualCost: Decimal | null
  }

  export type WorkflowMinAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    status: $Enums.ExecutionStatus | null
    estimatedCost: Decimal | null
    actualCost: Decimal | null
    createdAt: Date | null
    deletedAt: Date | null
  }

  export type WorkflowMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    status: $Enums.ExecutionStatus | null
    estimatedCost: Decimal | null
    actualCost: Decimal | null
    createdAt: Date | null
    deletedAt: Date | null
  }

  export type WorkflowCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    status: number
    estimatedCost: number
    actualCost: number
    createdAt: number
    deletedAt: number
    _all: number
  }


  export type WorkflowAvgAggregateInputType = {
    estimatedCost?: true
    actualCost?: true
  }

  export type WorkflowSumAggregateInputType = {
    estimatedCost?: true
    actualCost?: true
  }

  export type WorkflowMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    status?: true
    estimatedCost?: true
    actualCost?: true
    createdAt?: true
    deletedAt?: true
  }

  export type WorkflowMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    status?: true
    estimatedCost?: true
    actualCost?: true
    createdAt?: true
    deletedAt?: true
  }

  export type WorkflowCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    status?: true
    estimatedCost?: true
    actualCost?: true
    createdAt?: true
    deletedAt?: true
    _all?: true
  }

  export type WorkflowAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Workflow to aggregate.
     */
    where?: WorkflowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workflows to fetch.
     */
    orderBy?: WorkflowOrderByWithRelationInput | WorkflowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkflowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workflows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workflows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Workflows
    **/
    _count?: true | WorkflowCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WorkflowAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WorkflowSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkflowMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkflowMaxAggregateInputType
  }

  export type GetWorkflowAggregateType<T extends WorkflowAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkflow]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkflow[P]>
      : GetScalarType<T[P], AggregateWorkflow[P]>
  }




  export type WorkflowGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkflowWhereInput
    orderBy?: WorkflowOrderByWithAggregationInput | WorkflowOrderByWithAggregationInput[]
    by: WorkflowScalarFieldEnum[] | WorkflowScalarFieldEnum
    having?: WorkflowScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkflowCountAggregateInputType | true
    _avg?: WorkflowAvgAggregateInputType
    _sum?: WorkflowSumAggregateInputType
    _min?: WorkflowMinAggregateInputType
    _max?: WorkflowMaxAggregateInputType
  }

  export type WorkflowGroupByOutputType = {
    id: string
    userId: string
    title: string
    status: $Enums.ExecutionStatus
    estimatedCost: Decimal
    actualCost: Decimal
    createdAt: Date
    deletedAt: Date | null
    _count: WorkflowCountAggregateOutputType | null
    _avg: WorkflowAvgAggregateOutputType | null
    _sum: WorkflowSumAggregateOutputType | null
    _min: WorkflowMinAggregateOutputType | null
    _max: WorkflowMaxAggregateOutputType | null
  }

  type GetWorkflowGroupByPayload<T extends WorkflowGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkflowGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkflowGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkflowGroupByOutputType[P]>
            : GetScalarType<T[P], WorkflowGroupByOutputType[P]>
        }
      >
    >


  export type WorkflowSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    status?: boolean
    estimatedCost?: boolean
    actualCost?: boolean
    createdAt?: boolean
    deletedAt?: boolean
    nodes?: boolean | Workflow$nodesArgs<ExtArgs>
    edges?: boolean | Workflow$edgesArgs<ExtArgs>
    executions?: boolean | Workflow$executionsArgs<ExtArgs>
    _count?: boolean | WorkflowCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workflow"]>

  export type WorkflowSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    status?: boolean
    estimatedCost?: boolean
    actualCost?: boolean
    createdAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["workflow"]>

  export type WorkflowSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    status?: boolean
    estimatedCost?: boolean
    actualCost?: boolean
    createdAt?: boolean
    deletedAt?: boolean
  }

  export type WorkflowInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    nodes?: boolean | Workflow$nodesArgs<ExtArgs>
    edges?: boolean | Workflow$edgesArgs<ExtArgs>
    executions?: boolean | Workflow$executionsArgs<ExtArgs>
    _count?: boolean | WorkflowCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WorkflowIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $WorkflowPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Workflow"
    objects: {
      nodes: Prisma.$WorkflowNodePayload<ExtArgs>[]
      edges: Prisma.$WorkflowEdgePayload<ExtArgs>[]
      executions: Prisma.$WorkflowExecutionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      title: string
      status: $Enums.ExecutionStatus
      estimatedCost: Prisma.Decimal
      actualCost: Prisma.Decimal
      createdAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["workflow"]>
    composites: {}
  }

  type WorkflowGetPayload<S extends boolean | null | undefined | WorkflowDefaultArgs> = $Result.GetResult<Prisma.$WorkflowPayload, S>

  type WorkflowCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<WorkflowFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: WorkflowCountAggregateInputType | true
    }

  export interface WorkflowDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Workflow'], meta: { name: 'Workflow' } }
    /**
     * Find zero or one Workflow that matches the filter.
     * @param {WorkflowFindUniqueArgs} args - Arguments to find a Workflow
     * @example
     * // Get one Workflow
     * const workflow = await prisma.workflow.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkflowFindUniqueArgs>(args: SelectSubset<T, WorkflowFindUniqueArgs<ExtArgs>>): Prisma__WorkflowClient<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Workflow that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {WorkflowFindUniqueOrThrowArgs} args - Arguments to find a Workflow
     * @example
     * // Get one Workflow
     * const workflow = await prisma.workflow.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkflowFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkflowFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkflowClient<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Workflow that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowFindFirstArgs} args - Arguments to find a Workflow
     * @example
     * // Get one Workflow
     * const workflow = await prisma.workflow.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkflowFindFirstArgs>(args?: SelectSubset<T, WorkflowFindFirstArgs<ExtArgs>>): Prisma__WorkflowClient<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Workflow that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowFindFirstOrThrowArgs} args - Arguments to find a Workflow
     * @example
     * // Get one Workflow
     * const workflow = await prisma.workflow.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkflowFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkflowFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkflowClient<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Workflows that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Workflows
     * const workflows = await prisma.workflow.findMany()
     * 
     * // Get first 10 Workflows
     * const workflows = await prisma.workflow.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workflowWithIdOnly = await prisma.workflow.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkflowFindManyArgs>(args?: SelectSubset<T, WorkflowFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Workflow.
     * @param {WorkflowCreateArgs} args - Arguments to create a Workflow.
     * @example
     * // Create one Workflow
     * const Workflow = await prisma.workflow.create({
     *   data: {
     *     // ... data to create a Workflow
     *   }
     * })
     * 
     */
    create<T extends WorkflowCreateArgs>(args: SelectSubset<T, WorkflowCreateArgs<ExtArgs>>): Prisma__WorkflowClient<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Workflows.
     * @param {WorkflowCreateManyArgs} args - Arguments to create many Workflows.
     * @example
     * // Create many Workflows
     * const workflow = await prisma.workflow.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkflowCreateManyArgs>(args?: SelectSubset<T, WorkflowCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Workflows and returns the data saved in the database.
     * @param {WorkflowCreateManyAndReturnArgs} args - Arguments to create many Workflows.
     * @example
     * // Create many Workflows
     * const workflow = await prisma.workflow.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Workflows and only return the `id`
     * const workflowWithIdOnly = await prisma.workflow.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkflowCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkflowCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Workflow.
     * @param {WorkflowDeleteArgs} args - Arguments to delete one Workflow.
     * @example
     * // Delete one Workflow
     * const Workflow = await prisma.workflow.delete({
     *   where: {
     *     // ... filter to delete one Workflow
     *   }
     * })
     * 
     */
    delete<T extends WorkflowDeleteArgs>(args: SelectSubset<T, WorkflowDeleteArgs<ExtArgs>>): Prisma__WorkflowClient<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Workflow.
     * @param {WorkflowUpdateArgs} args - Arguments to update one Workflow.
     * @example
     * // Update one Workflow
     * const workflow = await prisma.workflow.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkflowUpdateArgs>(args: SelectSubset<T, WorkflowUpdateArgs<ExtArgs>>): Prisma__WorkflowClient<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Workflows.
     * @param {WorkflowDeleteManyArgs} args - Arguments to filter Workflows to delete.
     * @example
     * // Delete a few Workflows
     * const { count } = await prisma.workflow.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkflowDeleteManyArgs>(args?: SelectSubset<T, WorkflowDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Workflows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Workflows
     * const workflow = await prisma.workflow.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkflowUpdateManyArgs>(args: SelectSubset<T, WorkflowUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Workflow.
     * @param {WorkflowUpsertArgs} args - Arguments to update or create a Workflow.
     * @example
     * // Update or create a Workflow
     * const workflow = await prisma.workflow.upsert({
     *   create: {
     *     // ... data to create a Workflow
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Workflow we want to update
     *   }
     * })
     */
    upsert<T extends WorkflowUpsertArgs>(args: SelectSubset<T, WorkflowUpsertArgs<ExtArgs>>): Prisma__WorkflowClient<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Workflows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowCountArgs} args - Arguments to filter Workflows to count.
     * @example
     * // Count the number of Workflows
     * const count = await prisma.workflow.count({
     *   where: {
     *     // ... the filter for the Workflows we want to count
     *   }
     * })
    **/
    count<T extends WorkflowCountArgs>(
      args?: Subset<T, WorkflowCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkflowCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Workflow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WorkflowAggregateArgs>(args: Subset<T, WorkflowAggregateArgs>): Prisma.PrismaPromise<GetWorkflowAggregateType<T>>

    /**
     * Group by Workflow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowGroupByArgs} args - Group by arguments.
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
      T extends WorkflowGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkflowGroupByArgs['orderBy'] }
        : { orderBy?: WorkflowGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, WorkflowGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkflowGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Workflow model
   */
  readonly fields: WorkflowFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Workflow.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkflowClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    nodes<T extends Workflow$nodesArgs<ExtArgs> = {}>(args?: Subset<T, Workflow$nodesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowNodePayload<ExtArgs>, T, "findMany"> | Null>
    edges<T extends Workflow$edgesArgs<ExtArgs> = {}>(args?: Subset<T, Workflow$edgesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowEdgePayload<ExtArgs>, T, "findMany"> | Null>
    executions<T extends Workflow$executionsArgs<ExtArgs> = {}>(args?: Subset<T, Workflow$executionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowExecutionPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Workflow model
   */ 
  interface WorkflowFieldRefs {
    readonly id: FieldRef<"Workflow", 'String'>
    readonly userId: FieldRef<"Workflow", 'String'>
    readonly title: FieldRef<"Workflow", 'String'>
    readonly status: FieldRef<"Workflow", 'ExecutionStatus'>
    readonly estimatedCost: FieldRef<"Workflow", 'Decimal'>
    readonly actualCost: FieldRef<"Workflow", 'Decimal'>
    readonly createdAt: FieldRef<"Workflow", 'DateTime'>
    readonly deletedAt: FieldRef<"Workflow", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Workflow findUnique
   */
  export type WorkflowFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
    /**
     * Filter, which Workflow to fetch.
     */
    where: WorkflowWhereUniqueInput
  }

  /**
   * Workflow findUniqueOrThrow
   */
  export type WorkflowFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
    /**
     * Filter, which Workflow to fetch.
     */
    where: WorkflowWhereUniqueInput
  }

  /**
   * Workflow findFirst
   */
  export type WorkflowFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
    /**
     * Filter, which Workflow to fetch.
     */
    where?: WorkflowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workflows to fetch.
     */
    orderBy?: WorkflowOrderByWithRelationInput | WorkflowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Workflows.
     */
    cursor?: WorkflowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workflows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workflows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Workflows.
     */
    distinct?: WorkflowScalarFieldEnum | WorkflowScalarFieldEnum[]
  }

  /**
   * Workflow findFirstOrThrow
   */
  export type WorkflowFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
    /**
     * Filter, which Workflow to fetch.
     */
    where?: WorkflowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workflows to fetch.
     */
    orderBy?: WorkflowOrderByWithRelationInput | WorkflowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Workflows.
     */
    cursor?: WorkflowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workflows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workflows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Workflows.
     */
    distinct?: WorkflowScalarFieldEnum | WorkflowScalarFieldEnum[]
  }

  /**
   * Workflow findMany
   */
  export type WorkflowFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
    /**
     * Filter, which Workflows to fetch.
     */
    where?: WorkflowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workflows to fetch.
     */
    orderBy?: WorkflowOrderByWithRelationInput | WorkflowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Workflows.
     */
    cursor?: WorkflowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workflows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workflows.
     */
    skip?: number
    distinct?: WorkflowScalarFieldEnum | WorkflowScalarFieldEnum[]
  }

  /**
   * Workflow create
   */
  export type WorkflowCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
    /**
     * The data needed to create a Workflow.
     */
    data: XOR<WorkflowCreateInput, WorkflowUncheckedCreateInput>
  }

  /**
   * Workflow createMany
   */
  export type WorkflowCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Workflows.
     */
    data: WorkflowCreateManyInput | WorkflowCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Workflow createManyAndReturn
   */
  export type WorkflowCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Workflows.
     */
    data: WorkflowCreateManyInput | WorkflowCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Workflow update
   */
  export type WorkflowUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
    /**
     * The data needed to update a Workflow.
     */
    data: XOR<WorkflowUpdateInput, WorkflowUncheckedUpdateInput>
    /**
     * Choose, which Workflow to update.
     */
    where: WorkflowWhereUniqueInput
  }

  /**
   * Workflow updateMany
   */
  export type WorkflowUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Workflows.
     */
    data: XOR<WorkflowUpdateManyMutationInput, WorkflowUncheckedUpdateManyInput>
    /**
     * Filter which Workflows to update
     */
    where?: WorkflowWhereInput
  }

  /**
   * Workflow upsert
   */
  export type WorkflowUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
    /**
     * The filter to search for the Workflow to update in case it exists.
     */
    where: WorkflowWhereUniqueInput
    /**
     * In case the Workflow found by the `where` argument doesn't exist, create a new Workflow with this data.
     */
    create: XOR<WorkflowCreateInput, WorkflowUncheckedCreateInput>
    /**
     * In case the Workflow was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkflowUpdateInput, WorkflowUncheckedUpdateInput>
  }

  /**
   * Workflow delete
   */
  export type WorkflowDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
    /**
     * Filter which Workflow to delete.
     */
    where: WorkflowWhereUniqueInput
  }

  /**
   * Workflow deleteMany
   */
  export type WorkflowDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Workflows to delete
     */
    where?: WorkflowWhereInput
  }

  /**
   * Workflow.nodes
   */
  export type Workflow$nodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowNode
     */
    select?: WorkflowNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowNodeInclude<ExtArgs> | null
    where?: WorkflowNodeWhereInput
    orderBy?: WorkflowNodeOrderByWithRelationInput | WorkflowNodeOrderByWithRelationInput[]
    cursor?: WorkflowNodeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkflowNodeScalarFieldEnum | WorkflowNodeScalarFieldEnum[]
  }

  /**
   * Workflow.edges
   */
  export type Workflow$edgesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowEdge
     */
    select?: WorkflowEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowEdgeInclude<ExtArgs> | null
    where?: WorkflowEdgeWhereInput
    orderBy?: WorkflowEdgeOrderByWithRelationInput | WorkflowEdgeOrderByWithRelationInput[]
    cursor?: WorkflowEdgeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkflowEdgeScalarFieldEnum | WorkflowEdgeScalarFieldEnum[]
  }

  /**
   * Workflow.executions
   */
  export type Workflow$executionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowExecution
     */
    select?: WorkflowExecutionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowExecutionInclude<ExtArgs> | null
    where?: WorkflowExecutionWhereInput
    orderBy?: WorkflowExecutionOrderByWithRelationInput | WorkflowExecutionOrderByWithRelationInput[]
    cursor?: WorkflowExecutionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkflowExecutionScalarFieldEnum | WorkflowExecutionScalarFieldEnum[]
  }

  /**
   * Workflow without action
   */
  export type WorkflowDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
  }


  /**
   * Model WorkflowNode
   */

  export type AggregateWorkflowNode = {
    _count: WorkflowNodeCountAggregateOutputType | null
    _avg: WorkflowNodeAvgAggregateOutputType | null
    _sum: WorkflowNodeSumAggregateOutputType | null
    _min: WorkflowNodeMinAggregateOutputType | null
    _max: WorkflowNodeMaxAggregateOutputType | null
  }

  export type WorkflowNodeAvgAggregateOutputType = {
    positionX: number | null
    positionY: number | null
  }

  export type WorkflowNodeSumAggregateOutputType = {
    positionX: number | null
    positionY: number | null
  }

  export type WorkflowNodeMinAggregateOutputType = {
    id: string | null
    workflowId: string | null
    agentId: string | null
    capability: string | null
    status: string | null
    positionX: number | null
    positionY: number | null
  }

  export type WorkflowNodeMaxAggregateOutputType = {
    id: string | null
    workflowId: string | null
    agentId: string | null
    capability: string | null
    status: string | null
    positionX: number | null
    positionY: number | null
  }

  export type WorkflowNodeCountAggregateOutputType = {
    id: number
    workflowId: number
    agentId: number
    capability: number
    status: number
    positionX: number
    positionY: number
    _all: number
  }


  export type WorkflowNodeAvgAggregateInputType = {
    positionX?: true
    positionY?: true
  }

  export type WorkflowNodeSumAggregateInputType = {
    positionX?: true
    positionY?: true
  }

  export type WorkflowNodeMinAggregateInputType = {
    id?: true
    workflowId?: true
    agentId?: true
    capability?: true
    status?: true
    positionX?: true
    positionY?: true
  }

  export type WorkflowNodeMaxAggregateInputType = {
    id?: true
    workflowId?: true
    agentId?: true
    capability?: true
    status?: true
    positionX?: true
    positionY?: true
  }

  export type WorkflowNodeCountAggregateInputType = {
    id?: true
    workflowId?: true
    agentId?: true
    capability?: true
    status?: true
    positionX?: true
    positionY?: true
    _all?: true
  }

  export type WorkflowNodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkflowNode to aggregate.
     */
    where?: WorkflowNodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowNodes to fetch.
     */
    orderBy?: WorkflowNodeOrderByWithRelationInput | WorkflowNodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkflowNodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowNodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowNodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkflowNodes
    **/
    _count?: true | WorkflowNodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WorkflowNodeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WorkflowNodeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkflowNodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkflowNodeMaxAggregateInputType
  }

  export type GetWorkflowNodeAggregateType<T extends WorkflowNodeAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkflowNode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkflowNode[P]>
      : GetScalarType<T[P], AggregateWorkflowNode[P]>
  }




  export type WorkflowNodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkflowNodeWhereInput
    orderBy?: WorkflowNodeOrderByWithAggregationInput | WorkflowNodeOrderByWithAggregationInput[]
    by: WorkflowNodeScalarFieldEnum[] | WorkflowNodeScalarFieldEnum
    having?: WorkflowNodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkflowNodeCountAggregateInputType | true
    _avg?: WorkflowNodeAvgAggregateInputType
    _sum?: WorkflowNodeSumAggregateInputType
    _min?: WorkflowNodeMinAggregateInputType
    _max?: WorkflowNodeMaxAggregateInputType
  }

  export type WorkflowNodeGroupByOutputType = {
    id: string
    workflowId: string
    agentId: string
    capability: string
    status: string
    positionX: number
    positionY: number
    _count: WorkflowNodeCountAggregateOutputType | null
    _avg: WorkflowNodeAvgAggregateOutputType | null
    _sum: WorkflowNodeSumAggregateOutputType | null
    _min: WorkflowNodeMinAggregateOutputType | null
    _max: WorkflowNodeMaxAggregateOutputType | null
  }

  type GetWorkflowNodeGroupByPayload<T extends WorkflowNodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkflowNodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkflowNodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkflowNodeGroupByOutputType[P]>
            : GetScalarType<T[P], WorkflowNodeGroupByOutputType[P]>
        }
      >
    >


  export type WorkflowNodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workflowId?: boolean
    agentId?: boolean
    capability?: boolean
    status?: boolean
    positionX?: boolean
    positionY?: boolean
    workflow?: boolean | WorkflowDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workflowNode"]>

  export type WorkflowNodeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workflowId?: boolean
    agentId?: boolean
    capability?: boolean
    status?: boolean
    positionX?: boolean
    positionY?: boolean
    workflow?: boolean | WorkflowDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workflowNode"]>

  export type WorkflowNodeSelectScalar = {
    id?: boolean
    workflowId?: boolean
    agentId?: boolean
    capability?: boolean
    status?: boolean
    positionX?: boolean
    positionY?: boolean
  }

  export type WorkflowNodeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workflow?: boolean | WorkflowDefaultArgs<ExtArgs>
  }
  export type WorkflowNodeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workflow?: boolean | WorkflowDefaultArgs<ExtArgs>
  }

  export type $WorkflowNodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkflowNode"
    objects: {
      workflow: Prisma.$WorkflowPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      workflowId: string
      agentId: string
      capability: string
      status: string
      positionX: number
      positionY: number
    }, ExtArgs["result"]["workflowNode"]>
    composites: {}
  }

  type WorkflowNodeGetPayload<S extends boolean | null | undefined | WorkflowNodeDefaultArgs> = $Result.GetResult<Prisma.$WorkflowNodePayload, S>

  type WorkflowNodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<WorkflowNodeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: WorkflowNodeCountAggregateInputType | true
    }

  export interface WorkflowNodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkflowNode'], meta: { name: 'WorkflowNode' } }
    /**
     * Find zero or one WorkflowNode that matches the filter.
     * @param {WorkflowNodeFindUniqueArgs} args - Arguments to find a WorkflowNode
     * @example
     * // Get one WorkflowNode
     * const workflowNode = await prisma.workflowNode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkflowNodeFindUniqueArgs>(args: SelectSubset<T, WorkflowNodeFindUniqueArgs<ExtArgs>>): Prisma__WorkflowNodeClient<$Result.GetResult<Prisma.$WorkflowNodePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one WorkflowNode that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {WorkflowNodeFindUniqueOrThrowArgs} args - Arguments to find a WorkflowNode
     * @example
     * // Get one WorkflowNode
     * const workflowNode = await prisma.workflowNode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkflowNodeFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkflowNodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkflowNodeClient<$Result.GetResult<Prisma.$WorkflowNodePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first WorkflowNode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowNodeFindFirstArgs} args - Arguments to find a WorkflowNode
     * @example
     * // Get one WorkflowNode
     * const workflowNode = await prisma.workflowNode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkflowNodeFindFirstArgs>(args?: SelectSubset<T, WorkflowNodeFindFirstArgs<ExtArgs>>): Prisma__WorkflowNodeClient<$Result.GetResult<Prisma.$WorkflowNodePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first WorkflowNode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowNodeFindFirstOrThrowArgs} args - Arguments to find a WorkflowNode
     * @example
     * // Get one WorkflowNode
     * const workflowNode = await prisma.workflowNode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkflowNodeFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkflowNodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkflowNodeClient<$Result.GetResult<Prisma.$WorkflowNodePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more WorkflowNodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowNodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkflowNodes
     * const workflowNodes = await prisma.workflowNode.findMany()
     * 
     * // Get first 10 WorkflowNodes
     * const workflowNodes = await prisma.workflowNode.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workflowNodeWithIdOnly = await prisma.workflowNode.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkflowNodeFindManyArgs>(args?: SelectSubset<T, WorkflowNodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowNodePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a WorkflowNode.
     * @param {WorkflowNodeCreateArgs} args - Arguments to create a WorkflowNode.
     * @example
     * // Create one WorkflowNode
     * const WorkflowNode = await prisma.workflowNode.create({
     *   data: {
     *     // ... data to create a WorkflowNode
     *   }
     * })
     * 
     */
    create<T extends WorkflowNodeCreateArgs>(args: SelectSubset<T, WorkflowNodeCreateArgs<ExtArgs>>): Prisma__WorkflowNodeClient<$Result.GetResult<Prisma.$WorkflowNodePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many WorkflowNodes.
     * @param {WorkflowNodeCreateManyArgs} args - Arguments to create many WorkflowNodes.
     * @example
     * // Create many WorkflowNodes
     * const workflowNode = await prisma.workflowNode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkflowNodeCreateManyArgs>(args?: SelectSubset<T, WorkflowNodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WorkflowNodes and returns the data saved in the database.
     * @param {WorkflowNodeCreateManyAndReturnArgs} args - Arguments to create many WorkflowNodes.
     * @example
     * // Create many WorkflowNodes
     * const workflowNode = await prisma.workflowNode.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WorkflowNodes and only return the `id`
     * const workflowNodeWithIdOnly = await prisma.workflowNode.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkflowNodeCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkflowNodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowNodePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a WorkflowNode.
     * @param {WorkflowNodeDeleteArgs} args - Arguments to delete one WorkflowNode.
     * @example
     * // Delete one WorkflowNode
     * const WorkflowNode = await prisma.workflowNode.delete({
     *   where: {
     *     // ... filter to delete one WorkflowNode
     *   }
     * })
     * 
     */
    delete<T extends WorkflowNodeDeleteArgs>(args: SelectSubset<T, WorkflowNodeDeleteArgs<ExtArgs>>): Prisma__WorkflowNodeClient<$Result.GetResult<Prisma.$WorkflowNodePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one WorkflowNode.
     * @param {WorkflowNodeUpdateArgs} args - Arguments to update one WorkflowNode.
     * @example
     * // Update one WorkflowNode
     * const workflowNode = await prisma.workflowNode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkflowNodeUpdateArgs>(args: SelectSubset<T, WorkflowNodeUpdateArgs<ExtArgs>>): Prisma__WorkflowNodeClient<$Result.GetResult<Prisma.$WorkflowNodePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more WorkflowNodes.
     * @param {WorkflowNodeDeleteManyArgs} args - Arguments to filter WorkflowNodes to delete.
     * @example
     * // Delete a few WorkflowNodes
     * const { count } = await prisma.workflowNode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkflowNodeDeleteManyArgs>(args?: SelectSubset<T, WorkflowNodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkflowNodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowNodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkflowNodes
     * const workflowNode = await prisma.workflowNode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkflowNodeUpdateManyArgs>(args: SelectSubset<T, WorkflowNodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one WorkflowNode.
     * @param {WorkflowNodeUpsertArgs} args - Arguments to update or create a WorkflowNode.
     * @example
     * // Update or create a WorkflowNode
     * const workflowNode = await prisma.workflowNode.upsert({
     *   create: {
     *     // ... data to create a WorkflowNode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkflowNode we want to update
     *   }
     * })
     */
    upsert<T extends WorkflowNodeUpsertArgs>(args: SelectSubset<T, WorkflowNodeUpsertArgs<ExtArgs>>): Prisma__WorkflowNodeClient<$Result.GetResult<Prisma.$WorkflowNodePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of WorkflowNodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowNodeCountArgs} args - Arguments to filter WorkflowNodes to count.
     * @example
     * // Count the number of WorkflowNodes
     * const count = await prisma.workflowNode.count({
     *   where: {
     *     // ... the filter for the WorkflowNodes we want to count
     *   }
     * })
    **/
    count<T extends WorkflowNodeCountArgs>(
      args?: Subset<T, WorkflowNodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkflowNodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkflowNode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowNodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WorkflowNodeAggregateArgs>(args: Subset<T, WorkflowNodeAggregateArgs>): Prisma.PrismaPromise<GetWorkflowNodeAggregateType<T>>

    /**
     * Group by WorkflowNode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowNodeGroupByArgs} args - Group by arguments.
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
      T extends WorkflowNodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkflowNodeGroupByArgs['orderBy'] }
        : { orderBy?: WorkflowNodeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, WorkflowNodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkflowNodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkflowNode model
   */
  readonly fields: WorkflowNodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkflowNode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkflowNodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    workflow<T extends WorkflowDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkflowDefaultArgs<ExtArgs>>): Prisma__WorkflowClient<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the WorkflowNode model
   */ 
  interface WorkflowNodeFieldRefs {
    readonly id: FieldRef<"WorkflowNode", 'String'>
    readonly workflowId: FieldRef<"WorkflowNode", 'String'>
    readonly agentId: FieldRef<"WorkflowNode", 'String'>
    readonly capability: FieldRef<"WorkflowNode", 'String'>
    readonly status: FieldRef<"WorkflowNode", 'String'>
    readonly positionX: FieldRef<"WorkflowNode", 'Int'>
    readonly positionY: FieldRef<"WorkflowNode", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * WorkflowNode findUnique
   */
  export type WorkflowNodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowNode
     */
    select?: WorkflowNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowNodeInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowNode to fetch.
     */
    where: WorkflowNodeWhereUniqueInput
  }

  /**
   * WorkflowNode findUniqueOrThrow
   */
  export type WorkflowNodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowNode
     */
    select?: WorkflowNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowNodeInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowNode to fetch.
     */
    where: WorkflowNodeWhereUniqueInput
  }

  /**
   * WorkflowNode findFirst
   */
  export type WorkflowNodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowNode
     */
    select?: WorkflowNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowNodeInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowNode to fetch.
     */
    where?: WorkflowNodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowNodes to fetch.
     */
    orderBy?: WorkflowNodeOrderByWithRelationInput | WorkflowNodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkflowNodes.
     */
    cursor?: WorkflowNodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowNodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowNodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkflowNodes.
     */
    distinct?: WorkflowNodeScalarFieldEnum | WorkflowNodeScalarFieldEnum[]
  }

  /**
   * WorkflowNode findFirstOrThrow
   */
  export type WorkflowNodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowNode
     */
    select?: WorkflowNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowNodeInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowNode to fetch.
     */
    where?: WorkflowNodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowNodes to fetch.
     */
    orderBy?: WorkflowNodeOrderByWithRelationInput | WorkflowNodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkflowNodes.
     */
    cursor?: WorkflowNodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowNodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowNodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkflowNodes.
     */
    distinct?: WorkflowNodeScalarFieldEnum | WorkflowNodeScalarFieldEnum[]
  }

  /**
   * WorkflowNode findMany
   */
  export type WorkflowNodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowNode
     */
    select?: WorkflowNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowNodeInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowNodes to fetch.
     */
    where?: WorkflowNodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowNodes to fetch.
     */
    orderBy?: WorkflowNodeOrderByWithRelationInput | WorkflowNodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkflowNodes.
     */
    cursor?: WorkflowNodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowNodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowNodes.
     */
    skip?: number
    distinct?: WorkflowNodeScalarFieldEnum | WorkflowNodeScalarFieldEnum[]
  }

  /**
   * WorkflowNode create
   */
  export type WorkflowNodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowNode
     */
    select?: WorkflowNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowNodeInclude<ExtArgs> | null
    /**
     * The data needed to create a WorkflowNode.
     */
    data: XOR<WorkflowNodeCreateInput, WorkflowNodeUncheckedCreateInput>
  }

  /**
   * WorkflowNode createMany
   */
  export type WorkflowNodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkflowNodes.
     */
    data: WorkflowNodeCreateManyInput | WorkflowNodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkflowNode createManyAndReturn
   */
  export type WorkflowNodeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowNode
     */
    select?: WorkflowNodeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many WorkflowNodes.
     */
    data: WorkflowNodeCreateManyInput | WorkflowNodeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowNodeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkflowNode update
   */
  export type WorkflowNodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowNode
     */
    select?: WorkflowNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowNodeInclude<ExtArgs> | null
    /**
     * The data needed to update a WorkflowNode.
     */
    data: XOR<WorkflowNodeUpdateInput, WorkflowNodeUncheckedUpdateInput>
    /**
     * Choose, which WorkflowNode to update.
     */
    where: WorkflowNodeWhereUniqueInput
  }

  /**
   * WorkflowNode updateMany
   */
  export type WorkflowNodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkflowNodes.
     */
    data: XOR<WorkflowNodeUpdateManyMutationInput, WorkflowNodeUncheckedUpdateManyInput>
    /**
     * Filter which WorkflowNodes to update
     */
    where?: WorkflowNodeWhereInput
  }

  /**
   * WorkflowNode upsert
   */
  export type WorkflowNodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowNode
     */
    select?: WorkflowNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowNodeInclude<ExtArgs> | null
    /**
     * The filter to search for the WorkflowNode to update in case it exists.
     */
    where: WorkflowNodeWhereUniqueInput
    /**
     * In case the WorkflowNode found by the `where` argument doesn't exist, create a new WorkflowNode with this data.
     */
    create: XOR<WorkflowNodeCreateInput, WorkflowNodeUncheckedCreateInput>
    /**
     * In case the WorkflowNode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkflowNodeUpdateInput, WorkflowNodeUncheckedUpdateInput>
  }

  /**
   * WorkflowNode delete
   */
  export type WorkflowNodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowNode
     */
    select?: WorkflowNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowNodeInclude<ExtArgs> | null
    /**
     * Filter which WorkflowNode to delete.
     */
    where: WorkflowNodeWhereUniqueInput
  }

  /**
   * WorkflowNode deleteMany
   */
  export type WorkflowNodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkflowNodes to delete
     */
    where?: WorkflowNodeWhereInput
  }

  /**
   * WorkflowNode without action
   */
  export type WorkflowNodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowNode
     */
    select?: WorkflowNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowNodeInclude<ExtArgs> | null
  }


  /**
   * Model WorkflowEdge
   */

  export type AggregateWorkflowEdge = {
    _count: WorkflowEdgeCountAggregateOutputType | null
    _min: WorkflowEdgeMinAggregateOutputType | null
    _max: WorkflowEdgeMaxAggregateOutputType | null
  }

  export type WorkflowEdgeMinAggregateOutputType = {
    id: string | null
    workflowId: string | null
    sourceNode: string | null
    targetNode: string | null
  }

  export type WorkflowEdgeMaxAggregateOutputType = {
    id: string | null
    workflowId: string | null
    sourceNode: string | null
    targetNode: string | null
  }

  export type WorkflowEdgeCountAggregateOutputType = {
    id: number
    workflowId: number
    sourceNode: number
    targetNode: number
    _all: number
  }


  export type WorkflowEdgeMinAggregateInputType = {
    id?: true
    workflowId?: true
    sourceNode?: true
    targetNode?: true
  }

  export type WorkflowEdgeMaxAggregateInputType = {
    id?: true
    workflowId?: true
    sourceNode?: true
    targetNode?: true
  }

  export type WorkflowEdgeCountAggregateInputType = {
    id?: true
    workflowId?: true
    sourceNode?: true
    targetNode?: true
    _all?: true
  }

  export type WorkflowEdgeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkflowEdge to aggregate.
     */
    where?: WorkflowEdgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowEdges to fetch.
     */
    orderBy?: WorkflowEdgeOrderByWithRelationInput | WorkflowEdgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkflowEdgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowEdges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowEdges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkflowEdges
    **/
    _count?: true | WorkflowEdgeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkflowEdgeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkflowEdgeMaxAggregateInputType
  }

  export type GetWorkflowEdgeAggregateType<T extends WorkflowEdgeAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkflowEdge]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkflowEdge[P]>
      : GetScalarType<T[P], AggregateWorkflowEdge[P]>
  }




  export type WorkflowEdgeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkflowEdgeWhereInput
    orderBy?: WorkflowEdgeOrderByWithAggregationInput | WorkflowEdgeOrderByWithAggregationInput[]
    by: WorkflowEdgeScalarFieldEnum[] | WorkflowEdgeScalarFieldEnum
    having?: WorkflowEdgeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkflowEdgeCountAggregateInputType | true
    _min?: WorkflowEdgeMinAggregateInputType
    _max?: WorkflowEdgeMaxAggregateInputType
  }

  export type WorkflowEdgeGroupByOutputType = {
    id: string
    workflowId: string
    sourceNode: string
    targetNode: string
    _count: WorkflowEdgeCountAggregateOutputType | null
    _min: WorkflowEdgeMinAggregateOutputType | null
    _max: WorkflowEdgeMaxAggregateOutputType | null
  }

  type GetWorkflowEdgeGroupByPayload<T extends WorkflowEdgeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkflowEdgeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkflowEdgeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkflowEdgeGroupByOutputType[P]>
            : GetScalarType<T[P], WorkflowEdgeGroupByOutputType[P]>
        }
      >
    >


  export type WorkflowEdgeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workflowId?: boolean
    sourceNode?: boolean
    targetNode?: boolean
    workflow?: boolean | WorkflowDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workflowEdge"]>

  export type WorkflowEdgeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workflowId?: boolean
    sourceNode?: boolean
    targetNode?: boolean
    workflow?: boolean | WorkflowDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workflowEdge"]>

  export type WorkflowEdgeSelectScalar = {
    id?: boolean
    workflowId?: boolean
    sourceNode?: boolean
    targetNode?: boolean
  }

  export type WorkflowEdgeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workflow?: boolean | WorkflowDefaultArgs<ExtArgs>
  }
  export type WorkflowEdgeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workflow?: boolean | WorkflowDefaultArgs<ExtArgs>
  }

  export type $WorkflowEdgePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkflowEdge"
    objects: {
      workflow: Prisma.$WorkflowPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      workflowId: string
      sourceNode: string
      targetNode: string
    }, ExtArgs["result"]["workflowEdge"]>
    composites: {}
  }

  type WorkflowEdgeGetPayload<S extends boolean | null | undefined | WorkflowEdgeDefaultArgs> = $Result.GetResult<Prisma.$WorkflowEdgePayload, S>

  type WorkflowEdgeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<WorkflowEdgeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: WorkflowEdgeCountAggregateInputType | true
    }

  export interface WorkflowEdgeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkflowEdge'], meta: { name: 'WorkflowEdge' } }
    /**
     * Find zero or one WorkflowEdge that matches the filter.
     * @param {WorkflowEdgeFindUniqueArgs} args - Arguments to find a WorkflowEdge
     * @example
     * // Get one WorkflowEdge
     * const workflowEdge = await prisma.workflowEdge.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkflowEdgeFindUniqueArgs>(args: SelectSubset<T, WorkflowEdgeFindUniqueArgs<ExtArgs>>): Prisma__WorkflowEdgeClient<$Result.GetResult<Prisma.$WorkflowEdgePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one WorkflowEdge that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {WorkflowEdgeFindUniqueOrThrowArgs} args - Arguments to find a WorkflowEdge
     * @example
     * // Get one WorkflowEdge
     * const workflowEdge = await prisma.workflowEdge.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkflowEdgeFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkflowEdgeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkflowEdgeClient<$Result.GetResult<Prisma.$WorkflowEdgePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first WorkflowEdge that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowEdgeFindFirstArgs} args - Arguments to find a WorkflowEdge
     * @example
     * // Get one WorkflowEdge
     * const workflowEdge = await prisma.workflowEdge.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkflowEdgeFindFirstArgs>(args?: SelectSubset<T, WorkflowEdgeFindFirstArgs<ExtArgs>>): Prisma__WorkflowEdgeClient<$Result.GetResult<Prisma.$WorkflowEdgePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first WorkflowEdge that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowEdgeFindFirstOrThrowArgs} args - Arguments to find a WorkflowEdge
     * @example
     * // Get one WorkflowEdge
     * const workflowEdge = await prisma.workflowEdge.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkflowEdgeFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkflowEdgeFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkflowEdgeClient<$Result.GetResult<Prisma.$WorkflowEdgePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more WorkflowEdges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowEdgeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkflowEdges
     * const workflowEdges = await prisma.workflowEdge.findMany()
     * 
     * // Get first 10 WorkflowEdges
     * const workflowEdges = await prisma.workflowEdge.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workflowEdgeWithIdOnly = await prisma.workflowEdge.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkflowEdgeFindManyArgs>(args?: SelectSubset<T, WorkflowEdgeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowEdgePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a WorkflowEdge.
     * @param {WorkflowEdgeCreateArgs} args - Arguments to create a WorkflowEdge.
     * @example
     * // Create one WorkflowEdge
     * const WorkflowEdge = await prisma.workflowEdge.create({
     *   data: {
     *     // ... data to create a WorkflowEdge
     *   }
     * })
     * 
     */
    create<T extends WorkflowEdgeCreateArgs>(args: SelectSubset<T, WorkflowEdgeCreateArgs<ExtArgs>>): Prisma__WorkflowEdgeClient<$Result.GetResult<Prisma.$WorkflowEdgePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many WorkflowEdges.
     * @param {WorkflowEdgeCreateManyArgs} args - Arguments to create many WorkflowEdges.
     * @example
     * // Create many WorkflowEdges
     * const workflowEdge = await prisma.workflowEdge.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkflowEdgeCreateManyArgs>(args?: SelectSubset<T, WorkflowEdgeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WorkflowEdges and returns the data saved in the database.
     * @param {WorkflowEdgeCreateManyAndReturnArgs} args - Arguments to create many WorkflowEdges.
     * @example
     * // Create many WorkflowEdges
     * const workflowEdge = await prisma.workflowEdge.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WorkflowEdges and only return the `id`
     * const workflowEdgeWithIdOnly = await prisma.workflowEdge.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkflowEdgeCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkflowEdgeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowEdgePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a WorkflowEdge.
     * @param {WorkflowEdgeDeleteArgs} args - Arguments to delete one WorkflowEdge.
     * @example
     * // Delete one WorkflowEdge
     * const WorkflowEdge = await prisma.workflowEdge.delete({
     *   where: {
     *     // ... filter to delete one WorkflowEdge
     *   }
     * })
     * 
     */
    delete<T extends WorkflowEdgeDeleteArgs>(args: SelectSubset<T, WorkflowEdgeDeleteArgs<ExtArgs>>): Prisma__WorkflowEdgeClient<$Result.GetResult<Prisma.$WorkflowEdgePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one WorkflowEdge.
     * @param {WorkflowEdgeUpdateArgs} args - Arguments to update one WorkflowEdge.
     * @example
     * // Update one WorkflowEdge
     * const workflowEdge = await prisma.workflowEdge.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkflowEdgeUpdateArgs>(args: SelectSubset<T, WorkflowEdgeUpdateArgs<ExtArgs>>): Prisma__WorkflowEdgeClient<$Result.GetResult<Prisma.$WorkflowEdgePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more WorkflowEdges.
     * @param {WorkflowEdgeDeleteManyArgs} args - Arguments to filter WorkflowEdges to delete.
     * @example
     * // Delete a few WorkflowEdges
     * const { count } = await prisma.workflowEdge.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkflowEdgeDeleteManyArgs>(args?: SelectSubset<T, WorkflowEdgeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkflowEdges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowEdgeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkflowEdges
     * const workflowEdge = await prisma.workflowEdge.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkflowEdgeUpdateManyArgs>(args: SelectSubset<T, WorkflowEdgeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one WorkflowEdge.
     * @param {WorkflowEdgeUpsertArgs} args - Arguments to update or create a WorkflowEdge.
     * @example
     * // Update or create a WorkflowEdge
     * const workflowEdge = await prisma.workflowEdge.upsert({
     *   create: {
     *     // ... data to create a WorkflowEdge
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkflowEdge we want to update
     *   }
     * })
     */
    upsert<T extends WorkflowEdgeUpsertArgs>(args: SelectSubset<T, WorkflowEdgeUpsertArgs<ExtArgs>>): Prisma__WorkflowEdgeClient<$Result.GetResult<Prisma.$WorkflowEdgePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of WorkflowEdges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowEdgeCountArgs} args - Arguments to filter WorkflowEdges to count.
     * @example
     * // Count the number of WorkflowEdges
     * const count = await prisma.workflowEdge.count({
     *   where: {
     *     // ... the filter for the WorkflowEdges we want to count
     *   }
     * })
    **/
    count<T extends WorkflowEdgeCountArgs>(
      args?: Subset<T, WorkflowEdgeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkflowEdgeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkflowEdge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowEdgeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WorkflowEdgeAggregateArgs>(args: Subset<T, WorkflowEdgeAggregateArgs>): Prisma.PrismaPromise<GetWorkflowEdgeAggregateType<T>>

    /**
     * Group by WorkflowEdge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowEdgeGroupByArgs} args - Group by arguments.
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
      T extends WorkflowEdgeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkflowEdgeGroupByArgs['orderBy'] }
        : { orderBy?: WorkflowEdgeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, WorkflowEdgeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkflowEdgeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkflowEdge model
   */
  readonly fields: WorkflowEdgeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkflowEdge.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkflowEdgeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    workflow<T extends WorkflowDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkflowDefaultArgs<ExtArgs>>): Prisma__WorkflowClient<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the WorkflowEdge model
   */ 
  interface WorkflowEdgeFieldRefs {
    readonly id: FieldRef<"WorkflowEdge", 'String'>
    readonly workflowId: FieldRef<"WorkflowEdge", 'String'>
    readonly sourceNode: FieldRef<"WorkflowEdge", 'String'>
    readonly targetNode: FieldRef<"WorkflowEdge", 'String'>
  }
    

  // Custom InputTypes
  /**
   * WorkflowEdge findUnique
   */
  export type WorkflowEdgeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowEdge
     */
    select?: WorkflowEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowEdgeInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowEdge to fetch.
     */
    where: WorkflowEdgeWhereUniqueInput
  }

  /**
   * WorkflowEdge findUniqueOrThrow
   */
  export type WorkflowEdgeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowEdge
     */
    select?: WorkflowEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowEdgeInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowEdge to fetch.
     */
    where: WorkflowEdgeWhereUniqueInput
  }

  /**
   * WorkflowEdge findFirst
   */
  export type WorkflowEdgeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowEdge
     */
    select?: WorkflowEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowEdgeInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowEdge to fetch.
     */
    where?: WorkflowEdgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowEdges to fetch.
     */
    orderBy?: WorkflowEdgeOrderByWithRelationInput | WorkflowEdgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkflowEdges.
     */
    cursor?: WorkflowEdgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowEdges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowEdges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkflowEdges.
     */
    distinct?: WorkflowEdgeScalarFieldEnum | WorkflowEdgeScalarFieldEnum[]
  }

  /**
   * WorkflowEdge findFirstOrThrow
   */
  export type WorkflowEdgeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowEdge
     */
    select?: WorkflowEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowEdgeInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowEdge to fetch.
     */
    where?: WorkflowEdgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowEdges to fetch.
     */
    orderBy?: WorkflowEdgeOrderByWithRelationInput | WorkflowEdgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkflowEdges.
     */
    cursor?: WorkflowEdgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowEdges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowEdges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkflowEdges.
     */
    distinct?: WorkflowEdgeScalarFieldEnum | WorkflowEdgeScalarFieldEnum[]
  }

  /**
   * WorkflowEdge findMany
   */
  export type WorkflowEdgeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowEdge
     */
    select?: WorkflowEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowEdgeInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowEdges to fetch.
     */
    where?: WorkflowEdgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowEdges to fetch.
     */
    orderBy?: WorkflowEdgeOrderByWithRelationInput | WorkflowEdgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkflowEdges.
     */
    cursor?: WorkflowEdgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowEdges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowEdges.
     */
    skip?: number
    distinct?: WorkflowEdgeScalarFieldEnum | WorkflowEdgeScalarFieldEnum[]
  }

  /**
   * WorkflowEdge create
   */
  export type WorkflowEdgeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowEdge
     */
    select?: WorkflowEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowEdgeInclude<ExtArgs> | null
    /**
     * The data needed to create a WorkflowEdge.
     */
    data: XOR<WorkflowEdgeCreateInput, WorkflowEdgeUncheckedCreateInput>
  }

  /**
   * WorkflowEdge createMany
   */
  export type WorkflowEdgeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkflowEdges.
     */
    data: WorkflowEdgeCreateManyInput | WorkflowEdgeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkflowEdge createManyAndReturn
   */
  export type WorkflowEdgeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowEdge
     */
    select?: WorkflowEdgeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many WorkflowEdges.
     */
    data: WorkflowEdgeCreateManyInput | WorkflowEdgeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowEdgeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkflowEdge update
   */
  export type WorkflowEdgeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowEdge
     */
    select?: WorkflowEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowEdgeInclude<ExtArgs> | null
    /**
     * The data needed to update a WorkflowEdge.
     */
    data: XOR<WorkflowEdgeUpdateInput, WorkflowEdgeUncheckedUpdateInput>
    /**
     * Choose, which WorkflowEdge to update.
     */
    where: WorkflowEdgeWhereUniqueInput
  }

  /**
   * WorkflowEdge updateMany
   */
  export type WorkflowEdgeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkflowEdges.
     */
    data: XOR<WorkflowEdgeUpdateManyMutationInput, WorkflowEdgeUncheckedUpdateManyInput>
    /**
     * Filter which WorkflowEdges to update
     */
    where?: WorkflowEdgeWhereInput
  }

  /**
   * WorkflowEdge upsert
   */
  export type WorkflowEdgeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowEdge
     */
    select?: WorkflowEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowEdgeInclude<ExtArgs> | null
    /**
     * The filter to search for the WorkflowEdge to update in case it exists.
     */
    where: WorkflowEdgeWhereUniqueInput
    /**
     * In case the WorkflowEdge found by the `where` argument doesn't exist, create a new WorkflowEdge with this data.
     */
    create: XOR<WorkflowEdgeCreateInput, WorkflowEdgeUncheckedCreateInput>
    /**
     * In case the WorkflowEdge was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkflowEdgeUpdateInput, WorkflowEdgeUncheckedUpdateInput>
  }

  /**
   * WorkflowEdge delete
   */
  export type WorkflowEdgeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowEdge
     */
    select?: WorkflowEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowEdgeInclude<ExtArgs> | null
    /**
     * Filter which WorkflowEdge to delete.
     */
    where: WorkflowEdgeWhereUniqueInput
  }

  /**
   * WorkflowEdge deleteMany
   */
  export type WorkflowEdgeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkflowEdges to delete
     */
    where?: WorkflowEdgeWhereInput
  }

  /**
   * WorkflowEdge without action
   */
  export type WorkflowEdgeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowEdge
     */
    select?: WorkflowEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowEdgeInclude<ExtArgs> | null
  }


  /**
   * Model WorkflowExecution
   */

  export type AggregateWorkflowExecution = {
    _count: WorkflowExecutionCountAggregateOutputType | null
    _min: WorkflowExecutionMinAggregateOutputType | null
    _max: WorkflowExecutionMaxAggregateOutputType | null
  }

  export type WorkflowExecutionMinAggregateOutputType = {
    id: string | null
    workflowId: string | null
    status: $Enums.ExecutionStatus | null
    startedAt: Date | null
    completedAt: Date | null
  }

  export type WorkflowExecutionMaxAggregateOutputType = {
    id: string | null
    workflowId: string | null
    status: $Enums.ExecutionStatus | null
    startedAt: Date | null
    completedAt: Date | null
  }

  export type WorkflowExecutionCountAggregateOutputType = {
    id: number
    workflowId: number
    status: number
    startedAt: number
    completedAt: number
    _all: number
  }


  export type WorkflowExecutionMinAggregateInputType = {
    id?: true
    workflowId?: true
    status?: true
    startedAt?: true
    completedAt?: true
  }

  export type WorkflowExecutionMaxAggregateInputType = {
    id?: true
    workflowId?: true
    status?: true
    startedAt?: true
    completedAt?: true
  }

  export type WorkflowExecutionCountAggregateInputType = {
    id?: true
    workflowId?: true
    status?: true
    startedAt?: true
    completedAt?: true
    _all?: true
  }

  export type WorkflowExecutionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkflowExecution to aggregate.
     */
    where?: WorkflowExecutionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowExecutions to fetch.
     */
    orderBy?: WorkflowExecutionOrderByWithRelationInput | WorkflowExecutionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkflowExecutionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowExecutions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowExecutions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkflowExecutions
    **/
    _count?: true | WorkflowExecutionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkflowExecutionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkflowExecutionMaxAggregateInputType
  }

  export type GetWorkflowExecutionAggregateType<T extends WorkflowExecutionAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkflowExecution]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkflowExecution[P]>
      : GetScalarType<T[P], AggregateWorkflowExecution[P]>
  }




  export type WorkflowExecutionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkflowExecutionWhereInput
    orderBy?: WorkflowExecutionOrderByWithAggregationInput | WorkflowExecutionOrderByWithAggregationInput[]
    by: WorkflowExecutionScalarFieldEnum[] | WorkflowExecutionScalarFieldEnum
    having?: WorkflowExecutionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkflowExecutionCountAggregateInputType | true
    _min?: WorkflowExecutionMinAggregateInputType
    _max?: WorkflowExecutionMaxAggregateInputType
  }

  export type WorkflowExecutionGroupByOutputType = {
    id: string
    workflowId: string
    status: $Enums.ExecutionStatus
    startedAt: Date
    completedAt: Date | null
    _count: WorkflowExecutionCountAggregateOutputType | null
    _min: WorkflowExecutionMinAggregateOutputType | null
    _max: WorkflowExecutionMaxAggregateOutputType | null
  }

  type GetWorkflowExecutionGroupByPayload<T extends WorkflowExecutionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkflowExecutionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkflowExecutionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkflowExecutionGroupByOutputType[P]>
            : GetScalarType<T[P], WorkflowExecutionGroupByOutputType[P]>
        }
      >
    >


  export type WorkflowExecutionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workflowId?: boolean
    status?: boolean
    startedAt?: boolean
    completedAt?: boolean
    workflow?: boolean | WorkflowDefaultArgs<ExtArgs>
    tasks?: boolean | WorkflowExecution$tasksArgs<ExtArgs>
    _count?: boolean | WorkflowExecutionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workflowExecution"]>

  export type WorkflowExecutionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workflowId?: boolean
    status?: boolean
    startedAt?: boolean
    completedAt?: boolean
    workflow?: boolean | WorkflowDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workflowExecution"]>

  export type WorkflowExecutionSelectScalar = {
    id?: boolean
    workflowId?: boolean
    status?: boolean
    startedAt?: boolean
    completedAt?: boolean
  }

  export type WorkflowExecutionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workflow?: boolean | WorkflowDefaultArgs<ExtArgs>
    tasks?: boolean | WorkflowExecution$tasksArgs<ExtArgs>
    _count?: boolean | WorkflowExecutionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WorkflowExecutionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workflow?: boolean | WorkflowDefaultArgs<ExtArgs>
  }

  export type $WorkflowExecutionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkflowExecution"
    objects: {
      workflow: Prisma.$WorkflowPayload<ExtArgs>
      tasks: Prisma.$TaskPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      workflowId: string
      status: $Enums.ExecutionStatus
      startedAt: Date
      completedAt: Date | null
    }, ExtArgs["result"]["workflowExecution"]>
    composites: {}
  }

  type WorkflowExecutionGetPayload<S extends boolean | null | undefined | WorkflowExecutionDefaultArgs> = $Result.GetResult<Prisma.$WorkflowExecutionPayload, S>

  type WorkflowExecutionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<WorkflowExecutionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: WorkflowExecutionCountAggregateInputType | true
    }

  export interface WorkflowExecutionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkflowExecution'], meta: { name: 'WorkflowExecution' } }
    /**
     * Find zero or one WorkflowExecution that matches the filter.
     * @param {WorkflowExecutionFindUniqueArgs} args - Arguments to find a WorkflowExecution
     * @example
     * // Get one WorkflowExecution
     * const workflowExecution = await prisma.workflowExecution.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkflowExecutionFindUniqueArgs>(args: SelectSubset<T, WorkflowExecutionFindUniqueArgs<ExtArgs>>): Prisma__WorkflowExecutionClient<$Result.GetResult<Prisma.$WorkflowExecutionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one WorkflowExecution that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {WorkflowExecutionFindUniqueOrThrowArgs} args - Arguments to find a WorkflowExecution
     * @example
     * // Get one WorkflowExecution
     * const workflowExecution = await prisma.workflowExecution.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkflowExecutionFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkflowExecutionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkflowExecutionClient<$Result.GetResult<Prisma.$WorkflowExecutionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first WorkflowExecution that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowExecutionFindFirstArgs} args - Arguments to find a WorkflowExecution
     * @example
     * // Get one WorkflowExecution
     * const workflowExecution = await prisma.workflowExecution.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkflowExecutionFindFirstArgs>(args?: SelectSubset<T, WorkflowExecutionFindFirstArgs<ExtArgs>>): Prisma__WorkflowExecutionClient<$Result.GetResult<Prisma.$WorkflowExecutionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first WorkflowExecution that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowExecutionFindFirstOrThrowArgs} args - Arguments to find a WorkflowExecution
     * @example
     * // Get one WorkflowExecution
     * const workflowExecution = await prisma.workflowExecution.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkflowExecutionFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkflowExecutionFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkflowExecutionClient<$Result.GetResult<Prisma.$WorkflowExecutionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more WorkflowExecutions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowExecutionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkflowExecutions
     * const workflowExecutions = await prisma.workflowExecution.findMany()
     * 
     * // Get first 10 WorkflowExecutions
     * const workflowExecutions = await prisma.workflowExecution.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workflowExecutionWithIdOnly = await prisma.workflowExecution.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkflowExecutionFindManyArgs>(args?: SelectSubset<T, WorkflowExecutionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowExecutionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a WorkflowExecution.
     * @param {WorkflowExecutionCreateArgs} args - Arguments to create a WorkflowExecution.
     * @example
     * // Create one WorkflowExecution
     * const WorkflowExecution = await prisma.workflowExecution.create({
     *   data: {
     *     // ... data to create a WorkflowExecution
     *   }
     * })
     * 
     */
    create<T extends WorkflowExecutionCreateArgs>(args: SelectSubset<T, WorkflowExecutionCreateArgs<ExtArgs>>): Prisma__WorkflowExecutionClient<$Result.GetResult<Prisma.$WorkflowExecutionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many WorkflowExecutions.
     * @param {WorkflowExecutionCreateManyArgs} args - Arguments to create many WorkflowExecutions.
     * @example
     * // Create many WorkflowExecutions
     * const workflowExecution = await prisma.workflowExecution.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkflowExecutionCreateManyArgs>(args?: SelectSubset<T, WorkflowExecutionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WorkflowExecutions and returns the data saved in the database.
     * @param {WorkflowExecutionCreateManyAndReturnArgs} args - Arguments to create many WorkflowExecutions.
     * @example
     * // Create many WorkflowExecutions
     * const workflowExecution = await prisma.workflowExecution.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WorkflowExecutions and only return the `id`
     * const workflowExecutionWithIdOnly = await prisma.workflowExecution.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkflowExecutionCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkflowExecutionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowExecutionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a WorkflowExecution.
     * @param {WorkflowExecutionDeleteArgs} args - Arguments to delete one WorkflowExecution.
     * @example
     * // Delete one WorkflowExecution
     * const WorkflowExecution = await prisma.workflowExecution.delete({
     *   where: {
     *     // ... filter to delete one WorkflowExecution
     *   }
     * })
     * 
     */
    delete<T extends WorkflowExecutionDeleteArgs>(args: SelectSubset<T, WorkflowExecutionDeleteArgs<ExtArgs>>): Prisma__WorkflowExecutionClient<$Result.GetResult<Prisma.$WorkflowExecutionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one WorkflowExecution.
     * @param {WorkflowExecutionUpdateArgs} args - Arguments to update one WorkflowExecution.
     * @example
     * // Update one WorkflowExecution
     * const workflowExecution = await prisma.workflowExecution.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkflowExecutionUpdateArgs>(args: SelectSubset<T, WorkflowExecutionUpdateArgs<ExtArgs>>): Prisma__WorkflowExecutionClient<$Result.GetResult<Prisma.$WorkflowExecutionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more WorkflowExecutions.
     * @param {WorkflowExecutionDeleteManyArgs} args - Arguments to filter WorkflowExecutions to delete.
     * @example
     * // Delete a few WorkflowExecutions
     * const { count } = await prisma.workflowExecution.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkflowExecutionDeleteManyArgs>(args?: SelectSubset<T, WorkflowExecutionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkflowExecutions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowExecutionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkflowExecutions
     * const workflowExecution = await prisma.workflowExecution.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkflowExecutionUpdateManyArgs>(args: SelectSubset<T, WorkflowExecutionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one WorkflowExecution.
     * @param {WorkflowExecutionUpsertArgs} args - Arguments to update or create a WorkflowExecution.
     * @example
     * // Update or create a WorkflowExecution
     * const workflowExecution = await prisma.workflowExecution.upsert({
     *   create: {
     *     // ... data to create a WorkflowExecution
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkflowExecution we want to update
     *   }
     * })
     */
    upsert<T extends WorkflowExecutionUpsertArgs>(args: SelectSubset<T, WorkflowExecutionUpsertArgs<ExtArgs>>): Prisma__WorkflowExecutionClient<$Result.GetResult<Prisma.$WorkflowExecutionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of WorkflowExecutions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowExecutionCountArgs} args - Arguments to filter WorkflowExecutions to count.
     * @example
     * // Count the number of WorkflowExecutions
     * const count = await prisma.workflowExecution.count({
     *   where: {
     *     // ... the filter for the WorkflowExecutions we want to count
     *   }
     * })
    **/
    count<T extends WorkflowExecutionCountArgs>(
      args?: Subset<T, WorkflowExecutionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkflowExecutionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkflowExecution.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowExecutionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WorkflowExecutionAggregateArgs>(args: Subset<T, WorkflowExecutionAggregateArgs>): Prisma.PrismaPromise<GetWorkflowExecutionAggregateType<T>>

    /**
     * Group by WorkflowExecution.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowExecutionGroupByArgs} args - Group by arguments.
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
      T extends WorkflowExecutionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkflowExecutionGroupByArgs['orderBy'] }
        : { orderBy?: WorkflowExecutionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, WorkflowExecutionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkflowExecutionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkflowExecution model
   */
  readonly fields: WorkflowExecutionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkflowExecution.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkflowExecutionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    workflow<T extends WorkflowDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkflowDefaultArgs<ExtArgs>>): Prisma__WorkflowClient<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    tasks<T extends WorkflowExecution$tasksArgs<ExtArgs> = {}>(args?: Subset<T, WorkflowExecution$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the WorkflowExecution model
   */ 
  interface WorkflowExecutionFieldRefs {
    readonly id: FieldRef<"WorkflowExecution", 'String'>
    readonly workflowId: FieldRef<"WorkflowExecution", 'String'>
    readonly status: FieldRef<"WorkflowExecution", 'ExecutionStatus'>
    readonly startedAt: FieldRef<"WorkflowExecution", 'DateTime'>
    readonly completedAt: FieldRef<"WorkflowExecution", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WorkflowExecution findUnique
   */
  export type WorkflowExecutionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowExecution
     */
    select?: WorkflowExecutionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowExecutionInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowExecution to fetch.
     */
    where: WorkflowExecutionWhereUniqueInput
  }

  /**
   * WorkflowExecution findUniqueOrThrow
   */
  export type WorkflowExecutionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowExecution
     */
    select?: WorkflowExecutionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowExecutionInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowExecution to fetch.
     */
    where: WorkflowExecutionWhereUniqueInput
  }

  /**
   * WorkflowExecution findFirst
   */
  export type WorkflowExecutionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowExecution
     */
    select?: WorkflowExecutionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowExecutionInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowExecution to fetch.
     */
    where?: WorkflowExecutionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowExecutions to fetch.
     */
    orderBy?: WorkflowExecutionOrderByWithRelationInput | WorkflowExecutionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkflowExecutions.
     */
    cursor?: WorkflowExecutionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowExecutions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowExecutions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkflowExecutions.
     */
    distinct?: WorkflowExecutionScalarFieldEnum | WorkflowExecutionScalarFieldEnum[]
  }

  /**
   * WorkflowExecution findFirstOrThrow
   */
  export type WorkflowExecutionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowExecution
     */
    select?: WorkflowExecutionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowExecutionInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowExecution to fetch.
     */
    where?: WorkflowExecutionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowExecutions to fetch.
     */
    orderBy?: WorkflowExecutionOrderByWithRelationInput | WorkflowExecutionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkflowExecutions.
     */
    cursor?: WorkflowExecutionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowExecutions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowExecutions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkflowExecutions.
     */
    distinct?: WorkflowExecutionScalarFieldEnum | WorkflowExecutionScalarFieldEnum[]
  }

  /**
   * WorkflowExecution findMany
   */
  export type WorkflowExecutionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowExecution
     */
    select?: WorkflowExecutionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowExecutionInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowExecutions to fetch.
     */
    where?: WorkflowExecutionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowExecutions to fetch.
     */
    orderBy?: WorkflowExecutionOrderByWithRelationInput | WorkflowExecutionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkflowExecutions.
     */
    cursor?: WorkflowExecutionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowExecutions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowExecutions.
     */
    skip?: number
    distinct?: WorkflowExecutionScalarFieldEnum | WorkflowExecutionScalarFieldEnum[]
  }

  /**
   * WorkflowExecution create
   */
  export type WorkflowExecutionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowExecution
     */
    select?: WorkflowExecutionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowExecutionInclude<ExtArgs> | null
    /**
     * The data needed to create a WorkflowExecution.
     */
    data: XOR<WorkflowExecutionCreateInput, WorkflowExecutionUncheckedCreateInput>
  }

  /**
   * WorkflowExecution createMany
   */
  export type WorkflowExecutionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkflowExecutions.
     */
    data: WorkflowExecutionCreateManyInput | WorkflowExecutionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkflowExecution createManyAndReturn
   */
  export type WorkflowExecutionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowExecution
     */
    select?: WorkflowExecutionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many WorkflowExecutions.
     */
    data: WorkflowExecutionCreateManyInput | WorkflowExecutionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowExecutionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkflowExecution update
   */
  export type WorkflowExecutionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowExecution
     */
    select?: WorkflowExecutionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowExecutionInclude<ExtArgs> | null
    /**
     * The data needed to update a WorkflowExecution.
     */
    data: XOR<WorkflowExecutionUpdateInput, WorkflowExecutionUncheckedUpdateInput>
    /**
     * Choose, which WorkflowExecution to update.
     */
    where: WorkflowExecutionWhereUniqueInput
  }

  /**
   * WorkflowExecution updateMany
   */
  export type WorkflowExecutionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkflowExecutions.
     */
    data: XOR<WorkflowExecutionUpdateManyMutationInput, WorkflowExecutionUncheckedUpdateManyInput>
    /**
     * Filter which WorkflowExecutions to update
     */
    where?: WorkflowExecutionWhereInput
  }

  /**
   * WorkflowExecution upsert
   */
  export type WorkflowExecutionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowExecution
     */
    select?: WorkflowExecutionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowExecutionInclude<ExtArgs> | null
    /**
     * The filter to search for the WorkflowExecution to update in case it exists.
     */
    where: WorkflowExecutionWhereUniqueInput
    /**
     * In case the WorkflowExecution found by the `where` argument doesn't exist, create a new WorkflowExecution with this data.
     */
    create: XOR<WorkflowExecutionCreateInput, WorkflowExecutionUncheckedCreateInput>
    /**
     * In case the WorkflowExecution was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkflowExecutionUpdateInput, WorkflowExecutionUncheckedUpdateInput>
  }

  /**
   * WorkflowExecution delete
   */
  export type WorkflowExecutionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowExecution
     */
    select?: WorkflowExecutionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowExecutionInclude<ExtArgs> | null
    /**
     * Filter which WorkflowExecution to delete.
     */
    where: WorkflowExecutionWhereUniqueInput
  }

  /**
   * WorkflowExecution deleteMany
   */
  export type WorkflowExecutionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkflowExecutions to delete
     */
    where?: WorkflowExecutionWhereInput
  }

  /**
   * WorkflowExecution.tasks
   */
  export type WorkflowExecution$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * WorkflowExecution without action
   */
  export type WorkflowExecutionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowExecution
     */
    select?: WorkflowExecutionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowExecutionInclude<ExtArgs> | null
  }


  /**
   * Model Task
   */

  export type AggregateTask = {
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  export type TaskAvgAggregateOutputType = {
    retryCount: number | null
  }

  export type TaskSumAggregateOutputType = {
    retryCount: number | null
  }

  export type TaskMinAggregateOutputType = {
    id: string | null
    executionId: string | null
    assignedAgentId: string | null
    taskName: string | null
    status: $Enums.TaskStatus | null
    retryCount: number | null
    startedAt: Date | null
    completedAt: Date | null
  }

  export type TaskMaxAggregateOutputType = {
    id: string | null
    executionId: string | null
    assignedAgentId: string | null
    taskName: string | null
    status: $Enums.TaskStatus | null
    retryCount: number | null
    startedAt: Date | null
    completedAt: Date | null
  }

  export type TaskCountAggregateOutputType = {
    id: number
    executionId: number
    assignedAgentId: number
    taskName: number
    status: number
    inputPayload: number
    outputPayload: number
    retryCount: number
    startedAt: number
    completedAt: number
    _all: number
  }


  export type TaskAvgAggregateInputType = {
    retryCount?: true
  }

  export type TaskSumAggregateInputType = {
    retryCount?: true
  }

  export type TaskMinAggregateInputType = {
    id?: true
    executionId?: true
    assignedAgentId?: true
    taskName?: true
    status?: true
    retryCount?: true
    startedAt?: true
    completedAt?: true
  }

  export type TaskMaxAggregateInputType = {
    id?: true
    executionId?: true
    assignedAgentId?: true
    taskName?: true
    status?: true
    retryCount?: true
    startedAt?: true
    completedAt?: true
  }

  export type TaskCountAggregateInputType = {
    id?: true
    executionId?: true
    assignedAgentId?: true
    taskName?: true
    status?: true
    inputPayload?: true
    outputPayload?: true
    retryCount?: true
    startedAt?: true
    completedAt?: true
    _all?: true
  }

  export type TaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Task to aggregate.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tasks
    **/
    _count?: true | TaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaskAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaskSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskMaxAggregateInputType
  }

  export type GetTaskAggregateType<T extends TaskAggregateArgs> = {
        [P in keyof T & keyof AggregateTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTask[P]>
      : GetScalarType<T[P], AggregateTask[P]>
  }




  export type TaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithAggregationInput | TaskOrderByWithAggregationInput[]
    by: TaskScalarFieldEnum[] | TaskScalarFieldEnum
    having?: TaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCountAggregateInputType | true
    _avg?: TaskAvgAggregateInputType
    _sum?: TaskSumAggregateInputType
    _min?: TaskMinAggregateInputType
    _max?: TaskMaxAggregateInputType
  }

  export type TaskGroupByOutputType = {
    id: string
    executionId: string
    assignedAgentId: string | null
    taskName: string
    status: $Enums.TaskStatus
    inputPayload: JsonValue
    outputPayload: JsonValue
    retryCount: number
    startedAt: Date
    completedAt: Date | null
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  type GetTaskGroupByPayload<T extends TaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskGroupByOutputType[P]>
            : GetScalarType<T[P], TaskGroupByOutputType[P]>
        }
      >
    >


  export type TaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    executionId?: boolean
    assignedAgentId?: boolean
    taskName?: boolean
    status?: boolean
    inputPayload?: boolean
    outputPayload?: boolean
    retryCount?: boolean
    startedAt?: boolean
    completedAt?: boolean
    execution?: boolean | WorkflowExecutionDefaultArgs<ExtArgs>
    logs?: boolean | Task$logsArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    executionId?: boolean
    assignedAgentId?: boolean
    taskName?: boolean
    status?: boolean
    inputPayload?: boolean
    outputPayload?: boolean
    retryCount?: boolean
    startedAt?: boolean
    completedAt?: boolean
    execution?: boolean | WorkflowExecutionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectScalar = {
    id?: boolean
    executionId?: boolean
    assignedAgentId?: boolean
    taskName?: boolean
    status?: boolean
    inputPayload?: boolean
    outputPayload?: boolean
    retryCount?: boolean
    startedAt?: boolean
    completedAt?: boolean
  }

  export type TaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    execution?: boolean | WorkflowExecutionDefaultArgs<ExtArgs>
    logs?: boolean | Task$logsArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TaskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    execution?: boolean | WorkflowExecutionDefaultArgs<ExtArgs>
  }

  export type $TaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Task"
    objects: {
      execution: Prisma.$WorkflowExecutionPayload<ExtArgs>
      logs: Prisma.$TaskLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      executionId: string
      assignedAgentId: string | null
      taskName: string
      status: $Enums.TaskStatus
      inputPayload: Prisma.JsonValue
      outputPayload: Prisma.JsonValue
      retryCount: number
      startedAt: Date
      completedAt: Date | null
    }, ExtArgs["result"]["task"]>
    composites: {}
  }

  type TaskGetPayload<S extends boolean | null | undefined | TaskDefaultArgs> = $Result.GetResult<Prisma.$TaskPayload, S>

  type TaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TaskFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TaskCountAggregateInputType | true
    }

  export interface TaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Task'], meta: { name: 'Task' } }
    /**
     * Find zero or one Task that matches the filter.
     * @param {TaskFindUniqueArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskFindUniqueArgs>(args: SelectSubset<T, TaskFindUniqueArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Task that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TaskFindUniqueOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Task that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskFindFirstArgs>(args?: SelectSubset<T, TaskFindFirstArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Task that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.task.findMany()
     * 
     * // Get first 10 Tasks
     * const tasks = await prisma.task.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskWithIdOnly = await prisma.task.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskFindManyArgs>(args?: SelectSubset<T, TaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Task.
     * @param {TaskCreateArgs} args - Arguments to create a Task.
     * @example
     * // Create one Task
     * const Task = await prisma.task.create({
     *   data: {
     *     // ... data to create a Task
     *   }
     * })
     * 
     */
    create<T extends TaskCreateArgs>(args: SelectSubset<T, TaskCreateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Tasks.
     * @param {TaskCreateManyArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskCreateManyArgs>(args?: SelectSubset<T, TaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tasks and returns the data saved in the database.
     * @param {TaskCreateManyAndReturnArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Task.
     * @param {TaskDeleteArgs} args - Arguments to delete one Task.
     * @example
     * // Delete one Task
     * const Task = await prisma.task.delete({
     *   where: {
     *     // ... filter to delete one Task
     *   }
     * })
     * 
     */
    delete<T extends TaskDeleteArgs>(args: SelectSubset<T, TaskDeleteArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Task.
     * @param {TaskUpdateArgs} args - Arguments to update one Task.
     * @example
     * // Update one Task
     * const task = await prisma.task.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskUpdateArgs>(args: SelectSubset<T, TaskUpdateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Tasks.
     * @param {TaskDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.task.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskDeleteManyArgs>(args?: SelectSubset<T, TaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskUpdateManyArgs>(args: SelectSubset<T, TaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Task.
     * @param {TaskUpsertArgs} args - Arguments to update or create a Task.
     * @example
     * // Update or create a Task
     * const task = await prisma.task.upsert({
     *   create: {
     *     // ... data to create a Task
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Task we want to update
     *   }
     * })
     */
    upsert<T extends TaskUpsertArgs>(args: SelectSubset<T, TaskUpsertArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.task.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
    **/
    count<T extends TaskCountArgs>(
      args?: Subset<T, TaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TaskAggregateArgs>(args: Subset<T, TaskAggregateArgs>): Prisma.PrismaPromise<GetTaskAggregateType<T>>

    /**
     * Group by Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskGroupByArgs} args - Group by arguments.
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
      T extends TaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskGroupByArgs['orderBy'] }
        : { orderBy?: TaskGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Task model
   */
  readonly fields: TaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Task.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    execution<T extends WorkflowExecutionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkflowExecutionDefaultArgs<ExtArgs>>): Prisma__WorkflowExecutionClient<$Result.GetResult<Prisma.$WorkflowExecutionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    logs<T extends Task$logsArgs<ExtArgs> = {}>(args?: Subset<T, Task$logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Task model
   */ 
  interface TaskFieldRefs {
    readonly id: FieldRef<"Task", 'String'>
    readonly executionId: FieldRef<"Task", 'String'>
    readonly assignedAgentId: FieldRef<"Task", 'String'>
    readonly taskName: FieldRef<"Task", 'String'>
    readonly status: FieldRef<"Task", 'TaskStatus'>
    readonly inputPayload: FieldRef<"Task", 'Json'>
    readonly outputPayload: FieldRef<"Task", 'Json'>
    readonly retryCount: FieldRef<"Task", 'Int'>
    readonly startedAt: FieldRef<"Task", 'DateTime'>
    readonly completedAt: FieldRef<"Task", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Task findUnique
   */
  export type TaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findUniqueOrThrow
   */
  export type TaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findFirst
   */
  export type TaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findFirstOrThrow
   */
  export type TaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findMany
   */
  export type TaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Tasks to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task create
   */
  export type TaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to create a Task.
     */
    data: XOR<TaskCreateInput, TaskUncheckedCreateInput>
  }

  /**
   * Task createMany
   */
  export type TaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Task createManyAndReturn
   */
  export type TaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task update
   */
  export type TaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to update a Task.
     */
    data: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
    /**
     * Choose, which Task to update.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task updateMany
   */
  export type TaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
  }

  /**
   * Task upsert
   */
  export type TaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The filter to search for the Task to update in case it exists.
     */
    where: TaskWhereUniqueInput
    /**
     * In case the Task found by the `where` argument doesn't exist, create a new Task with this data.
     */
    create: XOR<TaskCreateInput, TaskUncheckedCreateInput>
    /**
     * In case the Task was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
  }

  /**
   * Task delete
   */
  export type TaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter which Task to delete.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task deleteMany
   */
  export type TaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tasks to delete
     */
    where?: TaskWhereInput
  }

  /**
   * Task.logs
   */
  export type Task$logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    where?: TaskLogWhereInput
    orderBy?: TaskLogOrderByWithRelationInput | TaskLogOrderByWithRelationInput[]
    cursor?: TaskLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskLogScalarFieldEnum | TaskLogScalarFieldEnum[]
  }

  /**
   * Task without action
   */
  export type TaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
  }


  /**
   * Model TaskLog
   */

  export type AggregateTaskLog = {
    _count: TaskLogCountAggregateOutputType | null
    _min: TaskLogMinAggregateOutputType | null
    _max: TaskLogMaxAggregateOutputType | null
  }

  export type TaskLogMinAggregateOutputType = {
    id: string | null
    taskId: string | null
    logLevel: $Enums.LogLevel | null
    message: string | null
    createdAt: Date | null
  }

  export type TaskLogMaxAggregateOutputType = {
    id: string | null
    taskId: string | null
    logLevel: $Enums.LogLevel | null
    message: string | null
    createdAt: Date | null
  }

  export type TaskLogCountAggregateOutputType = {
    id: number
    taskId: number
    logLevel: number
    message: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type TaskLogMinAggregateInputType = {
    id?: true
    taskId?: true
    logLevel?: true
    message?: true
    createdAt?: true
  }

  export type TaskLogMaxAggregateInputType = {
    id?: true
    taskId?: true
    logLevel?: true
    message?: true
    createdAt?: true
  }

  export type TaskLogCountAggregateInputType = {
    id?: true
    taskId?: true
    logLevel?: true
    message?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type TaskLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskLog to aggregate.
     */
    where?: TaskLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskLogs to fetch.
     */
    orderBy?: TaskLogOrderByWithRelationInput | TaskLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TaskLogs
    **/
    _count?: true | TaskLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskLogMaxAggregateInputType
  }

  export type GetTaskLogAggregateType<T extends TaskLogAggregateArgs> = {
        [P in keyof T & keyof AggregateTaskLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTaskLog[P]>
      : GetScalarType<T[P], AggregateTaskLog[P]>
  }




  export type TaskLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskLogWhereInput
    orderBy?: TaskLogOrderByWithAggregationInput | TaskLogOrderByWithAggregationInput[]
    by: TaskLogScalarFieldEnum[] | TaskLogScalarFieldEnum
    having?: TaskLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskLogCountAggregateInputType | true
    _min?: TaskLogMinAggregateInputType
    _max?: TaskLogMaxAggregateInputType
  }

  export type TaskLogGroupByOutputType = {
    id: string
    taskId: string
    logLevel: $Enums.LogLevel
    message: string
    metadata: JsonValue
    createdAt: Date
    _count: TaskLogCountAggregateOutputType | null
    _min: TaskLogMinAggregateOutputType | null
    _max: TaskLogMaxAggregateOutputType | null
  }

  type GetTaskLogGroupByPayload<T extends TaskLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskLogGroupByOutputType[P]>
            : GetScalarType<T[P], TaskLogGroupByOutputType[P]>
        }
      >
    >


  export type TaskLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    logLevel?: boolean
    message?: boolean
    metadata?: boolean
    createdAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskLog"]>

  export type TaskLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    logLevel?: boolean
    message?: boolean
    metadata?: boolean
    createdAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskLog"]>

  export type TaskLogSelectScalar = {
    id?: boolean
    taskId?: boolean
    logLevel?: boolean
    message?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type TaskLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }
  export type TaskLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }

  export type $TaskLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TaskLog"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      taskId: string
      logLevel: $Enums.LogLevel
      message: string
      metadata: Prisma.JsonValue
      createdAt: Date
    }, ExtArgs["result"]["taskLog"]>
    composites: {}
  }

  type TaskLogGetPayload<S extends boolean | null | undefined | TaskLogDefaultArgs> = $Result.GetResult<Prisma.$TaskLogPayload, S>

  type TaskLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TaskLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TaskLogCountAggregateInputType | true
    }

  export interface TaskLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TaskLog'], meta: { name: 'TaskLog' } }
    /**
     * Find zero or one TaskLog that matches the filter.
     * @param {TaskLogFindUniqueArgs} args - Arguments to find a TaskLog
     * @example
     * // Get one TaskLog
     * const taskLog = await prisma.taskLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskLogFindUniqueArgs>(args: SelectSubset<T, TaskLogFindUniqueArgs<ExtArgs>>): Prisma__TaskLogClient<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TaskLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TaskLogFindUniqueOrThrowArgs} args - Arguments to find a TaskLog
     * @example
     * // Get one TaskLog
     * const taskLog = await prisma.taskLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskLogFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskLogClient<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TaskLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskLogFindFirstArgs} args - Arguments to find a TaskLog
     * @example
     * // Get one TaskLog
     * const taskLog = await prisma.taskLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskLogFindFirstArgs>(args?: SelectSubset<T, TaskLogFindFirstArgs<ExtArgs>>): Prisma__TaskLogClient<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TaskLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskLogFindFirstOrThrowArgs} args - Arguments to find a TaskLog
     * @example
     * // Get one TaskLog
     * const taskLog = await prisma.taskLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskLogFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskLogClient<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TaskLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TaskLogs
     * const taskLogs = await prisma.taskLog.findMany()
     * 
     * // Get first 10 TaskLogs
     * const taskLogs = await prisma.taskLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskLogWithIdOnly = await prisma.taskLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskLogFindManyArgs>(args?: SelectSubset<T, TaskLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TaskLog.
     * @param {TaskLogCreateArgs} args - Arguments to create a TaskLog.
     * @example
     * // Create one TaskLog
     * const TaskLog = await prisma.taskLog.create({
     *   data: {
     *     // ... data to create a TaskLog
     *   }
     * })
     * 
     */
    create<T extends TaskLogCreateArgs>(args: SelectSubset<T, TaskLogCreateArgs<ExtArgs>>): Prisma__TaskLogClient<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TaskLogs.
     * @param {TaskLogCreateManyArgs} args - Arguments to create many TaskLogs.
     * @example
     * // Create many TaskLogs
     * const taskLog = await prisma.taskLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskLogCreateManyArgs>(args?: SelectSubset<T, TaskLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TaskLogs and returns the data saved in the database.
     * @param {TaskLogCreateManyAndReturnArgs} args - Arguments to create many TaskLogs.
     * @example
     * // Create many TaskLogs
     * const taskLog = await prisma.taskLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TaskLogs and only return the `id`
     * const taskLogWithIdOnly = await prisma.taskLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskLogCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a TaskLog.
     * @param {TaskLogDeleteArgs} args - Arguments to delete one TaskLog.
     * @example
     * // Delete one TaskLog
     * const TaskLog = await prisma.taskLog.delete({
     *   where: {
     *     // ... filter to delete one TaskLog
     *   }
     * })
     * 
     */
    delete<T extends TaskLogDeleteArgs>(args: SelectSubset<T, TaskLogDeleteArgs<ExtArgs>>): Prisma__TaskLogClient<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TaskLog.
     * @param {TaskLogUpdateArgs} args - Arguments to update one TaskLog.
     * @example
     * // Update one TaskLog
     * const taskLog = await prisma.taskLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskLogUpdateArgs>(args: SelectSubset<T, TaskLogUpdateArgs<ExtArgs>>): Prisma__TaskLogClient<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TaskLogs.
     * @param {TaskLogDeleteManyArgs} args - Arguments to filter TaskLogs to delete.
     * @example
     * // Delete a few TaskLogs
     * const { count } = await prisma.taskLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskLogDeleteManyArgs>(args?: SelectSubset<T, TaskLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaskLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TaskLogs
     * const taskLog = await prisma.taskLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskLogUpdateManyArgs>(args: SelectSubset<T, TaskLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TaskLog.
     * @param {TaskLogUpsertArgs} args - Arguments to update or create a TaskLog.
     * @example
     * // Update or create a TaskLog
     * const taskLog = await prisma.taskLog.upsert({
     *   create: {
     *     // ... data to create a TaskLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TaskLog we want to update
     *   }
     * })
     */
    upsert<T extends TaskLogUpsertArgs>(args: SelectSubset<T, TaskLogUpsertArgs<ExtArgs>>): Prisma__TaskLogClient<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TaskLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskLogCountArgs} args - Arguments to filter TaskLogs to count.
     * @example
     * // Count the number of TaskLogs
     * const count = await prisma.taskLog.count({
     *   where: {
     *     // ... the filter for the TaskLogs we want to count
     *   }
     * })
    **/
    count<T extends TaskLogCountArgs>(
      args?: Subset<T, TaskLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TaskLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TaskLogAggregateArgs>(args: Subset<T, TaskLogAggregateArgs>): Prisma.PrismaPromise<GetTaskLogAggregateType<T>>

    /**
     * Group by TaskLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskLogGroupByArgs} args - Group by arguments.
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
      T extends TaskLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskLogGroupByArgs['orderBy'] }
        : { orderBy?: TaskLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TaskLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TaskLog model
   */
  readonly fields: TaskLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TaskLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the TaskLog model
   */ 
  interface TaskLogFieldRefs {
    readonly id: FieldRef<"TaskLog", 'String'>
    readonly taskId: FieldRef<"TaskLog", 'String'>
    readonly logLevel: FieldRef<"TaskLog", 'LogLevel'>
    readonly message: FieldRef<"TaskLog", 'String'>
    readonly metadata: FieldRef<"TaskLog", 'Json'>
    readonly createdAt: FieldRef<"TaskLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TaskLog findUnique
   */
  export type TaskLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    /**
     * Filter, which TaskLog to fetch.
     */
    where: TaskLogWhereUniqueInput
  }

  /**
   * TaskLog findUniqueOrThrow
   */
  export type TaskLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    /**
     * Filter, which TaskLog to fetch.
     */
    where: TaskLogWhereUniqueInput
  }

  /**
   * TaskLog findFirst
   */
  export type TaskLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    /**
     * Filter, which TaskLog to fetch.
     */
    where?: TaskLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskLogs to fetch.
     */
    orderBy?: TaskLogOrderByWithRelationInput | TaskLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskLogs.
     */
    cursor?: TaskLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskLogs.
     */
    distinct?: TaskLogScalarFieldEnum | TaskLogScalarFieldEnum[]
  }

  /**
   * TaskLog findFirstOrThrow
   */
  export type TaskLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    /**
     * Filter, which TaskLog to fetch.
     */
    where?: TaskLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskLogs to fetch.
     */
    orderBy?: TaskLogOrderByWithRelationInput | TaskLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskLogs.
     */
    cursor?: TaskLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskLogs.
     */
    distinct?: TaskLogScalarFieldEnum | TaskLogScalarFieldEnum[]
  }

  /**
   * TaskLog findMany
   */
  export type TaskLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    /**
     * Filter, which TaskLogs to fetch.
     */
    where?: TaskLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskLogs to fetch.
     */
    orderBy?: TaskLogOrderByWithRelationInput | TaskLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TaskLogs.
     */
    cursor?: TaskLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskLogs.
     */
    skip?: number
    distinct?: TaskLogScalarFieldEnum | TaskLogScalarFieldEnum[]
  }

  /**
   * TaskLog create
   */
  export type TaskLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    /**
     * The data needed to create a TaskLog.
     */
    data: XOR<TaskLogCreateInput, TaskLogUncheckedCreateInput>
  }

  /**
   * TaskLog createMany
   */
  export type TaskLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TaskLogs.
     */
    data: TaskLogCreateManyInput | TaskLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TaskLog createManyAndReturn
   */
  export type TaskLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many TaskLogs.
     */
    data: TaskLogCreateManyInput | TaskLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TaskLog update
   */
  export type TaskLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    /**
     * The data needed to update a TaskLog.
     */
    data: XOR<TaskLogUpdateInput, TaskLogUncheckedUpdateInput>
    /**
     * Choose, which TaskLog to update.
     */
    where: TaskLogWhereUniqueInput
  }

  /**
   * TaskLog updateMany
   */
  export type TaskLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TaskLogs.
     */
    data: XOR<TaskLogUpdateManyMutationInput, TaskLogUncheckedUpdateManyInput>
    /**
     * Filter which TaskLogs to update
     */
    where?: TaskLogWhereInput
  }

  /**
   * TaskLog upsert
   */
  export type TaskLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    /**
     * The filter to search for the TaskLog to update in case it exists.
     */
    where: TaskLogWhereUniqueInput
    /**
     * In case the TaskLog found by the `where` argument doesn't exist, create a new TaskLog with this data.
     */
    create: XOR<TaskLogCreateInput, TaskLogUncheckedCreateInput>
    /**
     * In case the TaskLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskLogUpdateInput, TaskLogUncheckedUpdateInput>
  }

  /**
   * TaskLog delete
   */
  export type TaskLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    /**
     * Filter which TaskLog to delete.
     */
    where: TaskLogWhereUniqueInput
  }

  /**
   * TaskLog deleteMany
   */
  export type TaskLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskLogs to delete
     */
    where?: TaskLogWhereInput
  }

  /**
   * TaskLog without action
   */
  export type TaskLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
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


  export const WorkflowScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    status: 'status',
    estimatedCost: 'estimatedCost',
    actualCost: 'actualCost',
    createdAt: 'createdAt',
    deletedAt: 'deletedAt'
  };

  export type WorkflowScalarFieldEnum = (typeof WorkflowScalarFieldEnum)[keyof typeof WorkflowScalarFieldEnum]


  export const WorkflowNodeScalarFieldEnum: {
    id: 'id',
    workflowId: 'workflowId',
    agentId: 'agentId',
    capability: 'capability',
    status: 'status',
    positionX: 'positionX',
    positionY: 'positionY'
  };

  export type WorkflowNodeScalarFieldEnum = (typeof WorkflowNodeScalarFieldEnum)[keyof typeof WorkflowNodeScalarFieldEnum]


  export const WorkflowEdgeScalarFieldEnum: {
    id: 'id',
    workflowId: 'workflowId',
    sourceNode: 'sourceNode',
    targetNode: 'targetNode'
  };

  export type WorkflowEdgeScalarFieldEnum = (typeof WorkflowEdgeScalarFieldEnum)[keyof typeof WorkflowEdgeScalarFieldEnum]


  export const WorkflowExecutionScalarFieldEnum: {
    id: 'id',
    workflowId: 'workflowId',
    status: 'status',
    startedAt: 'startedAt',
    completedAt: 'completedAt'
  };

  export type WorkflowExecutionScalarFieldEnum = (typeof WorkflowExecutionScalarFieldEnum)[keyof typeof WorkflowExecutionScalarFieldEnum]


  export const TaskScalarFieldEnum: {
    id: 'id',
    executionId: 'executionId',
    assignedAgentId: 'assignedAgentId',
    taskName: 'taskName',
    status: 'status',
    inputPayload: 'inputPayload',
    outputPayload: 'outputPayload',
    retryCount: 'retryCount',
    startedAt: 'startedAt',
    completedAt: 'completedAt'
  };

  export type TaskScalarFieldEnum = (typeof TaskScalarFieldEnum)[keyof typeof TaskScalarFieldEnum]


  export const TaskLogScalarFieldEnum: {
    id: 'id',
    taskId: 'taskId',
    logLevel: 'logLevel',
    message: 'message',
    metadata: 'metadata',
    createdAt: 'createdAt'
  };

  export type TaskLogScalarFieldEnum = (typeof TaskLogScalarFieldEnum)[keyof typeof TaskLogScalarFieldEnum]


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
   * Reference to a field of type 'ExecutionStatus'
   */
  export type EnumExecutionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExecutionStatus'>
    


  /**
   * Reference to a field of type 'ExecutionStatus[]'
   */
  export type ListEnumExecutionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExecutionStatus[]'>
    


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'TaskStatus'
   */
  export type EnumTaskStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaskStatus'>
    


  /**
   * Reference to a field of type 'TaskStatus[]'
   */
  export type ListEnumTaskStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaskStatus[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'LogLevel'
   */
  export type EnumLogLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LogLevel'>
    


  /**
   * Reference to a field of type 'LogLevel[]'
   */
  export type ListEnumLogLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LogLevel[]'>
    


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


  export type WorkflowWhereInput = {
    AND?: WorkflowWhereInput | WorkflowWhereInput[]
    OR?: WorkflowWhereInput[]
    NOT?: WorkflowWhereInput | WorkflowWhereInput[]
    id?: StringFilter<"Workflow"> | string
    userId?: StringFilter<"Workflow"> | string
    title?: StringFilter<"Workflow"> | string
    status?: EnumExecutionStatusFilter<"Workflow"> | $Enums.ExecutionStatus
    estimatedCost?: DecimalFilter<"Workflow"> | Decimal | DecimalJsLike | number | string
    actualCost?: DecimalFilter<"Workflow"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"Workflow"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Workflow"> | Date | string | null
    nodes?: WorkflowNodeListRelationFilter
    edges?: WorkflowEdgeListRelationFilter
    executions?: WorkflowExecutionListRelationFilter
  }

  export type WorkflowOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    status?: SortOrder
    estimatedCost?: SortOrder
    actualCost?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    nodes?: WorkflowNodeOrderByRelationAggregateInput
    edges?: WorkflowEdgeOrderByRelationAggregateInput
    executions?: WorkflowExecutionOrderByRelationAggregateInput
  }

  export type WorkflowWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WorkflowWhereInput | WorkflowWhereInput[]
    OR?: WorkflowWhereInput[]
    NOT?: WorkflowWhereInput | WorkflowWhereInput[]
    userId?: StringFilter<"Workflow"> | string
    title?: StringFilter<"Workflow"> | string
    status?: EnumExecutionStatusFilter<"Workflow"> | $Enums.ExecutionStatus
    estimatedCost?: DecimalFilter<"Workflow"> | Decimal | DecimalJsLike | number | string
    actualCost?: DecimalFilter<"Workflow"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"Workflow"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Workflow"> | Date | string | null
    nodes?: WorkflowNodeListRelationFilter
    edges?: WorkflowEdgeListRelationFilter
    executions?: WorkflowExecutionListRelationFilter
  }, "id">

  export type WorkflowOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    status?: SortOrder
    estimatedCost?: SortOrder
    actualCost?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: WorkflowCountOrderByAggregateInput
    _avg?: WorkflowAvgOrderByAggregateInput
    _max?: WorkflowMaxOrderByAggregateInput
    _min?: WorkflowMinOrderByAggregateInput
    _sum?: WorkflowSumOrderByAggregateInput
  }

  export type WorkflowScalarWhereWithAggregatesInput = {
    AND?: WorkflowScalarWhereWithAggregatesInput | WorkflowScalarWhereWithAggregatesInput[]
    OR?: WorkflowScalarWhereWithAggregatesInput[]
    NOT?: WorkflowScalarWhereWithAggregatesInput | WorkflowScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Workflow"> | string
    userId?: StringWithAggregatesFilter<"Workflow"> | string
    title?: StringWithAggregatesFilter<"Workflow"> | string
    status?: EnumExecutionStatusWithAggregatesFilter<"Workflow"> | $Enums.ExecutionStatus
    estimatedCost?: DecimalWithAggregatesFilter<"Workflow"> | Decimal | DecimalJsLike | number | string
    actualCost?: DecimalWithAggregatesFilter<"Workflow"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeWithAggregatesFilter<"Workflow"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Workflow"> | Date | string | null
  }

  export type WorkflowNodeWhereInput = {
    AND?: WorkflowNodeWhereInput | WorkflowNodeWhereInput[]
    OR?: WorkflowNodeWhereInput[]
    NOT?: WorkflowNodeWhereInput | WorkflowNodeWhereInput[]
    id?: StringFilter<"WorkflowNode"> | string
    workflowId?: StringFilter<"WorkflowNode"> | string
    agentId?: StringFilter<"WorkflowNode"> | string
    capability?: StringFilter<"WorkflowNode"> | string
    status?: StringFilter<"WorkflowNode"> | string
    positionX?: IntFilter<"WorkflowNode"> | number
    positionY?: IntFilter<"WorkflowNode"> | number
    workflow?: XOR<WorkflowRelationFilter, WorkflowWhereInput>
  }

  export type WorkflowNodeOrderByWithRelationInput = {
    id?: SortOrder
    workflowId?: SortOrder
    agentId?: SortOrder
    capability?: SortOrder
    status?: SortOrder
    positionX?: SortOrder
    positionY?: SortOrder
    workflow?: WorkflowOrderByWithRelationInput
  }

  export type WorkflowNodeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WorkflowNodeWhereInput | WorkflowNodeWhereInput[]
    OR?: WorkflowNodeWhereInput[]
    NOT?: WorkflowNodeWhereInput | WorkflowNodeWhereInput[]
    workflowId?: StringFilter<"WorkflowNode"> | string
    agentId?: StringFilter<"WorkflowNode"> | string
    capability?: StringFilter<"WorkflowNode"> | string
    status?: StringFilter<"WorkflowNode"> | string
    positionX?: IntFilter<"WorkflowNode"> | number
    positionY?: IntFilter<"WorkflowNode"> | number
    workflow?: XOR<WorkflowRelationFilter, WorkflowWhereInput>
  }, "id">

  export type WorkflowNodeOrderByWithAggregationInput = {
    id?: SortOrder
    workflowId?: SortOrder
    agentId?: SortOrder
    capability?: SortOrder
    status?: SortOrder
    positionX?: SortOrder
    positionY?: SortOrder
    _count?: WorkflowNodeCountOrderByAggregateInput
    _avg?: WorkflowNodeAvgOrderByAggregateInput
    _max?: WorkflowNodeMaxOrderByAggregateInput
    _min?: WorkflowNodeMinOrderByAggregateInput
    _sum?: WorkflowNodeSumOrderByAggregateInput
  }

  export type WorkflowNodeScalarWhereWithAggregatesInput = {
    AND?: WorkflowNodeScalarWhereWithAggregatesInput | WorkflowNodeScalarWhereWithAggregatesInput[]
    OR?: WorkflowNodeScalarWhereWithAggregatesInput[]
    NOT?: WorkflowNodeScalarWhereWithAggregatesInput | WorkflowNodeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WorkflowNode"> | string
    workflowId?: StringWithAggregatesFilter<"WorkflowNode"> | string
    agentId?: StringWithAggregatesFilter<"WorkflowNode"> | string
    capability?: StringWithAggregatesFilter<"WorkflowNode"> | string
    status?: StringWithAggregatesFilter<"WorkflowNode"> | string
    positionX?: IntWithAggregatesFilter<"WorkflowNode"> | number
    positionY?: IntWithAggregatesFilter<"WorkflowNode"> | number
  }

  export type WorkflowEdgeWhereInput = {
    AND?: WorkflowEdgeWhereInput | WorkflowEdgeWhereInput[]
    OR?: WorkflowEdgeWhereInput[]
    NOT?: WorkflowEdgeWhereInput | WorkflowEdgeWhereInput[]
    id?: StringFilter<"WorkflowEdge"> | string
    workflowId?: StringFilter<"WorkflowEdge"> | string
    sourceNode?: StringFilter<"WorkflowEdge"> | string
    targetNode?: StringFilter<"WorkflowEdge"> | string
    workflow?: XOR<WorkflowRelationFilter, WorkflowWhereInput>
  }

  export type WorkflowEdgeOrderByWithRelationInput = {
    id?: SortOrder
    workflowId?: SortOrder
    sourceNode?: SortOrder
    targetNode?: SortOrder
    workflow?: WorkflowOrderByWithRelationInput
  }

  export type WorkflowEdgeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WorkflowEdgeWhereInput | WorkflowEdgeWhereInput[]
    OR?: WorkflowEdgeWhereInput[]
    NOT?: WorkflowEdgeWhereInput | WorkflowEdgeWhereInput[]
    workflowId?: StringFilter<"WorkflowEdge"> | string
    sourceNode?: StringFilter<"WorkflowEdge"> | string
    targetNode?: StringFilter<"WorkflowEdge"> | string
    workflow?: XOR<WorkflowRelationFilter, WorkflowWhereInput>
  }, "id">

  export type WorkflowEdgeOrderByWithAggregationInput = {
    id?: SortOrder
    workflowId?: SortOrder
    sourceNode?: SortOrder
    targetNode?: SortOrder
    _count?: WorkflowEdgeCountOrderByAggregateInput
    _max?: WorkflowEdgeMaxOrderByAggregateInput
    _min?: WorkflowEdgeMinOrderByAggregateInput
  }

  export type WorkflowEdgeScalarWhereWithAggregatesInput = {
    AND?: WorkflowEdgeScalarWhereWithAggregatesInput | WorkflowEdgeScalarWhereWithAggregatesInput[]
    OR?: WorkflowEdgeScalarWhereWithAggregatesInput[]
    NOT?: WorkflowEdgeScalarWhereWithAggregatesInput | WorkflowEdgeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WorkflowEdge"> | string
    workflowId?: StringWithAggregatesFilter<"WorkflowEdge"> | string
    sourceNode?: StringWithAggregatesFilter<"WorkflowEdge"> | string
    targetNode?: StringWithAggregatesFilter<"WorkflowEdge"> | string
  }

  export type WorkflowExecutionWhereInput = {
    AND?: WorkflowExecutionWhereInput | WorkflowExecutionWhereInput[]
    OR?: WorkflowExecutionWhereInput[]
    NOT?: WorkflowExecutionWhereInput | WorkflowExecutionWhereInput[]
    id?: StringFilter<"WorkflowExecution"> | string
    workflowId?: StringFilter<"WorkflowExecution"> | string
    status?: EnumExecutionStatusFilter<"WorkflowExecution"> | $Enums.ExecutionStatus
    startedAt?: DateTimeFilter<"WorkflowExecution"> | Date | string
    completedAt?: DateTimeNullableFilter<"WorkflowExecution"> | Date | string | null
    workflow?: XOR<WorkflowRelationFilter, WorkflowWhereInput>
    tasks?: TaskListRelationFilter
  }

  export type WorkflowExecutionOrderByWithRelationInput = {
    id?: SortOrder
    workflowId?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    workflow?: WorkflowOrderByWithRelationInput
    tasks?: TaskOrderByRelationAggregateInput
  }

  export type WorkflowExecutionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WorkflowExecutionWhereInput | WorkflowExecutionWhereInput[]
    OR?: WorkflowExecutionWhereInput[]
    NOT?: WorkflowExecutionWhereInput | WorkflowExecutionWhereInput[]
    workflowId?: StringFilter<"WorkflowExecution"> | string
    status?: EnumExecutionStatusFilter<"WorkflowExecution"> | $Enums.ExecutionStatus
    startedAt?: DateTimeFilter<"WorkflowExecution"> | Date | string
    completedAt?: DateTimeNullableFilter<"WorkflowExecution"> | Date | string | null
    workflow?: XOR<WorkflowRelationFilter, WorkflowWhereInput>
    tasks?: TaskListRelationFilter
  }, "id">

  export type WorkflowExecutionOrderByWithAggregationInput = {
    id?: SortOrder
    workflowId?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    _count?: WorkflowExecutionCountOrderByAggregateInput
    _max?: WorkflowExecutionMaxOrderByAggregateInput
    _min?: WorkflowExecutionMinOrderByAggregateInput
  }

  export type WorkflowExecutionScalarWhereWithAggregatesInput = {
    AND?: WorkflowExecutionScalarWhereWithAggregatesInput | WorkflowExecutionScalarWhereWithAggregatesInput[]
    OR?: WorkflowExecutionScalarWhereWithAggregatesInput[]
    NOT?: WorkflowExecutionScalarWhereWithAggregatesInput | WorkflowExecutionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WorkflowExecution"> | string
    workflowId?: StringWithAggregatesFilter<"WorkflowExecution"> | string
    status?: EnumExecutionStatusWithAggregatesFilter<"WorkflowExecution"> | $Enums.ExecutionStatus
    startedAt?: DateTimeWithAggregatesFilter<"WorkflowExecution"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"WorkflowExecution"> | Date | string | null
  }

  export type TaskWhereInput = {
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    id?: StringFilter<"Task"> | string
    executionId?: StringFilter<"Task"> | string
    assignedAgentId?: StringNullableFilter<"Task"> | string | null
    taskName?: StringFilter<"Task"> | string
    status?: EnumTaskStatusFilter<"Task"> | $Enums.TaskStatus
    inputPayload?: JsonFilter<"Task">
    outputPayload?: JsonFilter<"Task">
    retryCount?: IntFilter<"Task"> | number
    startedAt?: DateTimeFilter<"Task"> | Date | string
    completedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    execution?: XOR<WorkflowExecutionRelationFilter, WorkflowExecutionWhereInput>
    logs?: TaskLogListRelationFilter
  }

  export type TaskOrderByWithRelationInput = {
    id?: SortOrder
    executionId?: SortOrder
    assignedAgentId?: SortOrderInput | SortOrder
    taskName?: SortOrder
    status?: SortOrder
    inputPayload?: SortOrder
    outputPayload?: SortOrder
    retryCount?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    execution?: WorkflowExecutionOrderByWithRelationInput
    logs?: TaskLogOrderByRelationAggregateInput
  }

  export type TaskWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    executionId?: StringFilter<"Task"> | string
    assignedAgentId?: StringNullableFilter<"Task"> | string | null
    taskName?: StringFilter<"Task"> | string
    status?: EnumTaskStatusFilter<"Task"> | $Enums.TaskStatus
    inputPayload?: JsonFilter<"Task">
    outputPayload?: JsonFilter<"Task">
    retryCount?: IntFilter<"Task"> | number
    startedAt?: DateTimeFilter<"Task"> | Date | string
    completedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    execution?: XOR<WorkflowExecutionRelationFilter, WorkflowExecutionWhereInput>
    logs?: TaskLogListRelationFilter
  }, "id">

  export type TaskOrderByWithAggregationInput = {
    id?: SortOrder
    executionId?: SortOrder
    assignedAgentId?: SortOrderInput | SortOrder
    taskName?: SortOrder
    status?: SortOrder
    inputPayload?: SortOrder
    outputPayload?: SortOrder
    retryCount?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    _count?: TaskCountOrderByAggregateInput
    _avg?: TaskAvgOrderByAggregateInput
    _max?: TaskMaxOrderByAggregateInput
    _min?: TaskMinOrderByAggregateInput
    _sum?: TaskSumOrderByAggregateInput
  }

  export type TaskScalarWhereWithAggregatesInput = {
    AND?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    OR?: TaskScalarWhereWithAggregatesInput[]
    NOT?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Task"> | string
    executionId?: StringWithAggregatesFilter<"Task"> | string
    assignedAgentId?: StringNullableWithAggregatesFilter<"Task"> | string | null
    taskName?: StringWithAggregatesFilter<"Task"> | string
    status?: EnumTaskStatusWithAggregatesFilter<"Task"> | $Enums.TaskStatus
    inputPayload?: JsonWithAggregatesFilter<"Task">
    outputPayload?: JsonWithAggregatesFilter<"Task">
    retryCount?: IntWithAggregatesFilter<"Task"> | number
    startedAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"Task"> | Date | string | null
  }

  export type TaskLogWhereInput = {
    AND?: TaskLogWhereInput | TaskLogWhereInput[]
    OR?: TaskLogWhereInput[]
    NOT?: TaskLogWhereInput | TaskLogWhereInput[]
    id?: StringFilter<"TaskLog"> | string
    taskId?: StringFilter<"TaskLog"> | string
    logLevel?: EnumLogLevelFilter<"TaskLog"> | $Enums.LogLevel
    message?: StringFilter<"TaskLog"> | string
    metadata?: JsonFilter<"TaskLog">
    createdAt?: DateTimeFilter<"TaskLog"> | Date | string
    task?: XOR<TaskRelationFilter, TaskWhereInput>
  }

  export type TaskLogOrderByWithRelationInput = {
    id?: SortOrder
    taskId?: SortOrder
    logLevel?: SortOrder
    message?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    task?: TaskOrderByWithRelationInput
  }

  export type TaskLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TaskLogWhereInput | TaskLogWhereInput[]
    OR?: TaskLogWhereInput[]
    NOT?: TaskLogWhereInput | TaskLogWhereInput[]
    taskId?: StringFilter<"TaskLog"> | string
    logLevel?: EnumLogLevelFilter<"TaskLog"> | $Enums.LogLevel
    message?: StringFilter<"TaskLog"> | string
    metadata?: JsonFilter<"TaskLog">
    createdAt?: DateTimeFilter<"TaskLog"> | Date | string
    task?: XOR<TaskRelationFilter, TaskWhereInput>
  }, "id">

  export type TaskLogOrderByWithAggregationInput = {
    id?: SortOrder
    taskId?: SortOrder
    logLevel?: SortOrder
    message?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    _count?: TaskLogCountOrderByAggregateInput
    _max?: TaskLogMaxOrderByAggregateInput
    _min?: TaskLogMinOrderByAggregateInput
  }

  export type TaskLogScalarWhereWithAggregatesInput = {
    AND?: TaskLogScalarWhereWithAggregatesInput | TaskLogScalarWhereWithAggregatesInput[]
    OR?: TaskLogScalarWhereWithAggregatesInput[]
    NOT?: TaskLogScalarWhereWithAggregatesInput | TaskLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TaskLog"> | string
    taskId?: StringWithAggregatesFilter<"TaskLog"> | string
    logLevel?: EnumLogLevelWithAggregatesFilter<"TaskLog"> | $Enums.LogLevel
    message?: StringWithAggregatesFilter<"TaskLog"> | string
    metadata?: JsonWithAggregatesFilter<"TaskLog">
    createdAt?: DateTimeWithAggregatesFilter<"TaskLog"> | Date | string
  }

  export type WorkflowCreateInput = {
    id?: string
    userId: string
    title: string
    status?: $Enums.ExecutionStatus
    estimatedCost: Decimal | DecimalJsLike | number | string
    actualCost: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    nodes?: WorkflowNodeCreateNestedManyWithoutWorkflowInput
    edges?: WorkflowEdgeCreateNestedManyWithoutWorkflowInput
    executions?: WorkflowExecutionCreateNestedManyWithoutWorkflowInput
  }

  export type WorkflowUncheckedCreateInput = {
    id?: string
    userId: string
    title: string
    status?: $Enums.ExecutionStatus
    estimatedCost: Decimal | DecimalJsLike | number | string
    actualCost: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    nodes?: WorkflowNodeUncheckedCreateNestedManyWithoutWorkflowInput
    edges?: WorkflowEdgeUncheckedCreateNestedManyWithoutWorkflowInput
    executions?: WorkflowExecutionUncheckedCreateNestedManyWithoutWorkflowInput
  }

  export type WorkflowUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumExecutionStatusFieldUpdateOperationsInput | $Enums.ExecutionStatus
    estimatedCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    actualCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nodes?: WorkflowNodeUpdateManyWithoutWorkflowNestedInput
    edges?: WorkflowEdgeUpdateManyWithoutWorkflowNestedInput
    executions?: WorkflowExecutionUpdateManyWithoutWorkflowNestedInput
  }

  export type WorkflowUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumExecutionStatusFieldUpdateOperationsInput | $Enums.ExecutionStatus
    estimatedCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    actualCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nodes?: WorkflowNodeUncheckedUpdateManyWithoutWorkflowNestedInput
    edges?: WorkflowEdgeUncheckedUpdateManyWithoutWorkflowNestedInput
    executions?: WorkflowExecutionUncheckedUpdateManyWithoutWorkflowNestedInput
  }

  export type WorkflowCreateManyInput = {
    id?: string
    userId: string
    title: string
    status?: $Enums.ExecutionStatus
    estimatedCost: Decimal | DecimalJsLike | number | string
    actualCost: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type WorkflowUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumExecutionStatusFieldUpdateOperationsInput | $Enums.ExecutionStatus
    estimatedCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    actualCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WorkflowUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumExecutionStatusFieldUpdateOperationsInput | $Enums.ExecutionStatus
    estimatedCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    actualCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WorkflowNodeCreateInput = {
    id?: string
    agentId: string
    capability: string
    status: string
    positionX: number
    positionY: number
    workflow: WorkflowCreateNestedOneWithoutNodesInput
  }

  export type WorkflowNodeUncheckedCreateInput = {
    id?: string
    workflowId: string
    agentId: string
    capability: string
    status: string
    positionX: number
    positionY: number
  }

  export type WorkflowNodeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    capability?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    positionX?: IntFieldUpdateOperationsInput | number
    positionY?: IntFieldUpdateOperationsInput | number
    workflow?: WorkflowUpdateOneRequiredWithoutNodesNestedInput
  }

  export type WorkflowNodeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    workflowId?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    capability?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    positionX?: IntFieldUpdateOperationsInput | number
    positionY?: IntFieldUpdateOperationsInput | number
  }

  export type WorkflowNodeCreateManyInput = {
    id?: string
    workflowId: string
    agentId: string
    capability: string
    status: string
    positionX: number
    positionY: number
  }

  export type WorkflowNodeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    capability?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    positionX?: IntFieldUpdateOperationsInput | number
    positionY?: IntFieldUpdateOperationsInput | number
  }

  export type WorkflowNodeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    workflowId?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    capability?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    positionX?: IntFieldUpdateOperationsInput | number
    positionY?: IntFieldUpdateOperationsInput | number
  }

  export type WorkflowEdgeCreateInput = {
    id?: string
    sourceNode: string
    targetNode: string
    workflow: WorkflowCreateNestedOneWithoutEdgesInput
  }

  export type WorkflowEdgeUncheckedCreateInput = {
    id?: string
    workflowId: string
    sourceNode: string
    targetNode: string
  }

  export type WorkflowEdgeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceNode?: StringFieldUpdateOperationsInput | string
    targetNode?: StringFieldUpdateOperationsInput | string
    workflow?: WorkflowUpdateOneRequiredWithoutEdgesNestedInput
  }

  export type WorkflowEdgeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    workflowId?: StringFieldUpdateOperationsInput | string
    sourceNode?: StringFieldUpdateOperationsInput | string
    targetNode?: StringFieldUpdateOperationsInput | string
  }

  export type WorkflowEdgeCreateManyInput = {
    id?: string
    workflowId: string
    sourceNode: string
    targetNode: string
  }

  export type WorkflowEdgeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceNode?: StringFieldUpdateOperationsInput | string
    targetNode?: StringFieldUpdateOperationsInput | string
  }

  export type WorkflowEdgeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    workflowId?: StringFieldUpdateOperationsInput | string
    sourceNode?: StringFieldUpdateOperationsInput | string
    targetNode?: StringFieldUpdateOperationsInput | string
  }

  export type WorkflowExecutionCreateInput = {
    id?: string
    status?: $Enums.ExecutionStatus
    startedAt?: Date | string
    completedAt?: Date | string | null
    workflow: WorkflowCreateNestedOneWithoutExecutionsInput
    tasks?: TaskCreateNestedManyWithoutExecutionInput
  }

  export type WorkflowExecutionUncheckedCreateInput = {
    id?: string
    workflowId: string
    status?: $Enums.ExecutionStatus
    startedAt?: Date | string
    completedAt?: Date | string | null
    tasks?: TaskUncheckedCreateNestedManyWithoutExecutionInput
  }

  export type WorkflowExecutionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumExecutionStatusFieldUpdateOperationsInput | $Enums.ExecutionStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workflow?: WorkflowUpdateOneRequiredWithoutExecutionsNestedInput
    tasks?: TaskUpdateManyWithoutExecutionNestedInput
  }

  export type WorkflowExecutionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    workflowId?: StringFieldUpdateOperationsInput | string
    status?: EnumExecutionStatusFieldUpdateOperationsInput | $Enums.ExecutionStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tasks?: TaskUncheckedUpdateManyWithoutExecutionNestedInput
  }

  export type WorkflowExecutionCreateManyInput = {
    id?: string
    workflowId: string
    status?: $Enums.ExecutionStatus
    startedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type WorkflowExecutionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumExecutionStatusFieldUpdateOperationsInput | $Enums.ExecutionStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WorkflowExecutionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    workflowId?: StringFieldUpdateOperationsInput | string
    status?: EnumExecutionStatusFieldUpdateOperationsInput | $Enums.ExecutionStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TaskCreateInput = {
    id?: string
    assignedAgentId?: string | null
    taskName: string
    status?: $Enums.TaskStatus
    inputPayload?: JsonNullValueInput | InputJsonValue
    outputPayload?: JsonNullValueInput | InputJsonValue
    retryCount?: number
    startedAt?: Date | string
    completedAt?: Date | string | null
    execution: WorkflowExecutionCreateNestedOneWithoutTasksInput
    logs?: TaskLogCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateInput = {
    id?: string
    executionId: string
    assignedAgentId?: string | null
    taskName: string
    status?: $Enums.TaskStatus
    inputPayload?: JsonNullValueInput | InputJsonValue
    outputPayload?: JsonNullValueInput | InputJsonValue
    retryCount?: number
    startedAt?: Date | string
    completedAt?: Date | string | null
    logs?: TaskLogUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    assignedAgentId?: NullableStringFieldUpdateOperationsInput | string | null
    taskName?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    inputPayload?: JsonNullValueInput | InputJsonValue
    outputPayload?: JsonNullValueInput | InputJsonValue
    retryCount?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    execution?: WorkflowExecutionUpdateOneRequiredWithoutTasksNestedInput
    logs?: TaskLogUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    executionId?: StringFieldUpdateOperationsInput | string
    assignedAgentId?: NullableStringFieldUpdateOperationsInput | string | null
    taskName?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    inputPayload?: JsonNullValueInput | InputJsonValue
    outputPayload?: JsonNullValueInput | InputJsonValue
    retryCount?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    logs?: TaskLogUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskCreateManyInput = {
    id?: string
    executionId: string
    assignedAgentId?: string | null
    taskName: string
    status?: $Enums.TaskStatus
    inputPayload?: JsonNullValueInput | InputJsonValue
    outputPayload?: JsonNullValueInput | InputJsonValue
    retryCount?: number
    startedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type TaskUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    assignedAgentId?: NullableStringFieldUpdateOperationsInput | string | null
    taskName?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    inputPayload?: JsonNullValueInput | InputJsonValue
    outputPayload?: JsonNullValueInput | InputJsonValue
    retryCount?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TaskUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    executionId?: StringFieldUpdateOperationsInput | string
    assignedAgentId?: NullableStringFieldUpdateOperationsInput | string | null
    taskName?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    inputPayload?: JsonNullValueInput | InputJsonValue
    outputPayload?: JsonNullValueInput | InputJsonValue
    retryCount?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TaskLogCreateInput = {
    id?: string
    logLevel?: $Enums.LogLevel
    message: string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    task: TaskCreateNestedOneWithoutLogsInput
  }

  export type TaskLogUncheckedCreateInput = {
    id?: string
    taskId: string
    logLevel?: $Enums.LogLevel
    message: string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type TaskLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    logLevel?: EnumLogLevelFieldUpdateOperationsInput | $Enums.LogLevel
    message?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutLogsNestedInput
  }

  export type TaskLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    logLevel?: EnumLogLevelFieldUpdateOperationsInput | $Enums.LogLevel
    message?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskLogCreateManyInput = {
    id?: string
    taskId: string
    logLevel?: $Enums.LogLevel
    message: string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type TaskLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    logLevel?: EnumLogLevelFieldUpdateOperationsInput | $Enums.LogLevel
    message?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    logLevel?: EnumLogLevelFieldUpdateOperationsInput | $Enums.LogLevel
    message?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
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

  export type EnumExecutionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ExecutionStatus | EnumExecutionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ExecutionStatus[] | ListEnumExecutionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExecutionStatus[] | ListEnumExecutionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumExecutionStatusFilter<$PrismaModel> | $Enums.ExecutionStatus
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

  export type WorkflowNodeListRelationFilter = {
    every?: WorkflowNodeWhereInput
    some?: WorkflowNodeWhereInput
    none?: WorkflowNodeWhereInput
  }

  export type WorkflowEdgeListRelationFilter = {
    every?: WorkflowEdgeWhereInput
    some?: WorkflowEdgeWhereInput
    none?: WorkflowEdgeWhereInput
  }

  export type WorkflowExecutionListRelationFilter = {
    every?: WorkflowExecutionWhereInput
    some?: WorkflowExecutionWhereInput
    none?: WorkflowExecutionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type WorkflowNodeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkflowEdgeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkflowExecutionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkflowCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    status?: SortOrder
    estimatedCost?: SortOrder
    actualCost?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type WorkflowAvgOrderByAggregateInput = {
    estimatedCost?: SortOrder
    actualCost?: SortOrder
  }

  export type WorkflowMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    status?: SortOrder
    estimatedCost?: SortOrder
    actualCost?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type WorkflowMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    status?: SortOrder
    estimatedCost?: SortOrder
    actualCost?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type WorkflowSumOrderByAggregateInput = {
    estimatedCost?: SortOrder
    actualCost?: SortOrder
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

  export type EnumExecutionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExecutionStatus | EnumExecutionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ExecutionStatus[] | ListEnumExecutionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExecutionStatus[] | ListEnumExecutionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumExecutionStatusWithAggregatesFilter<$PrismaModel> | $Enums.ExecutionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExecutionStatusFilter<$PrismaModel>
    _max?: NestedEnumExecutionStatusFilter<$PrismaModel>
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

  export type WorkflowRelationFilter = {
    is?: WorkflowWhereInput
    isNot?: WorkflowWhereInput
  }

  export type WorkflowNodeCountOrderByAggregateInput = {
    id?: SortOrder
    workflowId?: SortOrder
    agentId?: SortOrder
    capability?: SortOrder
    status?: SortOrder
    positionX?: SortOrder
    positionY?: SortOrder
  }

  export type WorkflowNodeAvgOrderByAggregateInput = {
    positionX?: SortOrder
    positionY?: SortOrder
  }

  export type WorkflowNodeMaxOrderByAggregateInput = {
    id?: SortOrder
    workflowId?: SortOrder
    agentId?: SortOrder
    capability?: SortOrder
    status?: SortOrder
    positionX?: SortOrder
    positionY?: SortOrder
  }

  export type WorkflowNodeMinOrderByAggregateInput = {
    id?: SortOrder
    workflowId?: SortOrder
    agentId?: SortOrder
    capability?: SortOrder
    status?: SortOrder
    positionX?: SortOrder
    positionY?: SortOrder
  }

  export type WorkflowNodeSumOrderByAggregateInput = {
    positionX?: SortOrder
    positionY?: SortOrder
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

  export type WorkflowEdgeCountOrderByAggregateInput = {
    id?: SortOrder
    workflowId?: SortOrder
    sourceNode?: SortOrder
    targetNode?: SortOrder
  }

  export type WorkflowEdgeMaxOrderByAggregateInput = {
    id?: SortOrder
    workflowId?: SortOrder
    sourceNode?: SortOrder
    targetNode?: SortOrder
  }

  export type WorkflowEdgeMinOrderByAggregateInput = {
    id?: SortOrder
    workflowId?: SortOrder
    sourceNode?: SortOrder
    targetNode?: SortOrder
  }

  export type TaskListRelationFilter = {
    every?: TaskWhereInput
    some?: TaskWhereInput
    none?: TaskWhereInput
  }

  export type TaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkflowExecutionCountOrderByAggregateInput = {
    id?: SortOrder
    workflowId?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type WorkflowExecutionMaxOrderByAggregateInput = {
    id?: SortOrder
    workflowId?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type WorkflowExecutionMinOrderByAggregateInput = {
    id?: SortOrder
    workflowId?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
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

  export type EnumTaskStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | EnumTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskStatusFilter<$PrismaModel> | $Enums.TaskStatus
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

  export type WorkflowExecutionRelationFilter = {
    is?: WorkflowExecutionWhereInput
    isNot?: WorkflowExecutionWhereInput
  }

  export type TaskLogListRelationFilter = {
    every?: TaskLogWhereInput
    some?: TaskLogWhereInput
    none?: TaskLogWhereInput
  }

  export type TaskLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskCountOrderByAggregateInput = {
    id?: SortOrder
    executionId?: SortOrder
    assignedAgentId?: SortOrder
    taskName?: SortOrder
    status?: SortOrder
    inputPayload?: SortOrder
    outputPayload?: SortOrder
    retryCount?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type TaskAvgOrderByAggregateInput = {
    retryCount?: SortOrder
  }

  export type TaskMaxOrderByAggregateInput = {
    id?: SortOrder
    executionId?: SortOrder
    assignedAgentId?: SortOrder
    taskName?: SortOrder
    status?: SortOrder
    retryCount?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type TaskMinOrderByAggregateInput = {
    id?: SortOrder
    executionId?: SortOrder
    assignedAgentId?: SortOrder
    taskName?: SortOrder
    status?: SortOrder
    retryCount?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type TaskSumOrderByAggregateInput = {
    retryCount?: SortOrder
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

  export type EnumTaskStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | EnumTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskStatusWithAggregatesFilter<$PrismaModel> | $Enums.TaskStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskStatusFilter<$PrismaModel>
    _max?: NestedEnumTaskStatusFilter<$PrismaModel>
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

  export type EnumLogLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.LogLevel | EnumLogLevelFieldRefInput<$PrismaModel>
    in?: $Enums.LogLevel[] | ListEnumLogLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.LogLevel[] | ListEnumLogLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumLogLevelFilter<$PrismaModel> | $Enums.LogLevel
  }

  export type TaskRelationFilter = {
    is?: TaskWhereInput
    isNot?: TaskWhereInput
  }

  export type TaskLogCountOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    logLevel?: SortOrder
    message?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type TaskLogMaxOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    logLevel?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
  }

  export type TaskLogMinOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    logLevel?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumLogLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LogLevel | EnumLogLevelFieldRefInput<$PrismaModel>
    in?: $Enums.LogLevel[] | ListEnumLogLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.LogLevel[] | ListEnumLogLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumLogLevelWithAggregatesFilter<$PrismaModel> | $Enums.LogLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLogLevelFilter<$PrismaModel>
    _max?: NestedEnumLogLevelFilter<$PrismaModel>
  }

  export type WorkflowNodeCreateNestedManyWithoutWorkflowInput = {
    create?: XOR<WorkflowNodeCreateWithoutWorkflowInput, WorkflowNodeUncheckedCreateWithoutWorkflowInput> | WorkflowNodeCreateWithoutWorkflowInput[] | WorkflowNodeUncheckedCreateWithoutWorkflowInput[]
    connectOrCreate?: WorkflowNodeCreateOrConnectWithoutWorkflowInput | WorkflowNodeCreateOrConnectWithoutWorkflowInput[]
    createMany?: WorkflowNodeCreateManyWorkflowInputEnvelope
    connect?: WorkflowNodeWhereUniqueInput | WorkflowNodeWhereUniqueInput[]
  }

  export type WorkflowEdgeCreateNestedManyWithoutWorkflowInput = {
    create?: XOR<WorkflowEdgeCreateWithoutWorkflowInput, WorkflowEdgeUncheckedCreateWithoutWorkflowInput> | WorkflowEdgeCreateWithoutWorkflowInput[] | WorkflowEdgeUncheckedCreateWithoutWorkflowInput[]
    connectOrCreate?: WorkflowEdgeCreateOrConnectWithoutWorkflowInput | WorkflowEdgeCreateOrConnectWithoutWorkflowInput[]
    createMany?: WorkflowEdgeCreateManyWorkflowInputEnvelope
    connect?: WorkflowEdgeWhereUniqueInput | WorkflowEdgeWhereUniqueInput[]
  }

  export type WorkflowExecutionCreateNestedManyWithoutWorkflowInput = {
    create?: XOR<WorkflowExecutionCreateWithoutWorkflowInput, WorkflowExecutionUncheckedCreateWithoutWorkflowInput> | WorkflowExecutionCreateWithoutWorkflowInput[] | WorkflowExecutionUncheckedCreateWithoutWorkflowInput[]
    connectOrCreate?: WorkflowExecutionCreateOrConnectWithoutWorkflowInput | WorkflowExecutionCreateOrConnectWithoutWorkflowInput[]
    createMany?: WorkflowExecutionCreateManyWorkflowInputEnvelope
    connect?: WorkflowExecutionWhereUniqueInput | WorkflowExecutionWhereUniqueInput[]
  }

  export type WorkflowNodeUncheckedCreateNestedManyWithoutWorkflowInput = {
    create?: XOR<WorkflowNodeCreateWithoutWorkflowInput, WorkflowNodeUncheckedCreateWithoutWorkflowInput> | WorkflowNodeCreateWithoutWorkflowInput[] | WorkflowNodeUncheckedCreateWithoutWorkflowInput[]
    connectOrCreate?: WorkflowNodeCreateOrConnectWithoutWorkflowInput | WorkflowNodeCreateOrConnectWithoutWorkflowInput[]
    createMany?: WorkflowNodeCreateManyWorkflowInputEnvelope
    connect?: WorkflowNodeWhereUniqueInput | WorkflowNodeWhereUniqueInput[]
  }

  export type WorkflowEdgeUncheckedCreateNestedManyWithoutWorkflowInput = {
    create?: XOR<WorkflowEdgeCreateWithoutWorkflowInput, WorkflowEdgeUncheckedCreateWithoutWorkflowInput> | WorkflowEdgeCreateWithoutWorkflowInput[] | WorkflowEdgeUncheckedCreateWithoutWorkflowInput[]
    connectOrCreate?: WorkflowEdgeCreateOrConnectWithoutWorkflowInput | WorkflowEdgeCreateOrConnectWithoutWorkflowInput[]
    createMany?: WorkflowEdgeCreateManyWorkflowInputEnvelope
    connect?: WorkflowEdgeWhereUniqueInput | WorkflowEdgeWhereUniqueInput[]
  }

  export type WorkflowExecutionUncheckedCreateNestedManyWithoutWorkflowInput = {
    create?: XOR<WorkflowExecutionCreateWithoutWorkflowInput, WorkflowExecutionUncheckedCreateWithoutWorkflowInput> | WorkflowExecutionCreateWithoutWorkflowInput[] | WorkflowExecutionUncheckedCreateWithoutWorkflowInput[]
    connectOrCreate?: WorkflowExecutionCreateOrConnectWithoutWorkflowInput | WorkflowExecutionCreateOrConnectWithoutWorkflowInput[]
    createMany?: WorkflowExecutionCreateManyWorkflowInputEnvelope
    connect?: WorkflowExecutionWhereUniqueInput | WorkflowExecutionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumExecutionStatusFieldUpdateOperationsInput = {
    set?: $Enums.ExecutionStatus
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type WorkflowNodeUpdateManyWithoutWorkflowNestedInput = {
    create?: XOR<WorkflowNodeCreateWithoutWorkflowInput, WorkflowNodeUncheckedCreateWithoutWorkflowInput> | WorkflowNodeCreateWithoutWorkflowInput[] | WorkflowNodeUncheckedCreateWithoutWorkflowInput[]
    connectOrCreate?: WorkflowNodeCreateOrConnectWithoutWorkflowInput | WorkflowNodeCreateOrConnectWithoutWorkflowInput[]
    upsert?: WorkflowNodeUpsertWithWhereUniqueWithoutWorkflowInput | WorkflowNodeUpsertWithWhereUniqueWithoutWorkflowInput[]
    createMany?: WorkflowNodeCreateManyWorkflowInputEnvelope
    set?: WorkflowNodeWhereUniqueInput | WorkflowNodeWhereUniqueInput[]
    disconnect?: WorkflowNodeWhereUniqueInput | WorkflowNodeWhereUniqueInput[]
    delete?: WorkflowNodeWhereUniqueInput | WorkflowNodeWhereUniqueInput[]
    connect?: WorkflowNodeWhereUniqueInput | WorkflowNodeWhereUniqueInput[]
    update?: WorkflowNodeUpdateWithWhereUniqueWithoutWorkflowInput | WorkflowNodeUpdateWithWhereUniqueWithoutWorkflowInput[]
    updateMany?: WorkflowNodeUpdateManyWithWhereWithoutWorkflowInput | WorkflowNodeUpdateManyWithWhereWithoutWorkflowInput[]
    deleteMany?: WorkflowNodeScalarWhereInput | WorkflowNodeScalarWhereInput[]
  }

  export type WorkflowEdgeUpdateManyWithoutWorkflowNestedInput = {
    create?: XOR<WorkflowEdgeCreateWithoutWorkflowInput, WorkflowEdgeUncheckedCreateWithoutWorkflowInput> | WorkflowEdgeCreateWithoutWorkflowInput[] | WorkflowEdgeUncheckedCreateWithoutWorkflowInput[]
    connectOrCreate?: WorkflowEdgeCreateOrConnectWithoutWorkflowInput | WorkflowEdgeCreateOrConnectWithoutWorkflowInput[]
    upsert?: WorkflowEdgeUpsertWithWhereUniqueWithoutWorkflowInput | WorkflowEdgeUpsertWithWhereUniqueWithoutWorkflowInput[]
    createMany?: WorkflowEdgeCreateManyWorkflowInputEnvelope
    set?: WorkflowEdgeWhereUniqueInput | WorkflowEdgeWhereUniqueInput[]
    disconnect?: WorkflowEdgeWhereUniqueInput | WorkflowEdgeWhereUniqueInput[]
    delete?: WorkflowEdgeWhereUniqueInput | WorkflowEdgeWhereUniqueInput[]
    connect?: WorkflowEdgeWhereUniqueInput | WorkflowEdgeWhereUniqueInput[]
    update?: WorkflowEdgeUpdateWithWhereUniqueWithoutWorkflowInput | WorkflowEdgeUpdateWithWhereUniqueWithoutWorkflowInput[]
    updateMany?: WorkflowEdgeUpdateManyWithWhereWithoutWorkflowInput | WorkflowEdgeUpdateManyWithWhereWithoutWorkflowInput[]
    deleteMany?: WorkflowEdgeScalarWhereInput | WorkflowEdgeScalarWhereInput[]
  }

  export type WorkflowExecutionUpdateManyWithoutWorkflowNestedInput = {
    create?: XOR<WorkflowExecutionCreateWithoutWorkflowInput, WorkflowExecutionUncheckedCreateWithoutWorkflowInput> | WorkflowExecutionCreateWithoutWorkflowInput[] | WorkflowExecutionUncheckedCreateWithoutWorkflowInput[]
    connectOrCreate?: WorkflowExecutionCreateOrConnectWithoutWorkflowInput | WorkflowExecutionCreateOrConnectWithoutWorkflowInput[]
    upsert?: WorkflowExecutionUpsertWithWhereUniqueWithoutWorkflowInput | WorkflowExecutionUpsertWithWhereUniqueWithoutWorkflowInput[]
    createMany?: WorkflowExecutionCreateManyWorkflowInputEnvelope
    set?: WorkflowExecutionWhereUniqueInput | WorkflowExecutionWhereUniqueInput[]
    disconnect?: WorkflowExecutionWhereUniqueInput | WorkflowExecutionWhereUniqueInput[]
    delete?: WorkflowExecutionWhereUniqueInput | WorkflowExecutionWhereUniqueInput[]
    connect?: WorkflowExecutionWhereUniqueInput | WorkflowExecutionWhereUniqueInput[]
    update?: WorkflowExecutionUpdateWithWhereUniqueWithoutWorkflowInput | WorkflowExecutionUpdateWithWhereUniqueWithoutWorkflowInput[]
    updateMany?: WorkflowExecutionUpdateManyWithWhereWithoutWorkflowInput | WorkflowExecutionUpdateManyWithWhereWithoutWorkflowInput[]
    deleteMany?: WorkflowExecutionScalarWhereInput | WorkflowExecutionScalarWhereInput[]
  }

  export type WorkflowNodeUncheckedUpdateManyWithoutWorkflowNestedInput = {
    create?: XOR<WorkflowNodeCreateWithoutWorkflowInput, WorkflowNodeUncheckedCreateWithoutWorkflowInput> | WorkflowNodeCreateWithoutWorkflowInput[] | WorkflowNodeUncheckedCreateWithoutWorkflowInput[]
    connectOrCreate?: WorkflowNodeCreateOrConnectWithoutWorkflowInput | WorkflowNodeCreateOrConnectWithoutWorkflowInput[]
    upsert?: WorkflowNodeUpsertWithWhereUniqueWithoutWorkflowInput | WorkflowNodeUpsertWithWhereUniqueWithoutWorkflowInput[]
    createMany?: WorkflowNodeCreateManyWorkflowInputEnvelope
    set?: WorkflowNodeWhereUniqueInput | WorkflowNodeWhereUniqueInput[]
    disconnect?: WorkflowNodeWhereUniqueInput | WorkflowNodeWhereUniqueInput[]
    delete?: WorkflowNodeWhereUniqueInput | WorkflowNodeWhereUniqueInput[]
    connect?: WorkflowNodeWhereUniqueInput | WorkflowNodeWhereUniqueInput[]
    update?: WorkflowNodeUpdateWithWhereUniqueWithoutWorkflowInput | WorkflowNodeUpdateWithWhereUniqueWithoutWorkflowInput[]
    updateMany?: WorkflowNodeUpdateManyWithWhereWithoutWorkflowInput | WorkflowNodeUpdateManyWithWhereWithoutWorkflowInput[]
    deleteMany?: WorkflowNodeScalarWhereInput | WorkflowNodeScalarWhereInput[]
  }

  export type WorkflowEdgeUncheckedUpdateManyWithoutWorkflowNestedInput = {
    create?: XOR<WorkflowEdgeCreateWithoutWorkflowInput, WorkflowEdgeUncheckedCreateWithoutWorkflowInput> | WorkflowEdgeCreateWithoutWorkflowInput[] | WorkflowEdgeUncheckedCreateWithoutWorkflowInput[]
    connectOrCreate?: WorkflowEdgeCreateOrConnectWithoutWorkflowInput | WorkflowEdgeCreateOrConnectWithoutWorkflowInput[]
    upsert?: WorkflowEdgeUpsertWithWhereUniqueWithoutWorkflowInput | WorkflowEdgeUpsertWithWhereUniqueWithoutWorkflowInput[]
    createMany?: WorkflowEdgeCreateManyWorkflowInputEnvelope
    set?: WorkflowEdgeWhereUniqueInput | WorkflowEdgeWhereUniqueInput[]
    disconnect?: WorkflowEdgeWhereUniqueInput | WorkflowEdgeWhereUniqueInput[]
    delete?: WorkflowEdgeWhereUniqueInput | WorkflowEdgeWhereUniqueInput[]
    connect?: WorkflowEdgeWhereUniqueInput | WorkflowEdgeWhereUniqueInput[]
    update?: WorkflowEdgeUpdateWithWhereUniqueWithoutWorkflowInput | WorkflowEdgeUpdateWithWhereUniqueWithoutWorkflowInput[]
    updateMany?: WorkflowEdgeUpdateManyWithWhereWithoutWorkflowInput | WorkflowEdgeUpdateManyWithWhereWithoutWorkflowInput[]
    deleteMany?: WorkflowEdgeScalarWhereInput | WorkflowEdgeScalarWhereInput[]
  }

  export type WorkflowExecutionUncheckedUpdateManyWithoutWorkflowNestedInput = {
    create?: XOR<WorkflowExecutionCreateWithoutWorkflowInput, WorkflowExecutionUncheckedCreateWithoutWorkflowInput> | WorkflowExecutionCreateWithoutWorkflowInput[] | WorkflowExecutionUncheckedCreateWithoutWorkflowInput[]
    connectOrCreate?: WorkflowExecutionCreateOrConnectWithoutWorkflowInput | WorkflowExecutionCreateOrConnectWithoutWorkflowInput[]
    upsert?: WorkflowExecutionUpsertWithWhereUniqueWithoutWorkflowInput | WorkflowExecutionUpsertWithWhereUniqueWithoutWorkflowInput[]
    createMany?: WorkflowExecutionCreateManyWorkflowInputEnvelope
    set?: WorkflowExecutionWhereUniqueInput | WorkflowExecutionWhereUniqueInput[]
    disconnect?: WorkflowExecutionWhereUniqueInput | WorkflowExecutionWhereUniqueInput[]
    delete?: WorkflowExecutionWhereUniqueInput | WorkflowExecutionWhereUniqueInput[]
    connect?: WorkflowExecutionWhereUniqueInput | WorkflowExecutionWhereUniqueInput[]
    update?: WorkflowExecutionUpdateWithWhereUniqueWithoutWorkflowInput | WorkflowExecutionUpdateWithWhereUniqueWithoutWorkflowInput[]
    updateMany?: WorkflowExecutionUpdateManyWithWhereWithoutWorkflowInput | WorkflowExecutionUpdateManyWithWhereWithoutWorkflowInput[]
    deleteMany?: WorkflowExecutionScalarWhereInput | WorkflowExecutionScalarWhereInput[]
  }

  export type WorkflowCreateNestedOneWithoutNodesInput = {
    create?: XOR<WorkflowCreateWithoutNodesInput, WorkflowUncheckedCreateWithoutNodesInput>
    connectOrCreate?: WorkflowCreateOrConnectWithoutNodesInput
    connect?: WorkflowWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type WorkflowUpdateOneRequiredWithoutNodesNestedInput = {
    create?: XOR<WorkflowCreateWithoutNodesInput, WorkflowUncheckedCreateWithoutNodesInput>
    connectOrCreate?: WorkflowCreateOrConnectWithoutNodesInput
    upsert?: WorkflowUpsertWithoutNodesInput
    connect?: WorkflowWhereUniqueInput
    update?: XOR<XOR<WorkflowUpdateToOneWithWhereWithoutNodesInput, WorkflowUpdateWithoutNodesInput>, WorkflowUncheckedUpdateWithoutNodesInput>
  }

  export type WorkflowCreateNestedOneWithoutEdgesInput = {
    create?: XOR<WorkflowCreateWithoutEdgesInput, WorkflowUncheckedCreateWithoutEdgesInput>
    connectOrCreate?: WorkflowCreateOrConnectWithoutEdgesInput
    connect?: WorkflowWhereUniqueInput
  }

  export type WorkflowUpdateOneRequiredWithoutEdgesNestedInput = {
    create?: XOR<WorkflowCreateWithoutEdgesInput, WorkflowUncheckedCreateWithoutEdgesInput>
    connectOrCreate?: WorkflowCreateOrConnectWithoutEdgesInput
    upsert?: WorkflowUpsertWithoutEdgesInput
    connect?: WorkflowWhereUniqueInput
    update?: XOR<XOR<WorkflowUpdateToOneWithWhereWithoutEdgesInput, WorkflowUpdateWithoutEdgesInput>, WorkflowUncheckedUpdateWithoutEdgesInput>
  }

  export type WorkflowCreateNestedOneWithoutExecutionsInput = {
    create?: XOR<WorkflowCreateWithoutExecutionsInput, WorkflowUncheckedCreateWithoutExecutionsInput>
    connectOrCreate?: WorkflowCreateOrConnectWithoutExecutionsInput
    connect?: WorkflowWhereUniqueInput
  }

  export type TaskCreateNestedManyWithoutExecutionInput = {
    create?: XOR<TaskCreateWithoutExecutionInput, TaskUncheckedCreateWithoutExecutionInput> | TaskCreateWithoutExecutionInput[] | TaskUncheckedCreateWithoutExecutionInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutExecutionInput | TaskCreateOrConnectWithoutExecutionInput[]
    createMany?: TaskCreateManyExecutionInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutExecutionInput = {
    create?: XOR<TaskCreateWithoutExecutionInput, TaskUncheckedCreateWithoutExecutionInput> | TaskCreateWithoutExecutionInput[] | TaskUncheckedCreateWithoutExecutionInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutExecutionInput | TaskCreateOrConnectWithoutExecutionInput[]
    createMany?: TaskCreateManyExecutionInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type WorkflowUpdateOneRequiredWithoutExecutionsNestedInput = {
    create?: XOR<WorkflowCreateWithoutExecutionsInput, WorkflowUncheckedCreateWithoutExecutionsInput>
    connectOrCreate?: WorkflowCreateOrConnectWithoutExecutionsInput
    upsert?: WorkflowUpsertWithoutExecutionsInput
    connect?: WorkflowWhereUniqueInput
    update?: XOR<XOR<WorkflowUpdateToOneWithWhereWithoutExecutionsInput, WorkflowUpdateWithoutExecutionsInput>, WorkflowUncheckedUpdateWithoutExecutionsInput>
  }

  export type TaskUpdateManyWithoutExecutionNestedInput = {
    create?: XOR<TaskCreateWithoutExecutionInput, TaskUncheckedCreateWithoutExecutionInput> | TaskCreateWithoutExecutionInput[] | TaskUncheckedCreateWithoutExecutionInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutExecutionInput | TaskCreateOrConnectWithoutExecutionInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutExecutionInput | TaskUpsertWithWhereUniqueWithoutExecutionInput[]
    createMany?: TaskCreateManyExecutionInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutExecutionInput | TaskUpdateWithWhereUniqueWithoutExecutionInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutExecutionInput | TaskUpdateManyWithWhereWithoutExecutionInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutExecutionNestedInput = {
    create?: XOR<TaskCreateWithoutExecutionInput, TaskUncheckedCreateWithoutExecutionInput> | TaskCreateWithoutExecutionInput[] | TaskUncheckedCreateWithoutExecutionInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutExecutionInput | TaskCreateOrConnectWithoutExecutionInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutExecutionInput | TaskUpsertWithWhereUniqueWithoutExecutionInput[]
    createMany?: TaskCreateManyExecutionInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutExecutionInput | TaskUpdateWithWhereUniqueWithoutExecutionInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutExecutionInput | TaskUpdateManyWithWhereWithoutExecutionInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type WorkflowExecutionCreateNestedOneWithoutTasksInput = {
    create?: XOR<WorkflowExecutionCreateWithoutTasksInput, WorkflowExecutionUncheckedCreateWithoutTasksInput>
    connectOrCreate?: WorkflowExecutionCreateOrConnectWithoutTasksInput
    connect?: WorkflowExecutionWhereUniqueInput
  }

  export type TaskLogCreateNestedManyWithoutTaskInput = {
    create?: XOR<TaskLogCreateWithoutTaskInput, TaskLogUncheckedCreateWithoutTaskInput> | TaskLogCreateWithoutTaskInput[] | TaskLogUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskLogCreateOrConnectWithoutTaskInput | TaskLogCreateOrConnectWithoutTaskInput[]
    createMany?: TaskLogCreateManyTaskInputEnvelope
    connect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
  }

  export type TaskLogUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<TaskLogCreateWithoutTaskInput, TaskLogUncheckedCreateWithoutTaskInput> | TaskLogCreateWithoutTaskInput[] | TaskLogUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskLogCreateOrConnectWithoutTaskInput | TaskLogCreateOrConnectWithoutTaskInput[]
    createMany?: TaskLogCreateManyTaskInputEnvelope
    connect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumTaskStatusFieldUpdateOperationsInput = {
    set?: $Enums.TaskStatus
  }

  export type WorkflowExecutionUpdateOneRequiredWithoutTasksNestedInput = {
    create?: XOR<WorkflowExecutionCreateWithoutTasksInput, WorkflowExecutionUncheckedCreateWithoutTasksInput>
    connectOrCreate?: WorkflowExecutionCreateOrConnectWithoutTasksInput
    upsert?: WorkflowExecutionUpsertWithoutTasksInput
    connect?: WorkflowExecutionWhereUniqueInput
    update?: XOR<XOR<WorkflowExecutionUpdateToOneWithWhereWithoutTasksInput, WorkflowExecutionUpdateWithoutTasksInput>, WorkflowExecutionUncheckedUpdateWithoutTasksInput>
  }

  export type TaskLogUpdateManyWithoutTaskNestedInput = {
    create?: XOR<TaskLogCreateWithoutTaskInput, TaskLogUncheckedCreateWithoutTaskInput> | TaskLogCreateWithoutTaskInput[] | TaskLogUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskLogCreateOrConnectWithoutTaskInput | TaskLogCreateOrConnectWithoutTaskInput[]
    upsert?: TaskLogUpsertWithWhereUniqueWithoutTaskInput | TaskLogUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: TaskLogCreateManyTaskInputEnvelope
    set?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    disconnect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    delete?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    connect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    update?: TaskLogUpdateWithWhereUniqueWithoutTaskInput | TaskLogUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: TaskLogUpdateManyWithWhereWithoutTaskInput | TaskLogUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: TaskLogScalarWhereInput | TaskLogScalarWhereInput[]
  }

  export type TaskLogUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<TaskLogCreateWithoutTaskInput, TaskLogUncheckedCreateWithoutTaskInput> | TaskLogCreateWithoutTaskInput[] | TaskLogUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskLogCreateOrConnectWithoutTaskInput | TaskLogCreateOrConnectWithoutTaskInput[]
    upsert?: TaskLogUpsertWithWhereUniqueWithoutTaskInput | TaskLogUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: TaskLogCreateManyTaskInputEnvelope
    set?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    disconnect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    delete?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    connect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    update?: TaskLogUpdateWithWhereUniqueWithoutTaskInput | TaskLogUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: TaskLogUpdateManyWithWhereWithoutTaskInput | TaskLogUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: TaskLogScalarWhereInput | TaskLogScalarWhereInput[]
  }

  export type TaskCreateNestedOneWithoutLogsInput = {
    create?: XOR<TaskCreateWithoutLogsInput, TaskUncheckedCreateWithoutLogsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutLogsInput
    connect?: TaskWhereUniqueInput
  }

  export type EnumLogLevelFieldUpdateOperationsInput = {
    set?: $Enums.LogLevel
  }

  export type TaskUpdateOneRequiredWithoutLogsNestedInput = {
    create?: XOR<TaskCreateWithoutLogsInput, TaskUncheckedCreateWithoutLogsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutLogsInput
    upsert?: TaskUpsertWithoutLogsInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutLogsInput, TaskUpdateWithoutLogsInput>, TaskUncheckedUpdateWithoutLogsInput>
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

  export type NestedEnumExecutionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ExecutionStatus | EnumExecutionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ExecutionStatus[] | ListEnumExecutionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExecutionStatus[] | ListEnumExecutionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumExecutionStatusFilter<$PrismaModel> | $Enums.ExecutionStatus
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

  export type NestedEnumExecutionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExecutionStatus | EnumExecutionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ExecutionStatus[] | ListEnumExecutionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExecutionStatus[] | ListEnumExecutionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumExecutionStatusWithAggregatesFilter<$PrismaModel> | $Enums.ExecutionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExecutionStatusFilter<$PrismaModel>
    _max?: NestedEnumExecutionStatusFilter<$PrismaModel>
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

  export type NestedEnumTaskStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | EnumTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskStatusFilter<$PrismaModel> | $Enums.TaskStatus
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

  export type NestedEnumTaskStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | EnumTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskStatusWithAggregatesFilter<$PrismaModel> | $Enums.TaskStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskStatusFilter<$PrismaModel>
    _max?: NestedEnumTaskStatusFilter<$PrismaModel>
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

  export type NestedEnumLogLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.LogLevel | EnumLogLevelFieldRefInput<$PrismaModel>
    in?: $Enums.LogLevel[] | ListEnumLogLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.LogLevel[] | ListEnumLogLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumLogLevelFilter<$PrismaModel> | $Enums.LogLevel
  }

  export type NestedEnumLogLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LogLevel | EnumLogLevelFieldRefInput<$PrismaModel>
    in?: $Enums.LogLevel[] | ListEnumLogLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.LogLevel[] | ListEnumLogLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumLogLevelWithAggregatesFilter<$PrismaModel> | $Enums.LogLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLogLevelFilter<$PrismaModel>
    _max?: NestedEnumLogLevelFilter<$PrismaModel>
  }

  export type WorkflowNodeCreateWithoutWorkflowInput = {
    id?: string
    agentId: string
    capability: string
    status: string
    positionX: number
    positionY: number
  }

  export type WorkflowNodeUncheckedCreateWithoutWorkflowInput = {
    id?: string
    agentId: string
    capability: string
    status: string
    positionX: number
    positionY: number
  }

  export type WorkflowNodeCreateOrConnectWithoutWorkflowInput = {
    where: WorkflowNodeWhereUniqueInput
    create: XOR<WorkflowNodeCreateWithoutWorkflowInput, WorkflowNodeUncheckedCreateWithoutWorkflowInput>
  }

  export type WorkflowNodeCreateManyWorkflowInputEnvelope = {
    data: WorkflowNodeCreateManyWorkflowInput | WorkflowNodeCreateManyWorkflowInput[]
    skipDuplicates?: boolean
  }

  export type WorkflowEdgeCreateWithoutWorkflowInput = {
    id?: string
    sourceNode: string
    targetNode: string
  }

  export type WorkflowEdgeUncheckedCreateWithoutWorkflowInput = {
    id?: string
    sourceNode: string
    targetNode: string
  }

  export type WorkflowEdgeCreateOrConnectWithoutWorkflowInput = {
    where: WorkflowEdgeWhereUniqueInput
    create: XOR<WorkflowEdgeCreateWithoutWorkflowInput, WorkflowEdgeUncheckedCreateWithoutWorkflowInput>
  }

  export type WorkflowEdgeCreateManyWorkflowInputEnvelope = {
    data: WorkflowEdgeCreateManyWorkflowInput | WorkflowEdgeCreateManyWorkflowInput[]
    skipDuplicates?: boolean
  }

  export type WorkflowExecutionCreateWithoutWorkflowInput = {
    id?: string
    status?: $Enums.ExecutionStatus
    startedAt?: Date | string
    completedAt?: Date | string | null
    tasks?: TaskCreateNestedManyWithoutExecutionInput
  }

  export type WorkflowExecutionUncheckedCreateWithoutWorkflowInput = {
    id?: string
    status?: $Enums.ExecutionStatus
    startedAt?: Date | string
    completedAt?: Date | string | null
    tasks?: TaskUncheckedCreateNestedManyWithoutExecutionInput
  }

  export type WorkflowExecutionCreateOrConnectWithoutWorkflowInput = {
    where: WorkflowExecutionWhereUniqueInput
    create: XOR<WorkflowExecutionCreateWithoutWorkflowInput, WorkflowExecutionUncheckedCreateWithoutWorkflowInput>
  }

  export type WorkflowExecutionCreateManyWorkflowInputEnvelope = {
    data: WorkflowExecutionCreateManyWorkflowInput | WorkflowExecutionCreateManyWorkflowInput[]
    skipDuplicates?: boolean
  }

  export type WorkflowNodeUpsertWithWhereUniqueWithoutWorkflowInput = {
    where: WorkflowNodeWhereUniqueInput
    update: XOR<WorkflowNodeUpdateWithoutWorkflowInput, WorkflowNodeUncheckedUpdateWithoutWorkflowInput>
    create: XOR<WorkflowNodeCreateWithoutWorkflowInput, WorkflowNodeUncheckedCreateWithoutWorkflowInput>
  }

  export type WorkflowNodeUpdateWithWhereUniqueWithoutWorkflowInput = {
    where: WorkflowNodeWhereUniqueInput
    data: XOR<WorkflowNodeUpdateWithoutWorkflowInput, WorkflowNodeUncheckedUpdateWithoutWorkflowInput>
  }

  export type WorkflowNodeUpdateManyWithWhereWithoutWorkflowInput = {
    where: WorkflowNodeScalarWhereInput
    data: XOR<WorkflowNodeUpdateManyMutationInput, WorkflowNodeUncheckedUpdateManyWithoutWorkflowInput>
  }

  export type WorkflowNodeScalarWhereInput = {
    AND?: WorkflowNodeScalarWhereInput | WorkflowNodeScalarWhereInput[]
    OR?: WorkflowNodeScalarWhereInput[]
    NOT?: WorkflowNodeScalarWhereInput | WorkflowNodeScalarWhereInput[]
    id?: StringFilter<"WorkflowNode"> | string
    workflowId?: StringFilter<"WorkflowNode"> | string
    agentId?: StringFilter<"WorkflowNode"> | string
    capability?: StringFilter<"WorkflowNode"> | string
    status?: StringFilter<"WorkflowNode"> | string
    positionX?: IntFilter<"WorkflowNode"> | number
    positionY?: IntFilter<"WorkflowNode"> | number
  }

  export type WorkflowEdgeUpsertWithWhereUniqueWithoutWorkflowInput = {
    where: WorkflowEdgeWhereUniqueInput
    update: XOR<WorkflowEdgeUpdateWithoutWorkflowInput, WorkflowEdgeUncheckedUpdateWithoutWorkflowInput>
    create: XOR<WorkflowEdgeCreateWithoutWorkflowInput, WorkflowEdgeUncheckedCreateWithoutWorkflowInput>
  }

  export type WorkflowEdgeUpdateWithWhereUniqueWithoutWorkflowInput = {
    where: WorkflowEdgeWhereUniqueInput
    data: XOR<WorkflowEdgeUpdateWithoutWorkflowInput, WorkflowEdgeUncheckedUpdateWithoutWorkflowInput>
  }

  export type WorkflowEdgeUpdateManyWithWhereWithoutWorkflowInput = {
    where: WorkflowEdgeScalarWhereInput
    data: XOR<WorkflowEdgeUpdateManyMutationInput, WorkflowEdgeUncheckedUpdateManyWithoutWorkflowInput>
  }

  export type WorkflowEdgeScalarWhereInput = {
    AND?: WorkflowEdgeScalarWhereInput | WorkflowEdgeScalarWhereInput[]
    OR?: WorkflowEdgeScalarWhereInput[]
    NOT?: WorkflowEdgeScalarWhereInput | WorkflowEdgeScalarWhereInput[]
    id?: StringFilter<"WorkflowEdge"> | string
    workflowId?: StringFilter<"WorkflowEdge"> | string
    sourceNode?: StringFilter<"WorkflowEdge"> | string
    targetNode?: StringFilter<"WorkflowEdge"> | string
  }

  export type WorkflowExecutionUpsertWithWhereUniqueWithoutWorkflowInput = {
    where: WorkflowExecutionWhereUniqueInput
    update: XOR<WorkflowExecutionUpdateWithoutWorkflowInput, WorkflowExecutionUncheckedUpdateWithoutWorkflowInput>
    create: XOR<WorkflowExecutionCreateWithoutWorkflowInput, WorkflowExecutionUncheckedCreateWithoutWorkflowInput>
  }

  export type WorkflowExecutionUpdateWithWhereUniqueWithoutWorkflowInput = {
    where: WorkflowExecutionWhereUniqueInput
    data: XOR<WorkflowExecutionUpdateWithoutWorkflowInput, WorkflowExecutionUncheckedUpdateWithoutWorkflowInput>
  }

  export type WorkflowExecutionUpdateManyWithWhereWithoutWorkflowInput = {
    where: WorkflowExecutionScalarWhereInput
    data: XOR<WorkflowExecutionUpdateManyMutationInput, WorkflowExecutionUncheckedUpdateManyWithoutWorkflowInput>
  }

  export type WorkflowExecutionScalarWhereInput = {
    AND?: WorkflowExecutionScalarWhereInput | WorkflowExecutionScalarWhereInput[]
    OR?: WorkflowExecutionScalarWhereInput[]
    NOT?: WorkflowExecutionScalarWhereInput | WorkflowExecutionScalarWhereInput[]
    id?: StringFilter<"WorkflowExecution"> | string
    workflowId?: StringFilter<"WorkflowExecution"> | string
    status?: EnumExecutionStatusFilter<"WorkflowExecution"> | $Enums.ExecutionStatus
    startedAt?: DateTimeFilter<"WorkflowExecution"> | Date | string
    completedAt?: DateTimeNullableFilter<"WorkflowExecution"> | Date | string | null
  }

  export type WorkflowCreateWithoutNodesInput = {
    id?: string
    userId: string
    title: string
    status?: $Enums.ExecutionStatus
    estimatedCost: Decimal | DecimalJsLike | number | string
    actualCost: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    edges?: WorkflowEdgeCreateNestedManyWithoutWorkflowInput
    executions?: WorkflowExecutionCreateNestedManyWithoutWorkflowInput
  }

  export type WorkflowUncheckedCreateWithoutNodesInput = {
    id?: string
    userId: string
    title: string
    status?: $Enums.ExecutionStatus
    estimatedCost: Decimal | DecimalJsLike | number | string
    actualCost: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    edges?: WorkflowEdgeUncheckedCreateNestedManyWithoutWorkflowInput
    executions?: WorkflowExecutionUncheckedCreateNestedManyWithoutWorkflowInput
  }

  export type WorkflowCreateOrConnectWithoutNodesInput = {
    where: WorkflowWhereUniqueInput
    create: XOR<WorkflowCreateWithoutNodesInput, WorkflowUncheckedCreateWithoutNodesInput>
  }

  export type WorkflowUpsertWithoutNodesInput = {
    update: XOR<WorkflowUpdateWithoutNodesInput, WorkflowUncheckedUpdateWithoutNodesInput>
    create: XOR<WorkflowCreateWithoutNodesInput, WorkflowUncheckedCreateWithoutNodesInput>
    where?: WorkflowWhereInput
  }

  export type WorkflowUpdateToOneWithWhereWithoutNodesInput = {
    where?: WorkflowWhereInput
    data: XOR<WorkflowUpdateWithoutNodesInput, WorkflowUncheckedUpdateWithoutNodesInput>
  }

  export type WorkflowUpdateWithoutNodesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumExecutionStatusFieldUpdateOperationsInput | $Enums.ExecutionStatus
    estimatedCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    actualCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    edges?: WorkflowEdgeUpdateManyWithoutWorkflowNestedInput
    executions?: WorkflowExecutionUpdateManyWithoutWorkflowNestedInput
  }

  export type WorkflowUncheckedUpdateWithoutNodesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumExecutionStatusFieldUpdateOperationsInput | $Enums.ExecutionStatus
    estimatedCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    actualCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    edges?: WorkflowEdgeUncheckedUpdateManyWithoutWorkflowNestedInput
    executions?: WorkflowExecutionUncheckedUpdateManyWithoutWorkflowNestedInput
  }

  export type WorkflowCreateWithoutEdgesInput = {
    id?: string
    userId: string
    title: string
    status?: $Enums.ExecutionStatus
    estimatedCost: Decimal | DecimalJsLike | number | string
    actualCost: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    nodes?: WorkflowNodeCreateNestedManyWithoutWorkflowInput
    executions?: WorkflowExecutionCreateNestedManyWithoutWorkflowInput
  }

  export type WorkflowUncheckedCreateWithoutEdgesInput = {
    id?: string
    userId: string
    title: string
    status?: $Enums.ExecutionStatus
    estimatedCost: Decimal | DecimalJsLike | number | string
    actualCost: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    nodes?: WorkflowNodeUncheckedCreateNestedManyWithoutWorkflowInput
    executions?: WorkflowExecutionUncheckedCreateNestedManyWithoutWorkflowInput
  }

  export type WorkflowCreateOrConnectWithoutEdgesInput = {
    where: WorkflowWhereUniqueInput
    create: XOR<WorkflowCreateWithoutEdgesInput, WorkflowUncheckedCreateWithoutEdgesInput>
  }

  export type WorkflowUpsertWithoutEdgesInput = {
    update: XOR<WorkflowUpdateWithoutEdgesInput, WorkflowUncheckedUpdateWithoutEdgesInput>
    create: XOR<WorkflowCreateWithoutEdgesInput, WorkflowUncheckedCreateWithoutEdgesInput>
    where?: WorkflowWhereInput
  }

  export type WorkflowUpdateToOneWithWhereWithoutEdgesInput = {
    where?: WorkflowWhereInput
    data: XOR<WorkflowUpdateWithoutEdgesInput, WorkflowUncheckedUpdateWithoutEdgesInput>
  }

  export type WorkflowUpdateWithoutEdgesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumExecutionStatusFieldUpdateOperationsInput | $Enums.ExecutionStatus
    estimatedCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    actualCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nodes?: WorkflowNodeUpdateManyWithoutWorkflowNestedInput
    executions?: WorkflowExecutionUpdateManyWithoutWorkflowNestedInput
  }

  export type WorkflowUncheckedUpdateWithoutEdgesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumExecutionStatusFieldUpdateOperationsInput | $Enums.ExecutionStatus
    estimatedCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    actualCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nodes?: WorkflowNodeUncheckedUpdateManyWithoutWorkflowNestedInput
    executions?: WorkflowExecutionUncheckedUpdateManyWithoutWorkflowNestedInput
  }

  export type WorkflowCreateWithoutExecutionsInput = {
    id?: string
    userId: string
    title: string
    status?: $Enums.ExecutionStatus
    estimatedCost: Decimal | DecimalJsLike | number | string
    actualCost: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    nodes?: WorkflowNodeCreateNestedManyWithoutWorkflowInput
    edges?: WorkflowEdgeCreateNestedManyWithoutWorkflowInput
  }

  export type WorkflowUncheckedCreateWithoutExecutionsInput = {
    id?: string
    userId: string
    title: string
    status?: $Enums.ExecutionStatus
    estimatedCost: Decimal | DecimalJsLike | number | string
    actualCost: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    nodes?: WorkflowNodeUncheckedCreateNestedManyWithoutWorkflowInput
    edges?: WorkflowEdgeUncheckedCreateNestedManyWithoutWorkflowInput
  }

  export type WorkflowCreateOrConnectWithoutExecutionsInput = {
    where: WorkflowWhereUniqueInput
    create: XOR<WorkflowCreateWithoutExecutionsInput, WorkflowUncheckedCreateWithoutExecutionsInput>
  }

  export type TaskCreateWithoutExecutionInput = {
    id?: string
    assignedAgentId?: string | null
    taskName: string
    status?: $Enums.TaskStatus
    inputPayload?: JsonNullValueInput | InputJsonValue
    outputPayload?: JsonNullValueInput | InputJsonValue
    retryCount?: number
    startedAt?: Date | string
    completedAt?: Date | string | null
    logs?: TaskLogCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutExecutionInput = {
    id?: string
    assignedAgentId?: string | null
    taskName: string
    status?: $Enums.TaskStatus
    inputPayload?: JsonNullValueInput | InputJsonValue
    outputPayload?: JsonNullValueInput | InputJsonValue
    retryCount?: number
    startedAt?: Date | string
    completedAt?: Date | string | null
    logs?: TaskLogUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutExecutionInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutExecutionInput, TaskUncheckedCreateWithoutExecutionInput>
  }

  export type TaskCreateManyExecutionInputEnvelope = {
    data: TaskCreateManyExecutionInput | TaskCreateManyExecutionInput[]
    skipDuplicates?: boolean
  }

  export type WorkflowUpsertWithoutExecutionsInput = {
    update: XOR<WorkflowUpdateWithoutExecutionsInput, WorkflowUncheckedUpdateWithoutExecutionsInput>
    create: XOR<WorkflowCreateWithoutExecutionsInput, WorkflowUncheckedCreateWithoutExecutionsInput>
    where?: WorkflowWhereInput
  }

  export type WorkflowUpdateToOneWithWhereWithoutExecutionsInput = {
    where?: WorkflowWhereInput
    data: XOR<WorkflowUpdateWithoutExecutionsInput, WorkflowUncheckedUpdateWithoutExecutionsInput>
  }

  export type WorkflowUpdateWithoutExecutionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumExecutionStatusFieldUpdateOperationsInput | $Enums.ExecutionStatus
    estimatedCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    actualCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nodes?: WorkflowNodeUpdateManyWithoutWorkflowNestedInput
    edges?: WorkflowEdgeUpdateManyWithoutWorkflowNestedInput
  }

  export type WorkflowUncheckedUpdateWithoutExecutionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: EnumExecutionStatusFieldUpdateOperationsInput | $Enums.ExecutionStatus
    estimatedCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    actualCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nodes?: WorkflowNodeUncheckedUpdateManyWithoutWorkflowNestedInput
    edges?: WorkflowEdgeUncheckedUpdateManyWithoutWorkflowNestedInput
  }

  export type TaskUpsertWithWhereUniqueWithoutExecutionInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutExecutionInput, TaskUncheckedUpdateWithoutExecutionInput>
    create: XOR<TaskCreateWithoutExecutionInput, TaskUncheckedCreateWithoutExecutionInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutExecutionInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutExecutionInput, TaskUncheckedUpdateWithoutExecutionInput>
  }

  export type TaskUpdateManyWithWhereWithoutExecutionInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutExecutionInput>
  }

  export type TaskScalarWhereInput = {
    AND?: TaskScalarWhereInput | TaskScalarWhereInput[]
    OR?: TaskScalarWhereInput[]
    NOT?: TaskScalarWhereInput | TaskScalarWhereInput[]
    id?: StringFilter<"Task"> | string
    executionId?: StringFilter<"Task"> | string
    assignedAgentId?: StringNullableFilter<"Task"> | string | null
    taskName?: StringFilter<"Task"> | string
    status?: EnumTaskStatusFilter<"Task"> | $Enums.TaskStatus
    inputPayload?: JsonFilter<"Task">
    outputPayload?: JsonFilter<"Task">
    retryCount?: IntFilter<"Task"> | number
    startedAt?: DateTimeFilter<"Task"> | Date | string
    completedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
  }

  export type WorkflowExecutionCreateWithoutTasksInput = {
    id?: string
    status?: $Enums.ExecutionStatus
    startedAt?: Date | string
    completedAt?: Date | string | null
    workflow: WorkflowCreateNestedOneWithoutExecutionsInput
  }

  export type WorkflowExecutionUncheckedCreateWithoutTasksInput = {
    id?: string
    workflowId: string
    status?: $Enums.ExecutionStatus
    startedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type WorkflowExecutionCreateOrConnectWithoutTasksInput = {
    where: WorkflowExecutionWhereUniqueInput
    create: XOR<WorkflowExecutionCreateWithoutTasksInput, WorkflowExecutionUncheckedCreateWithoutTasksInput>
  }

  export type TaskLogCreateWithoutTaskInput = {
    id?: string
    logLevel?: $Enums.LogLevel
    message: string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type TaskLogUncheckedCreateWithoutTaskInput = {
    id?: string
    logLevel?: $Enums.LogLevel
    message: string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type TaskLogCreateOrConnectWithoutTaskInput = {
    where: TaskLogWhereUniqueInput
    create: XOR<TaskLogCreateWithoutTaskInput, TaskLogUncheckedCreateWithoutTaskInput>
  }

  export type TaskLogCreateManyTaskInputEnvelope = {
    data: TaskLogCreateManyTaskInput | TaskLogCreateManyTaskInput[]
    skipDuplicates?: boolean
  }

  export type WorkflowExecutionUpsertWithoutTasksInput = {
    update: XOR<WorkflowExecutionUpdateWithoutTasksInput, WorkflowExecutionUncheckedUpdateWithoutTasksInput>
    create: XOR<WorkflowExecutionCreateWithoutTasksInput, WorkflowExecutionUncheckedCreateWithoutTasksInput>
    where?: WorkflowExecutionWhereInput
  }

  export type WorkflowExecutionUpdateToOneWithWhereWithoutTasksInput = {
    where?: WorkflowExecutionWhereInput
    data: XOR<WorkflowExecutionUpdateWithoutTasksInput, WorkflowExecutionUncheckedUpdateWithoutTasksInput>
  }

  export type WorkflowExecutionUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumExecutionStatusFieldUpdateOperationsInput | $Enums.ExecutionStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workflow?: WorkflowUpdateOneRequiredWithoutExecutionsNestedInput
  }

  export type WorkflowExecutionUncheckedUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    workflowId?: StringFieldUpdateOperationsInput | string
    status?: EnumExecutionStatusFieldUpdateOperationsInput | $Enums.ExecutionStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TaskLogUpsertWithWhereUniqueWithoutTaskInput = {
    where: TaskLogWhereUniqueInput
    update: XOR<TaskLogUpdateWithoutTaskInput, TaskLogUncheckedUpdateWithoutTaskInput>
    create: XOR<TaskLogCreateWithoutTaskInput, TaskLogUncheckedCreateWithoutTaskInput>
  }

  export type TaskLogUpdateWithWhereUniqueWithoutTaskInput = {
    where: TaskLogWhereUniqueInput
    data: XOR<TaskLogUpdateWithoutTaskInput, TaskLogUncheckedUpdateWithoutTaskInput>
  }

  export type TaskLogUpdateManyWithWhereWithoutTaskInput = {
    where: TaskLogScalarWhereInput
    data: XOR<TaskLogUpdateManyMutationInput, TaskLogUncheckedUpdateManyWithoutTaskInput>
  }

  export type TaskLogScalarWhereInput = {
    AND?: TaskLogScalarWhereInput | TaskLogScalarWhereInput[]
    OR?: TaskLogScalarWhereInput[]
    NOT?: TaskLogScalarWhereInput | TaskLogScalarWhereInput[]
    id?: StringFilter<"TaskLog"> | string
    taskId?: StringFilter<"TaskLog"> | string
    logLevel?: EnumLogLevelFilter<"TaskLog"> | $Enums.LogLevel
    message?: StringFilter<"TaskLog"> | string
    metadata?: JsonFilter<"TaskLog">
    createdAt?: DateTimeFilter<"TaskLog"> | Date | string
  }

  export type TaskCreateWithoutLogsInput = {
    id?: string
    assignedAgentId?: string | null
    taskName: string
    status?: $Enums.TaskStatus
    inputPayload?: JsonNullValueInput | InputJsonValue
    outputPayload?: JsonNullValueInput | InputJsonValue
    retryCount?: number
    startedAt?: Date | string
    completedAt?: Date | string | null
    execution: WorkflowExecutionCreateNestedOneWithoutTasksInput
  }

  export type TaskUncheckedCreateWithoutLogsInput = {
    id?: string
    executionId: string
    assignedAgentId?: string | null
    taskName: string
    status?: $Enums.TaskStatus
    inputPayload?: JsonNullValueInput | InputJsonValue
    outputPayload?: JsonNullValueInput | InputJsonValue
    retryCount?: number
    startedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type TaskCreateOrConnectWithoutLogsInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutLogsInput, TaskUncheckedCreateWithoutLogsInput>
  }

  export type TaskUpsertWithoutLogsInput = {
    update: XOR<TaskUpdateWithoutLogsInput, TaskUncheckedUpdateWithoutLogsInput>
    create: XOR<TaskCreateWithoutLogsInput, TaskUncheckedCreateWithoutLogsInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutLogsInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutLogsInput, TaskUncheckedUpdateWithoutLogsInput>
  }

  export type TaskUpdateWithoutLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    assignedAgentId?: NullableStringFieldUpdateOperationsInput | string | null
    taskName?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    inputPayload?: JsonNullValueInput | InputJsonValue
    outputPayload?: JsonNullValueInput | InputJsonValue
    retryCount?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    execution?: WorkflowExecutionUpdateOneRequiredWithoutTasksNestedInput
  }

  export type TaskUncheckedUpdateWithoutLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    executionId?: StringFieldUpdateOperationsInput | string
    assignedAgentId?: NullableStringFieldUpdateOperationsInput | string | null
    taskName?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    inputPayload?: JsonNullValueInput | InputJsonValue
    outputPayload?: JsonNullValueInput | InputJsonValue
    retryCount?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WorkflowNodeCreateManyWorkflowInput = {
    id?: string
    agentId: string
    capability: string
    status: string
    positionX: number
    positionY: number
  }

  export type WorkflowEdgeCreateManyWorkflowInput = {
    id?: string
    sourceNode: string
    targetNode: string
  }

  export type WorkflowExecutionCreateManyWorkflowInput = {
    id?: string
    status?: $Enums.ExecutionStatus
    startedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type WorkflowNodeUpdateWithoutWorkflowInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    capability?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    positionX?: IntFieldUpdateOperationsInput | number
    positionY?: IntFieldUpdateOperationsInput | number
  }

  export type WorkflowNodeUncheckedUpdateWithoutWorkflowInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    capability?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    positionX?: IntFieldUpdateOperationsInput | number
    positionY?: IntFieldUpdateOperationsInput | number
  }

  export type WorkflowNodeUncheckedUpdateManyWithoutWorkflowInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    capability?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    positionX?: IntFieldUpdateOperationsInput | number
    positionY?: IntFieldUpdateOperationsInput | number
  }

  export type WorkflowEdgeUpdateWithoutWorkflowInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceNode?: StringFieldUpdateOperationsInput | string
    targetNode?: StringFieldUpdateOperationsInput | string
  }

  export type WorkflowEdgeUncheckedUpdateWithoutWorkflowInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceNode?: StringFieldUpdateOperationsInput | string
    targetNode?: StringFieldUpdateOperationsInput | string
  }

  export type WorkflowEdgeUncheckedUpdateManyWithoutWorkflowInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceNode?: StringFieldUpdateOperationsInput | string
    targetNode?: StringFieldUpdateOperationsInput | string
  }

  export type WorkflowExecutionUpdateWithoutWorkflowInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumExecutionStatusFieldUpdateOperationsInput | $Enums.ExecutionStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tasks?: TaskUpdateManyWithoutExecutionNestedInput
  }

  export type WorkflowExecutionUncheckedUpdateWithoutWorkflowInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumExecutionStatusFieldUpdateOperationsInput | $Enums.ExecutionStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tasks?: TaskUncheckedUpdateManyWithoutExecutionNestedInput
  }

  export type WorkflowExecutionUncheckedUpdateManyWithoutWorkflowInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumExecutionStatusFieldUpdateOperationsInput | $Enums.ExecutionStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TaskCreateManyExecutionInput = {
    id?: string
    assignedAgentId?: string | null
    taskName: string
    status?: $Enums.TaskStatus
    inputPayload?: JsonNullValueInput | InputJsonValue
    outputPayload?: JsonNullValueInput | InputJsonValue
    retryCount?: number
    startedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type TaskUpdateWithoutExecutionInput = {
    id?: StringFieldUpdateOperationsInput | string
    assignedAgentId?: NullableStringFieldUpdateOperationsInput | string | null
    taskName?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    inputPayload?: JsonNullValueInput | InputJsonValue
    outputPayload?: JsonNullValueInput | InputJsonValue
    retryCount?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    logs?: TaskLogUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutExecutionInput = {
    id?: StringFieldUpdateOperationsInput | string
    assignedAgentId?: NullableStringFieldUpdateOperationsInput | string | null
    taskName?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    inputPayload?: JsonNullValueInput | InputJsonValue
    outputPayload?: JsonNullValueInput | InputJsonValue
    retryCount?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    logs?: TaskLogUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateManyWithoutExecutionInput = {
    id?: StringFieldUpdateOperationsInput | string
    assignedAgentId?: NullableStringFieldUpdateOperationsInput | string | null
    taskName?: StringFieldUpdateOperationsInput | string
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    inputPayload?: JsonNullValueInput | InputJsonValue
    outputPayload?: JsonNullValueInput | InputJsonValue
    retryCount?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TaskLogCreateManyTaskInput = {
    id?: string
    logLevel?: $Enums.LogLevel
    message: string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type TaskLogUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    logLevel?: EnumLogLevelFieldUpdateOperationsInput | $Enums.LogLevel
    message?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskLogUncheckedUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    logLevel?: EnumLogLevelFieldUpdateOperationsInput | $Enums.LogLevel
    message?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskLogUncheckedUpdateManyWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    logLevel?: EnumLogLevelFieldUpdateOperationsInput | $Enums.LogLevel
    message?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use WorkflowCountOutputTypeDefaultArgs instead
     */
    export type WorkflowCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WorkflowCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WorkflowExecutionCountOutputTypeDefaultArgs instead
     */
    export type WorkflowExecutionCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WorkflowExecutionCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TaskCountOutputTypeDefaultArgs instead
     */
    export type TaskCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TaskCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WorkflowDefaultArgs instead
     */
    export type WorkflowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WorkflowDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WorkflowNodeDefaultArgs instead
     */
    export type WorkflowNodeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WorkflowNodeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WorkflowEdgeDefaultArgs instead
     */
    export type WorkflowEdgeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WorkflowEdgeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WorkflowExecutionDefaultArgs instead
     */
    export type WorkflowExecutionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WorkflowExecutionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TaskDefaultArgs instead
     */
    export type TaskArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TaskDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TaskLogDefaultArgs instead
     */
    export type TaskLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TaskLogDefaultArgs<ExtArgs>

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