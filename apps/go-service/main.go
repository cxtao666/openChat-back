package main

import (
	"context"
	"log"
	"time"
	"google.golang.org/grpc"
	"meeting/proto/book"
)

func main() {
	// 连接到 gRPC 服务器
	conn, err := grpc.Dial("localhost:4000", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("Failed to connect to gRPC server: %v", err)
	}
	defer conn.Close()

	// 创建 gRPC 客户端
	client := book.NewBookServiceClient(conn)

	// 调用服务方法
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()

	res, err := client.GetHello(ctx, &book.BookById{})
	if err != nil {
		log.Fatalf("Error calling GetBook: %v", err)
	}

	log.Printf("Received book info: Title=%s", res.Msg)
}
