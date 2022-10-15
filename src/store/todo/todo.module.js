export default {
    namespaced: true,
    state() {
        return {
            columns: [
                { key: "name", label: "Name", sortable: true },
                { key: "description", label: "Description" },
                { key: "dueDate", label: "Due date", sortable: true },
                { key: "createDate", label: "Create date", sortable: true },
                { key: "status", label: "Status" },
                { key: "actions", label: "Actions" }
            ],
            showModal: false,
            editTask: false,
            sortBy: 'createDate',
            sortingOrder: 'desc',
            isLoading: false,
            addTaskPayload: { name: "", description: "", dueDate: new Date() },
            tableData: [],
            search: "",
            perPage: 8,
            currentPage: 1,
            totalCount: 0
        };
    },
    mutations: {
        setShowModal(state, val) {
            state.showModal = val
        },
        setEditTask(state, val) {
            state.editTask = val
        },
        setIsLoading(state, val) {
            state.isLoading = val
        },
        setAddTaskPayload(state, val) {
            state.addTaskPayload = { ...val }
        },
        setTableData(state, val) {
            state.tableData = val
        },
        setSearch(state, val) {
            state.search = val
        },
        setPerPage(state, val) {
            state.perPage = val
        },
        setCurrentPage(state, val) {
            state.currentPage = val
        },
        setTotalCount(state, val) {
            state.totalCount = val
        }
    },
    actions: {},
    getters: {},
};
