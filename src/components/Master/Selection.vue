<template>
  <div class="select-component">
    <div @click="expand = !expand" class="select-button" :class="css">
      <div class="flex">
        <p class="my-auto">{{ selectedItemLabel }}</p>
      </div>
      <div class="chevron">
        <img class="h-7 w-7" src="../../assets/images/chevron-right.png" />
      </div>
    </div>
    <div v-if="expand" class="selection-box">
      <div
        v-for="(item, i) in items"
        @click="
          selectItem(item);
          emitOnChange();
        "
        :key="i"
        :class="{
          'selected-item': item.value === (content?.value ?? ''),
        }"
        class="selection-item"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>
<script>
// import { watch } from "vue";
export default {
  name: "Selection",
  emits: ["update:modelValue", "onChange"],
  props: {
    modelValue: [String, Object],
    css: String,
    selectFirstitem: Boolean,
    items: Array,
    resetOnItemChanges: Boolean,
  },
  data: () => ({
    content: null,
    expand: false,
  }),
  computed: {
    selectedItemLabel() {
      return this.content?.label ?? "";
    },
  },
  methods: {
    emitOnChange() {
      this.$emit("onChange", this.content ?? null);
    },
    selectItem(item) {
      this.content = item;
      // for Vue3 v-model to works
      this.$emit("update:modelValue", this.content ?? null);
      this.expand = false;
    },
  },
  created() {
    const firstItem = this.items?.length > 0 ? this.items[0] : null;
    this.selectItem(firstItem);
  },
};
</script>
<style lang="postcss" scoped>
.select-component {
  @apply relative text-sm cursor-pointer;
}
.select-button {
  @apply rounded-sm w-full bg-black border-2 py-2 flex;
}
.chevron {
  @apply flex justify-end transform rotate-90;
}
.selection-box {
  @apply absolute bg-black z-10 rounded-sm border w-full;
}
.selection-item {
  @apply p-2 text-left px-3;
}
.selected-item {
  @apply text-white;
}
</style>
