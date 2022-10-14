export default {
    namespaced: true,
    state() {
        return {
            columns: [
                { key: "name", label: "Name", sortable: true },
                { key: "description", label: "Description" },
                { key: "dueDate", label: "Due date", sortable: true },
                { key: "createDate", label: "Create date", sortable: true },
                { key: "status", label: "Status" }
            ],
        };
    },
    mutations: {},
    actions: {},
    getters: {},
};
