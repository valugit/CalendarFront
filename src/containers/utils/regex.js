import React from 'react';

export const regex = {
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /[\d]/,
  specialChar: /[!\"#$%&\'\(\)*+,\-./:;<=>?@\[\\\]^_\`\{|\}~àâçéèêëîïôûùüÿñæœ ]/i,
  nameSpecialChar: /[.,!\"#$%&\(\)*+/:;<=>?@\[\\\]^_\`\{|\}~]/i
}