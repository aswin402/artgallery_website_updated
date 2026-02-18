type LogLevel = "info" | "warn" | "error" | "debug"

const isDev = process.env.NODE_ENV === "development"

const styles: Record<LogLevel, string> = {
  info: "color: #3b82f6; font-weight: 600;",
  warn: "color: #f59e0b; font-weight: 600;",
  error: "color: #ef4444; font-weight: 600;",
  debug: "color: #10b981; font-weight: 600;",
}

function log(level: LogLevel, message: string, data?: unknown) {
  if (!isDev && level === "debug") return

  const prefix = `[ART-GALLERY] ${level.toUpperCase()}`

  console.log(
    `%c${prefix}`,
    styles[level],
    message,
    data ?? ""
  )
}

export const logger = {
  info: (msg: string, data?: unknown) => log("info", msg, data),
  warn: (msg: string, data?: unknown) => log("warn", msg, data),
  error: (msg: string, data?: unknown) => log("error", msg, data),
  debug: (msg: string, data?: unknown) => log("debug", msg, data),
}


// Use:
// import { logger } from "@/lib/logger"
// logger.info("Fetching artworks")
// logger.error("Login failed", error)
// logger.debug("User data", user)