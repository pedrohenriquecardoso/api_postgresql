import { createUserService, deleteUserService, getAllUsersService, updateUserService, getUserByIdService } from "../models/userModel.js"

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data
    })
}

export const createUser = async (req, res, next) => {
    const { name, email } = req.body
    try {
        const newUser = await createUserService(name, email)
        handleResponse(res, 201, "User created Successfully", newUser)
    } catch (err) {
        next(err)
    }
}

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await getAllUsersService()
        handleResponse(res, 200, "Users fetched Successfully", users)
    } catch (err) {
        next(err)
    }
}

export const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await getUserByIdService(id)
        if (!user) return handleResponse(res, 400, "User not found")
        handleResponse(res, 200, "User fetched Successfully", user)
    } catch (err) {
        next(err)
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const { name, email } = req.body
        const { id } = req.params
        const updatedUser = await updateUserService(id, name, email)
        if (!updatedUser) return handleResponse(res, 404, "User not found")
        handleResponse(res, 200, "User updated Successfully", updatedUser)
    } catch (err) {
        next(err)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const deletedUser = await deleteUserService(id)
        if (!deletedUser) return handleResponse(res, 404, "User not found")
        handleResponse(res, 200, "User deleted Successfully", deletedUser)
    } catch (err) {
        next(err)
    }
}