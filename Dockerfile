FROM golang:alpine

WORKDIR /src

RUN apk add --no-cache tzdata

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