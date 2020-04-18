import vue from "vue"

vue.mixin({
  methods: {
    calculatePrice(amount){
      if(!this.user.isReseller) return Number(amount).toFixed(2)
      return Number(amount - ( (amount * this.user.reseller.discount)/100)).toFixed(2)
    }
  }
});
