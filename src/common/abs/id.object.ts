const TIMESTAMP_OFFSET = BigInt(`${20}`)
const INTERNAL_ID_MASK = BigInt(`${0b11111111110000000000}`)
const INTERNAL_ID_OFFSET = BigInt(`${10}`)
const CONTENT_TYPE_MASK = BigInt(`${0b1111111111}`)

export class ID {
    timestamp: bigint
    internal_id: bigint
    content_type: bigint
    incrementer: bigint

    value: bigint

    constructor(timestamp: number | bigint, internal_id: number | bigint, content_type: number | bigint) {
        this.timestamp = BigInt(`${timestamp}`)
        this.internal_id = BigInt(`${internal_id}`)
        this.content_type = BigInt(`${content_type}`)
        
        this.value = (this.timestamp << TIMESTAMP_OFFSET)  
                    | ((this.internal_id << INTERNAL_ID_OFFSET) & INTERNAL_ID_MASK)
                    | (this.content_type & CONTENT_TYPE_MASK)
    }

    static IDFromNumbers(timestamp: number, internal_id: number, content_type: number, incrementer: number) {
        const _timestamp = BigInt(`${timestamp}`)
        const _internal_id = BigInt(`${internal_id}`)
        const _content_type = BigInt(`${content_type}`)
        
        return (_timestamp << TIMESTAMP_OFFSET)  
        | ((_internal_id << INTERNAL_ID_OFFSET) & INTERNAL_ID_MASK)
        | (_content_type & CONTENT_TYPE_MASK)
    }
    
    static fromNumber(num: bigint) {
        
        return new ID(
            num >> TIMESTAMP_OFFSET,
            (num & INTERNAL_ID_MASK) >> INTERNAL_ID_OFFSET,
            num & CONTENT_TYPE_MASK)
    }
}