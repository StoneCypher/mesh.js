// Generated by typings
// Source: node_modules/mesh/typings/index.d.ts
declare module "mesh" {

  class Chunk {
    public done:boolean;
    public value:any;
  }

  class Writable {
    write(value:any);
    abort(reason:any);
    close();
  }

  class Readable {
    read():Promise<Chunk>;
    close():void;
    then(resolve:Function, reject:Function):Promise<any>;
    readAll():Promise<Array<any>>;
    pipeTo(writable:Writable);
  }

  export class Response extends Readable {
    constructor(writer:(Writable) => void);
    static create(writer:(Writable) => void);
  }

  export class BufferedResponse extends Readable {
    constructor(error:any, values:any);
    static create(error:any, values:any);
  }

  export class EmptyResponse extends Readable {
    constructor();
    static create():EmptyResponse;
  }

  export class WrapResponse extends Response {
    constructor(value:any);
    static create(value:any):WrapResponse;
  }

  export abstract class Bus {
    execute(action);
  }

  export class LimitBus extends Bus {
    constructor(max: number, bus: Bus);
    static create(max: number, bus: Bus): LimitBus;
  }

  export class ParallelBus extends Bus {
    constructor(busses:Array<Bus>);
    static create(busses:Array<Bus>):ParallelBus;
  }

  export class BufferedBus extends Bus {
    constructor(reject:Error, resolve:any);
    static create(reject:Error, resolve:any):ParallelBus;
  }

  export class SequenceBus extends Bus {
    constructor(busses:Array<Bus>);
    static create(busses:Array<Bus>):SequenceBus;
  }

  export class AcceptBus extends Bus {
    constructor(filter:Function, resolveBus:Bus, rejectBus:Bus);
    static create(filter:Function, resolveBus:Bus, rejectBus:Bus):AcceptBus;
  }

  export class NoopBus extends Bus {
    constructor();
    static create():NoopBus;
  }

  export class WrapBus extends Bus {
    static create(
      value: ((action, next) => void) | ((action) => Promise<any>|Response|any) | Bus
    ):WrapBus;
  }
}
