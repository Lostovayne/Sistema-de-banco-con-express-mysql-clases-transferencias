import { pool } from "../config/mysql.config.js";

const connection = await pool.getConnection();

/**
 * Obtiene todas las transferencias.
 *
 * @param {Request} req - El objeto de solicitud.
 * @param {Response} res - El objeto de respuesta.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se completan todas las transferencias.
 */
const GetAllTransfer = async (req, res) => {
    try {
        const query = "SELECT * FROM transferencias";
        const [result] = await connection.execute(query);
        res.status(200).json({
            ok: true,
            msg: "Transferencias obtenidas exitosamente",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Las Transferencias no pudieron ser obtenidas , pongase en contacto con su operadora!",
            data: error.message,
        });
    }
};

/**
 * Crea una transferencia.
 *
 * @param {Request} req - El objeto de solicitud.
 * @param {Response} res - El objeto de respuesta.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se crea la transferencia.
 */
const CreateTransfer = async (req, res) => {
    const { emisor, receptor, monto } = req.body;

    await connection.beginTransaction();

    const [receptorexiste] = await connection.execute(
        "SELECT * FROM usuarios WHERE id = ?",
        [receptor]
    );

    const [emisorExiste] = await connection.execute(
        "SELECT * FROM usuarios WHERE id = ?",
        [emisor]
    );

    if (receptorexiste.length === 0 || emisorExiste.length === 0) {
        res.status(404).json({
            ok: false,
            msg: "El usuario el cual intenta recibir o enviar  no existe",
        });
    } else {
        const [balance] = await connection.execute(
            "SELECT balance FROM usuarios WHERE id = ?",
            [emisor]
        );

        const [balance2] = await connection.execute(
            "SELECT balance FROM usuarios WHERE id = ?",
            [receptor]
        );

        const BalanceData = balance[0].balance;
        const balanceData2 = balance2[0].balance;

        if (BalanceData < monto) {
            res.status(400).json({
                ok: false,
                msg: "No tiene dinero Suficiente",
            });
        } else {
            try {
                const query =
                    "INSERT INTO transferencias (emisor, receptor, monto) VALUES (?, ?, ?)";
                const [result] = await connection.execute(query, [
                    emisor,
                    receptor,
                    monto,
                ]);

                //restar saldo al emisor
                await connection.execute(
                    "UPDATE usuarios SET balance = ? WHERE id = ?",
                    [BalanceData - monto, emisor]
                );

                //agregar saldo al receptor
                await connection.execute(
                    "UPDATE usuarios SET balance = ? WHERE id = ?",
                    [balanceData2 + monto, receptor]
                );

                await connection.commit();
                res.status(200).json({
                    ok: true,
                    msg: "Transferencia creada exitosamente",
                    data: result,
                });
            } catch (error) {
                await connection.rollback();
                res.status(500).json({
                    ok: false,
                    msg: error.message,
                    data: error.message,
                });
            }
        }
    }
};

export { GetAllTransfer, CreateTransfer };
