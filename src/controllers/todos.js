const { knex } = require('../database/connection');

const registerTasks = async (req, res) => {
    const { task, active } = req.body;

    try {
        const registerTask = await knex('todos').insert({ task, active, data: new Date(), user_id: req.user.id }).returning("*");
        console.log("🚀 ~ file: todos.js:8 ~ registerTasks ~ registerTask:", registerTask)
        return res.status(201).json(registerTask[0]);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}
const listTasks = async (req, res) => {
    try {
        const listTask = await knex('todos').where({ user_id: req.user.id }).returning("*");
        return res.json(listTask)
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const detailTask = async (req, res) => {
    const { id } = req.params
    if (!Number(id)) {
        return res.status(400).json({ message: "Enter a valid verification code for the user" });
    }
    try {
        const detailTask = await knex('todos as to').join('users as us', 'us.id', '=', 'to.user_id').select('to.user_id', 'to.task', 'us.name').where({ id: req.user.id });
        return res.status(200).json(detailTask);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }
}
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { task, active } = req.body;

    try {
        const verifyTask = await knex('todos').where({ id }).andWhere("user_id", req.user.id).first();
        if (!verifyTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        const updateTask = await knex("todos").update({ task, active }).where({ id }).andWhere("user_id", req.user.id).returning("*");

        return res.status(204).json(updateTask);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const deleteTask = async (req, res) => {
    const { id } = req.params

    try {
        const existTask = await knex('todos').where({ id }).andWhere("user_id", req.user.id).first().debug();
        if (!existTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        const query = "select * from todos where active = true"
        const { rows } = await knex.raw(query)

        const verifyTask = rows.find(task => {
            return task.id === Number(existTask.id);
        })

        if (!verifyTask) {
            return res.status(400).json({ message: "Task cannot be deleted as it has not yet been completed!" })
        }

        await knex('todos').where({ id }).del()
        return res.status(204).send()
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = { registerTasks, listTasks, deleteTask, detailTask, updateTask }