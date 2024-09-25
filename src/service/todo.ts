export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: 1;
};

export async function getTodos(): Promise<Todo[]> {
  const resp = await fetch(`https://jsonplaceholder.typicode.com/todos`);

  return resp.json();
}

export async function addTodo(todo: Omit<Todo, "id">): Promise<Todo> {
  const resp = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
    method: "POST",
    body: JSON.stringify({
      title: todo.title,
      completed: todo.completed,
      userId: todo.userId,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  return resp.json();
}

export async function updateTodo(todo: Todo): Promise<Todo> {
  const resp = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
    {
      method: "PUT",
      body: JSON.stringify({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        userId: todo.userId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );

  return resp.json();
}

export async function deleteTodo(todoId: number) {
  const resp = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId}`,
    {
      method: "DELETE",
    }
  );

  return resp.json();
}
