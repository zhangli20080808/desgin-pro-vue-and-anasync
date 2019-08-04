<template>
  <div>
    <div>冲啊，手榴弹扔了{{ $store.state.test.count }}个</div>
    <!--    <p>几个{{ score }}</p>-->
    <button @click="add">扔一个</button>
    <button @click="addAsync">蓄力扔俩</button>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";

export default {
  methods: {
    add() {
      // 修改状态用commit
      this.$store.commit("test/increment");
    },
    addAsync() {
      this.$store.dispatch("test/incrementAsync");
    },
    decrementAsync() {
      this.$store.dispatch("test/decrementAsync");
    }
  },
  // computed: {
  //   ...mapGetters(["score"])
  // },
  created() {
    console.log(this.$store);
  }
};
</script>
