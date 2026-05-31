class Controller {
  async endpoint(callback, next) {
    try {
      const response = await callback()

      if (!response) { response = {} }

      res.json({ success: true, ...response })
    } catch (error) {
      next(error)
    }
  }
}