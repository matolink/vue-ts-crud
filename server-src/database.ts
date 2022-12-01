import { connect } from 'mongoose'

export const startConnection = async () => {
  try {
    const db = await connect('mongodb://localhost/vue-ts-crud')
  } catch (error) {
    console.log(error)
  }
}
