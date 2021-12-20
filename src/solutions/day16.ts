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

class PacketReader {
  private head = 0;
  private packet: string;
  private versionSum = 0;

  constructor(packet: string) {
    this.packet = packet;
  }

  read() {
    while (this.head < this.packet.length) {
      if (this.isDone()) return;
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

        const number = parseInt(numberBits, 2);

        continue;
      }

      const lengthTypeID = this.readBits(1);

      if (lengthTypeID === '0') {
        const lengthBits = this.readBits(15);
        const packetLength = parseInt(lengthBits, 2);
      } else {
        const numPacketsBits = this.readBits(11);
        const numPackets = parseInt(numPacketsBits, 2);
      }
    }
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

const day16 = () => {
  const data = readInput('input/day16.txt')[0];
  const binaryString = data.split('').reduce((acc, current) => {
    return acc + hexMap[current];
  }, '');

  const packetReader = new PacketReader(binaryString);
  packetReader.read();

  return packetReader.getVersionSum();
  //
};

console.log('Day 16 - Part 1', day16());
