<template>
  <div>
    <div class="wheel-wrapper">
      <div
        class="wheel-pointer"
        @click="onClickRotate"
      >
        Start
      </div>
      <div
        class="wheel-bg"
        :class="{freeze: freeze}"
        :style="`transform: rotate(${wheelDeg}deg)`"
      >
        <div class="prize-list">
          <div
            class="prize-item-wrapper"
            v-for="(item,index) in prizeList"
            :key="index"
          >
            <div
              class="prize-item"
              :style="`transform: rotate(${(360/ prizeList.length) * index}deg)`"
            >
              <div class="prize-name">
                {{ item }}%
              </div>
              <div class="prize-icon">
                <!--                <img :src="item.icon">-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "wheel",
  props: ["investmentId"],
  data() {
    return {
      freeze: false,
      rolling: false,
      dataFetch: false,
      wheelDeg: 0,
      prizeNumber: 10,
      prizeListOrigin: [2,4,5,7,1,3,6,9,8],
      spinResult: {}
    };
  },
  computed: {
    prizeList() {
      return this.prizeListOrigin.slice(0, this.prizeNumber);
    }
  },
  methods: {
    async onClickRotate() {
      if (this.rolling) {
        return;
      }
      if(this.dataFetch) return;
      this.dataFetch = true;
      try {
        let data = await this.$axios.$post("/investments/" + this.investmentId + "/spin")
        let index = this.prizeList.indexOf(data.percentage);
        this.spinResult = data;
        // console.log(index)
        this.roll(index);
      }
      catch (e) {
        this.$emit("completed", null)
      }
      this.dataFetch = false;
      // const result = Math.floor(Math.random() * this.prizeList.length);
    },
    roll(result) {
      this.rolling = true;
      const { wheelDeg, prizeList } = this;
      this.wheelDeg =
        wheelDeg -
        wheelDeg % 360 +
        6 * 360 +
        (360 - 360 / prizeList.length * result);
      setTimeout(() => {
        this.rolling = false;
        this.$emit("completed", this.spinResult)

        // alert("Result：" + prizeList[result]);
      }, 5000);
    }
  },
  watch: {
    prizeNumber() {
      this.freeze = true;
      this.wheelDeg = 0;

      setTimeout(() => {
        this.freeze = false;
      }, 0);
    }
  }
}
</script>

<style>
html {
  background: #dd7c7d;
}
.wheel-wrapper {
  width: 300px;
  height: 300px;
  position: absolute;
  color: black;
  font-weight: 900;
  font-size: 15pt;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.wheel-pointer {
  width: 60px;
  height: 60px;
  border-radius: 1000px;
  background: yellow;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  line-height: 60px;
  z-index: 10;
  cursor: pointer;
}

.wheel-pointer::after {
  content: "";
  position: absolute;
  top: -32px;
  left: 50%;
  border-width: 0 8px 40px;
  border-style: solid;
  border-color: transparent transparent yellow;
  transform: translateX(-50%);
}

.wheel-bg {
  width: 100%;
  height: 100%;
  border-radius: 1000px;
  overflow: hidden;
  transition: transform 4s ease-in-out;
  /*background: #7eef97;*/
  background-size: contain;
  background-image: url("/wheel-bg.png");
}

.wheel-bg.freeze {
  transition: none;
  background: red;
}

.prize-list {
  width: 100%;
  height: 100%;
  position: relative;
  text-align: center;
}

.prize-item-wrapper {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 150px;
}

.prize-item {
  width: 100%;
  height: 100%;
  transform-origin: bottom;
}

.prize-item .prize-name {
  padding: 30px 0;
  font-weight: 900;
  font-size: 22pt;
  color: white;
}

</style>
