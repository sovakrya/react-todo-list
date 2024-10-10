export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: 1;
  documentId: string;
};

type Data = {
  data: Todo[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

type ReturnedData = {
  data: Todo;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export async function getTodos(): Promise<Data> {
  const resp = await fetch(`${process.env.REACT_APP_BACKEND}api/todos`);

  return resp.json();
}

export async function addTodo(
  todo: Omit<Todo, "id" | "documentId">
): Promise<ReturnedData> {
  const resp = await fetch(`${process.env.REACT_APP_BACKEND}api/todos`, {
    method: "POST",
    body: JSON.stringify({
      data: {
        title: todo.title,
        completed: todo.completed,
        userId: todo.userId,
      },
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  return resp.json();
}

export async function updateTodo(todo: Todo): Promise<ReturnedData> {
  const resp = await fetch(
    `${process.env.REACT_APP_BACKEND}api/todos/${todo.documentId}`,
    {
      method: "PUT",
      body: JSON.stringify({
        data: {
          title: todo.title,
          completed: todo.completed,
          userId: todo.userId,
        },
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
