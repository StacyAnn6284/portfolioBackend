import dotenv from "dotenv";
dotenv.config();

// Explicitly disable metrics and logs to avoid 404 collector errors
process.env.OTEL_METRICS_EXPORTER = "none";
process.env.OTEL_LOGS_EXPORTER = "none";

import { NodeSDK } from "@opentelemetry/sdk-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";

const traceExporter = new OTLPTraceExporter({
  url: "http://localhost:4318/v1/traces",
});

const sdk = new NodeSDK({
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()],
});

console.log("Starting OpenTelemetry...");
sdk.start();
console.log("OpenTelemetry started");

process.on("SIGTERM", () => {
  sdk
    .shutdown()
    .then(() => console.log("Tracing terminated"))
    .catch((error) => console.error("Error terminating tracing", error))
    .finally(() => process.exit(0));
});

export { sdk };
