<template>
  <div :style="{ backgroundColor: (streaming ? bgColor.hexa : '#fff')}" class="relative h-screen">
    <div class="container flex flex-col items-center">
      <div
        class="flex text-xl mb-4"
        :style="{color: (streaming ? invertHex(bgColor.hex) : '#1A1A1AFF')}"
      >
        <button class="pr-4">
          <span v-if="reverse === -1">△</span>
          <span v-if="reverse === 1">▽</span>
        </button>
        Quórum presente: {{ quorum * 2 }}
      </div>
      <ul class="relative" :style="{ width: (widthMonitor) + '%'}">
        <li
          class="moving-item text-2xl h-16 w-full rounded-lg shadow-lg bg-gray-200 mb-10 p-4 absolute"
          :class="item.votes > quorum ? 'bg-green-500 text-white border-green-900 ':''"
          v-for="(item,index) in items"
          :key="index"
          :style="{ top: (item.position * 5) + 'rem'}"
        >{{ item.name }} - {{ item.votes }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  methods: {
    changeOrder() {
      this.sort();
    },
    invertHex(color) {
      /* eslint-disable */
      return (
        '#' +
        (
          '000000' + (0xffffff ^ parseInt(color.substring(1), 16)).toString(16)
        ).slice(-6)
      );
    },
    sort() {
      const newItems = this.items.slice().sort((a, b) => {
        let result;
        if (a.votes < b.votes) {
          result = 1;
        } else if (a.votes > b.votes) {
          result = -1;
        } else {
          result = 0;
        }
        return result * this.reverse;
      });
      newItems.forEach((itemCandidates, index) => {
        /* eslint-disable no-param-reassign */
        itemCandidates.position = index;
      });
    },
  },
  computed: {
    candidates() {
      return this.$store.state.candidatesStore;
    },
    quorum() {
      return this.$store.state.quorum / 2;
    },
    widthMonitor() {
      return this.$store.state.widthMonitor;
    },
    reverse() {
      return this.$store.state.reverse;
    },
    streaming() {
      return this.$store.state.streaming;
    },
    bgColor() {
      return this.$store.state.bgColor;
    },
  },
  watch: {
    candidates() {
      this.items = this.candidates;
      this.sort();
    },
    reverse() {
      this.sort();
    },
  },
  mounted() {
    this.items = this.candidates;
    this.sort();
  },
};
</script>
<style scoped>
.moving-item {
  transition: all 1s ease;
  -webkit-transition: all 1s ease;
}
ul {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  list-style-type: none;
  padding: 0;
  position: relative;
}
</style>
