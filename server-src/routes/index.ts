import { Router } from 'express'
import Task from '../models/Task'

const router = Router()

router.get('/tasks', async (req, res) => {
  const tasks = await Task.find()
  res.send(tasks)
})

router.post('/tasks', async (req, res) => {
  try {
    const { title, description } = req.body
    const task = new Task({ title, description })
    await task.save()
    res.json(task)
  } catch (error) {
    res.status(500).json({ message: 'ha fallado la consulta' })
  }
})

router.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
    if (!task) return res.status(404).json({ message: 'task not found' })
    res.json(task)
  } catch (error) {
    res.status(500).json({ message: 'ha fallado la consulta' })
  }
})

router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)
    if (!task) return res.status(404).json({ message: 'task not found' })
    res.json(task)
  } catch (error) {
    res.status(500).json({ message: 'ha fallado la consulta' })
  }
})

router.put('/tasks/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!updatedTask) return res.status(404).json({ message: 'task not found' })
    res.json(updatedTask)
  } catch (error) {
    res.status(500).json({ message: 'ha fallado la consulta' })
  }
})
export default router
