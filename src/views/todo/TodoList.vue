<template>
  <div class="todo-container">
    <div class="todo-board">
      <span>todos</span>
      <input
        v-model="newTodo"
        @keyup.enter="addTodo"
        class="new-todo"
        placeholder="What next to do?"
      />
      <div class="todo-list">
        <li v-for="todo in todos" :key="todo.title">
          <div class="view">
            <div class="view-header">
              <!--               <div class="view__header-checkbox">
                <input
                  v-model="todo.completed"
                  type="checkbox"
                  id="todoInput"
                />
                <label for="todoInput"></label>
              </div> -->
              <input v-model="todo.completed" type="checkbox" />
              <label v-show="!todo.isEditing" @dblclick="editTodo(todo)">
                {{ todo.title }}
              </label>
              <input
                v-model="todo.title"
                v-show="todo.isEditing"
                @blur="doneEdit(todo)"
                @keyup.enter="doneEdit(todo)"
                ref="inputTitle"
                type="text"
              />
            </div>
            <div class="destroy" @click="removeTodo(todo)">
              <div class="bar bar-1"></div>
              <div class="bar bar-2"></div>
            </div>
          </div>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
let id = 1;

export default {
  name: "TODOList",
  data() {
    return {
      newTodo: "",
      todos: [],
    };
  },
  methods: {
    addTodo() {
      if (!this.newTodo) {
        return;
      }
      this.todos.unshift({
        id: id++,
        title: this.newTodo,
        completed: false,
        isEditing: false,
      });
      this.newTodo = "";
    },
    editTodo(todo) {
      // 一层直接浅拷贝
      const index = this.todos.findIndex((x) => x === todo);
      this.todos[index] = {
        ...todo,
        isEditing: true,
      };
    },
    doneEdit(todo) {
      this.todos = this.todos.map((x) => {
        return todo.id === x.id ? { ...todo } : { ...x };
      });
    },
    removeTodo(todo) {
      const index = this.todos.findIndex((x) => x.id === todo.id);
      this.todos.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.todo-container {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background-color: rgb(245, 245, 245);
}

.todo-board {
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-bottom: 20px;
  text-align: center;
}

span {
  font-size: 80px;
  color: rgba(175, 47, 47, 0.15);
}

.new-todo {
  padding: 20px 25px 20px 25px;
  border: 0;
  outline: none;
  border-radius: 5px;
  font-size: 18px;
  box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.2);
}

/* --------------todo list 面板 start-------------- */
.todo-list {
  width: 100%;
  margin-top: 20px;
  background-color: #fff;
  box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  transition: all ease 0.8s;
}

.view {
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
}

.view-header {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: 10px;
}

/* 勾选框 */
.view__header-checkbox {
  display: flex;
  align-items: center;
}

.view__header-checkbox input {
  display: none;
}

.view__header-checkbox input:checked + label {
  border: none;
}

.view__header-checkbox input:checked + label:before {
  content: "✅";
}

.view__header-checkbox label {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #ddd;
  border-radius: 50%;
  cursor: pointer;
}

/* 删除按钮 */
.destroy {
  position: relative;
  width: 20px;
  height: 10px;
  margin-right: 15px;
  transition: all ease 0.3s;
  cursor: pointer;
}

.destroy:hover {
  filter: drop-shadow(0 3px 6px rgba(48, 29, 17, 0.5));
  transform: scale(1.2);
}

.destroy .bar {
  position: absolute;
  top: 50%;
  left: 0;
  width: 20px;
  height: 5px;
  border-radius: 5px;
  background-color: rgb(255, 216, 89);
}

.bar-1 {
  transform: rotate(45deg) scaleX(1.414);
}

.bar-2 {
  transform: rotate(-45deg) scaleX(1.414);
}
/* --------------todo list 面板 end-------------- */
</style>
