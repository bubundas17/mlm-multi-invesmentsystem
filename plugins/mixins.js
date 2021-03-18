import vue from "vue"

vue.mixin({
  methods: {
    calculatePrice(amount){
      if(!this.user.isReseller) return Number(amount).toFixed(2)
      return Number(amount - ( (amount * this.user.reseller.discount)/100)).toFixed(2)
    },
    scale(num, in_min, in_max, out_min, out_max) {
      return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    },
    alphaVal(s) {
      return s.toLowerCase().charCodeAt(0) - 97 + 1;
    },

  },
  computed: {
    zodiac(){
      // console.log(this.user.name)
      let firstCharractor = this.user.name[0] || "A";
      let seed = this.alphaVal(firstCharractor);
      // let rng = Prando(name || "sadha" );
      // let zodiac = rng.nextInt(0, 11);
      let zodiac = this.scale(seed, 0, 25, 0, 11)
      zodiac = zodiac.toFixed(0)
      console.log(zodiac)
      let image = "aquarius"
      if (zodiac == 0) {
        image = "aquarius";
      } else if (zodiac == 1) {
        image = "aries";
      } else if (zodiac == 2) {
        image = "cancer";
      } else if (zodiac == 3) {
        image = "capricorn";
      } else if (zodiac == 4) {
        image = "gemini";
      } else if (zodiac == 5) {
        image = "leo";
      } else if (zodiac == 6) {
        image = "libra";
      } else if (zodiac == 7) {
        image = "pisces";
      } else if (zodiac == 8) {
        image = "sagittarius";
      } else if (zodiac == 9) {
        image = "scorpio";
      } else if (zodiac == 10) {
        image = "taurus";
      } else if (zodiac == 11) {
        image = "virgo";
      } else {
        image = "virgo";
      }
      // console.log(image)
      return image
    },
    zodiacSign() {
      console.log(this.user.name)
      let firstCharractor = this.user.name[0] || "A";
      let seed = this.alphaVal(firstCharractor);
      // let rng = Prando(name || "sadha" );
      // let zodiac = rng.nextInt(0, 11);
      let zodiac = this.scale(seed, 0, 25, 0, 11)
      zodiac = zodiac.toFixed(0)
      console.log(zodiac)
      let image = "/images/icons/aquarius.png"
      if (zodiac == 0) {
        image = "/images/icons/aquarius.png";
      } else if (zodiac == 1) {
        image = "/images/icons/aries.png";
      } else if (zodiac == 2) {
        image = "/images/icons/cancer.png";
      } else if (zodiac == 3) {
        image = "/images/icons/capricorn.png";
      } else if (zodiac == 4) {
        image = "/images/icons/gemini.png";
      } else if (zodiac == 5) {
        image = "/images/icons/leo.png";
      } else if (zodiac == 6) {
        image = "/images/icons/libra.png";
      } else if (zodiac == 7) {
        image = "/images/icons/pisces.png";
      } else if (zodiac == 8) {
        image = "/images/icons/sagittarius.png";
      } else if (zodiac == 9) {
        image = "/images/icons/scorpio.png";
      } else if (zodiac == 10) {
        image = "/images/icons/taurus.png";
      } else if (zodiac == 11) {
        image = "/images/icons/virgo.png";
      } else {
        image = "/images/icons/virgo.png";
      }
      // console.log(image)
      return image
    },
  }
});
