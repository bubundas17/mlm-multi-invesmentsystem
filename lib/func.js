let  Prando = require("prando");

const alphaVal = (s) => s.toLowerCase().charCodeAt(0) - 97 +1;
const scale = (num, in_min, in_max, out_min, out_max) => {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
const zodiacSign = (name) => {
  let firstCharractor = name[0];
  let seed = alphaVal(firstCharractor);
  // let rng = Prando(name || "sadha" );
  // let zodiac = rng.nextInt(0, 11);
  let zodiac = scale(seed, 0, 25, 0, 11)
  switch (zodiac) {
    case 0:
      return "@/assets/images/icons/aquarius.png"
    case 1:
      return "@/assets/images/icons/aries.png"
    case 2:
      return "@/assets/images/icons/cancer.png"
    case 3:
      return "@/assets/images/icons/capricorn.png"
    case 4:
      return "@/assets/images/icons/gemini.png"
    case 5:
      return "@/assets/images/icons/leo.png"
    case 6:
      return "@/assets/images/icons/libra.png"
    case 7:
      return "@/assets/images/icons/pisces.png"
    case 8:
      return "@/assets/images/icons/sagittarius.png"
    case 9:
      return "@/assets/images/icons/scorpio.png"
    case 10:
      return "@/assets/images/icons/taurus.png"
    case 11:
      return "@/assets/images/icons/virgo.png"
  }
}

export default {
  alphaVal,
  zodiacSign,
  scale
}
