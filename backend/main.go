package main

import (
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
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
		fmt.Println("Hello")
	})

	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
