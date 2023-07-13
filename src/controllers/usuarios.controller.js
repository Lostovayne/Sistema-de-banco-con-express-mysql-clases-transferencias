import { pool } from "../config/mysql.config.js";

const connection = await pool.getConnection();

/**
 * Obtiene todos los usuarios.
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>}
 * @throws {Error} Si hay un error al obtener los usuarios.
 */
const GetAllUsers = async (req, res) => {
    try {
        //Mostrar todos los usuarios
        const query = "SELECT * FROM usuarios";
        const [result] = await connection.execute(query);
        res.status(200).json({
            ok: true,
            msg: "Usuarios obtenidos exitosamente",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: error.message,
            data: error.message,
        });
    }
    0;
};

/**
 * Crea un nuevo usuario.
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>}
 * @throws {Error} Si hay un error al crear el usuario.
 */
const CreateUser = async (req, res) => {
    const { nombre, balance } = req.body;

    try {
        const query = "INSERT INTO usuarios (nombre , balance) VALUES (?,?)";

        console.log(nombre, balance);
        console.log(query);

        const [result] = await connection.execute(query, [nombre, balance]);
        res.status(200).json({
            ok: true,
            msg: "Usuario creado exitosamente",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error al crear el usuario",
            data: error.message,
        });
    }
};

/**
 * Actualiza un usuario existente.
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>}
 * @throws {Error} Si hay un error al actualizar el usuario.
 */
const UpdateUser = async (req, res) => {
    const { id } = req.params;
    const { nombre, balance } = req.body;

    // revisar si el id del usuario existe
    const queryid = "SELECT * FROM usuarios WHERE id = ?";
    const [result] = await connection.execute(queryid, [id]);
    if (result.length === 0) {
        res.status(404).json({
            ok: false,
            msg: "El usuario no existe",
        });
    } else {
        try {
            const query =
                "UPDATE usuarios SET nombre = ?, balance = ? WHERE id = ?";
            const [result] = await connection.execute(query, [
                nombre,
                balance,
                id,
            ]);
            res.status(200).json({
                ok: true,
                msg: "Usuario actualizado exitosamente",
                data: result,
            });
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: "Error al actualizar el usuario",
                data: error.message,
            });
        }
    }
};

/**
 * Elimina un usuario.
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */

const DeleteUser = async (req, res) => {
    const { id } = req.params;
    const queryid = "SELECT * FROM usuarios WHERE id = ?";
    const [result] = await connection.execute(queryid, [id]);

    if (result.length === 0) {
        res.status(404).json({
            ok: false,
            msg: "El usuario no existe",
        });
    } else {
        res.status(200).json({
            ok: true,
            msg: `El usuario del id:${id} fue desactivado tiene 14 dias para volver a activarlo`,
        });
    }
};

export { GetAllUsers, CreateUser, UpdateUser, DeleteUser };
