<template>
  <div class="page">
    <!-- FILTERS AND ADD BUTTON -->
    <div class="flex flex-row justify-between">
      <!-- FILTER INPUTS -->
      <div class="flex flex-row gap-x-10">
        <va-input
          class="mb-4"
          v-model="perPage"
          label="ITEMS PER PAGE"
          placeholder="Eg. 10"
        />
        <va-input
          class="mb-4"
          v-model="search"
          @change="
            async () => {
              await loadTableData(search);
            }
          "
          label="NAME"
          placeholder="Eg. John Wick"
        />
      </div>
      <!-- ADD TASK BUTTON -->
      <div class="flex flex-row">
        <va-button outline class="h-9" @click="showAddTaskModal()"
          >ADD TASK</va-button
        >
      </div>
    </div>

    <!-- DATA TABLE -->
    <va-data-table
      :items="tableData"
      :columns="$store.state.todo.columns"
      :per-page="perPage"
      :current-page="currentPage"
      :loading="isLoading"
      :striped="true"
    >
      <template #cell(dueDate)="{ value }">
        {{ formatDate(value) }}
      </template>
      <template #cell(createDate)="{ value }">
        {{ formatDate(value) }}
      </template>
    </va-data-table>
    <div class="flex w-full">
      <va-pagination
        class="mx-auto"
        v-model="currentPage"
        :pages="pages"
        input
      />
    </div>
    <!-- MODAL -->
    <va-modal v-model="showAddModal" hide-default-actions overlay-opacity="0.2">
      <template #header>
        <p class="text-1xl">Add Task</p>
        <div class="row">
          <div class="flex my-10 w-96">
            <va-form
              style="height: 450px"
              ref="form"
              class="flex flex-col w-full gap-y-5"
              @validation="validation = $event"
            >
              <va-input
                class="flex w-full"
                label="NAME"
                v-model="addTaskPayload.name"
              />
              <va-input
                class="flex w-full"
                v-model="addTaskPayload.description"
                type="textarea"
                label="DESCRIPTION"
                :min-rows="3"
                :max-rows="5"
              />
              <p class="text-sm font-semibold" style="color: #2c82e0">
                DUE DATE
              </p>
              <va-date-picker
                class="mx-auto"
                mode="single"
                label="DUE DATE"
                v-model="dueDate"
                stateful
                clearable
              />
            </va-form>
          </div>
        </div>
      </template>
      <template #footer>
        <va-button @click="addTask()"> Add </va-button>
      </template>
    </va-modal>
  </div>
</template>
<script>
export default {
  name: "Home",
  components: {},
  data: function () {
    return {
      search: "",
      perPage: 10,
      currentPage: 1,
      tableData: [],
      showAddModal: false,
      showEditModal: false,
      addTaskPayload: { name: "", description: "" },
      dueDate: "",
    };
  },
  async created() {
    await this.loadTableData("");
  },
  computed: {
    pages() {
      return this.perPage && this.perPage !== 0
        ? Math.ceil(this.tableData.length / this.perPage)
        : this.tableData.length;
    },
  },
  watch: {
    showAddModal() {
      this.addTaskPayload = { ...{ email: "", description: "", dueDate: "" } };
    },
  },
  methods: {
    formatDate(value) {
      return (
        new Date(Number(value)).toDateString() +
        " " +
        new Date(Number(value)).toLocaleTimeString().slice(0, 5)
      );
    },
    showAddTaskModal() {
      console.log("ADD TASK");
      this.showAddModal = true;
    },
    async addTask() {
      let payload = { ...this.addTaskPayload, dueDate: this.dueDate };
      console.log("Payload", payload);
      await this.$store.dispatch("api/post", {
        route: "task/add",
        body: payload,
      });
      this.showAddModal = false;
      await this.loadTableData("");
    },
    async loadTableData(search) {
      const res = await this.$store.dispatch("api/get", {
        route: "task/list",
        queryStringParameters: { search: search },
      });
      this.tableData = res.data;
    },
  },
};
</script>
<style lang="postcss" scoped>
.page {
  @apply mx-20 mt-10;
}
.module {
  @apply mx-auto w-1/2 text-center my-5;
}
.title {
  @apply text-5xl font-semibold whitespace-nowrap;
}
</style>
