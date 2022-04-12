package main

import (
	"context"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

type Person struct {
	Age        int    `json:"age"`
	Gender     string `json:"gender"`
	Image_url  string `json:"image_url"`
	FirstName  string `json:"firstName"`
	LastName   string `json:"lastName"`
	Occupation string `json:"occupation"`
}

func main() {
	//muda
	//mongomuda
	link := "mongodb+srv://muda:mongomuda@cluster0.zwbv4.mongodb.net/mudaFaces?retryWrites=true&w=majority"
	client, err := mongo.NewClient(options.Client().ApplyURI(link))
	if err != nil {
		log.Fatal(err)
	}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Connected to MongoDB!")

	r := gin.Default()
	r.Use(cors.Default())
	r.GET("/person", func(c *gin.Context) {
		resp, err := http.Get("https://fakeface.rest/face/json")

		if err != nil {
			fmt.Println(err)
		}
		//We Read the response body on the line below.
		body, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			fmt.Println(err)
		}
		//Convert the body to type string json format
		sb := string(body)

		c.JSON(200, sb)

	})

	r.POST("/person", func(c *gin.Context) {
		//post data to the mongo database
		var person Person
		c.BindJSON(&person)
		fmt.Println(person)
		collection := client.Database("mudaFaces").Collection("faces")
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		result, err := collection.InsertOne(ctx, person)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println(result)
	})

	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
