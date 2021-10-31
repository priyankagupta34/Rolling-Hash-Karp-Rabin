class RabinKarp {
  constructor() {
    this.haystack = "";
    this.needle = "";
    this.charSetCodeLength = 26;
  }
  /* initialise require vals */
  initialise(haystack, needle, charSetCodeLength) {
    if (!haystack || !needle) return [];
    // debugger;
    const result = [];
    this.haystack = haystack;
    this.needle = needle;
    this.nl = needle.length || 0;
    if (this.nl === 0) return [];
    this.charSetCodeLength = charSetCodeLength;

    const hashOfNeedle = this.getHashOfString(needle);
    console.log(this.nl);
    let currentHashFromHaystack = this.getHashOfString(
      haystack.substr(0, this.nl)
    );
    console.log(haystack.length, haystack.length - this.nl - 1);
    for (let i = 0; i < haystack.length - (this.nl - 1); i++) {
      if (currentHashFromHaystack === hashOfNeedle) result.push(i);
      currentHashFromHaystack = this.rollingHashAlgo(
        currentHashFromHaystack,
        haystack[i],
        haystack[i + this.nl] || ""
      );
    }
    return result;
  }
  getHashOfOneCharacter(char, vector = 0) {
    return char.charCodeAt(0) * this.charSetCodeLength ** vector;
  }
  getHashOfString(word) {
    return word
      .split("")
      .map((char, index) => this.getHashOfOneCharacter(char, index))
      .reduce((a, b) => a + b, 0);
  }
  removeFirstHash(currHsh, firsChar) {
    const hashOfCharToRemove = this.getHashOfOneCharacter(firsChar);
    return (currHsh - hashOfCharToRemove) / this.charSetCodeLength;
  }
  resizeNewHash(hash, newChar) {
    return hash + this.getHashOfOneCharacter(newChar, this.nl - 1);
  }
  rollingHashAlgo(currHsh, firsChar, lastChar) {
    return this.resizeNewHash(
      this.removeFirstHash(currHsh, firsChar),
      lastChar
    );
  }
}

const rabinkarpRH = new RabinKarp();

export default rabinkarpRH;
