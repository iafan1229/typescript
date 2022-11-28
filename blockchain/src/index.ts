import crypto from 'crypto';

class Block {
    public hash:string;
    
    constructor(
      public prevHash:string,
      public num:number,
      public data:string
    ) {
        this.prevHash=prevHash;
        this.num=num;
        this.hash = Block.MakeHash(this.prevHash,this.num,this.data); //MaksHash한걸로 hash를 만든다
    }
    static MakeHash (prevHash:string,num:number,data:string):string { //매개변수 넣어줘야 하고
        const items = `${prevHash}${num}${data}`
        return crypto.createHash("sha256").update(items).digest("hex")
    }
}

class BlockChain {
    public blocks:Block[];
    constructor () {
        this.blocks = [];
    }
    getPrevHash() {
        if(!this.blocks.length) {
            return ""
        }else{
            return this.blocks[this.blocks.length-1].hash;
        }
    }
    addBlock(data:string) {
        const newBlock = new Block( //새 블록을 만들어서 이걸 배열에 넣는것이다
            this.getPrevHash(),
            this.blocks.length+1,
            data
        )        
        this.blocks.push(newBlock)
    }
    getBlock() {
        return [...this.blocks];
    }
}

const blockChain = new BlockChain()
blockChain.addBlock("first block")
blockChain.addBlock("second block")
console.log(blockChain.getBlock())