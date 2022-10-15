<template>
  <div class="mt-10 mx-20 mb-10">
    <!-- FILTERS AND ADD BUTTON -->
    <div class="flex flex-row justify-between">
      <!-- FILTER INPUTS -->
      <div class="flex flex-row gap-x-10">
        <!-- ITEMS PER PAGE -->
        <va-input
          class="mb-4"
          v-model="$store.state.todo.perPage"
          label="ITEMS PER PAGE"
          placeholder="eg. 10"
        />

        <!-- SEARCH BOX -->
        <va-input
          class="mb-4"
          v-model="$store.state.todo.search"
          @change="
            async () => {
              await loadTableData($store.state.todo.search);
            }
          "
          label="NAME"
          placeholder="eg. John Wick"
        />
      </div>

      <!-- ADD TASK BUTTON -->
      <div class="flex flex-row">
        <va-button outline class="h-9" @click="showAddTaskModal()">
          ADD TASK
        </va-button>
      </div>
    </div>

    <!-- DATA TABLE -->
    <va-data-table
      :items="$store.state.todo.tableData"
      :columns="$store.state.todo.columns"
      :per-page="$store.state.todo.perPage"
      :current-page="$store.state.todo.currentPage"
      :loading="isLoading"
      v-model:sort-by="$store.state.todo.sortBy"
      v-model:sorting-order="$store.state.todo.sortingOrder"
    >
      <!-- TRUNCATING NAME FIELD USING INPUT -->
      <template #cell(name)="{ value }">
        <input :value="value" class="border-0" />
      </template>

      <!-- TRUNCATING DESCRIPTION FIELD USING INPUT -->
      <template #cell(description)="{ value }">
        <input :value="value" class="border-0" style="width: 300px" />
      </template>

      <!-- FORMATING DATE FIELDS -->
      <template #cell(dueDate)="{ value }">
        {{ formatDate(value) }}
      </template>
      <template #cell(createDate)="{ value }">
        {{ formatDate(value) }}
      </template>

      <!-- UPDATE BUTTON -->
      <template #cell(actions)="{ rowIndex }">
        <va-button flat icon="edit" @click="showEditTaskModal(rowIndex)" />
      </template>
    </va-data-table>

    <!-- PAGINATION -->
    <div class="flex w-full">
      <va-pagination
        class="mx-auto"
        v-model="$store.state.todo.currentPage"
        :pages="pages"
        input
      />
    </div>

    <!-- MODAL -->
    <va-modal
      v-model="$store.state.todo.showModal"
      hide-default-actions
      overlay-opacity="0.2"
    >
      <!-- MODAL HEADER -->
      <template #header>
        <!-- MODAL TITLE -->
        <p v-if="!$store.state.todo.editTask" class="text-1xl">ADD TASK</p>
        <p v-else class="text-1xl">EDIT TASK</p>

        <div class="row">
          <div class="flex my-10 w-96">
            <!-- MODAL FORM -->
            <va-form
              style="height: 450px"
              ref="form"
              class="flex flex-col w-full gap-y-5"
            >
              <!-- NAME INPUT -->
              <va-input
                class="flex flex-col w-full"
                label="NAME"
                v-model="$store.state.todo.addTaskPayload.name"
              />

              <!-- DESCRIPTION INPUT -->
              <va-input
                class="flex flex-col w-full"
                v-model="$store.state.todo.addTaskPayload.description"
                type="textarea"
                label="DESCRIPTION"
                :min-rows="3"
                :max-rows="5"
              />

              <!-- DATE PICKER -->
              <p class="text-sm font-semibold" style="color: #2c82e0">
                DUE DATE
              </p>
              <va-date-picker
                class="mx-auto"
                mode="single"
                label="DUE DATE"
                v-model="$store.state.todo.addTaskPayload.dueDate"
                stateful
                clearable
              />
            </va-form>
          </div>
        </div>
      </template>

      <!-- MODAL FOOTER -->
      <template #footer>
        <!-- ACTION BUTTONS -->
        <va-button v-if="!$store.state.todo.editTask" @click="addTask()">
          ADD
        </va-button>
        <va-button v-else @click="updateTask()"> EDIT </va-button>
      </template>
    </va-modal>
    <!-- END OF MODAL -->
  </div>
</template>
<script>
export default {
  name: "Todo",
  components: {},
  async created() {
    // LOAD DATA
    await this.loadTableData("");
  },
  computed: {
    pages() {
      return this.$store.state.todo.perPage &&
        this.$store.state.todo.perPage !== 0
        ? Math.ceil(
            this.$store.state.todo.tableData.length /
              this.$store.state.todo.perPage
          )
        : this.$store.state.todo.tableData.length;
    },
  },
  watch: {
    "$store.state.todo.showModal"() {
      if (!this.$store.state.todo.editTask)
        this.$store.commit("todo/setAddTaskPayload", {
          name: "",
          description: "",
          dueDate: new Date(),
        });
    },
  },
  methods: {
    showEditTaskModal(idx) {
      // SETTING MODAL CONTROLLERS
      let toEdit = this.$store.state.todo.tableData[idx];
      this.$store.commit("todo/setShowModal", true);
      this.$store.commit("todo/setEditTask", true);

      // SETTING ADD/UPDATE PAYLOADS
      this.$store.commit("todo/setAddTaskPayload", {
        name: toEdit.name,
        description: toEdit.description,
        dueDate: new Date(toEdit.dueDate),
        taskId: toEdit.taskId,
      });
    },
    showAddTaskModal() {
      // SETTING MODAL CONTROLLERS
      this.$store.commit("todo/setShowModal", true);
      this.$store.commit("todo/setEditTask", false);
    },
    async addTask() {
      // ADDING TASK
      let payload = {
        ...this.$store.state.todo.addTaskPayload,
      };
      await this.$store.dispatch("api/post", {
        route: "task/add",
        body: payload,
      });

      // RESET MODAL CONTROLLERS
      this.$store.commit("todo/setShowModal", false);
      await this.loadTableData("");
    },
    async updateTask() {
      // UPDATING TASK
      let payload = {
        ...this.$store.state.todo.addTaskPayload,
      };
      await this.$store.dispatch("api/patch", {
        route: "task/update",
        body: payload,
        pathParam: this.$store.state.todo.addTaskPayload.taskId,
      });

      // RESET MODAL CONTROLLERS
      this.$store.commit("todo/setShowModal", false);
      this.$store.commit("todo/setEditTask", false);
      await this.loadTableData("");
    },
    async loadTableData(search) {
      const res = await this.$store.dispatch("api/get", {
        route: "task/list",
        queryStringParameters: { search },
      });
      this.$store.commit("todo/setTableData", res.data);
    },
    formatDate(value) {
      return (
        new Date(Number(value)).toDateString() +
        " " +
        new Date(Number(value)).toLocaleTimeString().slice(0, 5)
      );
    },
  },
};
</script>
<style lang="postcss" scoped>
input {
  border: none;
  outline: none;
  width: 200px;
}
input:active {
  border: none;
  outline: none;
  width: 200px;
}
</style>