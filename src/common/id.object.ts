export class ID {
    timestamp: number
    internal_id: number
    content_type: number
    incrementer: number

    value: number

    constructor(timestamp: number, internal_id: number, content_type: number, incrementer: number) {
        this.timestamp = timestamp
        this.internal_id = internal_id
        this.content_type = content_type
        this.incrementer = incrementer
        
        this.value = Number(((BigInt(timestamp) << BigInt(20)))  
                    | BigInt((internal_id << 10) & 0xFFC00)
                    | BigInt((content_type << 5) & 0x3E0)
                    | BigInt(incrementer & 0x1F))
    }

    static IDFromNumbers(timestamp: bigint, internal_id: number, content_type: number, incrementer: number) {
        return ((timestamp << BigInt(20)))  
        | BigInt((internal_id << 10) & 0xFFC00)
        | BigInt((content_type << 5) & 0x3E0)
        | BigInt(incrementer & 0x1F)
    }
    
    static fromNumber(num: number) {
        return new ID(
            Number(BigInt(num) >> BigInt(20)),
            Number((BigInt(num) & BigInt(0xFFC00)) >> BigInt(10)),
            Number((BigInt(num) & BigInt(0x3E0)) >> BigInt(5)),
            Number(BigInt(num) & BigInt(0x1F))
        )
    }
}

const a = new ID(Date.now(), 0, 12, 132)
console.log(a)
console.log(ID.fromNumber(1762182043389657000))