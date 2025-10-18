FROM golang:alpine

WORKDIR /src

RUN apk add --no-cache tzdata
RUN apk add --no-cache jq
RUN apk add --no-cache curl

COPY go.mod .
COPY go.sum .
RUN go mod download

COPY *.go ./
COPY commands commands
COPY db db
COPY events events
COPY misc misc

RUN go build
ENTRYPOINT ["./HolidayBot"]

HEALTHCHECK --interval=30s --timeout=8s --start-period=10s --retries=2 CMD { \
    RESPONSE=$( curl -s http://localhost:8080/healthcheck ); \
    \
    HEALTHY=$( echo "$RESPONSE" | jq -r '.healthy' ); \
    LATENCY=$( echo "$RESPONSE" | jq -r '.latency' ); \
    \
    if [ "$HEALTHY" != "true" ]; then \
        ERROR_MSG=$( echo "$RESPONSE" | jq -r '.error' ); \
        echo -n "$ERROR_MSG"; \
        exit 1; \
    fi; \
    \
    echo -n "$LATENCY"; \
    exit 0; \
}