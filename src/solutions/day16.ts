import { readInput } from '../shared/io';

const hexMap: { [k: string]: string } = Object.freeze({
  0: '0000',
  1: '0001',
  2: '0010',
  3: '0011',
  4: '0100',
  5: '0101',
  6: '0110',
  7: '0111',
  8: '1000',
  9: '1001',
  A: '1010',
  B: '1011',
  C: '1100',
  D: '1101',
  E: '1110',
  F: '1111',
});

type Operation = (values: number[]) => number;

const sum: Operation = (values: number[]) => {
  return values.length === 1 ? values[0] : values.reduce((acc, current) => acc + current);
};

const product: Operation = (values: number[]) => {
  return values.length === 1 ? values[0] : values.reduce((acc, current) => acc * current);
};

const min: Operation = (values: number[]) => {
  return Math.min(...values);
};

const max: Operation = (values: number[]) => {
  return Math.max(...values);
};

const greaterThan: Operation = (values: number[]) => {
  return values[0] > values[1] ? 1 : 0;
};

const lessThan: Operation = (values: number[]) => {
  return values[0] < values[1] ? 1 : 0;
};

const equal: Operation = (values: number[]) => {
  return values[0] === values[1] ? 1 : 0;
};

const operationMap: { [k: string]: Operation } = Object.freeze({
  '000': sum,
  '001': product,
  '010': min,
  '011': max,
  '101': greaterThan,
  '110': lessThan,
  '111': equal,
});

class PacketReader {
  private head = 0;
  private packet: string;
  private versionSum = 0;

  constructor(packet: string) {
    this.packet = packet;
  }

  readPacket(): number {
    while (!this.isDone()) {
      const versionBinary = this.readBits(3);
      const version = parseInt(versionBinary, 2);
      this.versionSum += version;

      const type = this.readBits(3);

      if (type === '100') {
        let numberBits = '';
        let readLiteral = true;
        while (readLiteral) {
          const literalBinary = this.readBits(5);
          numberBits += literalBinary.slice(1, literalBinary.length);

          if (literalBinary[0] === '0') readLiteral = false;
        }

        return parseInt(numberBits, 2);
      }

      const lengthTypeID = this.readBits(1);

      if (lengthTypeID === '0') {
        const lengthBits = this.readBits(15);
        const packetLength = parseInt(lengthBits, 2);

        const headStart = this.head;
        const values: number[] = [];
        while (this.head - headStart < packetLength) {
          values.push(this.readPacket());
        }

        return operationMap[type](values);
      } else {
        const numPacketsBits = this.readBits(11);
        const numPackets = parseInt(numPacketsBits, 2);

        const values: number[] = [];
        for (let i = 0; i < numPackets; i++) {
          values.push(this.readPacket());
        }

        return operationMap[type](values);
      }
    }

    throw Error();
  }

  private isDone() {
    const remaining = this.packet.slice(this.head, this.packet.length);

    return remaining.split('').every((char) => char === '0');
  }

  private readBits(numBits: number) {
    const binaryString = this.packet.slice(this.head, this.head + numBits);
    this.head += numBits;

    return binaryString;
  }

  getVersionSum() {
    return this.versionSum;
  }
}

type PartFn = (packetReader: PacketReader) => number;

const part1 = (packetReader: PacketReader) => {
  packetReader.readPacket();
  return packetReader.getVersionSum();
};

const part2 = (packetReader: PacketReader) => {
  return packetReader.readPacket();
};

const day16 = (partFn: PartFn) => {
  const data = readInput('input/day16.txt')[0];
  const binaryString = data.split('').reduce((acc, current) => {
    return acc + hexMap[current];
  }, '');

  const packetReader = new PacketReader(binaryString);
  return partFn(packetReader);
};

console.log('Day 16 - Part 1', day16(part1));
console.log('Day 16 - Part 2', day16(part2));
