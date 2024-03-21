// ****************************************************************
// Get Todos
// ****************************************************************
export const getTodos = async (readContract) => {

    try {
        const numberOfTodos = Number(await readContract.todoCount());
        if (numberOfTodos) {
            const temp = [];
            for (let index = 1; index <= numberOfTodos; index++) {
                const todoBlock = await readContract['todos'](index);

                if (todoBlock.text) {
                    temp.push(todoBlock);
                }

            }

            return temp;
        }

    } catch (error) {
        console.error('Error fetching todo:', error);
    }

}

// ****************************************************************
// Add Todo
// ****************************************************************
export const addTodo = async (writeContract, value) => {
    try {
        const result = await writeContract.createTodo(value);
        const receipt = await result.wait();

        if (receipt.status === 1) {
            return true;
        } else {
            console.error("Error adding todo:", receipt);
            return null;
        }

    } catch (error) {
        console.error('Error adding todo:', error);
    }
}

// ****************************************************************
// Remove Todo
// ****************************************************************
export const removeTodo = async (writeContract, id) => {
    try {
        const result = await writeContract.removeTodo(id);
        const receipt = await result.wait();

        if (receipt.status === 1) {
            return true;
        } else {
            console.error("Error removing todo:", receipt);
            return null;
        }
    } catch (error) {
        console.error('Error removing todo:', error);
    }
}

// ****************************************************************
// Update Todo Status
// ****************************************************************
export const updateTodoStatus = async (writeContract, id) => {
    try {
        const result = await writeContract.toggleTodo(id);
        const receipt = await result.wait();

        if (receipt.status === 1) {
            return true;
        } else {
            console.error("Error toggling todo:", receipt);
            return null;
        }
    } catch (error) {
        console.error("Error toggling todo:", error);
    }
}