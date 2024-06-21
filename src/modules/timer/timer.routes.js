const express = require("express");
const timerService = require("./timer.service");

const router = express.Router();

// GET /api/timer
router.get("/api/timer", async (req, res) => {
  // #swagger.tags = ['Timer']
  try {
    params = req.query;

    let paginated = await timerService.paginated(params);
    return res.status(200).send(paginated);

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// GET /api/timer/:id
router.get("/api/timer/:id", async (req, res) => {
  // #swagger.tags = ['Timer']
  try {
    const timerId = req.params.id;
    const timer = await timerService.findOneById(timerId);
    return res.status(200).send(timer);

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// POST /api/timer
router.post("/api/timer", async (req, res) => {
  // #swagger.tags = ['Timer']
  try {
    const { startDate, endDate, startTime, endTime, task } = req.body;

    const newTimer = {
      startDate,
      endDate,
      startTime,
      endTime,
      task
    };
    console.log(newTimer);

    const timer = await timerService.save(newTimer);
    return res.status(201).send(timer);

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// PUT /api/timer/:id
router.put("/api/timer/:id", async (req, res) => {
  // #swagger.tags = ['Timer']
  try {
    const timerId = req.params.id;
    // const updatedTimer = req.body;

    const { startDate, endDate, startTime, endTime, task } = req.body;

    const updatedTimer = {
      startDate,
      endDate,
      startTime,
      endTime,
      task
    };

    const timer = await timerService.update(timerId,updatedTimer);
    return res.status(200).send(timer);

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// DELETE /api/timer/:id
router.delete("/api/timer/:id", async (req, res) => {
  // #swagger.tags = ['Timer']
  try {
    const timerId = req.params.id;
    await timerService.remove(timerId);
    return res.status(200).send("Temporizador eliminado correctamente.");

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;
