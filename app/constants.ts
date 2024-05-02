
const colorChoices = [
    "000055",
    "0000aa",
    "0000ff",
    "0ef9ea",
    "00ff00",
    "00aa00",
    "005500",
    "e3ed61",
    "f8ff35",
    "f4cd1f",
    "e55d19",
    "ff0000",
    "aa0000",
    "880000",
    "f90ef5"
];

/* Result of mixing colorChoices above with the base color.
   Used to unmix the otherPublicColor when mixing the sharedSecretColor. */
const unmix = [
    "03489d",
    "0d45b7",
    "0f47de",
    "16c5d5",
    "14d347",
    "19ad40",
    "1a804f",
    "6fce88",
    "73db69",
    "69bf53",
    "707b43",
    "90394a",
    "77245c",
    "69205e",
    "8c40d7"
];

export { colorChoices, unmix };