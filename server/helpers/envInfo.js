const ANSI_COLORS = ["\x1b[35m \x1b[4m",'\x1b[0m'];
const ENV_INFO = `App running in ${ANSI_COLORS[0]}${process.env.NODE_ENV}${ANSI_COLORS[1]}, at port ${ANSI_COLORS[0]}:${process.env.PORT}${ANSI_COLORS[1]}`

module.exports = ENV_INFO;