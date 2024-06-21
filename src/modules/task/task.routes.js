const express = require("express");
const taskService = require("./task.service");

const router = express.Router();

// GET /api/task
// metodo query
router.get("/api/task", async (req, res) => {
  // #swagger.tags = ['Task']
  try {
    params = req.query;

    let paginated = await taskService.paginated(params);
    return res.status(200).send(paginated);

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// GET /api/task/:id
router.get("/api/task/:id", async (req, res) => {
  // #swagger.tags = ['Task']
  try {
    const taskId = req.params.id;
    const task = await taskService.findOneById(taskId);
    return res.status(200).send(task);

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// POST /api/task
//metodo body 
router.post("/api/task", async (req, res) => {
  // #swagger.tags = ['Task']
  try {
    const { name, description, resume, user } = req.body;

    const newTask = {
      name,
      description,
      resume,
      user
    };
    console.log(newTask);

    const task = await taskService.save(newTask);
    return res.status(201).send(task);

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// PUT /api/task/:id
// metodo params
router.put("/api/task/:id", async (req, res) => {
  // #swagger.tags = ['Task']
  try {
    const taskId = req.params.id;
    // const updatedTask = req.body;

    const { name, description, resume, user } = req.body;

    const updatedTask = {
      name,
      description,
      resume,
      user
    };

    const task = await taskService.update(taskId, updatedTask);
    return res.status(200).send(task);

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// DELETE /api/task/:id
router.delete("/api/task/:id", async (req, res) => {
  // #swagger.tags = ['Task']
  try {
    const taskId = req.params.id;
    await taskService.remove(taskId);
    return res.status(200).send("Tarea eliminada correctamente.");

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;
